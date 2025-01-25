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
exports.UserWallteService = void 0;
// src/tron/tron.service.ts
var common_1 = require("@nestjs/common");
var tronweb_1 = require("tronweb");
var axios_1 = require("axios");
var typeorm_1 = require("@nestjs/typeorm");
var userWallte_entity_1 = require("../entity/userWallte.entity");
var bip39 = require("bip39");
var hdkey = require("hdkey");
var bignumber_js_1 = require("bignumber.js");
var UserWallteService = /** @class */ (function () {
    function UserWallteService(userWalteRepo, depositeRepo, userService) {
        this.userWalteRepo = userWalteRepo;
        this.depositeRepo = depositeRepo;
        this.userService = userService;
        this.tronWeb = new tronweb_1.TronWeb({
            fullHost: 'https://api.trongrid.io'
        });
    }
    UserWallteService.prototype.createWallet = function (userId, password) {
        return __awaiter(this, void 0, Promise, function () {
            var checkHaveAcount, newWallte, createNewWallte;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkHaveAcount(userId)];
                    case 1:
                        checkHaveAcount = _a.sent();
                        if (checkHaveAcount) {
                            throw new common_1.NotFoundException('you Aleray Have Wallte');
                        }
                        return [4 /*yield*/, this.tronWeb.createRandom()];
                    case 2:
                        newWallte = _a.sent();
                        createNewWallte = this.storeWallte(userId, newWallte);
                        return [2 /*return*/, {
                                messgae: 'Suucess to create Wallte'
                            }];
                }
            });
        });
    };
    UserWallteService.prototype.getPrivateKeyFromMnemonic = function (mnemonic, password) {
        return __awaiter(this, void 0, void 0, function () {
            var seed, hdWallet, path, key;
            return __generator(this, function (_a) {
                seed = bip39.mnemonicToSeedSync(mnemonic, password);
                hdWallet = hdkey.fromMasterSeed(seed);
                path = "m/44'/195'/0'/0/0";
                key = hdWallet.derive(path);
                // Convert private key to a hexadecimal string
                return [2 /*return*/, key.privateKey.toString('hex')];
            });
        });
    };
    UserWallteService.prototype.getTransactionLogs = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var actualLimit, checkHaveAcount, address, url, response, allTransactions, filteredTransactions, newDeposite, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        actualLimit = process.env.LIMIT_TRANSACTION || 10;
                        return [4 /*yield*/, this.checkHaveAcount(user_id)];
                    case 1:
                        checkHaveAcount = _a.sent();
                        if (!checkHaveAcount) {
                            throw new common_1.NotFoundException('Pleas Create Wallte');
                        }
                        address = checkHaveAcount.address;
                        url = "https://api.trongrid.io/v1/accounts/" + address + "/transactions/trc20/?limit=" + actualLimit;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, axios_1["default"].get(url)];
                    case 3:
                        response = _a.sent();
                        allTransactions = response.data.data;
                        if (!Array.isArray(allTransactions)) {
                            throw new Error('Unexpected response format');
                        }
                        filteredTransactions = allTransactions.filter(function (transaction) {
                            return transaction.to &&
                                transaction.to.toLowerCase() === address.toLowerCase() &&
                                transaction.token_info &&
                                transaction.token_info.address ===
                                    'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
                        });
                        return [4 /*yield*/, this.storeFilteredTransactions(filteredTransactions, address, user_id)];
                    case 4:
                        newDeposite = _a.sent();
                        if (newDeposite && newDeposite == 0) {
                            return [2 /*return*/, {
                                    message: 'Total amount is 0 or less.'
                                }];
                        }
                        else {
                            // await this.userService.addMoney(user_id, newDeposite);
                            return [2 /*return*/, {
                                    message: "You made a deposit of " + newDeposite + "."
                                }];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        throw new common_1.NotFoundException('Failed to fetch transaction logs', error_1);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    UserWallteService.prototype.checkHaveAcount = function (user_id) {
        return __awaiter(this, void 0, Promise, function () {
            var wallt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userWalteRepo.findOneBy({ user_id: user_id })];
                    case 1:
                        wallt = _a.sent();
                        return [2 /*return*/, wallt];
                }
            });
        });
    };
    UserWallteService.prototype.storeWallte = function (userId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var wallte, newWallte;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wallte = data.mnemonic;
                        newWallte = this.userWalteRepo.create({
                            user_id: userId,
                            privateKey: data.privateKey,
                            publicKey: data.publicKey,
                            address: data.address,
                            phrase: wallte.phrase,
                            password: "11"
                        });
                        return [4 /*yield*/, this.userWalteRepo.save(newWallte)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserWallteService.prototype.storeFilteredTransactions = function (allTransactions, address, user_id) {
        return __awaiter(this, void 0, Promise, function () {
            var existingTransactions, existingTransactionIds, totalAmount, _i, allTransactions_1, transaction, transactionId, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.depositeRepo.findByAddress(address)];
                    case 1:
                        existingTransactions = _a.sent();
                        existingTransactionIds = new Set(existingTransactions.map(function (transaction) { return transaction.textId; }));
                        totalAmount = 0;
                        _i = 0, allTransactions_1 = allTransactions;
                        _a.label = 2;
                    case 2:
                        if (!(_i < allTransactions_1.length)) return [3 /*break*/, 5];
                        transaction = allTransactions_1[_i];
                        transactionId = transaction.transaction_id;
                        if (!!existingTransactionIds.has(transactionId)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.depositeRepo.storeInDatabase(transaction, user_id)];
                    case 3:
                        _a.sent(); // Store the unique transaction
                        existingTransactionIds.add(transactionId); // Track this textId to prevent future duplicates
                        totalAmount += transaction.value / 1000000;
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: 
                    // Return the total amount in the expected format (converted to main units)
                    return [2 /*return*/, totalAmount];
                    case 6:
                        error_2 = _a.sent();
                        console.error('Error storing filtered transactions:', error_2);
                        throw new Error('Failed to store filtered transactions');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserWallteService.prototype.myAddress = function (user) {
        return __awaiter(this, void 0, Promise, function () {
            var wallt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkHaveAcount(user.userId)];
                    case 1:
                        wallt = _a.sent();
                        if (wallt) {
                            return [2 /*return*/, {
                                    myaddress: wallt.address
                                }];
                        }
                        throw new common_1.NotFoundException('Please Create Pin code');
                }
            });
        });
    };
    UserWallteService.prototype.myWallteCredantiona = function (user_id) {
        return __awaiter(this, void 0, Promise, function () {
            var wallt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userWalteRepo.findOneBy({ user_id: user_id })];
                    case 1:
                        wallt = _a.sent();
                        return [2 /*return*/, wallt];
                }
            });
        });
    };
    UserWallteService.prototype.sendTRC20 = function (to, amount, user_id, privateKey) {
        return __awaiter(this, void 0, void 0, function () {
            var myWallte, tronWeb, jstContractAddress, contract, amountInSmallestUnit, tx, transactionDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkHaveAcount(user_id)];
                    case 1:
                        myWallte = _a.sent();
                        if (!myWallte) {
                            throw new common_1.NotFoundException('Please Create Wallte  ');
                        }
                        tronWeb = new tronweb_1.TronWeb({
                            fullHost: 'https://api.trongrid.io',
                            privateKey: privateKey
                        });
                        jstContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
                        return [4 /*yield*/, tronWeb.contract().at(jstContractAddress)];
                    case 2:
                        contract = _a.sent();
                        amountInSmallestUnit = new bignumber_js_1.BigNumber(amount).multipliedBy(1e6).toFixed(0);
                        return [4 /*yield*/, contract.transfer(to, amountInSmallestUnit).send({
                                shouldPollResponse: false,
                                privateKey: privateKey
                            })];
                    case 3:
                        tx = _a.sent();
                        return [4 /*yield*/, tronWeb.trx.getTransaction(tx)];
                    case 4:
                        transactionDetails = _a.sent();
                        console.log('Transaction successful:', tx);
                        return [2 /*return*/, transactionDetails];
                }
            });
        });
    };
    UserWallteService.prototype.sendTRX = function (fromAddress, toAddress, amount, privateKey) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, signedTransaction, receipt, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.tronWeb.transactionBuilder.sendTrx(toAddress, amount, fromAddress)];
                    case 1:
                        transaction = _a.sent();
                        return [4 /*yield*/, this.tronWeb.trx.sign(transaction, privateKey)];
                    case 2:
                        signedTransaction = _a.sent();
                        return [4 /*yield*/, this.tronWeb.trx.sendRawTransaction(signedTransaction)];
                    case 3:
                        receipt = _a.sent();
                        return [2 /*return*/, receipt];
                    case 4:
                        error_3 = _a.sent();
                        console.error('Error sending TRX:', error_3);
                        throw new Error('Transaction failed');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserWallteService.prototype.myBlnceOfTron = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var myWallte, responses, usdtData, usdt, actualAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkHaveAcount(user_id)];
                    case 1:
                        myWallte = _a.sent();
                        if (!myWallte) {
                            throw new common_1.NotFoundException('Please Create Wallte  ');
                        }
                        return [4 /*yield*/, axios_1["default"].get("https://api.tronscan.org/api/account?address=" + myWallte.address)
                            // const usdtData = responses.data.tokenes.filter(item => item.tokenAbbr === "USDT");
                        ];
                    case 2:
                        responses = _a.sent();
                        usdtData = responses.data.tokens.filter(function (item) { return item.tokenAbbr === "USDT"; });
                        if (usdtData.length > 0) {
                            usdt = usdtData[0];
                            actualAmount = parseInt(usdt.balance) / Math.pow(10, usdt.tokenDecimal);
                            // Log the raw balance for debugging
                            return [2 /*return*/, actualAmount];
                        }
                        else {
                            return [2 /*return*/, 0];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // import * as TronWeb from 'tronweb';
    UserWallteService.prototype.sendTransactionAndEstimateEnergy = function (senderPrivateKey, contractAddress, recipientAddress, amountInUSDT, usdToTrxRate) {
        if (usdToTrxRate === void 0) { usdToTrxRate = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var trxAmount, tronWeb, jstContractAddress, contract, functionSelector, parameters, issuerAddress, estimateResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        trxAmount = amountInUSDT * usdToTrxRate;
                        tronWeb = new tronweb_1.TronWeb({
                            fullHost: 'https://nile.trongrid.io',
                            privateKey: senderPrivateKey
                        });
                        jstContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
                        return [4 /*yield*/, tronWeb.contract().at(jstContractAddress)];
                    case 1:
                        contract = _a.sent();
                        if (!contract) {
                            throw new Error('Contract does not exist on the network');
                        }
                        console.log(contract);
                        functionSelector = 'transfer(address,uint256)';
                        parameters = [
                            { type: 'address', value: recipientAddress },
                            { type: 'uint256', value: trxAmount }
                        ];
                        issuerAddress = tronWeb.defaultAddress.base58;
                        return [4 /*yield*/, tronWeb.transactionBuilder.estimateEnergy(contractAddress, functionSelector, {}, parameters)];
                    case 2:
                        estimateResult = _a.sent();
                        console.log("Energy required: " + estimateResult.energy_required);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserWallteService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(userWallte_entity_1.UserWallte))
    ], UserWallteService);
    return UserWallteService;
}());
exports.UserWallteService = UserWallteService;
