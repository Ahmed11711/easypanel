"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MarketingFees = void 0;
var user_entity_1 = require("src/modules/user/entity/user.entity");
var typeorm_1 = require("typeorm");
var MarketingFees = /** @class */ (function () {
    function MarketingFees() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], MarketingFees.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], MarketingFees.prototype, "user_id");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.marketingFees; }),
        typeorm_1.JoinColumn({ name: 'user_id' })
    ], MarketingFees.prototype, "user");
    __decorate([
        typeorm_1.Column()
    ], MarketingFees.prototype, "upline_id");
    __decorate([
        typeorm_1.Column()
    ], MarketingFees.prototype, "amount");
    __decorate([
        typeorm_1.Column()
    ], MarketingFees.prototype, "buffer_id");
    __decorate([
        typeorm_1.Column()
    ], MarketingFees.prototype, "generations");
    __decorate([
        typeorm_1.Column()
    ], MarketingFees.prototype, "num_unit");
    __decorate([
        typeorm_1.Column()
    ], MarketingFees.prototype, "profit_users");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], MarketingFees.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], MarketingFees.prototype, "updated_at");
    MarketingFees = __decorate([
        typeorm_1.Entity('markting_fesses')
    ], MarketingFees);
    return MarketingFees;
}());
exports.MarketingFees = MarketingFees;
