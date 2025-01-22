"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.PriceShareService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var price_share_entity_1 = require("../entity/price-share.entity");
var typeorm_2 = require("typeorm");
var PriceShareService = /** @class */ (function () {
    function PriceShareService(priceShareRepository) {
        this.priceShareRepository = priceShareRepository;
    }
    PriceShareService.prototype.getAll = function () {
        return this.priceShareRepository.find({
            where: { expire_date: typeorm_2.LessThan(new Date()) }
        });
    };
    PriceShareService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(price_share_entity_1.PriceShare))
    ], PriceShareService);
    return PriceShareService;
}());
exports.PriceShareService = PriceShareService;
