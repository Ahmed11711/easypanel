"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PinCodeModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var pinCode_controller_1 = require("./controller/pinCode.controller");
var pinCode_service_1 = require("./service/pinCode.service");
var pinCode_entity_1 = require("./entity/pinCode.entity");
var hash_service_1 = require("src/common/HashingData/hash.service");
var deviceAccess_module_1 = require("../device-access/deviceAccess.module");
var userWallte_module_1 = require("../user-wallte/userWallte.module");
var PinCodeModule = /** @class */ (function () {
    function PinCodeModule() {
    }
    PinCodeModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([pinCode_entity_1.PinCodeEntity]),
                deviceAccess_module_1.DeviceModule,
                userWallte_module_1.UserWaalteModule,
            ],
            controllers: [pinCode_controller_1.PinCodeController],
            providers: [pinCode_service_1.PinCodeService, hash_service_1.HashService],
            exports: [pinCode_service_1.PinCodeService]
        })
    ], PinCodeModule);
    return PinCodeModule;
}());
exports.PinCodeModule = PinCodeModule;
