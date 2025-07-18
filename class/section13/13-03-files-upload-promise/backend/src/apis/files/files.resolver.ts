import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  @Mutation(() => String)
  async uploadFile(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<string> {
    return await this.filesService.upload({ file });
  }
}
