"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfitWallte = void 0;
var typeorm_1 = require("typeorm");
var buyWallet_entity_1 = require("./buyWallet.entity");
var ProfitWallte = /** @class */ (function () {
    function ProfitWallte() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], ProfitWallte.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], ProfitWallte.prototype, "user_id");
    __decorate([
        typeorm_1.Column()
    ], ProfitWallte.prototype, "buffer_id");
    __decorate([
        typeorm_1.Column()
    ], ProfitWallte.prototype, "buffer_users_id");
    __decorate([
        typeorm_1.Column()
    ], ProfitWallte.prototype, "newperiod");
    __decorate([
        typeorm_1.Column({ type: 'float' })
    ], ProfitWallte.prototype, "profit");
    __decorate([
        typeorm_1.Column()
    ], ProfitWallte.prototype, "active");
    __decorate([
        typeorm_1.Column()
    ], ProfitWallte.prototype, "HashID");
    __decorate([
        typeorm_1.ManyToOne(function () { return buyWallet_entity_1.BuyWallet; }, function (wallte) { return wallte.myProfit; }),
        typeorm_1.JoinColumn({ name: 'buffer_users_id' })
    ], ProfitWallte.prototype, "profitWallet");
    __decorate([
        typeorm_1.CreateDateColumn({ type: 'timestamp' })
    ], ProfitWallte.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn({ type: 'timestamp' })
    ], ProfitWallte.prototype, "updated_at");
    ProfitWallte = __decorate([
        typeorm_1.Entity('profit_buffer_to_users')
    ], ProfitWallte);
    return ProfitWallte;
}());
exports.ProfitWallte = ProfitWallte;
