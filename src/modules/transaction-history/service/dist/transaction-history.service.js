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
exports.TransactionHistoryServeice = void 0;
var common_1 = require("@nestjs/common");
var type_deposite_enum_1 = require("src/modules/deposite/enum/type-deposite.enum");
var TransactionHistoryServeice = /** @class */ (function () {
    function TransactionHistoryServeice(depositeService, invoiceService, withdrawService, paginationService) {
        this.depositeService = depositeService;
        this.invoiceService = invoiceService;
        this.withdrawService = withdrawService;
        this.paginationService = paginationService;
    }
    TransactionHistoryServeice.prototype.allTransaction = function (query, user) {
        return __awaiter(this, void 0, void 0, function () {
            var depositeTransactions, depositeTransactionsByInvoice, withdrawTransactions, combinedTransactions, sortedTransactions, _a, skip, take, page, limit, paginatedData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.depositeService.allTransaction(query, user)];
                    case 1:
                        depositeTransactions = _b.sent();
                        return [4 /*yield*/, this.invoiceService.allTransactions(query, user)];
                    case 2:
                        depositeTransactionsByInvoice = _b.sent();
                        return [4 /*yield*/, this.withdrawService.allTransactions(query, user)];
                    case 3:
                        withdrawTransactions = _b.sent();
                        combinedTransactions = __spreadArrays(depositeTransactions.data.map(function (item) { return (__assign(__assign({}, item), { module: 'deposite' })); }), depositeTransactionsByInvoice.data.map(function (item) { return (__assign(__assign({}, item), { module: 'deposite', type: type_deposite_enum_1.TypeDeposite.CASHHAND })); }), withdrawTransactions.data.map(function (item) { return (__assign(__assign({}, item), { module: 'withdraw' })); }));
                        sortedTransactions = combinedTransactions.sort(function (a, b) {
                            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                        });
                        _a = this.paginationService.getPagination(query), skip = _a.skip, take = _a.take, page = _a.page, limit = _a.limit;
                        paginatedData = sortedTransactions.slice(skip, skip + take);
                        return [2 /*return*/, {
                                data: paginatedData,
                                total: sortedTransactions.length,
                                page: page,
                                limit: limit,
                                totalPages: Math.ceil(sortedTransactions.length / limit)
                            }];
                }
            });
        });
    };
    TransactionHistoryServeice = __decorate([
        common_1.Injectable()
    ], TransactionHistoryServeice);
    return TransactionHistoryServeice;
}());
exports.TransactionHistoryServeice = TransactionHistoryServeice;
