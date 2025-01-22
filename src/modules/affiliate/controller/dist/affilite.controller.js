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
exports.AffiliateController = void 0;
var common_1 = require("@nestjs/common");
var get_current_user_1 = require("src/modules/auth/decorator/get-current-user");
var isPublic_decorator_1 = require("src/modules/auth/decorator/isPublic.decorator");
var AffiliateController = /** @class */ (function () {
    function AffiliateController(affiliateService) {
        this.affiliateService = affiliateService;
    }
    AffiliateController.prototype.getMyAffiliate = function (user) {
        return this.affiliateService.getResponse(user.userId);
    };
    AffiliateController.prototype.getAllReward = function () {
        return this.affiliateService.getAllReward();
    };
    __decorate([
        common_1.Get(),
        __param(0, get_current_user_1.GetCurrentUser())
    ], AffiliateController.prototype, "getMyAffiliate");
    __decorate([
        isPublic_decorator_1.ISPublic(),
        common_1.Get('reward')
    ], AffiliateController.prototype, "getAllReward");
    AffiliateController = __decorate([
        common_1.Controller('affiliate')
    ], AffiliateController);
    return AffiliateController;
}());
exports.AffiliateController = AffiliateController;
