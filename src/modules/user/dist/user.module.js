"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("./entity/user.entity");
var user_controller_1 = require("./controller/user.controller");
var user_service_1 = require("./service/user.service");
var otp_module_1 = require("../otp/otp.module");
var deviceAccess_module_1 = require("../device-access/deviceAccess.module");
var notfication_module_1 = require("../notfication/notfication.module");
var hash_service_1 = require("src/common/HashingData/hash.service");
var file_upload_service_1 = require("src/Helper/img/service/file-upload.service");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
                otp_module_1.OtpModule,
                deviceAccess_module_1.DeviceModule,
                notfication_module_1.NotficatioModule,
            ],
            controllers: [user_controller_1.UserController],
            providers: [user_service_1.UserService, hash_service_1.HashService, file_upload_service_1.FileService],
            exports: [user_service_1.UserService]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
