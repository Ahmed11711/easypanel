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
exports.ShareController = void 0;
var common_1 = require("@nestjs/common");
var isPublic_decorator_1 = require("src/modules/auth/decorator/isPublic.decorator");
var get_current_user_1 = require("src/modules/auth/decorator/get-current-user");
var ShareController = /** @class */ (function () {
    function ShareController(shareService) {
        this.shareService = shareService;
    }
    ShareController.prototype.allShares = function () {
        return this.shareService.getAll();
    };
    ShareController.prototype.invest = function (data, user) {
        return this.shareService.investment(data, user);
    };
    ShareController.prototype.historyWallte = function (user) {
        return this.shareService.hsitoryShare(user);
    };
    ShareController.prototype.historyProfite = function (user, id) {
        return this.shareService.profitHistory(user.userId, id);
    };
    __decorate([
        isPublic_decorator_1.ISPublic(),
        common_1.Get()
    ], ShareController.prototype, "allShares");
    __decorate([
        common_1.Post('invest'),
        __param(0, common_1.Body()), __param(1, get_current_user_1.GetCurrentUser())
    ], ShareController.prototype, "invest");
    __decorate([
        common_1.Get('histortry'),
        __param(0, get_current_user_1.GetCurrentUser())
    ], ShareController.prototype, "historyWallte");
    __decorate([
        common_1.Get('details/:id'),
        __param(0, get_current_user_1.GetCurrentUser()),
        __param(1, common_1.Param('id'))
    ], ShareController.prototype, "historyProfite");
    ShareController = __decorate([
        common_1.Controller('shares')
    ], ShareController);
    return ShareController;
}());
exports.ShareController = ShareController;
