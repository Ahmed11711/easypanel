import { Controller, Get, Query } from "@nestjs/common";
import { ISPublic } from "src/modules/auth/decorator/isPublic.decorator";
import { BlogService } from "../service/blog.service";

@Controller('blogs')

export class BlogsController{

    constructor(private readonly blogService:BlogService){}

    @ISPublic()
    @Get()
    getAll(){
        return this.blogService.getAll();
    }
 
}