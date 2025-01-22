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
exports.PinCodeService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var pinCode_entity_1 = require("../entity/pinCode.entity");
var PinCodeService = /** @class */ (function () {
    function PinCodeService(pinCodeService, hashService, wallteService) {
        this.pinCodeService = pinCodeService;
        this.hashService = hashService;
        this.wallteService = wallteService;
    }
    PinCodeService.prototype.storePinCode = function (data, user) {
        return __awaiter(this, void 0, Promise, function () {
            var checkIfFound, hashPinCode, createPinCode, storePinCode, crateWallte;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checlkIsExsiste(user.userId)];
                    case 1:
                        checkIfFound = _a.sent();
                        if (checkIfFound) {
                            throw new common_1.ConflictException('The record already exists.');
                        }
                        return [4 /*yield*/, this.hashService.hashText(data.pinCode)];
                    case 2:
                        hashPinCode = _a.sent();
                        createPinCode = this.pinCodeService.create({
                            user_id: user.userId,
                            pin_code: hashPinCode
                        });
                        return [4 /*yield*/, this.pinCodeService.save(createPinCode)];
                    case 3:
                        storePinCode = _a.sent();
                        return [4 /*yield*/, this.wallteService.createWallet(user.userId, data.pinCode)];
                    case 4:
                        crateWallte = _a.sent();
                        return [2 /*return*/, {
                                message: 'success to create pincode'
                            }];
                }
            });
        });
    };
    PinCodeService.prototype.checkVerfied = function (data, user) {
        return __awaiter(this, void 0, void 0, function () {
            var myPinCode, pincode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checlkIsExsiste(user.userId)];
                    case 1:
                        myPinCode = _a.sent();
                        if (!myPinCode) {
                            throw new common_1.NotFoundException('Plese Insert The Pin Code First');
                        }
                        return [4 /*yield*/, this.hashService.verifyText(data.pinCode, myPinCode.pin_code)];
                    case 2:
                        pincode = _a.sent();
                        if (pincode) {
                            return [2 /*return*/, {
                                    message: 'The PIN code is correct'
                                }];
                        }
                        throw new common_1.UnauthorizedException('The PIN code is incorrect');
                }
            });
        });
    };
    PinCodeService.prototype.checlkIsExsiste = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var get;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pinCodeService.findOne({
                            where: { user_id: userId }
                        })];
                    case 1:
                        get = _a.sent();
                        return [2 /*return*/, get];
                }
            });
        });
    };
    PinCodeService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(pinCode_entity_1.PinCodeEntity))
    ], PinCodeService);
    return PinCodeService;
}());
exports.PinCodeService = PinCodeService;
