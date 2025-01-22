"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Wallet = void 0;
var devolper_entity_1 = require("src/modules/devolper/entity/devolper.entity");
var projects_entity_1 = require("src/modules/projects/entity/projects.entity");
var typeWallte_enum_1 = require("src/modules/withdraw/enum/typeWallte.enum");
var SizeWallte_enum_1 = require("../enum/SizeWallte.enum");
var typeorm_1 = require("typeorm");
var buyWallet_entity_1 = require("./buyWallet.entity");
var Wallet = /** @class */ (function () {
    function Wallet() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Wallet.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Wallet.prototype, "name");
    __decorate([
        typeorm_1.Column({ type: 'int' })
    ], Wallet.prototype, "price");
    __decorate([
        typeorm_1.Column({ type: 'int', "default": 0 })
    ], Wallet.prototype, "number_of_unit");
    __decorate([
        typeorm_1.Column({ type: 'varchar' })
    ], Wallet.prototype, "price_unit");
    __decorate([
        typeorm_1.Column({ type: 'int', "default": 0 })
    ], Wallet.prototype, "sold");
    __decorate([
        typeorm_1.Column()
    ], Wallet.prototype, "percentage");
    __decorate([
        typeorm_1.Column()
    ], Wallet.prototype, "peryears");
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            "enum": SizeWallte_enum_1.SizeWalltes
        })
    ], Wallet.prototype, "sizeWalltes");
    __decorate([
        typeorm_1.Column({ type: 'boolean', "default": false })
    ], Wallet.prototype, "active");
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            "enum": typeWallte_enum_1.TypeWallte
        })
    ], Wallet.prototype, "type");
    __decorate([
        typeorm_1.Column({ type: 'int', nullable: false })
    ], Wallet.prototype, "country_id");
    __decorate([
        typeorm_1.Column({ type: 'date', nullable: true })
    ], Wallet.prototype, "expire_date");
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 50, nullable: false })
    ], Wallet.prototype, "statusApp");
    __decorate([
        typeorm_1.Column()
    ], Wallet.prototype, "profitDistributed");
    __decorate([
        typeorm_1.OneToOne(function () { return projects_entity_1.Project; }, function (project) { return project.asiangmanet; }),
        typeorm_1.JoinColumn({ name: 'project_wallte_id' })
    ], Wallet.prototype, "project");
    __decorate([
        typeorm_1.OneToMany(function () { return buyWallet_entity_1.BuyWallet; }, function (buyWallte) { return buyWallte.wallte; }),
        typeorm_1.JoinColumn({ name: 'buffer_id' })
    ], Wallet.prototype, "buyWallte");
    __decorate([
        typeorm_1.Column()
    ], Wallet.prototype, "asiangmanet");
    __decorate([
        typeorm_1.ManyToOne(function () { return devolper_entity_1.Devolper; }, function (devolper) { return devolper.wallte; }),
        typeorm_1.JoinColumn({ name: 'asiangmanet' })
    ], Wallet.prototype, "devolper");
    __decorate([
        typeorm_1.CreateDateColumn({ type: 'timestamp' })
    ], Wallet.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn({ type: 'timestamp' })
    ], Wallet.prototype, "updated_at");
    __decorate([
        typeorm_1.DeleteDateColumn({ type: 'timestamp', nullable: true })
    ], Wallet.prototype, "deleted_at");
    Wallet = __decorate([
        typeorm_1.Entity('buffers')
    ], Wallet);
    return Wallet;
}());
exports.Wallet = Wallet;
