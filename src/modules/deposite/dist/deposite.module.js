"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DepositeModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var deposite_entity_1 = require("./entity/deposite.entity");
var deposite_controller_1 = require("./controller/deposite.controller");
var deposite_service_1 = require("./service/deposite.service");
var pagination_service_1 = require("src/common/pagination/service/pagination.service");
var DepositeModule = /** @class */ (function () {
    function DepositeModule() {
    }
    DepositeModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([deposite_entity_1.Deposite])],
            controllers: [deposite_controller_1.DepositeController],
            providers: [deposite_service_1.DepositeService, pagination_service_1.PaginationService],
            exports: [deposite_service_1.DepositeService]
        })
    ], DepositeModule);
    return DepositeModule;
}());
exports.DepositeModule = DepositeModule;
