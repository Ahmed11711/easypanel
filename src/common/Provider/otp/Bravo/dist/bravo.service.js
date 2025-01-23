"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.BraveoOtpService = void 0;
var common_1 = require("@nestjs/common");
var axios_1 = require("axios");
var client_1 = require("@sendinblue/client");
var path_1 = require("path");
var handlebars_1 = require("handlebars");
var fs_1 = require("fs");
var BraveoOtpService = /** @class */ (function () {
    function BraveoOtpService() {
        this.transactionalEmailsApi = new client_1.TransactionalEmailsApi();
        this.brevoApiKey = process.env.BREVO_API_KEY;
        this.transactionalEmailsApi.setApiKey(client_1.TransactionalEmailsApiApiKeys.apiKey, this.brevoApiKey);
    }
    // Function to send OTP via Email
    BraveoOtpService.prototype.sendOtpToEmail = function (email, otp) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            sender: { name: process.env.APP_NAME, email: process.env.BREVO_EMAIL },
                            to: [{ email: email }],
                            subject: process.env.APP_NAME,
                            htmlContent: this.templateForSend(otp)
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.transactionalEmailsApi.sendTransacEmail(msg)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        // send to anther provider
                        // this.sendForSupport();
                        console.error('Error sending OTP to email:', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Function to re send OTP via Email
    BraveoOtpService.prototype.resendOtpToEmail = function (email, otp) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            sender: { name: process.env.BREVO_NAME, email: process.env.BREVO_EMAIL },
                            to: [{ email: email }],
                            subject: process.env.APP_NAME,
                            htmlContent: this.templateForReSend(otp)
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.transactionalEmailsApi.sendTransacEmail(msg)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        // send to anther provider
                        // this.sendForSupport();
                        console.error('Error sending OTP to email:', error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Function to send OTP via SMS
    BraveoOtpService.prototype.sendOtpToSms = function (phoneNumber, otp) {
        return __awaiter(this, void 0, Promise, function () {
            var smsPayload, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        smsPayload = {
                            sender: process.env.BREVO_SMS_SENDER,
                            recipient: ["+" + phoneNumber],
                            content: "Your OTP code is: " + otp
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].post('https://api.brevo.com/v3/transactionalSMS/sms', smsPayload, {
                                headers: {
                                    'api-key': this.brevoApiKey,
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        console.log('OTP sent via SMS:', response.data);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        if (error_3.response) {
                            console.error('Error response from Brevo:', error_3.response.data);
                        }
                        else {
                            console.error('Error sending OTP via SMS:', error_3.message);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Function to send OTP via WhatsApp
    BraveoOtpService.prototype.sendOtpToWhatsApp = function (phoneNumber, otp) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].post('https://api.brevo.com/v3/whatsapp/sendMessage', {
                                templateId: 123,
                                senderNumber: process.env.BREVO_WHATSAPP_SENDER,
                                contactNumbers: [phoneNumber],
                                parameters: {
                                    otp: otp
                                }
                            }, {
                                headers: {
                                    'api-key': this.brevoApiKey,
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        console.log('OTP sent via WhatsApp:', response.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        if (error_4.response) {
                            console.error('Error response:', error_4.response.data);
                            console.error('Status code:', error_4.response.status);
                        }
                        else {
                            console.error('Error sending OTP via WhatsApp:', error_4.message);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Support Function for additional checks or info
    BraveoOtpService.prototype.sendForSupport = function () {
        return __awaiter(this, void 0, Promise, function () {
            var email, otp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = process.env.EMAIL_SUPPORT;
                        otp = 'Pleas Check Brave For Send Email';
                        return [4 /*yield*/, this.sendOtpToEmail(email, otp)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BraveoOtpService.prototype.templateSend = function (email, otp) {
        return __awaiter(this, void 0, Promise, function () {
            var templatePath, templateSource, template, htmlTemplate, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        templatePath = path_1.join(__dirname, 'views', 'otp-email.hbs');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs_1.promises.readFile(templatePath, 'utf-8')];
                    case 2:
                        templateSource = _a.sent();
                        template = handlebars_1.compile(templateSource);
                        htmlTemplate = template({ otp: otp });
                        return [2 /*return*/, htmlTemplate]; // Ensure the rendered HTML is returned
                    case 3:
                        err_1 = _a.sent();
                        console.error('Error reading the template file:', err_1);
                        throw new Error('Template not found');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BraveoOtpService.prototype.templateForSend = function (otp) {
        var htmlContent = "\n    <html>\n      <head>\n        <style>\n          body {\n            font-family: Arial, sans-serif;\n            background-color: #f1f5f9;\n            margin: 0;\n            padding: 20px;\n          }\n          .container {\n            max-width: 600px;\n            margin: auto;\n            background-color: #ffffff;\n            padding: 30px;\n            border-radius: 10px;\n            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n            border: 1px solid #e2e8f0;\n          }\n          h1 {\n            color: #1a202c;\n            font-size: 24px;\n            text-align: center;\n            margin-bottom: 20px;\n          }\n          .otp-code {\n            font-size: 30px;\n            font-weight: bold;\n            color: #2b6cb0;\n            text-align: center;\n            margin: 20px 0;\n          }\n          .message {\n            color: #4a5568;\n            font-size: 16px;\n            text-align: center;\n            line-height: 1.6;\n          }\n          .footer {\n            margin-top: 25px;\n            font-size: 12px;\n            color: #a0aec0;\n            text-align: center;\n            border-top: 1px solid #e2e8f0;\n            padding-top: 15px;\n          }\n        </style>\n      </head>\n      <body>\n        <div class=\"container\">\n          <h1>Welcome to Investment</h1>\n          <p class=\"message\">You requested a new OTP for verification. Please find it below:</p>\n          <div class=\"otp-code\">" + otp + "</div>\n          <p class=\"message\">Enter this code in the application to complete your verification process.</p>\n          <div class=\"footer\">\n            <p>If you did not request this, please disregard this email.</p>\n            <p>&copy; " + new Date().getFullYear() + " Investment. All rights reserved.</p>\n          </div>\n        </div>\n      </body>\n    </html>\n  ";
        return htmlContent; // Return the HTML content for resending OTP
    };
    BraveoOtpService.prototype.templateForReSend = function (otp) {
        var htmlContent = "\n    <html>\n      <head>\n        <style>\n          body {\n            font-family: Arial, sans-serif;\n            background-color: #f1f5f9;\n            margin: 0;\n            padding: 20px;\n          }\n          .container {\n            max-width: 600px;\n            margin: auto;\n            background-color: #ffffff;\n            padding: 30px;\n            border-radius: 10px;\n            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n            border: 1px solid #e2e8f0;\n          }\n          h1 {\n            color: #1a202c;\n            font-size: 24px;\n            text-align: center;\n            margin-bottom: 20px;\n          }\n          .otp-code {\n            font-size: 30px;\n            font-weight: bold;\n            color: #2b6cb0;\n            text-align: center;\n            margin: 20px 0;\n          }\n          .message {\n            color: #4a5568;\n            font-size: 16px;\n            text-align: center;\n            line-height: 1.6;\n          }\n          .footer {\n            margin-top: 25px;\n            font-size: 12px;\n            color: #a0aec0;\n            text-align: center;\n            border-top: 1px solid #e2e8f0;\n            padding-top: 15px;\n          }\n        </style>\n      </head>\n      <body>\n        <div class=\"container\">\n          <h1>Welcome to Investment</h1>\n          <p class=\"message\">You requested a new OTP for verification. Please find it below:</p>\n          <div class=\"otp-code\">" + otp + "</div>\n          <p class=\"message\">Enter this code in the application to complete your verification process.</p>\n          <div class=\"footer\">\n            <p>If you did not request this, please disregard this email.</p>\n            <p>&copy; " + new Date().getFullYear() + " Investment. All rights reserved.</p>\n          </div>\n        </div>\n      </body>\n    </html>\n  ";
        return htmlContent;
    };
    BraveoOtpService = __decorate([
        common_1.Injectable()
    ], BraveoOtpService);
    return BraveoOtpService;
}());
exports.BraveoOtpService = BraveoOtpService;
