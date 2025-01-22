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
var typeorm_1 = require("@nestjs/typeorm");
var share_entity_1 = require("./entity/share.entity");
var share_controller_1 = require("./controller/share.controller");
var shares_service_1 = require("./service/shares.service");
var shareUser_entity_1 = require("./entity/shareUser.entity");
var profitShare_entity_1 = require("./entity/profitShare.entity");
var user_module_1 = require("../user/user.module");
var ShareModule = /** @class */ (function () {
    function ShareModule() {
    }
    ShareModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([share_entity_1.Share, shareUser_entity_1.ShareUser, profitShare_entity_1.ProfitShare]), user_module_1.UserModule],
            controllers: [share_controller_1.ShareController],
            providers: [shares_service_1.ShareService,],
            exports: [shares_service_1.ShareService]
        })
    ], ShareModule);
    return ShareModule;
}());
exports.ShareModule = ShareModule;
