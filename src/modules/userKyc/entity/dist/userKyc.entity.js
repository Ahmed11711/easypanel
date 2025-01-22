"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserKyc = void 0;
var user_entity_1 = require("src/modules/user/entity/user.entity");
var typeorm_1 = require("typeorm");
var UserKyc = /** @class */ (function () {
    function UserKyc() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], UserKyc.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], UserKyc.prototype, "fullname");
    __decorate([
        typeorm_1.Column()
    ], UserKyc.prototype, "international_id");
    __decorate([
        typeorm_1.Column()
    ], UserKyc.prototype, "front_id_image");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], UserKyc.prototype, "back_id_image");
    __decorate([
        typeorm_1.Column()
    ], UserKyc.prototype, "face_image");
    __decorate([
        typeorm_1.Column()
    ], UserKyc.prototype, "active");
    __decorate([
        typeorm_1.OneToOne(function () { return user_entity_1.User; }, function (user) { return user.userKyc; }, { nullable: false }),
        typeorm_1.JoinColumn({ name: 'user_id' })
    ], UserKyc.prototype, "user");
    __decorate([
        typeorm_1.Column()
    ], UserKyc.prototype, "user_id");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], UserKyc.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], UserKyc.prototype, "updated_at");
    UserKyc = __decorate([
        typeorm_1.Entity('user_kyc')
    ], UserKyc);
    return UserKyc;
}());
exports.UserKyc = UserKyc;
