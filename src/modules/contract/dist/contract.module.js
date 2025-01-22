"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContractModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var contract_entity_1 = require("./entity/contract.entity");
var contract_controller_1 = require("./controller/contract.controller");
var contract_service_1 = require("./service/contract.service");
var ContractModule = /** @class */ (function () {
    function ContractModule() {
    }
    ContractModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([contract_entity_1.ContractEntity])],
            controllers: [contract_controller_1.ContractController],
            providers: [contract_service_1.ContractService],
            exports: [contract_service_1.ContractService]
        })
    ], ContractModule);
    return ContractModule;
}());
exports.ContractModule = ContractModule;
