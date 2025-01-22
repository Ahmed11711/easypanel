"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WithdrawModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var withdraw_entinty_1 = require("./entity/withdraw.entinty");
var withdraw_controller_1 = require("./controller/withdraw.controller");
var withdraw_service_1 = require("./service/withdraw.service");
var pagination_service_1 = require("src/common/pagination/service/pagination.service");
var pinCode_module_1 = require("../pin-code/pinCode.module");
var user_module_1 = require("../user/user.module");
var notfication_module_1 = require("../notfication/notfication.module");
var WithdrawModule = /** @class */ (function () {
    function WithdrawModule() {
    }
    WithdrawModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([withdraw_entinty_1.Withdraw]), pinCode_module_1.PinCodeModule, user_module_1.UserModule, notfication_module_1.NotficatioModule],
            controllers: [withdraw_controller_1.WithDrawController],
            providers: [withdraw_service_1.WithDrawService, pagination_service_1.PaginationService],
            exports: [withdraw_service_1.WithDrawService]
        })
    ], WithdrawModule);
    return WithdrawModule;
}());
exports.WithdrawModule = WithdrawModule;
