"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PriceShareModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var price_share_entity_1 = require("./entity/price-share.entity");
var price_share_controller_1 = require("./controller/price-share.controller");
var price_share_service_1 = require("./service/price-share.service");
var PriceShareModule = /** @class */ (function () {
    function PriceShareModule() {
    }
    PriceShareModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([price_share_entity_1.PriceShare])],
            controllers: [price_share_controller_1.PriceShareController],
            providers: [price_share_service_1.PriceShareService],
            exports: [price_share_service_1.PriceShareService]
        })
    ], PriceShareModule);
    return PriceShareModule;
}());
exports.PriceShareModule = PriceShareModule;
