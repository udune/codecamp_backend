import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocations.entity';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductSaleslocation])],
  providers: [ProductsResolver, ProductsService, ProductsSaleslocationsService],
})
export class ProductsModule {}
