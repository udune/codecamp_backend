import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

interface IFileServiceUpload {
  files: FileUpload[];
}

@Injectable()
export class FilesService {
  async upload({ files }: IFileServiceUpload): Promise<string[]> {
    console.log(files);
    // 1. 파일을 클라우드 스토리지에 저장하는 로직

    const waitedFiles = await Promise.all(files.map(file => file));
    waitedFiles[0] = await files[0];
    waitedFiles[1] = await files[1];

    // 1-1) 스토리지 셋팅하기
    const storage = new Storage({
      projectId: 'codecamp-308601',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('codecamp-file-storage');

    // 1-2) 스토리지에 파일 올리기
    let results = [];
    for (let i = 0; i < waitedFiles.length; i++) {
      waitedFiles[i] = await new Promise<string>((resolve, reject) => {
        waitedFiles[i]
          .createReadStream()
          .pipe(storage.file(waitedFiles[0].filename).createWriteStream())
          .on('finish', () => { resolve('성공'); })
          .on('error', () => { reject('실패'); });
      });
    }
    return results;
  }
}