import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ProductTag } from './entities/productTag.entity';
import {
  IProductsTagsServiceBulkInsert,
  IProductsTagsServiceFindByNames,
} from './interfaces/products-tags-service.interface';

@Injectable()
export class ProductsTagsService {
  constructor(
    @InjectRepository(ProductTag)
    private readonly productsTagsRepository: Repository<ProductTag>,
  ) {}

  findByNames({ tagNames }: IProductsTagsServiceFindByNames) {
    return this.productsTagsRepository.find({
      where: { name: In(tagNames) },
    });
  }

  bulkInsert({ names }: IProductsTagsServiceBulkInsert) {
    return this.productsTagsRepository.insert(names);
  }

  async createTags(tagNames: string[]): Promise<ProductTag[]> {
    const prevTags = await this.findByNames({ tagNames });

    const newTagNames = tagNames
      .filter((name) => !prevTags.find((tag) => tag.name === name))
      .map((name) => ({ name }));

    if (newTagNames.length > 0) {
      await this.bulkInsert({ names: newTagNames });
    }

    return this.findByNames({ tagNames });
  }
}
