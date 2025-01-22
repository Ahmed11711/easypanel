"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var user_entity_1 = require("../entity/user.entity");
var typeorm_1 = require("@nestjs/typeorm");
var bcrypt = require("bcrypt");
var generateCode_1 = require("src/common/generateRandomCode/generateCode");
var otp_service_1 = require("src/modules/otp/service/otp.service");
var deviceStatus_enum_1 = require("src/modules/device-access/enum/deviceStatus.enum");
var mangerAccount_enum_1 = require("../../device-access/enum/mangerAccount.enum");
var typeOtp_snum_1 = require("src/modules/otp/enum/typeOtp.snum");
var UserService = /** @class */ (function () {
    function UserService(userRepo, otpRepo, deviceService, notficatiosService, hashService, fileService) {
        this.userRepo = userRepo;
        this.otpRepo = otpRepo;
        this.deviceService = deviceService;
        this.notficatiosService = notficatiosService;
        this.hashService = hashService;
        this.fileService = fileService;
    }
    UserService.prototype.create = function (userData) {
        return __awaiter(this, void 0, Promise, function () {
            var emailExists, comming_afflite, affiliate_code, hashedPassword, newUser, savedUser, sendOtp, device;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isEmailExists(userData.email)];
                    case 1:
                        emailExists = _a.sent();
                        if (emailExists) {
                            throw new common_1.NotFoundException('Email already Exists');
                        }
                        return [4 /*yield*/, this.checkCommingAfflite(userData.comming_afflite)];
                    case 2:
                        comming_afflite = _a.sent();
                        return [4 /*yield*/, this.createAffliteCode()];
                    case 3:
                        affiliate_code = _a.sent();
                        return [4 /*yield*/, this.hashPassword(userData.password)];
                    case 4:
                        hashedPassword = _a.sent();
                        newUser = this.userRepo.create(__assign(__assign({}, userData), { affiliate_code: affiliate_code, comming_afflite: comming_afflite, password: hashedPassword }));
                        return [4 /*yield*/, this.userRepo.save(newUser)];
                    case 5:
                        savedUser = _a.sent();
                        return [4 /*yield*/, this.otpRepo.storeAndSend(savedUser.id, savedUser.email, typeOtp_snum_1.TypeOtp.REGISTER)];
                    case 6:
                        sendOtp = _a.sent();
                        device = this.deviceService.storeNewDevice(savedUser.id, userData.ipDevice, userData.deviceName, deviceStatus_enum_1.DeviceStatus.ACTIVE, userData.location, mangerAccount_enum_1.MangerStatus.MANGER);
                        return [2 /*return*/, {
                                message: 'Registration successful. Please check your OTP'
                            }];
                }
            });
        });
    };
    UserService.prototype.findOneByEmail = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOneBy({ email: email })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.me = function (id, MangerStatus) {
        return __awaiter(this, void 0, Promise, function () {
            var user, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({
                            where: { id: id },
                            relations: ['userKyc', 'pinCode'],
                            select: {
                                userKyc: {
                                    active: true
                                },
                                pinCode: {
                                    active: true
                                }
                            }
                        })];
                    case 1:
                        user = _c.sent();
                        if (!user) return [3 /*break*/, 3];
                        _a = user;
                        _b = {};
                        return [4 /*yield*/, this.notficatiosService.countSeenNotfication(id)];
                    case 2:
                        _a.notificationsCount = (_b.count = _c.sent(),
                            _b);
                        user.isManger = {
                            status: MangerStatus
                        };
                        _c.label = 3;
                    case 3: 
                    // for add StatusDevice
                    return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.verfiedEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, updatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOneByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException('The Email Is Not Found');
                        }
                        return [4 /*yield*/, this.userRepo.update(user.id, {
                                verified: 1,
                                email_verified_at: Date(),
                                otp: null
                            })];
                    case 2:
                        updatedUser = _a.sent();
                        return [2 /*return*/, {
                                messgae: 'Otp successful! Please login'
                            }];
                }
            });
        });
    };
    UserService.prototype.deleteAacount = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userexit, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findByIdVulnerable(user.userId)];
                    case 1:
                        userexit = _a.sent();
                        if (!userexit) {
                            throw new common_1.NotFoundException('The User Not Founnd');
                        }
                        return [4 /*yield*/, this.userRepo.update(user.userId, {
                                deleted_at: Date(),
                                email: user.email + "1"
                            })];
                    case 2:
                        update = _a.sent();
                        return [2 /*return*/, {
                                message: 'The User Is Deleted'
                            }];
                }
            });
        });
    };
    ///////////////////////////////////////FRO HELPER////////////////////////////////////////////////////////////////////////
    // to check if the email already exists in the database
    UserService.prototype.isEmailExists = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({ where: { email: email } })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, !!user];
                }
            });
        });
    };
    // to get  the id if already exists in the database
    UserService.prototype.findByIdVulnerable = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({ where: { id: id } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // to create afflite code unique
    UserService.prototype.createAffliteCode = function () {
        return __awaiter(this, void 0, Promise, function () {
            var affliteCode, checkFoundAffliteCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3 /*break*/, 2];
                        affliteCode = generateCode_1.generateRandomAlphanumeric(8);
                        return [4 /*yield*/, this.userRepo.findOneBy({
                                affiliate_code: affliteCode
                            })];
                    case 1:
                        checkFoundAffliteCode = _a.sent();
                        if (!checkFoundAffliteCode) {
                            return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/, affliteCode];
                }
            });
        });
    };
    // to check  commingAfflite exists in the datbase
    UserService.prototype.checkCommingAfflite = function (incomingAffiliateCode) {
        return __awaiter(this, void 0, Promise, function () {
            var foundAfflite;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!incomingAffiliateCode) {
                            return [2 /*return*/, (incomingAffiliateCode = 'ahmed')];
                        }
                        return [4 /*yield*/, this.userRepo.findOne({
                                where: { affiliate_code: incomingAffiliateCode }
                            })];
                    case 1:
                        foundAfflite = _a.sent();
                        if (!foundAfflite) {
                            throw new common_1.NotFoundException('The selected comming afflite is invalid');
                        }
                        return [4 /*yield*/, this.userRepo.increment({ affiliate_code: incomingAffiliateCode }, 'number_of_user', 1)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, incomingAffiliateCode];
                }
            });
        });
    };
    // to Hash Password
    UserService.prototype.hashPassword = function (password) {
        return __awaiter(this, void 0, Promise, function () {
            var salt, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.genSalt(10)];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(password, salt)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [2 /*return*/, hashedPassword];
                }
            });
        });
    };
    // change Password
    UserService.prototype.changePassword = function (data, user) {
        return __awaiter(this, void 0, Promise, function () {
            var checkEmail, checkVefiedOtp, checkOldPassword, chengePassword, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.findOneByEmail(user.email)];
                    case 1:
                        checkEmail = _e.sent();
                        if (!checkEmail) {
                            throw new common_1.ConflictException('The Email Is Not Found');
                        }
                        return [4 /*yield*/, this.otpRepo.checkLastVerfied(checkEmail.id, typeOtp_snum_1.TypeOtp.CHANGEPASSWORD)];
                    case 2:
                        checkVefiedOtp = _e.sent();
                        if (!checkVefiedOtp) {
                            throw new common_1.BadRequestException('Invalid or expired OTP. Please enter a valid OTP or request a new one.');
                        }
                        return [4 /*yield*/, this.hashService.verifyText(data.oldPassword, checkEmail.password)];
                    case 3:
                        checkOldPassword = _e.sent();
                        if (!checkOldPassword) {
                            throw new common_1.ConflictException('Old password is incorrect');
                        }
                        _b = (_a = this.userRepo).update;
                        _c = [checkEmail.id];
                        _d = {};
                        return [4 /*yield*/, this.hashPassword(data.Password)];
                    case 4: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.password = _e.sent(),
                                _d)]))];
                    case 5:
                        chengePassword = _e.sent();
                        return [2 /*return*/, {
                                message: 'Operation updated successfully'
                            }];
                }
            });
        });
    };
    UserService.prototype.forgetPassword = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, isManger, checkVefiedOtp, chengePassword, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.findOneByEmail(data.email)];
                    case 1:
                        checkEmail = _e.sent();
                        if (!checkEmail) {
                            throw new common_1.ConflictException('The Email Is Not Found');
                        }
                        return [4 /*yield*/, this.deviceService.checkIsManger(data.ipDevice, data.deviceName, checkEmail.id)];
                    case 2:
                        isManger = _e.sent();
                        if (!isManger) {
                            throw new common_1.ForbiddenException('Only the primary account holder is authorized to make this modification.');
                        }
                        return [4 /*yield*/, this.otpRepo.checkLastVerfied(checkEmail.id, typeOtp_snum_1.TypeOtp.FORGETPASSWORD)];
                    case 3:
                        checkVefiedOtp = _e.sent();
                        if (!checkVefiedOtp) {
                            throw new common_1.BadRequestException('Please Insert FRist Otp or resend Code');
                        }
                        _b = (_a = this.userRepo).update;
                        _c = [checkEmail.id];
                        _d = {};
                        return [4 /*yield*/, this.hashPassword(data.password)];
                    case 4: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.password = _e.sent(),
                                _d)]))];
                    case 5:
                        chengePassword = _e.sent();
                        return [2 /*return*/, {
                                message: 'Operation updated successfully'
                            }];
                }
            });
        });
    };
    UserService.prototype.addMoney = function (userId, amount) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findByIdVulnerable(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userRepo.update(user.id, {
                                money: user.money + amount
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    // change Email
    UserService.prototype.changeEmail = function (data, user) {
        return __awaiter(this, void 0, Promise, function () {
            var checkEmail, checkVefiedOtp, chengeEmail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOneByEmail(data.email)];
                    case 1:
                        checkEmail = _a.sent();
                        if (checkEmail) {
                            throw new common_1.ConflictException('The Email Is Aready Found');
                        }
                        return [4 /*yield*/, this.otpRepo.checkLastVerfied(user.userId, typeOtp_snum_1.TypeOtp.CHANGEEMAIL)];
                    case 2:
                        checkVefiedOtp = _a.sent();
                        if (!checkVefiedOtp) {
                            throw new common_1.BadRequestException('Invalid or expired OTP. Please enter a valid OTP or request a new one.');
                        }
                        return [4 /*yield*/, this.userRepo.update(user.userId, {
                                email: data.email
                            })];
                    case 3:
                        chengeEmail = _a.sent();
                        return [2 /*return*/, {
                                message: 'Operation updated successfully'
                            }];
                }
            });
        });
    };
    UserService.prototype.changeProfile = function (data, user, file) {
        return __awaiter(this, void 0, Promise, function () {
            var checkEmail, updatedData, uploadedFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOneByEmail(user.email)];
                    case 1:
                        checkEmail = _a.sent();
                        if (!checkEmail) {
                            throw new common_1.ConflictException('The Email Is Not Found');
                        }
                        updatedData = __assign({}, data);
                        if (!file) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fileService.uploadFile(file, 'profile_images')];
                    case 2:
                        uploadedFile = _a.sent();
                        updatedData.img = uploadedFile;
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.userRepo.update(checkEmail.id, updatedData)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, {
                                message: 'Profile updated successfully'
                            }];
                }
            });
        });
    };
    UserService.prototype.checkmyMoneyWithUpdate = function (user, amount) {
        return __awaiter(this, void 0, Promise, function () {
            var myUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findByIdVulnerable(user.userId)];
                    case 1:
                        myUser = _a.sent();
                        if (!myUser) {
                            throw new common_1.ConflictException('The Email Is Not Found');
                        }
                        if (!(myUser.money >= amount)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userRepo.update({ id: user.userId }, // Criteria to find the user
                            { money: myUser.money - amount })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    UserService.prototype.checkmyMoneyWithUpdateForBuy = function (user, amount, queryRunner) {
        return __awaiter(this, void 0, Promise, function () {
            var myUser, updateResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findByIdVulnerable(user.userId)];
                    case 1:
                        myUser = _a.sent();
                        if (!myUser) {
                            throw new common_1.ConflictException('The Email Is Not Found');
                        }
                        if (!(myUser.money >= amount)) return [3 /*break*/, 3];
                        return [4 /*yield*/, queryRunner.manager.update('User', { id: user.userId }, { money: myUser.money - amount })];
                    case 2:
                        updateResult = _a.sent();
                        if (updateResult.affected > 0) {
                            return [2 /*return*/, true];
                        }
                        else {
                            throw new common_1.ConflictException('Failed to update user money');
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    UserService.prototype.getUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({
                            where: { id: userId }
                        })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.getUserByAffiliate = function (commingAfflite) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({
                            where: { affiliate_code: commingAfflite }
                        })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    // for update mu money with out check with transaction
    UserService.prototype.UpdateMoneyForBuy = function (user, amount, queryRunner) {
        return __awaiter(this, void 0, Promise, function () {
            var myUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findByIdVulnerable(user.userId)];
                    case 1:
                        myUser = _a.sent();
                        if (!myUser) {
                            throw new common_1.ConflictException('The Email Is Not Found');
                        }
                        if (!(myUser.money >= amount)) return [3 /*break*/, 3];
                        return [4 /*yield*/, queryRunner.manager.update('User', { id: user.userId }, { money: myUser.money - amount })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.addMoneyReward = function (userId, amount, queryRunner) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findByIdVulnerable(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, queryRunner.manager.update('User', { id: user.id }, { number_points: user.number_points + amount })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    UserService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
        __param(1, common_1.Inject(common_1.forwardRef(function () { return otp_service_1.OtpService; })))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
