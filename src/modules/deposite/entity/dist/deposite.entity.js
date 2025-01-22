"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Deposite = void 0;
var user_entity_1 = require("src/modules/user/entity/user.entity");
var typeorm_1 = require("typeorm");
var type_deposite_enum_1 = require("../enum/type-deposite.enum");
var Deposite = /** @class */ (function () {
    function Deposite() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Deposite.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Deposite.prototype, "amount");
    __decorate([
        typeorm_1.Column()
    ], Deposite.prototype, "textId");
    __decorate([
        typeorm_1.Column()
    ], Deposite.prototype, "network");
    __decorate([
        typeorm_1.Column()
    ], Deposite.prototype, "status");
    __decorate([
        typeorm_1.Column()
    ], Deposite.prototype, "from");
    __decorate([
        typeorm_1.Column()
    ], Deposite.prototype, "to");
    __decorate([
        typeorm_1.OneToMany(function () { return user_entity_1.User; }, function (user) { return user.deposite; }, { nullable: false }),
        typeorm_1.JoinColumn({ name: 'user_id' })
    ], Deposite.prototype, "user");
    __decorate([
        typeorm_1.Column()
    ], Deposite.prototype, "user_id");
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            "enum": type_deposite_enum_1.TypeDeposite
        })
    ], Deposite.prototype, "type");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Deposite.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Deposite.prototype, "updated_at");
    Deposite = __decorate([
        typeorm_1.Entity('deposits_binances')
    ], Deposite);
    return Deposite;
}());
exports.Deposite = Deposite;
