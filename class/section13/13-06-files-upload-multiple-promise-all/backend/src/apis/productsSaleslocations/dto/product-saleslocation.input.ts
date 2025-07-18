import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductSaleslocationInput {
  @Field(() => String)
  address: string;

  @Field(() => String)
  addressDetail: string;

  @Field(() => String)
  lat: string;

  @Field(() => String)
  lng: string;

  @Field(() => Date)
  meetingTime: Date;
}
