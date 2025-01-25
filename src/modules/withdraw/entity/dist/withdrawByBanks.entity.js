"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WithdrawByBankss = void 0;
var typeorm_1 = require("typeorm");
var WithdrawByBankss = /** @class */ (function () {
    function WithdrawByBankss() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], WithdrawByBankss.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], WithdrawByBankss.prototype, "bankName");
    __decorate([
        typeorm_1.Column()
    ], WithdrawByBankss.prototype, "bankAccountName");
    __decorate([
        typeorm_1.Column()
    ], WithdrawByBankss.prototype, "ibanBank");
    __decorate([
        typeorm_1.Column()
    ], WithdrawByBankss.prototype, "amount");
    __decorate([
        typeorm_1.Column()
    ], WithdrawByBankss.prototype, "user_id");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], WithdrawByBankss.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], WithdrawByBankss.prototype, "updated_at");
    WithdrawByBankss = __decorate([
        typeorm_1.Entity('withdraw_by_banks')
    ], WithdrawByBankss);
    return WithdrawByBankss;
}());
exports.WithdrawByBankss = WithdrawByBankss;
