import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceDelete,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';
import { ProductsTagsService } from '../productsTags/productsTags.service';
import { ProductTag } from '../productsTags/entities/productTag.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly productsSaleslocationsService: ProductsSaleslocationsService,
    private readonly productsTagsService: ProductsTagsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productsSaleslocation', 'productCategory'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product | null> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productsSaleslocation', 'productCategory'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    // 1. 상품 하나만 등록할 때 사용하는 방법
    // const result = this.productsRepository.save({
    //   ...createProductInput,

    //   // 하나 하나 직접 나열하는 방식
    //   //   name: '마우스',
    //   //   description: '좋은 마우스',
    //   //   price: 3000,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 방법
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    // 2-1) 상품거래위치 등록
    const result = await this.productsSaleslocationsService.create({
      productSaleslocation,
    }); // 서비스를 타고 가야 하는 이유는...?
    // 레파지토리에 직접 접근하면 검증 로직을 통일시킬수 없음

    // 2-2) 상품태그 등록
    // productTags가 ['#전자제품', '#영등포', '#컴퓨터']
    const tagNames = productTags.map((el) => el.replace('#', '')); // ["전자제품", "영등포", "컴퓨터"]
    const tags: DeepPartial<ProductTag[]> =
      await this.productsTagsService.createTags(tagNames);

    const result2 = this.productsRepository.save({
      ...product,
      productsSaleslocation: result, // result 통째로 넣기 vs id만 빼서 넣기
      productCategoryId: {
        id: productCategoryId,
        // 만약에 name까지 받고 싶으면
        // => CreateProductInput에 name까지 포함해서 받기
      },
      productTags: tags,
    });

    return result2;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<void> {
    // 기존 있는 내용을 재사용하여 로직을 통일하자
    const product = await this.findOne({ productId });

    this.checkSoldout({ product });

    // if (product?.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }

    // this.productsRepository.create(); // DB 접속이랑 관계가 없음. 등록을 위해서 빈 껍데기 객체 만듦
    // this.productsRepository.insert(); // 결과를 객체로 못 돌려 받는 등록 방법
    // this.productsRepository.update(); // 결과를 객체로 못 돌려 받는 수정 방법

    let tags: ProductTag[] | undefined;

    if (updateProductInput.productTags) {
      const tagNames = updateProductInput.productTags.map((el) =>
        el.replace('#', ''),
      );
      tags = await this.productsTagsService.createTags(tagNames);
    }

    this.productsRepository.save({
      ...product,
      ...updateProductInput,
      productTags: tags ?? product?.productTags,
    });
  }

  // checkSoldout을 함수로 만드는 이유 => 수정시 삭제시 등 같은 검증 로직 사용
  checkSoldout({ product }: IProductsServiceCheckSoldout): void {
    if (product?.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;
    // 2. 소프트 삭제 - isDeleted
    // this.productsRepository.update({ id: productId }, { isDeleted: true });
    // 3. 소프트 삭제 - deletedAt
    // this.productsRepository.update(
    //   { id: productId },
    //   { deletedAt: new Date() },
    // );

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // 단점: id로만 삭제 가능
    // 장점: 여러 id 한 번에 지우기 가능 .softRemove([{id: qqq}, {id: aaa}, {id: vvv}])
    // this.productsRepository.softRemove({ id: productId });

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    // 단점: 여러 id 한 번에 지우기 불가능
    // 장점: 다른 컬럼으로도 삭제 가능
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
