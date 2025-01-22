"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManagerGuard = void 0;
var common_1 = require("@nestjs/common");
var mangerAccount_enum_1 = require("../enum/mangerAccount.enum");
var ManagerGuard = /** @class */ (function () {
    function ManagerGuard() {
    }
    ManagerGuard.prototype.canActivate = function (context) {
        var request = context.switchToHttp().getRequest();
        var user = request.user;
        // console.log(user);
        // open for deovlper for test the app
        // if(user.status ==StatusUser.DEOVLPER){
        //   return true
        // }
        if (user.MangerStatus !== mangerAccount_enum_1.MangerStatus.MANGER) {
            throw new common_1.ForbiddenException('Only the primary account holder is authorized to make this modification.');
        }
        return true;
    };
    ManagerGuard = __decorate([
        common_1.Injectable()
    ], ManagerGuard);
    return ManagerGuard;
}());
exports.ManagerGuard = ManagerGuard;
