import { Module } from "@nestjs/common";
import { BlogsController } from "./controller/blogs.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Blog } from "./entity/blog.entity";
import { BlogService } from "./service/blog.service";

@Module({
    imports:[TypeOrmModule.forFeature([Blog])],
    controllers:[BlogsController],
    providers:[BlogService],
    exports:[BlogService],
})

export class BlogModule{}