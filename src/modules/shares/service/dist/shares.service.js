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
exports.ShareService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var share_entity_1 = require("../entity/share.entity");
var shareUser_entity_1 = require("../entity/shareUser.entity");
var generateCode_1 = require("src/common/generateRandomCode/generateCode");
var share_enum_1 = require("../enum/share.enum");
var ShareService = /** @class */ (function () {
    function ShareService(SharesRepository, ShareUserRepository, userService, dataSource) {
        this.SharesRepository = SharesRepository;
        this.ShareUserRepository = ShareUserRepository;
        this.userService = userService;
        this.dataSource = dataSource;
    }
    ShareService.prototype.hsitoryShare = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ShareUserRepository.find({
                            where: { user_id: user.userId },
                            relations: ['share']
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // get all shares
    ShareService.prototype.getAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.SharesRepository.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ShareService.prototype.investment = function (data, user) {
        return __awaiter(this, void 0, void 0, function () {
            var shareId, numberUnitBuy, share, userForBuy, queryRunner, totalCost, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shareId = data.idWallet;
                        numberUnitBuy = data.numberUnit;
                        return [4 /*yield*/, this.validateShare(shareId, numberUnitBuy)];
                    case 1:
                        share = _a.sent();
                        return [4 /*yield*/, this.validateUser(user.userId, user.email)];
                    case 2:
                        userForBuy = _a.sent();
                        queryRunner = this.dataSource.createQueryRunner();
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 10, 12, 14]);
                        totalCost = numberUnitBuy * share.price;
                        return [4 /*yield*/, this.validateUserFunds(userForBuy.money, totalCost, user.email)];
                    case 5:
                        _a.sent();
                        // create UserInvest
                        return [4 /*yield*/, this.createInvestmentHistory(user.userId, share, totalCost, numberUnitBuy, queryRunner)];
                    case 6:
                        // create UserInvest
                        _a.sent();
                        // updated share
                        return [4 /*yield*/, this.updateShareData(share, numberUnitBuy, queryRunner)];
                    case 7:
                        // updated share
                        _a.sent();
                        //  update money for user
                        return [4 /*yield*/, this.updateUserFunds(user, totalCost, queryRunner)];
                    case 8:
                        //  update money for user
                        _a.sent();
                        return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, {
                                message: 'Investment successful'
                            }];
                    case 10:
                        error_1 = _a.sent();
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 11:
                        _a.sent();
                        throw error_1;
                    case 12: return [4 /*yield*/, queryRunner.release()];
                    case 13:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // check validateShare
    ShareService.prototype.validateShare = function (id, numberUnitBuy) {
        return __awaiter(this, void 0, Promise, function () {
            var share, availableUnits;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.SharesRepository.findOneBy({ id: id })];
                    case 1:
                        share = _a.sent();
                        if (!share) {
                            throw new common_1.ConflictException("Share with ID " + id + " was not found.");
                        }
                        availableUnits = Number(numberUnitBuy) + Number(share.sold);
                        if (share.availableShare < availableUnits) {
                            throw new common_1.ConflictException("Share with " + share.name + " does not have sufficient units");
                        }
                        if (new Date(share.expireDate) <= new Date()) {
                            throw new common_1.ConflictException("Share with ID " + id + " has expired.");
                        }
                        return [2 /*return*/, share];
                }
            });
        });
    };
    // check validateUser
    ShareService.prototype.validateUser = function (userId, email) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.getUserById(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.ConflictException("The user with email " + email + " was not found.");
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    // check validateUserFunds
    ShareService.prototype.validateUserFunds = function (availableFunds, totalCost, email) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                if (availableFunds < totalCost) {
                    throw new common_1.ConflictException("User with email " + email + " does not have sufficient funds. Required: " + totalCost + ", Available: " + availableFunds);
                }
                return [2 /*return*/];
            });
        });
    };
    // create new investment
    ShareService.prototype.createInvestmentHistory = function (userId, share, totalCost, numberUnitBuy, queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var currentDate, history;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentDate = new Date();
                        history = this.ShareUserRepository.create({
                            user_id: userId,
                            share_id: share.id,
                            start_subscrip: currentDate,
                            end_subscrip: null,
                            amount: totalCost,
                            num_unite: numberUnitBuy,
                            status: true,
                            HashID: generateCode_1.generateRandomAlphanumeric(25),
                            profit: share.profit
                        });
                        return [4 /*yield*/, queryRunner.manager.save(history)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // create new update share
    ShareService.prototype.updateShareData = function (share, numberUnitBuy, queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var totalSold;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        totalSold = Number(share.sold) + Number(numberUnitBuy);
                        share.sold = totalSold;
                        if (totalSold >= share.availableShare) {
                            share.status = share_enum_1.TypeStatusShare.COMPLETED;
                        }
                        return [4 /*yield*/, queryRunner.manager.save(share)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // create new update user
    ShareService.prototype.updateUserFunds = function (user, totalCost, queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.UpdateMoneyForBuy(user, totalCost, queryRunner)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShareService.prototype.profitHistory = function (userId, id) {
        return __awaiter(this, void 0, void 0, function () {
            var wallets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ShareUserRepository.find({
                            where: { user_id: userId, id: id },
                            relations: ['profitShare', 'share']
                        })];
                    case 1:
                        wallets = _a.sent();
                        return [2 /*return*/, wallets];
                }
            });
        });
    };
    ShareService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(share_entity_1.Share)),
        __param(1, typeorm_1.InjectRepository(shareUser_entity_1.ShareUser))
    ], ShareService);
    return ShareService;
}());
exports.ShareService = ShareService;
