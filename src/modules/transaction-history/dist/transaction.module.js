"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransactionHistoreyModule = void 0;
var common_1 = require("@nestjs/common");
var transaction_history_controller_1 = require("./controller/transaction-history.controller");
var transaction_history_service_1 = require("./service/transaction-history.service");
var deposite_module_1 = require("../deposite/deposite.module");
var withdraw_module_1 = require("../withdraw/withdraw.module");
var pagination_service_1 = require("src/common/pagination/service/pagination.service");
var cashHand_module_1 = require("../cash-hand/cashHand.module");
var TransactionHistoreyModule = /** @class */ (function () {
    function TransactionHistoreyModule() {
    }
    TransactionHistoreyModule = __decorate([
        common_1.Module({
            imports: [deposite_module_1.DepositeModule, withdraw_module_1.WithdrawModule, cashHand_module_1.InvoiceModule],
            controllers: [transaction_history_controller_1.TransactionHistoryController],
            providers: [transaction_history_service_1.TransactionHistoryServeice, pagination_service_1.PaginationService],
            exports: [transaction_history_service_1.TransactionHistoryServeice]
        })
    ], TransactionHistoreyModule);
    return TransactionHistoreyModule;
}());
exports.TransactionHistoreyModule = TransactionHistoreyModule;
