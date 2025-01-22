"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AffiliateModule = void 0;
var common_1 = require("@nestjs/common");
var affilite_controller_1 = require("./controller/affilite.controller");
var Affiliate_service_1 = require("./service/Affiliate.service");
var typeorm_1 = require("@nestjs/typeorm");
var affilite_entity_1 = require("./entity/affilite.entity");
var RewardAffiliate_1 = require("./entity/RewardAffiliate");
var AffiliateModule = /** @class */ (function () {
    function AffiliateModule() {
    }
    AffiliateModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([affilite_entity_1.MarketingFees, RewardAffiliate_1.RewardAffiliate])],
            controllers: [affilite_controller_1.AffiliateController],
            providers: [Affiliate_service_1.AffiliateService,],
            exports: [Affiliate_service_1.AffiliateService]
        })
    ], AffiliateModule);
    return AffiliateModule;
}());
exports.AffiliateModule = AffiliateModule;
;
