import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from './entities/productSaleslocations.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsSaleslocationsService {
  constructor(
    @InjectRepository(ProductSaleslocation)
    private readonly productsSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  create({ productSaleslocation }) {
    const result = this.productsSaleslocationRepository.save({
      ...productSaleslocation,
    });
  }
}
