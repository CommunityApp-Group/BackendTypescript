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
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./src/utils/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./src/database"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || Number(8000);
console.log(PORT);
function onListening() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Listening on port ${PORT}`);
    });
}
app.get("/", (_req, res) => {
    res.send("Community App Backend Server");
});
// app.listen(PORT, onListening)
app.listen(PORT, () => {
    (0, database_1.default)(),
        (0, logger_1.default)(module).error(`⚡️[server]: Server is running at port ${PORT}`);
    console.log(`server is running on ${PORT}`);
});
