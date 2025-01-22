import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import * as path from 'path';
 
export const FileValidation = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const files:Array<Express.Multer.File> = request.files;   

    if (!files || files.length === 0) {
      throw new BadRequestException([
        'You must upload upload the front_id_image and back_id_image and face_image',
      ]);
    }

    const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif'];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB

    // Ensure the required files exist
    const faceImg = files.find((file) => file.fieldname === 'front_id_image');
    const backImg = files.find((file) => file.fieldname === 'back_id_image');
    const faceRealImg = files.find((file) => file.fieldname === 'face_image');

    if (!faceImg) {
      throw new BadRequestException(['You must upload the front_id_image.']);
    }
    if (!backImg) {
      throw new BadRequestException(['You must upload the back_id_image.']);
    }

    if (!faceRealImg) {
      throw new BadRequestException(['You must upload the face_image.']);
    }

    // Validate file types and sizes
    [faceImg, backImg].forEach((file) => {
      const ext = path.extname(file.originalname).toLowerCase();
  
      if (file.size > maxFileSize) {
        throw new BadRequestException([
          `${file.fieldname} file size exceeds the maximum allowed size of 5MB.`,
        ]);
      }
    });

    return files; // Return the validated files
  },
);
