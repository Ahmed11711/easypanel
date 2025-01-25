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
exports.WithDrawService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var withdraw_entity_1 = require("../entity/withdraw.entity");
var generateCode_1 = require("src/common/generateRandomCode/generateCode");
var withdraw_enum_1 = require("../enum/withdraw.enum");
var notifaction_enum_1 = require("src/modules/notfication/enum/notifaction.enum");
var typeWithdraw_enum_1 = require("../enum/typeWithdraw.enum");
var withdrawByBanks_entity_1 = require("../entity/withdrawByBanks.entity");
var WithDrawService = /** @class */ (function () {
    function WithDrawService(withdrawRepositry, withdrawRepositryByBank, paginationService, pinCodeService, userService, notficationService, userWallteBlockchain) {
        this.withdrawRepositry = withdrawRepositry;
        this.withdrawRepositryByBank = withdrawRepositryByBank;
        this.paginationService = paginationService;
        this.pinCodeService = pinCodeService;
        this.userService = userService;
        this.notficationService = notficationService;
        this.userWallteBlockchain = userWallteBlockchain;
    }
    WithDrawService.prototype.allTransactions = function (query, user) {
        return __awaiter(this, void 0, void 0, function () {
            var conditions, paginationData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        conditions = { user_id: user.userId };
                        return [4 /*yield*/, this.paginationService.paginate(this.withdrawRepositry, query, conditions, ['id', 'amount', 'status', 'created_at'])];
                    case 1:
                        paginationData = _a.sent();
                        return [2 /*return*/, paginationData];
                }
            });
        });
    };
    WithDrawService.prototype.order = function (data, user) {
        return __awaiter(this, void 0, Promise, function () {
            var pinCode, amountMony, Muser, amount, amount, checkMoney, userWallteBlockchain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pinCodeService.checkVerfied(data, user)];
                    case 1:
                        pinCode = _a.sent();
                        amountMony = 0;
                        if (!(data.type === typeWithdraw_enum_1.TypeWithdrawEnum.PROFIT)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.userService.findOneByEmail(user.email)];
                    case 2:
                        Muser = _a.sent();
                        // console.log(Muser);
                        if (Muser.number_points === 0) {
                            amount = data.amount / 2;
                            amountMony = amount;
                        }
                        else {
                            amount = data.amount;
                            amountMony = amount;
                            // console.log(amountMony);
                        }
                        return [4 /*yield*/, this.userService.checkmyMoneyWithUpdate(user, amountMony)];
                    case 3:
                        checkMoney = _a.sent();
                        if (!checkMoney) return [3 /*break*/, 5];
                        // Proceed with transaction storage if the balance is sufficient
                        return [4 /*yield*/, this.storeTransactionDB(amountMony, user.userId, data.publicAddress)];
                    case 4:
                        // Proceed with transaction storage if the balance is sufficient
                        _a.sent();
                        return [2 /*return*/, {
                                message: "Success for profit withdrawal"
                            }];
                    case 5: 
                    // Handle insufficient funds for profit withdrawal
                    throw new common_1.HttpException('You don\'t have enough balance to withdraw profit. Please try again later.', common_1.HttpStatus.CONFLICT);
                    case 6: return [3 /*break*/, 11];
                    case 7: return [4 /*yield*/, this.userWallteBlockchain.myBlnceOfTron(user.userId)];
                    case 8:
                        userWallteBlockchain = _a.sent();
                        if (!(Number(data.amount) > Number(userWallteBlockchain))) return [3 /*break*/, 9];
                        throw new common_1.HttpException('You don\'t have enough balance for withdrawal. Please try again later.', common_1.HttpStatus.CONFLICT);
                    case 9: 
                    // Proceed with transaction storage if the balance is sufficient
                    return [4 /*yield*/, this.storeTransactionDB(data.amount, user.userId, data.publicAddress)];
                    case 10:
                        // Proceed with transaction storage if the balance is sufficient
                        _a.sent();
                        return [2 /*return*/, {
                                message: "Success for money withdrawal"
                            }];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    WithDrawService.prototype.storeTransactionDB = function (amount, userId, Visa_number) {
        return __awaiter(this, void 0, Promise, function () {
            var createTransaction, text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createTransaction = this.withdrawRepositry.create({
                            amount: amount,
                            Visa_number: Visa_number,
                            transaction_id: generateCode_1.generateRandomAlphanumeric(14),
                            status: withdraw_enum_1.TypeWithdraw.PENDING,
                            user_id: userId
                        });
                        return [4 /*yield*/, this.withdrawRepositry.save(createTransaction)];
                    case 1:
                        _a.sent();
                        text = "Withdrawal request completed successfully";
                        return [4 /*yield*/, this.notficationService.storeNewNotification(userId, text, notifaction_enum_1.NotficationType.WITHDRAW)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WithDrawService.prototype.orderByBank = function (data, user) {
        return __awaiter(this, void 0, Promise, function () {
            var pinCode, amountMony, Muser, amount, amount, checkMoney, userWallteBlockchain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pinCodeService.checkVerfied(data, user)];
                    case 1:
                        pinCode = _a.sent();
                        amountMony = 0;
                        if (!(data.type === typeWithdraw_enum_1.TypeWithdrawEnum.PROFIT)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.userService.findOneByEmail(user.email)];
                    case 2:
                        Muser = _a.sent();
                        // console.log(Muser);
                        if (Muser.number_points === 0) {
                            amount = data.amount / 2;
                            amountMony = amount;
                        }
                        else {
                            amount = data.amount;
                            amountMony = amount;
                            // console.log(amountMony);
                        }
                        return [4 /*yield*/, this.userService.checkmyMoneyWithUpdate(user, amountMony)];
                    case 3:
                        checkMoney = _a.sent();
                        if (!checkMoney) return [3 /*break*/, 5];
                        data.amount = amountMony;
                        return [4 /*yield*/, this.storeTransactionDByBank(data, user)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, {
                                message: "success for withdraw"
                            }];
                    case 5: throw new common_1.HttpException('You dont have enough balance withdrawal. Please try again later.', common_1.HttpStatus.CONFLICT);
                    case 6: return [3 /*break*/, 11];
                    case 7: return [4 /*yield*/, this.userWallteBlockchain.myBlnceOfTron(user.userId)];
                    case 8:
                        userWallteBlockchain = _a.sent();
                        if (!(Number(data.amount) > Number(userWallteBlockchain))) return [3 /*break*/, 9];
                        throw new common_1.HttpException('You don\'t have enough balance for withdrawal. Please try again later.', common_1.HttpStatus.CONFLICT);
                    case 9: 
                    // Proceed with transaction storage if the balance is sufficient
                    return [4 /*yield*/, this.storeTransactionDByBank(data, user)];
                    case 10:
                        // Proceed with transaction storage if the balance is sufficient
                        _a.sent();
                        return [2 /*return*/, {
                                message: "Success for money withdrawal"
                            }];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    WithDrawService.prototype.storeTransactionDByBank = function (data, user) {
        return __awaiter(this, void 0, void 0, function () {
            var createTransaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createTransaction = this.withdrawRepositryByBank.create({
                            amount: data.amount,
                            bankName: data.bankName,
                            bankAccountName: data.bankAccountName,
                            user_id: user.userId,
                            ibanBank: data.ibanBank
                        });
                        return [4 /*yield*/, this.withdrawRepositryByBank.save(createTransaction)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WithDrawService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(withdraw_entity_1.Withdraw)),
        __param(1, typeorm_1.InjectRepository(withdrawByBanks_entity_1.WithdrawByBankss))
    ], WithDrawService);
    return WithDrawService;
}());
exports.WithDrawService = WithDrawService;
