"use strict";
exports.__esModule = true;
exports.ImageUpload = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var multer_1 = require("multer");
var common_2 = require("@nestjs/common");
var path_1 = require("path");
function ImageUpload(destination) {
    return common_1.applyDecorators(common_1.UseInterceptors(platform_express_1.AnyFilesInterceptor({
        storage: multer_1.diskStorage({
            destination: "uploads/" + destination,
            filename: function (req, file, cb) {
                var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                var ext = path_1.extname(file.originalname);
                var filename = file.fieldname + "-" + uniqueSuffix + ext;
                cb(null, filename);
            }
        }),
        fileFilter: function (req, file, cb) {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                cb(new common_2.BadRequestException('Unsupported file type'), false);
            }
            else {
                cb(null, true);
            }
        },
        limits: { fileSize: 5 * 1024 * 1024 }
    })));
}
exports.ImageUpload = ImageUpload;
