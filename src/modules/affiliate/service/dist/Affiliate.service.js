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
exports.AffiliateService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var affilite_entity_1 = require("../entity/affilite.entity");
var RewardAffiliate_1 = require("../entity/RewardAffiliate");
var AffiliateService = /** @class */ (function () {
    function AffiliateService(affiliateRepository, RewardAffiliateRepository) {
        this.affiliateRepository = affiliateRepository;
        this.RewardAffiliateRepository = RewardAffiliateRepository;
    }
    AffiliateService.prototype.getAffiliatesByGeneration = function (userId, gen) {
        return __awaiter(this, void 0, Promise, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.affiliateRepository.find({
                                where: { upline_id: userId, generations: gen },
                                relations: ['user'],
                                select: {
                                    user: {
                                        id: true,
                                        name: true,
                                        email: true,
                                        img: true
                                    }
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error fetching generation " + gen + " affiliates: ", error_1);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AffiliateService.prototype.getRewardByGen = function (gen) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.RewardAffiliateRepository.findOne({
                                where: { gen: gen }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error fetching reward for generation " + gen + ": ", error_2);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AffiliateService.prototype.handelAffiliate = function (userId, uplineId, numuUnit, amount, bufferId, gen, queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var reward, profitUsers, createNewAffiliate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(gen === 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getAllRewardByGen(1)];
                    case 1:
                        reward = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getAllRewardByGen(2)];
                    case 3:
                        reward = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!reward) {
                            throw new Error("No reward found for gen: " + gen);
                        }
                        profitUsers = numuUnit * reward.reward;
                        createNewAffiliate = this.affiliateRepository.create({
                            user_id: userId,
                            upline_id: uplineId,
                            amount: amount,
                            buffer_id: bufferId,
                            generations: gen,
                            num_unit: numuUnit,
                            profit_users: profitUsers
                        });
                        return [4 /*yield*/, queryRunner.manager.save(createNewAffiliate)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AffiliateService.prototype.getAllReward = function () {
        return this.RewardAffiliateRepository.find();
    };
    AffiliateService.prototype.getAllRewardByGen = function (gen) {
        return this.RewardAffiliateRepository.findOne({
            where: { gen: gen }
        });
    };
    // async reponse(userId){
    //   const genration1=await this.getAllRewardByGen(1)
    //   const genration2=await this.getAllRewardByGen(2)
    //   "data" => [
    //     'direct' => [
    //         'target' => genration1.target,
    //         'salary'=>genration1.salary,
    //         // 'user_salary'=>genration1.,
    //         'reward' => genration1.reward, 
    //         'user' => await this.getAll(userId)
    //     ], 'indirect' => [
    //         'target' => genration2.target,
    //         'salary'=>genration2.salary,
    //           // 'user_salary'=>0,
    //         'commission' => genration2.reward, 
    //         'user' => await this.getAll(userId)
    //     ]
    // ]
    // }
    AffiliateService.prototype.getResponse = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, genration1, genration2, directAffiliates, indirectAffiliates, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, Promise.all([
                                this.getRewardByGen(1),
                                this.getRewardByGen(2),
                            ])];
                    case 1:
                        _a = _b.sent(), genration1 = _a[0], genration2 = _a[1];
                        // Ensure both genration data are available
                        if (!genration1 || !genration2) {
                            throw new Error('Failed to retrieve generation data');
                        }
                        return [4 /*yield*/, this.getAffiliatesByGeneration(userId, 1)];
                    case 2:
                        directAffiliates = _b.sent();
                        return [4 /*yield*/, this.getAffiliatesByGeneration(userId, 2)];
                    case 3:
                        indirectAffiliates = _b.sent();
                        return [2 /*return*/, {
                                data: {
                                    direct: {
                                        target: genration1.target,
                                        salary: genration1.salary,
                                        reward: genration1.reward,
                                        userSalary: 0,
                                        user: directAffiliates
                                    },
                                    indirect: {
                                        target: genration2.target,
                                        salary: genration2.salary,
                                        reward: genration2.reward,
                                        userSalary: 0,
                                        user: indirectAffiliates
                                    }
                                }
                            }];
                    case 4:
                        error_3 = _b.sent();
                        console.error('Error generating response: ', error_3);
                        return [2 /*return*/, {
                                data: {
                                    direct: {},
                                    indirect: {}
                                }
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AffiliateService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(affilite_entity_1.MarketingFees)),
        __param(1, typeorm_1.InjectRepository(RewardAffiliate_1.RewardAffiliate))
    ], AffiliateService);
    return AffiliateService;
}());
exports.AffiliateService = AffiliateService;
