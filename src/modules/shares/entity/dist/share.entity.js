"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Share = void 0;
var typeorm_1 = require("typeorm");
var share_enum_1 = require("../enum/share.enum");
var shareUser_entity_1 = require("./shareUser.entity");
var Share = /** @class */ (function () {
    function Share() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Share.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Share.prototype, "name");
    __decorate([
        typeorm_1.Column()
    ], Share.prototype, "availableShare");
    __decorate([
        typeorm_1.Column()
    ], Share.prototype, "period");
    __decorate([
        typeorm_1.Column()
    ], Share.prototype, "price");
    __decorate([
        typeorm_1.Column()
    ], Share.prototype, "profit");
    __decorate([
        typeorm_1.Column()
    ], Share.prototype, "sold");
    __decorate([
        typeorm_1.Column()
    ], Share.prototype, "dividendDistributed");
    __decorate([
        typeorm_1.Column({ type: 'date' })
    ], Share.prototype, "expireDate");
    __decorate([
        typeorm_1.Column({ type: 'enum', "enum": share_enum_1.TypeStatusShare })
    ], Share.prototype, "status");
    __decorate([
        typeorm_1.OneToOne(function () { return shareUser_entity_1.ShareUser; }, function (shareUser) { return shareUser.share; })
    ], Share.prototype, "shareUser");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Share.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Share.prototype, "updated_at");
    Share = __decorate([
        typeorm_1.Entity('shares') // Matches the table name in the database
    ], Share);
    return Share;
}());
exports.Share = Share;
