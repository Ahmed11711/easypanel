"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var AuthGateway = /** @class */ (function () {
    function AuthGateway() {
    }
    AuthGateway.prototype.handleConnection = function (client) {
        console.log('Client connected:', client.id);
    };
    AuthGateway.prototype.handleDisconnect = function (client) {
        console.log('Client disconnected:', client.id);
    };
    AuthGateway.prototype.notifyLoginApproval = function (transactionId) {
        try {
            console.log("Notifying login approval for userId: " + transactionId);
            this.server.emit("loginApproved_" + transactionId, {
                message: 'scanned success'
            });
        }
        catch (error) {
            console.error('Error emitting login approval:', error);
        }
    };
    __decorate([
        websockets_1.WebSocketServer()
    ], AuthGateway.prototype, "server");
    AuthGateway = __decorate([
        websockets_1.WebSocketGateway({ cors: { origin: true } }) // Enable CORS
    ], AuthGateway);
    return AuthGateway;
}());
exports.AuthGateway = AuthGateway;
