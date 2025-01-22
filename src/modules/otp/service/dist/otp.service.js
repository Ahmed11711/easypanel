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
exports.OtpService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var otp_entity_1 = require("../entity/otp.entity");
var typeorm_2 = require("typeorm");
var generateCode_1 = require("src/common/generateRandomCode/generateCode");
var user_service_1 = require("../../../modules/user/service/user.service");
var typeOtp_snum_1 = require("../enum/typeOtp.snum");
var OtpService = /** @class */ (function () {
    function OtpService(otpRepo, sendGridService, userService) {
        this.otpRepo = otpRepo;
        this.sendGridService = sendGridService;
        this.userService = userService;
    }
    // Store otp and send
    OtpService.prototype.storeAndSend = function (userId, email, type) {
        return __awaiter(this, void 0, Promise, function () {
            var expiresAt, otpValue, newOtp, storeOtp, sendOtp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expiresAt = new Date();
                        expiresAt.setMinutes(expiresAt.getMinutes() + 6);
                        otpValue = generateCode_1.generateRandomAlphanumeric(6);
                        newOtp = this.otpRepo.create({
                            otp: otpValue,
                            user_id: userId,
                            expires_at: expiresAt,
                            is_used: false,
                            type: type
                        });
                        return [4 /*yield*/, this.otpRepo.save(newOtp)];
                    case 1:
                        storeOtp = _a.sent();
                        sendOtp = this.sendGridService.sendOtp(email, otpValue, type);
                        return [2 /*return*/];
                }
            });
        });
    };
    //-----------------------------------------------------------------------------------------------------------------------//
    //resned otp
    OtpService.prototype.resndOtp = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var checkEmail, sendOtp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findOneByEmail(data.email)];
                    case 1:
                        checkEmail = _a.sent();
                        if (!checkEmail) {
                            throw new common_1.NotFoundException('The Email Is Not Found');
                        }
                        return [4 /*yield*/, this.storeAndSend(checkEmail.id, data.email, data.typeOtp)];
                    case 2:
                        sendOtp = _a.sent();
                        return [2 /*return*/, {
                                message: 'OTP Send Successfully'
                            }];
                }
            });
        });
    };
    //-----------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------//
    // check otp
    OtpService.prototype.checkOtp = function (otpData) {
        return __awaiter(this, void 0, Promise, function () {
            var checkEmail, isOtpValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findOneByEmail(otpData.email)];
                    case 1:
                        checkEmail = _a.sent();
                        if (!checkEmail) {
                            throw new common_1.NotFoundException('The Email Is Not Found');
                        }
                        return [4 /*yield*/, this.validateAndUseOtp(checkEmail.id, otpData.otp, otpData.typeOtp)];
                    case 2:
                        isOtpValid = _a.sent();
                        if (!isOtpValid) {
                            throw new common_1.NotFoundException('The OTP is invalid or has expired');
                        }
                        if (!(otpData.typeOtp == typeOtp_snum_1.TypeOtp.REGISTER)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.verfiedEmail(otpData.email)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                message: 'The Email Is verfiedEmail '
                            }];
                    case 4: return [2 /*return*/, {
                            message: 'the otp is success'
                        }];
                }
            });
        });
    };
    //-------------------------------------HELPER----------------------------------------------------------------------------//
    OtpService.prototype.validateAndUseOtp = function (id, otp, type) {
        return __awaiter(this, void 0, Promise, function () {
            var currentTime, checkOtp, updateOtp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentTime = new Date();
                        return [4 /*yield*/, this.otpRepo.findOne({
                                // get last otp flase
                                where: {
                                    user_id: id,
                                    expires_at: typeorm_2.MoreThan(currentTime),
                                    type: type
                                },
                                order: { created_at: 'DESC' }
                            })];
                    case 1:
                        checkOtp = _a.sent();
                        if (!(checkOtp && checkOtp.otp == otp && checkOtp.is_used != true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.otpRepo.update(checkOtp.id, {
                                is_used: true
                            })];
                    case 2:
                        updateOtp = _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    OtpService.prototype.verfiedEmail = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.verfiedEmail(email)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // to check last otp from same type
    OtpService.prototype.checkLastVerfied = function (userId, type) {
        return __awaiter(this, void 0, Promise, function () {
            var checkLastVerfed, expiresAt, currentTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.otpRepo.findOne({
                            where: { user_id: userId, type: type },
                            order: { created_at: 'DESC' }
                        })];
                    case 1:
                        checkLastVerfed = _a.sent();
                        if (!checkLastVerfed) {
                            return [2 /*return*/, false];
                        }
                        expiresAt = new Date(checkLastVerfed.expires_at);
                        expiresAt.setMinutes(expiresAt.getMinutes() + 3);
                        currentTime = new Date();
                        if (checkLastVerfed.is_used === true && currentTime <= expiresAt) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    OtpService.prototype.resndOtpForChangePassword = function (data, user) {
        return __awaiter(this, void 0, Promise, function () {
            var checkEmail, sendOtp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findOneByEmail(data.email)];
                    case 1:
                        checkEmail = _a.sent();
                        if (checkEmail) {
                            throw new common_1.NotFoundException('The Email Is Already Exit ');
                        }
                        return [4 /*yield*/, this.storeAndSend(user.userId, data.email, data.typeOtp)];
                    case 2:
                        sendOtp = _a.sent();
                        return [2 /*return*/, {
                                message: 'OTP Send Successfully'
                            }];
                }
            });
        });
    };
    OtpService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(otp_entity_1.Otp)),
        __param(2, common_1.Inject(common_1.forwardRef(function () { return user_service_1.UserService; })))
    ], OtpService);
    return OtpService;
}());
exports.OtpService = OtpService;
