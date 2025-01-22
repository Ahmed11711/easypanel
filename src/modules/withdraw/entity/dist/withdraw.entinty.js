"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Withdraw = void 0;
var user_entity_1 = require("src/modules/user/entity/user.entity");
var typeorm_1 = require("typeorm");
var withdraw_enum_1 = require("../enum/withdraw.enum");
var Withdraw = /** @class */ (function () {
    function Withdraw() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Withdraw.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Withdraw.prototype, "amount");
    __decorate([
        typeorm_1.Column()
    ], Withdraw.prototype, "Visa_number");
    __decorate([
        typeorm_1.Column()
    ], Withdraw.prototype, "transaction_id");
    __decorate([
        typeorm_1.Column({ type: 'enum', "enum": withdraw_enum_1.TypeWithdraw })
    ], Withdraw.prototype, "status");
    __decorate([
        typeorm_1.OneToMany(function () { return user_entity_1.User; }, function (user) { return user.withdraw; }, { nullable: false }),
        typeorm_1.JoinColumn({ name: 'user_id' })
    ], Withdraw.prototype, "user");
    __decorate([
        typeorm_1.Column()
    ], Withdraw.prototype, "user_id");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Withdraw.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Withdraw.prototype, "updated_at");
    Withdraw = __decorate([
        typeorm_1.Entity('transfer_manies')
    ], Withdraw);
    return Withdraw;
}());
exports.Withdraw = Withdraw;
