import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productSaleslocations.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { DeleteDateColumn } from 'typeorm';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Field(() => String)
  price: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => String)
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @Field(() => [ProductTag])
  productTags: ProductTag[];

  // @CreateDateColumn() // 데이터 등록시 등록 시간 자동으로
  // createdAt: Date;

  // @UpdateDateColumn() // 데이터 등록시 수정 시간 자동으로
  // updatedAt: Date;

  @DeleteDateColumn() // 소프트 삭제 시간 기록을 위함
  deletedAt: Date;
}
