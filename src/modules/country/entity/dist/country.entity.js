"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Country = void 0;
var typeorm_1 = require("typeorm");
var Country = /** @class */ (function () {
    function Country() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Country.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Country.prototype, "name");
    __decorate([
        typeorm_1.Column()
    ], Country.prototype, "img");
    __decorate([
        typeorm_1.Column()
    ], Country.prototype, "status");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Country.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Country.prototype, "updated_at");
    __decorate([
        typeorm_1.DeleteDateColumn()
    ], Country.prototype, "deleted_at");
    Country = __decorate([
        typeorm_1.Entity('countries')
    ], Country);
    return Country;
}());
exports.Country = Country;
