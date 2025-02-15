"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShareModule = void 0;
var common_1 = require("@nestjs/common");
var blogs_controller_1 = require("./controller/blogs.controller");
var typeorm_1 = require("@nestjs/typeorm");
var blog_entity_1 = require("./entity/blog.entity");
var ShareModule = /** @class */ (function () {
    function ShareModule() {
    }
    ShareModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([blog_entity_1.Blog])],
            controllers: [blogs_controller_1.BlogsController],
            providers: [],
            exports: []
        })
    ], ShareModule);
    return ShareModule;
}());
exports.ShareModule = ShareModule;
