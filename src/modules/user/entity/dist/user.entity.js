"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var status_enum_1 = require("../enum/status.enum");
var userKyc_entity_1 = require("src/modules/userKyc/entity/userKyc.entity");
var deposite_entity_1 = require("src/modules/deposite/entity/deposite.entity");
var notifcation_entity_1 = require("src/modules/notfication/entity/notifcation.entity");
var pinCode_entity_1 = require("src/modules/pin-code/entity/pinCode.entity");
var withdraw_entinty_1 = require("src/modules/withdraw/entity/withdraw.entinty");
var invoice_entity_1 = require("src/modules/cash-hand/entity/invoice.entity");
var affilite_entity_1 = require("src/modules/affiliate/entity/affilite.entity");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "name");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({ "default": null, nullable: true })
    ], User.prototype, "affiliate_code");
    __decorate([
        typeorm_1.Column({ "default": null, nullable: true })
    ], User.prototype, "comming_afflite");
    __decorate([
        typeorm_1.Column({ type: 'tinyint', width: 1, "default": 0 })
    ], User.prototype, "verified");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "email_verified_at");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true })
    ], User.prototype, "remember_token");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "phone");
    __decorate([
        typeorm_1.Column({ type: 'enum', "enum": status_enum_1.StatusUser })
    ], User.prototype, "status");
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true })
    ], User.prototype, "fcm_token");
    __decorate([
        typeorm_1.Column({ type: 'double', nullable: false })
    ], User.prototype, "number_points");
    __decorate([
        typeorm_1.Column({})
    ], User.prototype, "money");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "otp");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "number_of_user");
    __decorate([
        typeorm_1.Column({ nullable: false })
    ], User.prototype, "img");
    __decorate([
        typeorm_1.OneToOne(function () { return userKyc_entity_1.UserKyc; }, function (userKyc) { return userKyc.user; }, { cascade: true })
    ], User.prototype, "userKyc");
    __decorate([
        typeorm_1.OneToOne(function () { return pinCode_entity_1.PinCodeEntity; }, function (pincode) { return pincode.user; }, { cascade: true })
    ], User.prototype, "pinCode");
    __decorate([
        typeorm_1.OneToMany(function () { return deposite_entity_1.Deposite; }, function (deposite) { return deposite.user; }, { cascade: true })
    ], User.prototype, "deposite");
    __decorate([
        typeorm_1.OneToMany(function () { return withdraw_entinty_1.Withdraw; }, function (withdraw) { return withdraw.user; }, { cascade: true })
    ], User.prototype, "withdraw");
    __decorate([
        typeorm_1.OneToMany(function () { return notifcation_entity_1.Notfication; }, function (notfication) { return notfication.user; })
    ], User.prototype, "notfications");
    __decorate([
        typeorm_1.OneToMany(function () { return invoice_entity_1.InvoiceEntity; }, function (invoice) { return invoice.user; })
    ], User.prototype, "invoice");
    __decorate([
        typeorm_1.OneToMany(function () { return affilite_entity_1.MarketingFees; }, function (marketingFees) { return marketingFees.user; })
    ], User.prototype, "marketingFees");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], User.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], User.prototype, "updated_at");
    __decorate([
        typeorm_1.DeleteDateColumn()
    ], User.prototype, "deleted_at");
    User = __decorate([
        typeorm_1.Entity('users')
    ], User);
    return User;
}());
exports.User = User;
