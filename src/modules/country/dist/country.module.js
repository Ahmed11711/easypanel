"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CountryModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var country_entity_1 = require("./entity/country.entity");
var country_controller_1 = require("./controller/country.controller");
var country_service_1 = require("./service/country.service");
var file_upload_service_1 = require("src/Helper/img/service/file-upload.service");
var CountryModule = /** @class */ (function () {
    function CountryModule() {
    }
    CountryModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([country_entity_1.Country])],
            controllers: [country_controller_1.CountryCountroller],
            providers: [country_service_1.CountryService, file_upload_service_1.FileService],
            exports: [country_service_1.CountryService]
        })
    ], CountryModule);
    return CountryModule;
}());
exports.CountryModule = CountryModule;
