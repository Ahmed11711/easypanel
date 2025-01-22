"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var typeorm_1 = require("@nestjs/typeorm");
var user_module_1 = require("./modules/user/user.module");
var config_1 = require("@nestjs/config");
var core_1 = require("@nestjs/core");
var userKyc_module_1 = require("./modules/userKyc/userKyc.module");
var projects_module_1 = require("./modules/projects/projects.module");
var wallte_module_1 = require("./modules/wallte/wallte.module");
var country_module_1 = require("./modules/country/country.module");
var ads_module_1 = require("./modules/ads/ads.module");
var devolper_module_1 = require("./modules/devolper/devolper.module");
var deposite_module_1 = require("./modules/deposite/deposite.module");
var jwt_auth_guard_1 = require("./modules/auth/guards/jwt-auth.guard");
var auth_module_1 = require("./modules/auth/auth.module");
var database_config_1 = require("./config/database.config");
var deviceAccess_module_1 = require("./modules/device-access/deviceAccess.module");
var userWallte_module_1 = require("./modules/user-wallte/userWallte.module");
var notfication_module_1 = require("./modules/notfication/notfication.module");
var pinCode_module_1 = require("./modules/pin-code/pinCode.module");
var transaction_module_1 = require("./modules/transaction-history/transaction.module");
var withdraw_module_1 = require("./modules/withdraw/withdraw.module");
var cashHand_module_1 = require("./modules/cash-hand/cashHand.module");
var contract_module_1 = require("./modules/contract/contract.module");
var share_module_1 = require("./modules/shares/share.module");
var blog_module_1 = require("./modules/blogs/blog.module");
var afflite_module_1 = require("./modules/affiliate/afflite.module");
var price_share_module_1 = require("./modules/price-share/price-share.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true
                }),
                typeorm_1.TypeOrmModule.forRoot(database_config_1.databaseConfig),
                auth_module_1.AuthModule,
                user_module_1.UserModule,
                userKyc_module_1.UserKycModule,
                wallte_module_1.WalletModule,
                projects_module_1.ProjectModule,
                country_module_1.CountryModule,
                ads_module_1.AdsModule,
                devolper_module_1.DevolperModule,
                deposite_module_1.DepositeModule,
                deviceAccess_module_1.DeviceModule,
                userWallte_module_1.UserWaalteModule,
                notfication_module_1.NotficatioModule,
                pinCode_module_1.PinCodeModule,
                transaction_module_1.TransactionHistoreyModule,
                withdraw_module_1.WithdrawModule,
                cashHand_module_1.InvoiceModule,
                contract_module_1.ContractModule,
                share_module_1.ShareModule,
                blog_module_1.BlogModule,
                afflite_module_1.AffiliateModule,
                price_share_module_1.PriceShareModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                app_service_1.AppService,
                {
                    provide: core_1.APP_GUARD,
                    useClass: jwt_auth_guard_1.JwtAuthGuard
                },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
