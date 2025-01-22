"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.OtpController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var rest_otp_dto_1 = require("../dto/rest-otp.dto");
var check_otp_dto_1 = require("../dto/check-otp.dto");
var isPublic_decorator_1 = require("src/modules/auth/decorator/isPublic.decorator");
var get_current_user_1 = require("src/modules/auth/decorator/get-current-user");
var OtpController = /** @class */ (function () {
    function OtpController(otpService) {
        this.otpService = otpService;
    }
    OtpController.prototype.checkOtp = function (otpData) {
        return this.otpService.checkOtp(otpData);
    };
    OtpController.prototype.resendotp = function (data) {
        return this.otpService.resndOtp(data);
    };
    OtpController.prototype.resendotpChangeEmail = function (data, user) {
        return this.otpService.resndOtpForChangePassword(data, user);
    };
    __decorate([
        swagger_1.ApiOperation({ summary: 'Verify OTP for a user' }),
        swagger_1.ApiBody({
            description: 'Data required to check the OTP',
            type: check_otp_dto_1.CheckOtpDto
        }),
        swagger_1.ApiResponse({ status: 201, description: 'OTP verified successfully' }),
        swagger_1.ApiResponse({
            status: 404,
            description: 'The email is not found or the OTP is invalid/expired'
        }),
        isPublic_decorator_1.ISPublic(),
        common_1.Post('check-otp'),
        __param(0, common_1.Body())
    ], OtpController.prototype, "checkOtp");
    __decorate([
        isPublic_decorator_1.ISPublic(),
        swagger_1.ApiOperation({ summary: 'Resend OTP' }),
        swagger_1.ApiBody({ type: rest_otp_dto_1.RestOtpDto }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'OTP resent successfully.',
            type: rest_otp_dto_1.RestOtpDto
        }),
        swagger_1.ApiResponse({ status: 400, description: 'Invalid input data.' }),
        swagger_1.ApiResponse({ status: 404, description: 'User not found.' }),
        common_1.Post('send-otp'),
        __param(0, common_1.Body())
    ], OtpController.prototype, "resendotp");
    __decorate([
        common_1.Post('send-otp-changeEmail'),
        __param(0, common_1.Body()),
        __param(1, get_current_user_1.GetCurrentUser())
    ], OtpController.prototype, "resendotpChangeEmail");
    OtpController = __decorate([
        common_1.Controller('otp'),
        swagger_1.ApiTags('otp')
    ], OtpController);
    return OtpController;
}());
exports.OtpController = OtpController;
