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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserWallteController = void 0;
var common_1 = require("@nestjs/common");
var get_current_user_1 = require("src/modules/auth/decorator/get-current-user");
// import { ISPublic } from '../decorator/isPublic.decorator';
var UserWallteController = /** @class */ (function () {
    function UserWallteController(userWallteService) {
        this.userWallteService = userWallteService;
    }
    UserWallteController.prototype.create = function (user, data) {
        return this.userWallteService.createWallet(user.userId, data.password);
    };
    //   @ISPublic()
    // @Post('create-waltes2')
    // create2(@GetCurrentUser() user: IJWTpayload,@Body() data:passwordWallte) {
    //   const ntes="resource absurd yellow reduce home tilt deposit blind lesson zone asset cargo"
    //   return this.userWallteService.getPrivateKeyFromMnemonic(ntes,data.password);
    // }
    UserWallteController.prototype.getTrnsaction = function (user) {
        return this.userWallteService.getTransactionLogs(user.userId);
    };
    UserWallteController.prototype.myAddress = function (user) {
        return this.userWallteService.myAddress(user);
    };
    //  @ISPublic()
    UserWallteController.prototype.myWallte = function (user, data) {
        // // (fromAddress: string, toAddress: string, amount: number, privateKey: string) 
        var fromAddress = "TN2rK17VLMWGjT2vxz3EiqFJPFpGBeUHu9";
        var privateKey = "a70f57c5eaf9210f01113edea6c73c13c1ced2dcd216c1b3d6643784d746e527";
        var toAddress = "TSaM4syJSdp3w72uZK7SBeFtDe3bMpG8qf";
        var amount = 1;
        var usdtContractAddress = 'THPvaUhoh2Qn2y9THCZML3H815hhFhn5YC';
        // // return this.userWallteService.sendTRX(fromAddress,toAddress,1,privateKey );
        return this.userWallteService.sendTRC20(toAddress, data.amount, user.userId, privateKey);
    };
    UserWallteController.prototype.credantionalWallte = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userWallteService.myWallteCredantiona(user.userId)];
            });
        });
    };
    UserWallteController.prototype.getMyBlanceOfTron = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userWallteService.myBlnceOfTron(user.userId)];
                    case 1: 
                    // console.log(555);
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserWallteController.prototype.myWalltes = function (user, data) {
        // // (fromAddress: string, toAddress: string, amount: number, privateKey: string) 
        var fromAddress = "TN2rK17VLMWGjT2vxz3EiqFJPFpGBeUHu9";
        var privateKey = "a70f57c5eaf9210f01113edea6c73c13c1ced2dcd216c1b3d6643784d746e527";
        var toAddress = "TSaM4syJSdp3w72uZK7SBeFtDe3bMpG8qf";
        var amount = 1;
        var usdtContractAddress = 'THPvaUhoh2Qn2y9THCZML3H815hhFhn5YC';
        // // return this.userWallteService.sendTRX(fromAddress,toAddress,1,privateKey );
        return this.userWallteService.sendTransactionAndEstimateEnergy(privateKey, usdtContractAddress, toAddress, amount);
    };
    __decorate([
        common_1.Post('create-waltes'),
        __param(0, get_current_user_1.GetCurrentUser()), __param(1, common_1.Body())
    ], UserWallteController.prototype, "create");
    __decorate([
        common_1.Get('get-transaction'),
        __param(0, get_current_user_1.GetCurrentUser())
    ], UserWallteController.prototype, "getTrnsaction");
    __decorate([
        common_1.Get('my-address'),
        __param(0, get_current_user_1.GetCurrentUser())
    ], UserWallteController.prototype, "myAddress");
    __decorate([
        common_1.Post('send-usdt'),
        __param(0, get_current_user_1.GetCurrentUser()), __param(1, common_1.Body())
    ], UserWallteController.prototype, "myWallte");
    __decorate([
        common_1.Post('credantional-wallte'),
        __param(0, get_current_user_1.GetCurrentUser())
    ], UserWallteController.prototype, "credantionalWallte");
    __decorate([
        common_1.Get('my-balance-of-tron'),
        __param(0, get_current_user_1.GetCurrentUser())
    ], UserWallteController.prototype, "getMyBlanceOfTron");
    __decorate([
        common_1.Post('send-usdt22'),
        __param(0, get_current_user_1.GetCurrentUser()), __param(1, common_1.Body())
    ], UserWallteController.prototype, "myWalltes");
    UserWallteController = __decorate([
        common_1.Controller('web3')
    ], UserWallteController);
    return UserWallteController;
}());
exports.UserWallteController = UserWallteController;
