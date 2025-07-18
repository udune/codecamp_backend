import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'src/types/graphql-upload';

interface IFileServiceUpload {
  files: FileUpload[];
}

@Injectable()
export class FilesService {
  async upload({ files }: IFileServiceUpload): Promise<string[]> {
    console.log(files);
    // 1. 파일을 클라우드 스토리지에 저장하는 로직
    const waitedFiles = await Promise.all(files);

    // 1-1) 스토리지 셋팅하기
    const bucket = 'codecamp-file-storage';
    const storage = new Storage({
      projectId: 'codecamp-308601',
      keyFilename: 'gcp-file-storage.json',
    }).bucket(bucket);

    console.time('시간을 확인해보자!');
    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise<string>((resolve, reject) => {
          el.createReadStream()
            .pipe(
              storage
                .file(el.filename)
                .createWriteStream()
                .on('finish', () => resolve(`${bucket}/${el.filename}`)),
            )
            .on('error', () => reject('실패'));
        });
      }),
    );

    console.timeEnd('시간을 확인해보자!');
    console.log('파일 전송이 완료되었습니다.');

    return results;
  }
}
