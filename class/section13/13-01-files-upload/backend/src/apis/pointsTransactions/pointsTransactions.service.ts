import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate) {
    // this.pointsTransactionsRepository.create(); // 등록을 위한 빈 객체 만들기
    // this.pointsTransactionsRepository.insert(); // 결과는 못 받는 등록 방법
    // this.pointsTransactionsRepository.update(); // 결과는 못 받는 수정 방법

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. PointTransaction 테이블에 거래기록 1줄 생성
      const pointTransaction = this.pointsTransactionsRepository.create({
        impUid,
        amount,
        user: { id: _user.user?.id } as any,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // await this.pointsTransactionsRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction);

      throw new Error('예기치못한 실패');

      // 2. 유저의 돈 찾아오기
      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.user?.id },
      // });
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.user?.id },
      });

      // 3. 유저의 돈 업데이트
      const updateUser = await this.usersRepository.create({
        ...user,
        point: user!!.point + amount,
      });
      await queryRunner.manager.save(updateUser);
      await queryRunner.commitTransaction();

      // 4. 최종결과 브라우저에 돌려주기
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
    } finally {
      await queryRunner.release();
    }
  }
}
