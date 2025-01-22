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
exports.WalletController = void 0;
var common_1 = require("@nestjs/common");
var get_current_user_1 = require("src/modules/auth/decorator/get-current-user");
var WalletController = /** @class */ (function () {
    function WalletController(walletService) {
        this.walletService = walletService;
    }
    WalletController.prototype.getAll = function (data) {
        return this.walletService.getWallte(data);
    };
    WalletController.prototype.recommendedWallte = function () {
        return this.walletService.recommendedWallte();
    };
    WalletController.prototype.historyWallte = function (user) {
        return this.walletService.hsitoryWallte(user);
    };
    WalletController.prototype.historyProfite = function (user, id) {
        return this.walletService.profitHistory(user.userId, id);
    };
    WalletController.prototype.invest = function (data, user) {
        // return user;
        return this.walletService.investment(data, user);
    };
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body())
    ], WalletController.prototype, "getAll");
    __decorate([
        common_1.Get('recommended')
    ], WalletController.prototype, "recommendedWallte");
    __decorate([
        common_1.Post('histortry'),
        __param(0, get_current_user_1.GetCurrentUser())
    ], WalletController.prototype, "historyWallte");
    __decorate([
        common_1.Get('details/:id'),
        __param(0, get_current_user_1.GetCurrentUser()),
        __param(1, common_1.Param('id'))
    ], WalletController.prototype, "historyProfite");
    __decorate([
        common_1.Post('invest'),
        __param(0, common_1.Body()), __param(1, get_current_user_1.GetCurrentUser())
    ], WalletController.prototype, "invest");
    WalletController = __decorate([
        common_1.Controller('wallte')
    ], WalletController);
    return WalletController;
}());
exports.WalletController = WalletController;
