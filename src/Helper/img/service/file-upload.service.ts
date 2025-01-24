import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class FileService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    this.s3Client = new S3Client({
      region: 'eu-central-1',
      credentials: {
        accessKeyId: 'AKIARWPFIIFOZPBBZGAQ',
        secretAccessKey: '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',
      },
    });

    this.bucketName = 'ahmedsamir11';
  }

  async uploadFile(file: Express.Multer.File,folderName)  {
    const extension = path.extname(file.originalname); 
    const fileKey = `${Date.now()}${extension}`;
    const params = {
        Bucket: this.bucketName,
        Key: `${folderName}/${fileKey}`,  
        Body: file.buffer,
        ContentType: file.mimetype,
      };
 
    await this.s3Client.send(new PutObjectCommand(params));
   
    // return `https://${this.bucketName}.s3.amazonaws.com/${folderName}/${fileKey}`;
    return `${folderName}/${fileKey}`;
}
}

//


 