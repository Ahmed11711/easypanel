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
        accessKeyId: 'AKIA3RYC55QF4SBMJDEN',
        secretAccessKey: '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',
      },
    });

    this.bucketName = 'newsmarttreading';
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

// upload in my server
// private uploadPath = path.join(__dirname, '..', '..', 'uploads'); // حدد مسار الحفظ

// constructor() {
//   if (!fs.existsSync(this.uploadPath)) {
//     fs.mkdirSync(this.uploadPath, { recursive: true }); // تأكد من إنشاء المجلد إذا لم يكن موجودًا
//   }
// }

// async uploadFile(file: Express.Multer.File, folderName: string) {
//   const extension = path.extname(file.originalname);
//   const fileName = `${Date.now()}${extension}`;
//   const folderPath = path.join(this.uploadPath, folderName);

//   if (!fs.existsSync(folderPath)) {
//     fs.mkdirSync(folderPath, { recursive: true }); // إنشاء المجلد إذا لم يكن موجودًا
//   }

//   const filePath = path.join(folderPath, fileName);
//   fs.writeFileSync(filePath, file.buffer); // حفظ الملف محليًا

//   return `/uploads/${folderName}/${fileName}`; // إرجاع رابط الملف المخزن
// }
}

//


 