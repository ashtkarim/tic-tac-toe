"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../Models/User"));
const users = (0, express_1.Router)();
users.get('/@me', (req, res) => {
    console.log(req.session);
    // return the session_id
    res.status(200).send(JSON.stringify({ "id": req.session.session_id }));
});
users.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(username, password);
    const user = yield User_1.default.findOne({ username: username });
    if (user && user.password === password) {
        console.log("logged");
        req.session.session_id = '45er';
        // console.log(req.session)
        res.status(200).send(JSON.stringify({ "msg": "logged in" }));
    }
}));
users.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = new User_1.default({ username, password });
    user.save();
    res.status(201).send("user created");
});
exports.default = users;
