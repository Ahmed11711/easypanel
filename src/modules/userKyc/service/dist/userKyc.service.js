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
exports.UserKycService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var userKyc_entity_1 = require("../entity/userKyc.entity");
var user_kyc_enum_1 = require("../enum/user-kyc.enum");
var UserKycService = /** @class */ (function () {
    function UserKycService(userKycService, fileService) {
        this.userKycService = userKycService;
        this.fileService = fileService;
    }
    UserKycService.prototype.storeKyc = function (data, files, user) {
        return __awaiter(this, void 0, Promise, function () {
            var checkRecord, uploadedFiles, uploadPromises, newKyc;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkIfRecordExists(user.userId)];
                    case 1:
                        checkRecord = _a.sent();
                        if (checkRecord) {
                            throw new common_1.ConflictException('The user kety with this ID already exists.');
                        }
                        uploadedFiles = {
                            front_id_image: null,
                            back_id_image: null,
                            face_image: null
                        };
                        uploadPromises = files.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                            var uploadedUrl;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.fileService.uploadFile(file, 'kyc')];
                                    case 1:
                                        uploadedUrl = _a.sent();
                                        uploadedFiles[file.fieldname] = uploadedUrl;
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(uploadPromises)];
                    case 2:
                        _a.sent();
                        newKyc = this.userKycService.create({
                            fullname: data.fullname,
                            international_id: data.international_id,
                            front_id_image: uploadedFiles.front_id_image,
                            back_id_image: uploadedFiles.back_id_image,
                            face_image: uploadedFiles.face_image,
                            active: user_kyc_enum_1.typeStatusKyc.PENDING,
                            user_id: user.userId
                        });
                        this.userKycService.save(newKyc);
                        return [2 /*return*/, {
                                message: 'Operation stored successfully'
                            }];
                }
            });
        });
    };
    UserKycService.prototype.checkIfRecordExists = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userKycService.findOne({
                            where: { user_id: userId }
                        })];
                    case 1:
                        record = _a.sent();
                        return [2 /*return*/, record ? true : false];
                }
            });
        });
    };
    UserKycService.prototype.getMyKyc = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userKycService.findOne({
                            where: { user_id: userId }
                        })];
                    case 1:
                        record = _a.sent();
                        return [2 /*return*/, record];
                }
            });
        });
    };
    UserKycService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(userKyc_entity_1.UserKyc))
    ], UserKycService);
    return UserKycService;
}());
exports.UserKycService = UserKycService;
