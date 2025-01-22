"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShareUser = void 0;
var typeorm_1 = require("typeorm");
var share_entity_1 = require("./share.entity");
var profitShare_entity_1 = require("./profitShare.entity");
var ShareUser = /** @class */ (function () {
    function ShareUser() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], ShareUser.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], ShareUser.prototype, "user_id");
    __decorate([
        typeorm_1.Column()
    ], ShareUser.prototype, "share_id");
    __decorate([
        typeorm_1.Column({ type: 'date' })
    ], ShareUser.prototype, "start_subscrip");
    __decorate([
        typeorm_1.Column({ type: 'date', nullable: true })
    ], ShareUser.prototype, "end_subscrip");
    __decorate([
        typeorm_1.Column({ type: 'int' })
    ], ShareUser.prototype, "num_unite");
    __decorate([
        typeorm_1.Column({ type: 'boolean', "default": true })
    ], ShareUser.prototype, "status");
    __decorate([
        typeorm_1.OneToOne(function () { return share_entity_1.Share; }, function (share) { return share.shareUser; }),
        typeorm_1.JoinColumn({ name: 'share_id' }) // Specifies that "share_id" is the foreign key
    ], ShareUser.prototype, "share");
    __decorate([
        typeorm_1.OneToMany(function () { return profitShare_entity_1.ProfitShare; }, function (profitShare) { return profitShare.profitShare; }),
        typeorm_1.JoinColumn({ name: 'share_users_id' })
    ], ShareUser.prototype, "profitShare");
    __decorate([
        typeorm_1.Column({ type: 'int' })
    ], ShareUser.prototype, "profit");
    __decorate([
        typeorm_1.Column()
    ], ShareUser.prototype, "amount");
    __decorate([
        typeorm_1.Column()
    ], ShareUser.prototype, "HashID");
    __decorate([
        typeorm_1.Column({ type: 'timestamp', "default": function () { return 'CURRENT_TIMESTAMP'; } })
    ], ShareUser.prototype, "created_at");
    __decorate([
        typeorm_1.Column({ type: 'timestamp', "default": function () { return 'CURRENT_TIMESTAMP'; }, onUpdate: 'CURRENT_TIMESTAMP' })
    ], ShareUser.prototype, "updated_at");
    ShareUser = __decorate([
        typeorm_1.Entity('share_users')
    ], ShareUser);
    return ShareUser;
}());
exports.ShareUser = ShareUser;
