"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WithdrawByBank = void 0;
var typeorm_1 = require("typeorm");
var typeWithdraw_enum_1 = require("../enum/typeWithdraw.enum");
var WithdrawByBank = /** @class */ (function () {
    function WithdrawByBank() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], WithdrawByBank.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], WithdrawByBank.prototype, "bankName");
    __decorate([
        typeorm_1.Column()
    ], WithdrawByBank.prototype, "bankAccountName");
    __decorate([
        typeorm_1.Column()
    ], WithdrawByBank.prototype, "ibanBank");
    __decorate([
        typeorm_1.Column()
    ], WithdrawByBank.prototype, "amount");
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            "enum": typeWithdraw_enum_1.TypeWithdrawEnum
        })
    ], WithdrawByBank.prototype, "status");
    __decorate([
        typeorm_1.Column()
    ], WithdrawByBank.prototype, "user_id");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], WithdrawByBank.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], WithdrawByBank.prototype, "updated_at");
    WithdrawByBank = __decorate([
        typeorm_1.Entity('withdraw_by_banks')
    ], WithdrawByBank);
    return WithdrawByBank;
}());
exports.WithdrawByBank = WithdrawByBank;
