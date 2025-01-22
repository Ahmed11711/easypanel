import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Share } from "src/modules/shares/entity/share.entity";
import { Repository } from "typeorm";
import { IBlog } from "../interface/blog.interface";
import { Blog } from "../entity/blog.entity";

@Injectable()

export class BlogService{
    constructor(   @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>){}


    async getAll(){
        return await this.blogRepository.find();
      }

    
}