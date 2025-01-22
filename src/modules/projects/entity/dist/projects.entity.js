"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Project = void 0;
var wallet_entity_1 = require("src/modules/wallte/entity/wallet.entity");
var typeorm_1 = require("typeorm");
var Project = /** @class */ (function () {
    function Project() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Project.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Project.prototype, "img");
    __decorate([
        typeorm_1.Column()
    ], Project.prototype, "title");
    __decorate([
        typeorm_1.Column()
    ], Project.prototype, "desc");
    __decorate([
        typeorm_1.Column({ type: 'json', nullable: true })
    ], Project.prototype, "filenames");
    __decorate([
        typeorm_1.Column()
    ], Project.prototype, "address");
    __decorate([
        typeorm_1.Column()
    ], Project.prototype, "contractPdf");
    __decorate([
        typeorm_1.OneToOne(function () { return wallet_entity_1.Wallet; }, function (asiangmanet) { return asiangmanet.project; })
    ], Project.prototype, "asiangmanet");
    __decorate([
        typeorm_1.CreateDateColumn({ type: 'timestamp' })
    ], Project.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn({ type: 'timestamp' })
    ], Project.prototype, "updated_at");
    Project = __decorate([
        typeorm_1.Entity('project_walttes')
    ], Project);
    return Project;
}());
exports.Project = Project;
