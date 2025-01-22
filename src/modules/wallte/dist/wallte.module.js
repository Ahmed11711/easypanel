"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WalletModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var wallet_entity_1 = require("./entity/wallet.entity");
var wallte_controller_1 = require("./controller/wallte.controller");
var wallte_service_1 = require("./service/wallte.service");
var pagination_service_1 = require("src/common/pagination/service/pagination.service");
var buyWallet_entity_1 = require("./entity/buyWallet.entity");
var profitWallte_entity_1 = require("./entity/profitWallte.entity");
var user_module_1 = require("../user/user.module");
var create_pdf_service_1 = require("src/common/generatePdf/create-pdf.service");
var share_module_1 = require("../shares/share.module");
var contract_module_1 = require("../contract/contract.module");
var afflite_module_1 = require("../affiliate/afflite.module");
// import { ContractService } from '../../contract/service/contract.service';
var WalletModule = /** @class */ (function () {
    function WalletModule() {
    }
    WalletModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([wallet_entity_1.Wallet, buyWallet_entity_1.BuyWallet, profitWallte_entity_1.ProfitWallte]), user_module_1.UserModule, share_module_1.ShareModule, contract_module_1.ContractModule, afflite_module_1.AffiliateModule],
            controllers: [wallte_controller_1.WalletController],
            providers: [wallte_service_1.WalletService, pagination_service_1.PaginationService, create_pdf_service_1.PdfService],
            exports: [wallte_service_1.WalletService]
        })
    ], WalletModule);
    return WalletModule;
}());
exports.WalletModule = WalletModule;
