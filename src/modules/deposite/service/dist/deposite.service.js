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
exports.DepositeService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var axios_1 = require("axios");
var crypto = require("crypto");
var deposite_entity_1 = require("../entity/deposite.entity");
var type_deposite_enum_1 = require("../enum/type-deposite.enum");
var DepositeService = /** @class */ (function () {
    function DepositeService(depositeRpeo, paginationService) {
        this.depositeRpeo = depositeRpeo;
        this.paginationService = paginationService;
    }
    DepositeService.prototype.serverTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get('https://api.binance.com/api/v3/time')];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.serverTime];
                }
            });
        });
    };
    DepositeService.prototype.checkTextid = function (userId, textId) {
        return __awaiter(this, void 0, void 0, function () {
            var myTextId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkTextIdInDatabase(textId)];
                    case 1:
                        myTextId = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DepositeService.prototype.checkInBinance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var apiKey, apiSecret, endpoint, timestamp, queryParams, signature, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiKey = process.env.API_KEY_DEPOSITE;
                        apiSecret = process.env.KEY_SECRT_DEPOSITE;
                        endpoint = 'https://api.binance.com/sapi/v1/capital/deposit/hisrec';
                        return [4 /*yield*/, this.serverTime()];
                    case 1:
                        timestamp = _a.sent();
                        queryParams = "timestamp=" + timestamp;
                        signature = crypto
                            .createHmac('sha256', apiSecret)
                            .update(queryParams)
                            .digest('hex');
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1["default"].get(endpoint + "?" + queryParams + "&signature=" + signature, {
                                headers: {
                                    'X-MBX-APIKEY': apiKey
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4:
                        err_1 = _a.sent();
                        console.log('sending email for support to check API AND SECRT KEY');
                        return [2 /*return*/, err_1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DepositeService.prototype.checkTextIdInDatabase = function (textId) {
        return __awaiter(this, void 0, void 0, function () {
            var textid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositeRpeo.findOne({
                            where: { textId: textId }
                        })];
                    case 1:
                        textid = _a.sent();
                        return [2 /*return*/, textid];
                }
            });
        });
    };
    DepositeService.prototype.storeInDatabase = function (checkBinace, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, newDeposite;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = checkBinace.token_info;
                        newDeposite = this.depositeRpeo.create({
                            amount: checkBinace.value / 1000000,
                            textId: checkBinace.transaction_id,
                            network: data.address,
                            status: true,
                            from: checkBinace.from,
                            to: checkBinace.to,
                            user_id: user_id,
                            type: type_deposite_enum_1.TypeDeposite.BLCOKCHAIN
                        });
                        return [4 /*yield*/, this.depositeRpeo.save(newDeposite)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DepositeService.prototype.findByAddress = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var getTansaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositeRpeo.find({
                            where: { to: address }
                        })];
                    case 1:
                        getTansaction = _a.sent();
                        console.log(1);
                        return [2 /*return*/, getTansaction];
                }
            });
        });
    };
    DepositeService.prototype.allTransaction = function (query, user) {
        return __awaiter(this, void 0, void 0, function () {
            var conditions, paginationData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        conditions = { user_id: user.userId };
                        return [4 /*yield*/, this.paginationService.paginate(this.depositeRpeo, query, conditions, ['id', 'amount', 'status', 'type', 'created_at'])];
                    case 1:
                        paginationData = _a.sent();
                        return [2 /*return*/, paginationData];
                }
            });
        });
    };
    DepositeService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(deposite_entity_1.Deposite))
    ], DepositeService);
    return DepositeService;
}());
exports.DepositeService = DepositeService;
