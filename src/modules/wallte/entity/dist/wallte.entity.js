"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Wallte = void 0;
var devolper_entity_1 = require("src/modules/devolper/entity/devolper.entity");
var projects_entity_1 = require("src/modules/projects/entity/projects.entity");
var typeWallte_enum_1 = require("src/modules/withdraw/enum/typeWallte.enum");
var SizeWallte_enum_1 = require("../enum/SizeWallte.enum");
var typeorm_1 = require("typeorm");
var buyWallte_entity_1 = require("./buyWallte.entity");
var Wallte = /** @class */ (function () {
    function Wallte() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Wallte.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Wallte.prototype, "name");
    __decorate([
        typeorm_1.Column({ type: 'int' })
    ], Wallte.prototype, "price");
    __decorate([
        typeorm_1.Column({ type: 'int', "default": 0 })
    ], Wallte.prototype, "number_of_unit");
    __decorate([
        typeorm_1.Column({ type: 'varchar' })
    ], Wallte.prototype, "price_unit");
    __decorate([
        typeorm_1.Column({ type: 'int', "default": 0 })
    ], Wallte.prototype, "sold");
    __decorate([
        typeorm_1.Column()
    ], Wallte.prototype, "percentage");
    __decorate([
        typeorm_1.Column()
    ], Wallte.prototype, "peryears");
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            "enum": SizeWallte_enum_1.SizeWalltes
        })
    ], Wallte.prototype, "sizeWalltes");
    __decorate([
        typeorm_1.Column({ type: 'boolean', "default": false })
    ], Wallte.prototype, "active");
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            "enum": typeWallte_enum_1.TypeWallte
        })
    ], Wallte.prototype, "type");
    __decorate([
        typeorm_1.Column({ type: 'int', nullable: false })
    ], Wallte.prototype, "country_id");
    __decorate([
        typeorm_1.Column({ type: 'date', nullable: true })
    ], Wallte.prototype, "expire_date");
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 50, nullable: false })
    ], Wallte.prototype, "statusApp");
    __decorate([
        typeorm_1.Column()
    ], Wallte.prototype, "profitDistributed");
    __decorate([
        typeorm_1.OneToOne(function () { return projects_entity_1.Project; }, function (project) { return project.asiangmanet; }),
        typeorm_1.JoinColumn({ name: 'project_wallte_id' })
    ], Wallte.prototype, "project");
    __decorate([
        typeorm_1.OneToMany(function () { return buyWallte_entity_1.BuyWallte; }, function (buyWallte) { return buyWallte.wallte; }),
        typeorm_1.JoinColumn({ name: 'buffer_id' })
    ], Wallte.prototype, "buyWallte");
    __decorate([
        typeorm_1.Column()
    ], Wallte.prototype, "asiangmanet");
    __decorate([
        typeorm_1.ManyToOne(function () { return devolper_entity_1.Devolper; }, function (devolper) { return devolper.wallte; }),
        typeorm_1.JoinColumn({ name: 'asiangmanet' })
    ], Wallte.prototype, "devolper");
    __decorate([
        typeorm_1.CreateDateColumn({ type: 'timestamp' })
    ], Wallte.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn({ type: 'timestamp' })
    ], Wallte.prototype, "updated_at");
    __decorate([
        typeorm_1.DeleteDateColumn({ type: 'timestamp', nullable: true })
    ], Wallte.prototype, "deleted_at");
    Wallte = __decorate([
        typeorm_1.Entity('buffers')
    ], Wallte);
    return Wallte;
}());
exports.Wallte = Wallte;
