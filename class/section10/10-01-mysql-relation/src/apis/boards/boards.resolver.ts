import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => [Board], { nullable: true })
  fetchBoards(): Board[] {
    return this.boardsService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): string {
    return this.boardsService.create({ createBoardInput });
  }
}
