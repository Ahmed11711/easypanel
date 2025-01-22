"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Devolper = void 0;
var wallet_entity_1 = require("src/modules/wallte/entity/wallet.entity");
var typeorm_1 = require("typeorm");
var Devolper = /** @class */ (function () {
    function Devolper() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Devolper.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Devolper.prototype, "name");
    __decorate([
        typeorm_1.Column({ type: 'text' })
    ], Devolper.prototype, "desc");
    __decorate([
        typeorm_1.Column()
    ], Devolper.prototype, "img");
    __decorate([
        typeorm_1.Column()
    ], Devolper.prototype, "websiteUrl");
    __decorate([
        typeorm_1.Column()
    ], Devolper.prototype, "status");
    __decorate([
        typeorm_1.OneToMany(function () { return wallet_entity_1.Wallet; }, function (wallte) { return wallte.devolper; })
    ], Devolper.prototype, "wallte");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Devolper.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Devolper.prototype, "updated_at");
    __decorate([
        typeorm_1.DeleteDateColumn()
    ], Devolper.prototype, "deleted_at");
    Devolper = __decorate([
        typeorm_1.Entity('devolpers')
    ], Devolper);
    return Devolper;
}());
exports.Devolper = Devolper;
