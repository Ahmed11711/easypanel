"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var message_1 = require("src/common/MessageNotfication/message");
var notifaction_enum_1 = require("src/modules/notfication/enum/notifaction.enum");
var deviceStatus_enum_1 = require("src/modules/device-access/enum/deviceStatus.enum");
var mangerAccount_enum_1 = require("src/modules/device-access/enum/mangerAccount.enum");
var typeOtp_snum_1 = require("src/modules/otp/enum/typeOtp.snum");
var status_enum_1 = require("src/modules/user/enum/status.enum");
var AuthService = /** @class */ (function () {
    function AuthService(userService, jwtService, deviceService, notficationService, sendGridService, hashService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.deviceService = deviceService;
        this.notficationService = notficationService;
        this.sendGridService = sendGridService;
        this.hashService = hashService;
    }
    AuthService.prototype.validatedUser = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, password_1, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userService.findOneByEmail(email)];
                    case 1:
                        user = _b.sent();
                        console.log(password);
                        _a = user;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            password_1 = user.password, result = __rest(user, ["password"]);
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    AuthService.prototype.login = function (userLoginDto) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var user, payload_1, accessToken_1, refreshToken_1, checkDevice, payload, accessToken, refreshToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.validatedUser(userLoginDto.email, userLoginDto.password)];
                    case 1:
                        user = _b.sent();
                        console.log(user);
                        if (!user) {
                            throw new common_1.UnauthorizedException('Invalid email or password');
                        }
                        // check Verfided Email
                        if (user.email_verified_at == null) {
                            throw new common_1.ForbiddenException('Your email is not verified. Please verify your email to proceed.');
                        }
                        if (user.status == status_enum_1.StatusUser.DEOVLPER) {
                            payload_1 = {
                                userId: user.id,
                                email: user.email,
                                MangerStatus: mangerAccount_enum_1.MangerStatus.MANGER
                            };
                            accessToken_1 = this.jwtService.sign(payload_1, {
                                expiresIn: '1500m'
                            });
                            refreshToken_1 = this.jwtService.sign(payload_1, {
                                expiresIn: '7d'
                            });
                            return [2 /*return*/, {
                                    accessToken: accessToken_1,
                                    refreshToken: refreshToken_1
                                }];
                        }
                        return [4 /*yield*/, this.checkStatusDevice(user, userLoginDto)];
                    case 2:
                        checkDevice = _b.sent();
                        // console.log(checkDevice);
                        if (checkDevice.success == false) {
                            return [2 /*return*/, {
                                    hash: checkDevice.hash
                                }];
                        }
                        payload = {
                            userId: user.id,
                            email: user.email,
                            MangerStatus: (_a = checkDevice.MangerStatus) !== null && _a !== void 0 ? _a : 'guest'
                        };
                        accessToken = this.jwtService.sign(payload, {
                            expiresIn: '1500m'
                        });
                        refreshToken = this.jwtService.sign(payload, {
                            expiresIn: '7d'
                        });
                        return [2 /*return*/, {
                                accessToken: accessToken,
                                refreshToken: refreshToken
                            }];
                }
            });
        });
    };
    AuthService.prototype.refreshToken = function (refreshToken) {
        return __awaiter(this, void 0, Promise, function () {
            var checkTokenRefresh, user, payload, newAccessToken, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        checkTokenRefresh = this.jwtService.verify(refreshToken);
                        if (!checkTokenRefresh) {
                            throw new common_1.ConflictException('Invalid refresh token');
                        }
                        return [4 /*yield*/, this.userService.findByIdVulnerable(checkTokenRefresh.userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.ConflictException('The user is not found');
                        }
                        payload = {
                            userId: user.id,
                            email: user.email
                        };
                        newAccessToken = this.jwtService.sign(payload, {
                            expiresIn: '60m'
                        });
                        // Return the new access token
                        return [2 /*return*/, { accessToken: newAccessToken }];
                    case 2:
                        error_1 = _a.sent();
                        // Handle specific JWT errors
                        if (error_1.name === 'JsonWebTokenError') {
                            throw new common_1.ConflictException('Refresh token has expired OR Wrong Token');
                        }
                        else if (error_1.name === 'TokenExpiredError') {
                            throw new common_1.ConflictException('The refresh token is expired. Please log in again');
                        }
                        // Handle other unexpected errors
                        throw new common_1.ConflictException('Could not refresh token:');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.checkStatusDevice = function (user, userLoginDto) {
        return __awaiter(this, void 0, Promise, function () {
            var checkStatusDevice, hashCode, handleDeviceStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deviceService.checkIpDevice(user.id, userLoginDto.ip_device)];
                    case 1:
                        checkStatusDevice = _a.sent();
                        if (!!checkStatusDevice) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.handleUnusualLoginAttempt(user, userLoginDto)];
                    case 2:
                        hashCode = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                hash: hashCode
                            }];
                    case 3: return [4 /*yield*/, this.handleDeviceStatus(checkStatusDevice)];
                    case 4:
                        handleDeviceStatus = _a.sent();
                        return [2 /*return*/, {
                                success: handleDeviceStatus.success,
                                hash: handleDeviceStatus.hash,
                                MangerStatus: handleDeviceStatus.MangerStatus
                            }];
                }
            });
        });
    };
    // handel device IF found
    AuthService.prototype.handleUnusualLoginAttempt = function (user, userLoginDto) {
        return __awaiter(this, void 0, Promise, function () {
            var textMessageForMail, textMessageForNotification, newDevice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        textMessageForMail = message_1.LOGIN_MESSAGES.UNUSUAL_LOGIN_ATTEMPT_MAIL(userLoginDto.device_name);
                        textMessageForNotification = message_1.LOGIN_MESSAGES.UNUSUAL_LOGIN_ATTEMPT_NOTFICATION(userLoginDto.device_name);
                        return [4 /*yield*/, this.notficationService.storeNewNotification(user.id, textMessageForNotification, notifaction_enum_1.NotficationType.login)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.deviceService.storeNewDevice(user.id, userLoginDto.ip_device, userLoginDto.device_name, deviceStatus_enum_1.DeviceStatus.PENDING, userLoginDto.location, mangerAccount_enum_1.MangerStatus.GUEST)];
                    case 2:
                        newDevice = _a.sent();
                        this.sendGridService.sendOtp(user.email, textMessageForMail, typeOtp_snum_1.TypeOtp.SECURE);
                        return [2 /*return*/, newDevice.transaction_id];
                }
            });
        });
    };
    // handel device IF found
    AuthService.prototype.handleDeviceStatus = function (device) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                if (device.active === deviceStatus_enum_1.DeviceStatus.PENDING) {
                    return [2 /*return*/, {
                            success: false,
                            hash: device.transaction_id
                        }];
                }
                if (device.active === deviceStatus_enum_1.DeviceStatus.BLOCK) {
                    throw new common_1.ConflictException('The transaction for thie device is BLOCK');
                }
                if (device.active === deviceStatus_enum_1.DeviceStatus.ACTIVE) {
                    return [2 /*return*/, {
                            success: true,
                            hash: '',
                            MangerStatus: device.MangerStatus
                        }];
                }
                throw new common_1.NotFoundException('Device status not recognized');
            });
        });
    };
    AuthService = __decorate([
        common_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
