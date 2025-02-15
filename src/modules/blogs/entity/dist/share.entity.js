"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Blog = void 0;
var typeorm_1 = require("typeorm");
var Blog = /** @class */ (function () {
    function Blog() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Blog.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Blog.prototype, "title");
    __decorate([
        typeorm_1.Column()
    ], Blog.prototype, "desc");
    __decorate([
        typeorm_1.Column()
    ], Blog.prototype, "img");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Blog.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Blog.prototype, "updated_at");
    Blog = __decorate([
        typeorm_1.Entity('blogs')
    ], Blog);
    return Blog;
}());
exports.Blog = Blog;
