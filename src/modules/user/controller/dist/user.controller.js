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
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var swagger_1 = require("@nestjs/swagger");
var isPublic_decorator_1 = require("src/modules/auth/decorator/isPublic.decorator");
var swaigger_decorator_1 = require("src/common/decorator/swaigger.decorator");
var get_current_user_1 = require("src/modules/auth/decorator/get-current-user");
var manger_device_decorator_1 = require("src/modules/device-access/decorator/manger-device.decorator");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    // Register a new user
    UserController.prototype.registerUser = function (userdata) {
        return this.userService.create(userdata);
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Get the current user's data
    UserController.prototype.me = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.me(user.userId, user.MangerStatus)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Delete user account
    UserController.prototype.deleteAccount = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.deleteAacount(user)];
            });
        });
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    UserController.prototype.chnagePassword = function (data, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.changePassword(data, user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    UserController.prototype.chnageEmail = function (data, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.changeEmail(data, user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.chnageProfil = function (file, data, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.changeProfile(data, user, file)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.forgetPassword = function (data) {
        return this.userService.forgetPassword(data);
    };
    __decorate([
        isPublic_decorator_1.ISPublic(),
        swaigger_decorator_1.ApiGlobalResponse('Create user', [
            { status: 201, description: 'Success Register. Please Check Your Otp.' },
        ]),
        common_1.Post('create-user'),
        __param(0, common_1.Body())
    ], UserController.prototype, "registerUser");
    __decorate([
        swaigger_decorator_1.ApiGlobalResponse('Get My Data', [
            { status: 200, description: 'Success return my Data.' },
        ])
        // @UseGuards(ManagerGuard)
        ,
        common_1.Post('me'),
        __param(0, get_current_user_1.GetCurrentUser())
    ], UserController.prototype, "me");
    __decorate([
        swaigger_decorator_1.ApiGlobalResponse('Delete Account', [
            { status: 200, description: 'The user account has been deleted.' },
        ]),
        common_1.UseGuards(manger_device_decorator_1.ManagerGuard),
        common_1.Delete('delete'),
        __param(0, get_current_user_1.GetCurrentUser())
    ], UserController.prototype, "deleteAccount");
    __decorate([
        common_1.UseGuards(manger_device_decorator_1.ManagerGuard),
        common_1.Post('change-password'),
        __param(0, common_1.Body()),
        __param(1, get_current_user_1.GetCurrentUser())
    ], UserController.prototype, "chnagePassword");
    __decorate([
        common_1.UseGuards(manger_device_decorator_1.ManagerGuard),
        common_1.Post('change-email'),
        __param(0, common_1.Body()),
        __param(1, get_current_user_1.GetCurrentUser())
    ], UserController.prototype, "chnageEmail");
    __decorate([
        common_1.Post('change-profile'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('img')),
        __param(0, common_1.UploadedFile()),
        __param(1, common_1.Body()),
        __param(2, get_current_user_1.GetCurrentUser())
    ], UserController.prototype, "chnageProfil");
    __decorate([
        isPublic_decorator_1.ISPublic(),
        common_1.Post('forget-password'),
        __param(0, common_1.Body())
    ], UserController.prototype, "forgetPassword");
    UserController = __decorate([
        swagger_1.ApiTags('User'),
        common_1.Controller('users')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
