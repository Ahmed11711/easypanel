import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserKyc } from '../entity/userKyc.entity';
import { Repository } from 'typeorm';
import { CreateUserKycDto } from '../dto/uploadKyc.dto';
import { IUserKyc } from '../interface/kyc.interface';
import { typeStatusKyc } from '../enum/user-kyc.enum';
import { FileService } from "src/Helper/img/service/file-upload.service";
import { IJWTpayload } from 'src/modules/auth/interface/login.payload';

@Injectable()
export class UserKycService {
  constructor(
    @InjectRepository(UserKyc)
    private readonly userKycService: Repository<UserKyc>,
    private readonly  fileService:FileService
    ,
  ) {}

  async storeKyc(
    data: CreateUserKycDto,
    files,
    user: IJWTpayload,
  ): Promise<{ message: string }> {
    try {
      // Check if the KYC record already exists for the user
      const checkRecord = await this.checkIfRecordExists(user.userId);
      if (checkRecord) {
        throw new ConflictException('The user kyc with this ID already exists.');
      }
  
      // Initialize the uploaded files object
      const uploadedFiles = {
        front_id_image: null,
        back_id_image: null,
        face_image: null,
      };
  
      // Create promises for file uploads
      const uploadPromises = files.map(async (file) => {
        const uploadedUrl = await this.fileService.uploadFile(file, 'kyc');
        uploadedFiles[file.fieldname] = uploadedUrl;
      });
  
      // Wait for all file uploads to finish
      await Promise.all(uploadPromises);
  
      // Create a new KYC record
      const newKyc = this.userKycService.create({
        fullname: data.fullname,
        international_id: data.international_id,
        front_id_image: uploadedFiles.front_id_image,
        back_id_image: uploadedFiles.back_id_image,
        face_image: uploadedFiles.face_image,
        active: typeStatusKyc.PENDING,
        user_id: user.userId,
      });
  
      // Save the new KYC record
      await this.userKycService.save(newKyc);
  
      // Return success message
      return {
        message: 'Operation stored successfully',
      };
  
    } catch (error) {
      // Log the error for debugging
      console.error('Error storing KYC:', error);
  
      // Re-throw the error to propagate it if needed or handle it accordingly
      throw new InternalServerErrorException('An error occurred while processing the KYC.');
    }
  }
  
  async checkIfRecordExists(userId): Promise<Boolean> {
    
    const record = await this.userKycService.findOne({
      where: { user_id: userId },
    });
 
    return record ? true : false;
  }

  async getMyKyc(userId): Promise<IUserKyc> {
    const record = await this.userKycService.findOne({
      where: { user_id: userId },
    });

    return record;
  }


  
 
}
