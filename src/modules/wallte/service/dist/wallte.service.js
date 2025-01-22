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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.WalletService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var wallet_entity_1 = require("../entity/wallet.entity");
var buyWallet_entity_1 = require("../entity/buyWallet.entity");
var profitWallte_entity_1 = require("../entity/profitWallte.entity");
var generateCode_1 = require("src/common/generateRandomCode/generateCode");
var axios_1 = require("axios");
var WalletService = /** @class */ (function () {
    function WalletService(wallteRepo, buyWallteRepositry, profitWallteRepositry, userService, pdfService, shareService, contractService, affiliateService, dataSource) {
        this.wallteRepo = wallteRepo;
        this.buyWallteRepositry = buyWallteRepositry;
        this.profitWallteRepositry = profitWallteRepositry;
        this.userService = userService;
        this.pdfService = pdfService;
        this.shareService = shareService;
        this.contractService = contractService;
        this.affiliateService = affiliateService;
        this.dataSource = dataSource;
    }
    WalletService.prototype.getWallte = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var wallets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.wallteRepo.find({
                            where: { type: data.type },
                            relations: ['project']
                        })];
                    case 1:
                        wallets = _a.sent();
                        return [2 /*return*/, wallets];
                }
            });
        });
    };
    WalletService.prototype.recommendedWallte = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wallets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.wallteRepo.find({
                            relations: ['project'],
                            order: { id: 'DESC' },
                            take: 3
                        })];
                    case 1:
                        wallets = _a.sent();
                        return [2 /*return*/, wallets];
                }
            });
        });
    };
    WalletService.prototype.hsitoryWallte = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, shares, updatedShares, combinedResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.buyWallteRepositry.find({
                            where: { user_id: user.userId },
                            relations: ['wallte']
                        })];
                    case 1:
                        wallet = _a.sent();
                        return [4 /*yield*/, this.shareService.hsitoryShare(user)];
                    case 2:
                        shares = _a.sent();
                        updatedShares = shares.map(function (share) { return (__assign(__assign({}, share), { type: 'stock' })); });
                        combinedResults = __spreadArrays(wallet, updatedShares);
                        // Return the combined result
                        return [2 /*return*/, combinedResults];
                }
            });
        });
    };
    WalletService.prototype.profitHistory = function (userId, id) {
        return __awaiter(this, void 0, void 0, function () {
            var wallets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.buyWallteRepositry.find({
                            where: { user_id: userId, id: id },
                            relations: ['wallte.devolper', 'myProfit', 'contracts']
                        })];
                    case 1:
                        wallets = _a.sent();
                        return [2 /*return*/, wallets];
                }
            });
        });
    };
    WalletService.prototype.investment = function (data, user) {
        return __awaiter(this, void 0, void 0, function () {
            var id, totalCost, numberUnitBuy, wallet, userForBuy, queryRunner, createhistory, createPdf, updateMoney, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = data.idWallet;
                        totalCost = data.amount;
                        numberUnitBuy = 1;
                        return [4 /*yield*/, this.wallteRepo.findOneBy({ id: id })];
                    case 1:
                        wallet = _a.sent();
                        if (!wallet) {
                            throw new common_1.ConflictException("Wallet with ID " + id + " not found");
                        }
                        // Check if the wallet has enough units
                        // const availableUnite = Number(numberUnitBuy) + Number(wallet.sold);  // ++
                        // Check if available units are sufficient
                        // if (wallet.number_of_unit < availableUnite) {   // ++
                        //   throw new ConflictException(`Wallet  does not have sufficient units`);
                        // }
                        // Check if the wallet has expired
                        if (new Date(wallet.expire_date) < new Date()) {
                            throw new common_1.ConflictException("Wallet with ID " + id + " has expired");
                        }
                        return [4 /*yield*/, this.userService.getUserById(user.userId)];
                    case 2:
                        userForBuy = _a.sent();
                        if (!userForBuy) {
                            throw new common_1.ConflictException("The user with ID " + user.email + " was not found.");
                        }
                        // const totalCost = numberUnitBuy * wallet.price;
                        if (userForBuy.money < totalCost) {
                            throw new common_1.ConflictException("User with ID " + user.email + " does not have sufficient funds. Required: " + totalCost + ", Available: " + userForBuy.money);
                        }
                        queryRunner = this.dataSource.createQueryRunner();
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 9, 11, 13]);
                        return [4 /*yield*/, this.createBufferUser(user.userId, wallet.id, totalCost, numberUnitBuy, wallet.peryears, wallet.type, wallet.profitDistributed, queryRunner)];
                    case 5:
                        createhistory = _a.sent();
                        return [4 /*yield*/, this.createPdf(user.userId, createhistory.id, queryRunner)];
                    case 6:
                        createPdf = _a.sent();
                        return [4 /*yield*/, this.updateMoney(user, totalCost, queryRunner)];
                    case 7:
                        updateMoney = _a.sent();
                        // 5- create new Affiliate
                        // const checkAffiliate = await this.createAffiliateHistory(user.userId, userForBuy.comming_afflite, numberUnitBuy, totalCost, wallet.id, queryRunner); // ++
                        // Commit transaction if all operations are successful
                        return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 8:
                        // 5- create new Affiliate
                        // const checkAffiliate = await this.createAffiliateHistory(user.userId, userForBuy.comming_afflite, numberUnitBuy, totalCost, wallet.id, queryRunner); // ++
                        // Commit transaction if all operations are successful
                        _a.sent();
                        return [2 /*return*/, { message: 'Investment successful' }];
                    case 9:
                        error_1 = _a.sent();
                        // If any error occurs, rollback the transaction
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 10:
                        // If any error occurs, rollback the transaction
                        _a.sent();
                        throw error_1; // Re-throw the error after rollback
                    case 11: 
                    // Release the query runner
                    return [4 /*yield*/, queryRunner.release()];
                    case 12:
                        // Release the query runner
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    WalletService.prototype.createBufferUser = function (userId, bufferId, totalCost, numberUnitBuy, peryears, type, profit, queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var currentDate, endDate, create;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentDate = new Date();
                        endDate = new Date();
                        endDate.setDate(currentDate.getDate() + peryears);
                        create = this.buyWallteRepositry.create({
                            user_id: userId,
                            buffer_id: bufferId,
                            start_subscrip: currentDate,
                            end_subscrip: endDate,
                            amount: totalCost,
                            num_unite: numberUnitBuy,
                            active: true,
                            peryears: peryears,
                            HashID: generateCode_1.generateRandomAlphanumeric(25),
                            type: type,
                            profit: profit
                        });
                        return [4 /*yield*/, queryRunner.manager.save(create)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    WalletService.prototype.createPdf = function (userId, bufferId, queryRunner) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response, pathUrl, HashID;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get('https://invest-dashboard-api.smartidea.tech/api/create-contract')];
                    case 1:
                        response = _b.sent();
                        pathUrl = (_a = response.data.file_url) !== null && _a !== void 0 ? _a : null;
                        HashID = generateCode_1.generateRandomAlphanumeric(15);
                        return [4 /*yield*/, this.contractService.createContract(userId, bufferId, pathUrl, HashID, queryRunner)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WalletService.prototype.updateWallet = function (wallet, numberUnitBuy, queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var totalSold, save;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        totalSold = Number(wallet.sold) + Number(numberUnitBuy);
                        // Update the sold field with the new total value
                        wallet.sold = totalSold;
                        if (totalSold >= wallet.number_of_unit) {
                            wallet.active = false;
                        }
                        return [4 /*yield*/, queryRunner.manager.save(wallet)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.wallteRepo.save(wallet)];
                    case 2:
                        save = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WalletService.prototype.updateMoney = function (user, totalCost, queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var totelCost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.checkmyMoneyWithUpdateForBuy(user, totalCost, queryRunner)];
                    case 1:
                        totelCost = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WalletService.prototype.createAffiliateHistory = function (userId, commingAfflite, numberUnitBuy, totalCost, walletId, queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var firstUpline, gen1, secoundUpline, gen2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.getUserByAffiliate(commingAfflite)];
                    case 1:
                        firstUpline = _a.sent();
                        if (!firstUpline) {
                            return [2 /*return*/, true];
                        }
                        gen1 = 1;
                        return [4 /*yield*/, this.affiliateService.handelAffiliate(userId, firstUpline.id, numberUnitBuy, totalCost, walletId, 1, queryRunner)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.addReward(gen1, firstUpline.id, 250, queryRunner)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.userService.getUserByAffiliate(firstUpline.comming_afflite)];
                    case 4:
                        secoundUpline = _a.sent();
                        if (!secoundUpline) {
                            return [2 /*return*/, true];
                        }
                        gen2 = 2;
                        return [4 /*yield*/, this.affiliateService.handelAffiliate(userId, secoundUpline.id, numberUnitBuy, totalCost, walletId, 2, queryRunner)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.addReward(gen2, secoundUpline.id, 150, queryRunner)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WalletService.prototype.addReward = function (gen, uplineId, amount, queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var reward;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.affiliateService.getAllRewardByGen(gen)];
                    case 1:
                        reward = _a.sent();
                        return [4 /*yield*/, this.userService.addMoneyReward(uplineId, amount, queryRunner)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WalletService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(wallet_entity_1.Wallet)),
        __param(1, typeorm_1.InjectRepository(buyWallet_entity_1.BuyWallet)),
        __param(2, typeorm_1.InjectRepository(profitWallte_entity_1.ProfitWallte))
    ], WalletService);
    return WalletService;
}());
exports.WalletService = WalletService;
