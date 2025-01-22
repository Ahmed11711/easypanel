"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BuyWallte = void 0;
var typeWallte_enum_1 = require("src/modules/withdraw/enum/typeWallte.enum");
var typeorm_1 = require("typeorm");
var wallet_entity_1 = require("./wallet.entity");
var contract_entity_1 = require("src/modules/contract/entity/contract.entity");
var profitWallte_entity_1 = require("./profitWallte.entity");
var BuyWallte = /** @class */ (function () {
    function BuyWallte() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], BuyWallte.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], BuyWallte.prototype, "user_id");
    __decorate([
        typeorm_1.Column()
    ], BuyWallte.prototype, "buffer_id");
    __decorate([
        typeorm_1.Column()
    ], BuyWallte.prototype, "start_subscrip");
    __decorate([
        typeorm_1.Column()
    ], BuyWallte.prototype, "end_subscrip");
    __decorate([
        typeorm_1.Column()
    ], BuyWallte.prototype, "num_unite");
    __decorate([
        typeorm_1.Column()
    ], BuyWallte.prototype, "profit");
    __decorate([
        typeorm_1.Column()
    ], BuyWallte.prototype, "amount");
    __decorate([
        typeorm_1.Column()
    ], BuyWallte.prototype, "active");
    __decorate([
        typeorm_1.Column()
    ], BuyWallte.prototype, "peryears");
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            "enum": typeWallte_enum_1.TypeWallte
        })
    ], BuyWallte.prototype, "type");
    __decorate([
        typeorm_1.Column()
    ], BuyWallte.prototype, "HashID");
    __decorate([
        typeorm_1.OneToMany(function () { return contract_entity_1.ContractEntity; }, function (contract) { return contract.buyWallet; })
    ], BuyWallte.prototype, "contracts");
    __decorate([
        typeorm_1.Column({ type: 'date', nullable: true })
    ], BuyWallte.prototype, "finsh_quarter");
    __decorate([
        typeorm_1.ManyToOne(function () { return wallet_entity_1.Wallte; }, function (wallte) { return wallte.buyWallte; }),
        typeorm_1.JoinColumn({ name: 'buffer_id' })
    ], BuyWallte.prototype, "wallte");
    __decorate([
        typeorm_1.OneToMany(function () { return profitWallte_entity_1.ProfitWallte; }, function (profitWallte) { return profitWallte.profitWallet; }),
        typeorm_1.JoinColumn({ name: 'buffer_id' })
    ], BuyWallte.prototype, "myProfit");
    __decorate([
        typeorm_1.CreateDateColumn({ type: 'timestamp' })
    ], BuyWallte.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn({ type: 'timestamp' })
    ], BuyWallte.prototype, "updated_at");
    BuyWallte = __decorate([
        typeorm_1.Entity('buffer_users')
    ], BuyWallte);
    return BuyWallte;
}());
exports.BuyWallte = BuyWallte;
