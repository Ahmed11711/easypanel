"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InvoiceEntity = void 0;
var user_entity_1 = require("src/modules/user/entity/user.entity");
var typeorm_1 = require("typeorm");
var InvoiceEntity = /** @class */ (function () {
    function InvoiceEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], InvoiceEntity.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], InvoiceEntity.prototype, "amount");
    __decorate([
        typeorm_1.Column()
    ], InvoiceEntity.prototype, "status");
    __decorate([
        typeorm_1.Column()
    ], InvoiceEntity.prototype, "img");
    __decorate([
        typeorm_1.Column()
    ], InvoiceEntity.prototype, "user_id");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.invoice; }, { nullable: false }),
        typeorm_1.JoinColumn({ name: 'user_id' })
    ], InvoiceEntity.prototype, "user");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], InvoiceEntity.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], InvoiceEntity.prototype, "updated_at");
    InvoiceEntity = __decorate([
        typeorm_1.Entity('cach_uploads')
    ], InvoiceEntity);
    return InvoiceEntity;
}());
exports.InvoiceEntity = InvoiceEntity;
