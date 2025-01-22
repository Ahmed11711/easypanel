"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InvoiceModule = void 0;
var common_1 = require("@nestjs/common");
var invoice_controller_1 = require("./controller/invoice.controller");
var invoice_service_1 = require("./service/invoice.service");
var file_upload_service_1 = require("src/Helper/img/service/file-upload.service");
var typeorm_1 = require("@nestjs/typeorm");
var invoice_entity_1 = require("./entity/invoice.entity");
var pagination_service_1 = require("src/common/pagination/service/pagination.service");
var InvoiceModule = /** @class */ (function () {
    function InvoiceModule() {
    }
    InvoiceModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([invoice_entity_1.InvoiceEntity])],
            controllers: [invoice_controller_1.InvoiceController],
            providers: [invoice_service_1.InvoiceService, file_upload_service_1.FileService, pagination_service_1.PaginationService],
            exports: [invoice_service_1.InvoiceService]
        })
    ], InvoiceModule);
    return InvoiceModule;
}());
exports.InvoiceModule = InvoiceModule;
