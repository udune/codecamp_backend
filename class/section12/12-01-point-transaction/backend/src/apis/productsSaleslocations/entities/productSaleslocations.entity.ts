import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductSaleslocation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  @Field(() => String)
  lat: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  @Field(() => String)
  lng: string;

  @Column()
  @Field(() => Date)
  meetingTime: Date;
}
