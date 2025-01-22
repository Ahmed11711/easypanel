"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Ads = void 0;
var typeorm_1 = require("typeorm");
var ads_eum_1 = require("../enum/ads.eum");
var Ads = /** @class */ (function () {
    function Ads() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Ads.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Ads.prototype, "title");
    __decorate([
        typeorm_1.Column()
    ], Ads.prototype, "description");
    __decorate([
        typeorm_1.Column()
    ], Ads.prototype, "img");
    __decorate([
        typeorm_1.Column()
    ], Ads.prototype, "status");
    __decorate([
        typeorm_1.Column({ type: 'enum', "enum": ads_eum_1.AdType })
    ], Ads.prototype, "type");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Ads.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Ads.prototype, "updated_at");
    Ads = __decorate([
        typeorm_1.Entity('ads')
    ], Ads);
    return Ads;
}());
exports.Ads = Ads;
