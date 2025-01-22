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
exports.PdfService = void 0;
var common_1 = require("@nestjs/common");
var PDFDocument = require("pdfkit");
var fs = require("fs");
var path = require("path");
var PdfService = /** @class */ (function () {
    function PdfService() {
    }
    PdfService.prototype.createAndUploadPdf = function (userId, userEmail, numberOfUnits, pricePerUnit, totalCost, uploadDir) {
        return __awaiter(this, void 0, Promise, function () {
            var fileName, filePath, doc, writeStream, contractContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create directory if it doesn't exist
                        if (!fs.existsSync(uploadDir)) {
                            fs.mkdirSync(uploadDir, { recursive: true });
                        }
                        fileName = "user_" + userId + "_" + Date.now() + ".pdf";
                        filePath = path.join(uploadDir, fileName);
                        doc = new PDFDocument();
                        writeStream = fs.createWriteStream(filePath);
                        doc.pipe(writeStream);
                        // Title of the document
                        doc.fontSize(18).text('User Agreement and Purchase Contract', { align: 'center' });
                        doc.moveDown(1);
                        contractContent = "\n    This Agreement is entered into by and between:\n\n    User Email: " + userEmail + "\n    Date: " + new Date().toLocaleDateString() + "\n\n    Terms of the Agreement:\n\n    1. Units Purchased:\n        The user agrees to purchase a total of " + numberOfUnits + " unit(s) at a price of $" + pricePerUnit + " per unit.\n    \n    2. Total Payment:\n        The total cost of the purchased units amounts to $" + totalCost + ".\n    \n    3. Payment Terms:\n        The user agrees to make the payment in full. Payment should be completed by [insert payment method].\n\n    4. Delivery Terms:\n        Delivery of the purchased units will occur within [insert number of days] days after payment is received.\n\n    5. Warranty:\n        The purchased units come with a warranty period of [insert warranty period] from the date of delivery.\n\n    6. Refund and Return Policy:\n        The user has the right to request a refund or return the units within [insert return period] if the product is found to be defective or not as described.\n\n    7. User Obligations:\n        The user agrees to use the purchased units only for their intended purpose, and in accordance with the terms outlined in this agreement.\n\n    8. Termination of Agreement:\n        Either party may terminate the agreement in case of a breach by the other party.\n\n    9. Confidentiality:\n        Both parties agree to maintain confidentiality regarding all terms of this contract.\n\n    Signature of the Company Representative: ___________________________\n    Signature of the User: ___________________________\n    ";
                        // Add the contract content to the PDF
                        doc.fontSize(12).text(contractContent, {
                            align: 'left',
                            paragraphGap: 5,
                            lineGap: 5
                        });
                        // Finalizing the PDF file
                        doc.end();
                        // Wait for the file to finish writing
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                writeStream.on('finish', resolve);
                                writeStream.on('error', reject);
                            })];
                    case 1:
                        // Wait for the file to finish writing
                        _a.sent();
                        return [2 /*return*/, filePath]; // Return the file path for further use
                }
            });
        });
    };
    PdfService.prototype.createPdf = function (userId, bufferId, pathUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    PdfService = __decorate([
        common_1.Injectable()
    ], PdfService);
    return PdfService;
}());
exports.PdfService = PdfService;
