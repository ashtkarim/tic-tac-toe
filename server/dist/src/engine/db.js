"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017/tic-tac-toe').then(() => {
    console.log('db is connected');
}).catch(() => {
    console.log('couldn\'t connect');
});
exports.default = mongoose_1.default;
