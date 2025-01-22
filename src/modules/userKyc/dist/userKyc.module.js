"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserKycModule = void 0;
var common_1 = require("@nestjs/common");
var userKyc_controller_1 = require("./controller/userKyc.controller");
var typeorm_1 = require("@nestjs/typeorm");
var userKyc_entity_1 = require("./entity/userKyc.entity");
var userKyc_service_1 = require("./service/userKyc.service");
var file_upload_service_1 = require("src/Helper/img/service/file-upload.service");
var UserKycModule = /** @class */ (function () {
    function UserKycModule() {
    }
    UserKycModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([userKyc_entity_1.UserKyc])],
            controllers: [userKyc_controller_1.UserKycController],
            providers: [userKyc_service_1.UserKycService, file_upload_service_1.FileService],
            exports: [userKyc_service_1.UserKycService]
        })
    ], UserKycModule);
    return UserKycModule;
}());
exports.UserKycModule = UserKycModule;
