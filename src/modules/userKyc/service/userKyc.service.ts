import { ConflictException, Injectable } from '@nestjs/common';
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
      user:IJWTpayload,
    ):Promise<{message:string}>{
      const checkRecord = await this.checkIfRecordExists(user.userId);

      if (checkRecord) {
        throw new ConflictException('The user kety with this ID already exists.');
      }

      const uploadedFiles = {
        front_id_image: null,
        back_id_image: null,
        face_image: null,
      };
      const uploadPromises = files.map(async (file) => {
        
        const uploadedUrl = await this.fileService.uploadFile(file, 'kyc');
         uploadedFiles[file.fieldname] = uploadedUrl;
      });
      
      await Promise.all(uploadPromises);
      

      const newKyc = this.userKycService.create({
        fullname: data.fullname,
        international_id: data.international_id,
        front_id_image:uploadedFiles .front_id_image,
        back_id_image:uploadedFiles.back_id_image,
        face_image:uploadedFiles. face_image,
        active: typeStatusKyc.PENDING,
        user_id: user.userId,
      });

      this.userKycService.save(newKyc);

      return {
        message: 'Operation stored successfully',
      };
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
