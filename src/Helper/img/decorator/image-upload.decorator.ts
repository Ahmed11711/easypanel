import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export function ImageUpload(destination: string) {
  return applyDecorators(
    UseInterceptors(
      AnyFilesInterceptor({
        storage: diskStorage({
          destination: `uploads/${destination}`,
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
            cb(null, filename);
          },
        }),
        fileFilter: (req, file, cb) => {
          if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(new BadRequestException('Unsupported file type'), false);
          } else {
            cb(null, true);
          }
        },
        limits: { fileSize: 5 * 1024 * 1024 }, // تحديد حجم الملف بـ 5 ميجابايت كحد أقصى
      }),
    ),
  );
}
