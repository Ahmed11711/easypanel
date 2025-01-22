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
exports.DeviceController = void 0;
var common_1 = require("@nestjs/common");
var get_current_user_1 = require("src/modules/auth/decorator/get-current-user");
var manger_device_decorator_1 = require("../decorator/manger-device.decorator");
var DeviceController = /** @class */ (function () {
    function DeviceController(deviceService) {
        this.deviceService = deviceService;
    }
    DeviceController.prototype.approveForDeviceLogin = function (user, data) {
        return this.deviceService.approvedLogin(data, user.userId);
    };
    DeviceController.prototype.getMyDevices = function (user) {
        return this.deviceService.getMyDevice(user.userId);
    };
    DeviceController.prototype.updateDevice = function (data, user) {
        return this.deviceService.updateStatusDevice(data, user.userId);
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    DeviceController.prototype.deleteDevice = function (data, user) {
        return this.deviceService.deleteDevice(data, user);
    };
    __decorate([
        common_1.UseGuards(manger_device_decorator_1.ManagerGuard),
        common_1.Post('approve-device'),
        __param(0, get_current_user_1.GetCurrentUser()),
        __param(1, common_1.Body())
    ], DeviceController.prototype, "approveForDeviceLogin");
    __decorate([
        common_1.Post('my-devices'),
        __param(0, get_current_user_1.GetCurrentUser())
    ], DeviceController.prototype, "getMyDevices");
    __decorate([
        common_1.UseGuards(manger_device_decorator_1.ManagerGuard),
        common_1.Post('update-devices'),
        __param(0, common_1.Body()),
        __param(1, get_current_user_1.GetCurrentUser())
    ], DeviceController.prototype, "updateDevice");
    __decorate([
        common_1.UseGuards(manger_device_decorator_1.ManagerGuard),
        common_1.Post('delete-devices'),
        __param(0, common_1.Body()),
        __param(1, get_current_user_1.GetCurrentUser())
    ], DeviceController.prototype, "deleteDevice");
    DeviceController = __decorate([
        common_1.Controller('deviceAccess')
    ], DeviceController);
    return DeviceController;
}());
exports.DeviceController = DeviceController;
