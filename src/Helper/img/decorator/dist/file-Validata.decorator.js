"use strict";
exports.__esModule = true;
exports.FileValidation = void 0;
var common_1 = require("@nestjs/common");
var path = require("path");
exports.FileValidation = common_1.createParamDecorator(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    var files = request.files;
    if (!files || files.length === 0) {
        throw new common_1.BadRequestException([
            'You must upload upload the front_id_image and back_id_image and face_image',
        ]);
    }
    var allowedTypes = ['.jpg', '.jpeg', '.png', '.gif'];
    var maxFileSize = 5 * 1024 * 1024; // 5 MB
    // Ensure the required files exist
    var faceImg = files.find(function (file) { return file.fieldname === 'front_id_image'; });
    var backImg = files.find(function (file) { return file.fieldname === 'back_id_image'; });
    var faceRealImg = files.find(function (file) { return file.fieldname === 'face_image'; });
    if (!faceImg) {
        throw new common_1.BadRequestException(['You must upload the front_id_image.']);
    }
    if (!backImg) {
        throw new common_1.BadRequestException(['You must upload the back_id_image.']);
    }
    if (!faceRealImg) {
        throw new common_1.BadRequestException(['You must upload the face_image.']);
    }
    // Validate file types and sizes
    [faceImg, backImg].forEach(function (file) {
        var ext = path.extname(file.originalname).toLowerCase();
        if (file.size > maxFileSize) {
            throw new common_1.BadRequestException([
                file.fieldname + " file size exceeds the maximum allowed size of 5MB.",
            ]);
        }
    });
    return files; // Return the validated files
});
