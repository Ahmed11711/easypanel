"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContractEntity = void 0;
var buyWallet_entity_1 = require("src/modules/wallte/entity/buyWallet.entity");
var typeorm_1 = require("typeorm");
var ContractEntity = /** @class */ (function () {
    function ContractEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], ContractEntity.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], ContractEntity.prototype, "user_id");
    __decorate([
        typeorm_1.Column()
    ], ContractEntity.prototype, "buffer_user_id");
    __decorate([
        typeorm_1.Column()
    ], ContractEntity.prototype, "contract");
    __decorate([
        typeorm_1.Column()
    ], ContractEntity.prototype, "HashID");
    __decorate([
        typeorm_1.ManyToOne(function () { return buyWallet_entity_1.BuyWallet; }, function (buyWallte) { return buyWallte.contracts; }),
        typeorm_1.JoinColumn({ name: 'buffer_user_id' })
    ], ContractEntity.prototype, "buyWallet");
    __decorate([
        typeorm_1.Column()
    ], ContractEntity.prototype, "status");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], ContractEntity.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], ContractEntity.prototype, "updated_at");
    ContractEntity = __decorate([
        typeorm_1.Entity('contract_users_datas')
    ], ContractEntity);
    return ContractEntity;
}());
exports.ContractEntity = ContractEntity;
