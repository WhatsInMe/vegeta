"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
console.log("starting");
var app = express_1.default();
var port = 3000;
app.get("/", function (req, res) {
    res.json({ message: "hello world!" });
});
app.listen(port, function () {
    console.log("running on port " + port);
});
