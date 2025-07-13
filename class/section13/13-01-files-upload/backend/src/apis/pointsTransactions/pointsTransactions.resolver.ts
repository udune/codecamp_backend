import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointsTransactionsService } from './pointsTransactions.service';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class PointsTransactionsResolver {
  constructor(
    private readonly pointsTransactionsService: PointsTransactionsService,
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => PointTransaction)
  async createPointTransaction(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ): Promise<PointTransaction> {
    return await this.pointsTransactionsService.create({
      impUid,
      amount,
      user: { user: context.req.user },
    });
  }
}
