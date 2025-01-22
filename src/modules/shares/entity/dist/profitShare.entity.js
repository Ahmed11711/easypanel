"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfitShare = void 0;
var typeorm_1 = require("typeorm");
var shareUser_entity_1 = require("./shareUser.entity");
var ProfitShare = /** @class */ (function () {
    function ProfitShare() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], ProfitShare.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], ProfitShare.prototype, "user_id");
    __decorate([
        typeorm_1.Column()
    ], ProfitShare.prototype, "share_users_id");
    __decorate([
        typeorm_1.Column()
    ], ProfitShare.prototype, "newperiod");
    __decorate([
        typeorm_1.Column({ type: 'float' })
    ], ProfitShare.prototype, "profit");
    __decorate([
        typeorm_1.Column()
    ], ProfitShare.prototype, "active");
    __decorate([
        typeorm_1.Column()
    ], ProfitShare.prototype, "HashID");
    __decorate([
        typeorm_1.ManyToOne(function () { return shareUser_entity_1.ShareUser; }, function (shareUser) { return shareUser.profitShare; }),
        typeorm_1.JoinColumn({ name: 'share_users_id' })
    ], ProfitShare.prototype, "profitShare");
    __decorate([
        typeorm_1.CreateDateColumn({ type: 'timestamp' })
    ], ProfitShare.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn({ type: 'timestamp' })
    ], ProfitShare.prototype, "updated_at");
    ProfitShare = __decorate([
        typeorm_1.Entity('profit_share_to_user')
    ], ProfitShare);
    return ProfitShare;
}());
exports.ProfitShare = ProfitShare;
