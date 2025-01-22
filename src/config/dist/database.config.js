"use strict";
exports.__esModule = true;
exports.databaseConfig = void 0;
var ads_entity_1 = require("src/modules/ads/entity/ads.entity");
var affilite_entity_1 = require("src/modules/affiliate/entity/affilite.entity");
var RewardAffiliate_1 = require("src/modules/affiliate/entity/RewardAffiliate");
var blog_entity_1 = require("src/modules/blogs/entity/blog.entity");
var invoice_entity_1 = require("src/modules/cash-hand/entity/invoice.entity");
var contract_entity_1 = require("src/modules/contract/entity/contract.entity");
var country_entity_1 = require("src/modules/country/entity/country.entity");
var deposite_entity_1 = require("src/modules/deposite/entity/deposite.entity");
var device_entity_1 = require("src/modules/device-access/entity/device.entity");
var devolper_entity_1 = require("src/modules/devolper/entity/devolper.entity");
var notifcation_entity_1 = require("src/modules/notfication/entity/notifcation.entity");
var otp_entity_1 = require("src/modules/otp/entity/otp.entity");
var pinCode_entity_1 = require("src/modules/pin-code/entity/pinCode.entity");
var price_share_entity_1 = require("src/modules/price-share/entity/price-share.entity");
var projects_entity_1 = require("src/modules/projects/entity/projects.entity");
var profitShare_entity_1 = require("src/modules/shares/entity/profitShare.entity");
var share_entity_1 = require("src/modules/shares/entity/share.entity");
var shareUser_entity_1 = require("src/modules/shares/entity/shareUser.entity");
var userWallte_entity_1 = require("src/modules/user-wallte/entity/userWallte.entity");
var user_entity_1 = require("src/modules/user/entity/user.entity");
var userKyc_entity_1 = require("src/modules/userKyc/entity/userKyc.entity");
var buyWallet_entity_1 = require("src/modules/wallte/entity/buyWallet.entity");
var profitWallte_entity_1 = require("src/modules/wallte/entity/profitWallte.entity");
var wallet_entity_1 = require("src/modules/wallte/entity/wallet.entity");
var withdraw_entinty_1 = require("src/modules/withdraw/entity/withdraw.entinty");
exports.databaseConfig = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'investment',
    entities: [
        user_entity_1.User,
        userKyc_entity_1.UserKyc,
        deposite_entity_1.Deposite,
        otp_entity_1.Otp,
        device_entity_1.Device,
        userWallte_entity_1.UserWallte,
        notifcation_entity_1.Notfication,
        ads_entity_1.Ads,
        country_entity_1.Country,
        devolper_entity_1.Devolper,
        wallet_entity_1.Wallet,
        projects_entity_1.Project,
        pinCode_entity_1.PinCodeEntity,
        withdraw_entinty_1.Withdraw,
        invoice_entity_1.InvoiceEntity,
        buyWallet_entity_1.BuyWallet,
        profitWallte_entity_1.ProfitWallte,
        contract_entity_1.ContractEntity,
        share_entity_1.Share,
        shareUser_entity_1.ShareUser,
        blog_entity_1.Blog,
        affilite_entity_1.MarketingFees,
        RewardAffiliate_1.RewardAffiliate,
        profitShare_entity_1.ProfitShare,
        price_share_entity_1.PriceShare
    ],
    synchronize: false
};
