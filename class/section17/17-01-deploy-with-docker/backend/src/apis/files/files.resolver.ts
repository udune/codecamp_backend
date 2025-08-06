import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { GraphQLUpload, FileUpload } from 'src/types/graphql-upload';

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  @Mutation(() => [String])
  async uploadFile(
    @Args('files', { type: () => [GraphQLUpload] }) files: FileUpload[],
  ): Promise<string[]> {
    return await this.filesService.upload({ files });
  }
}
