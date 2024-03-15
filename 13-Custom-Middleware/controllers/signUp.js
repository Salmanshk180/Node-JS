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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAuthentication = void 0;
const uuid_1 = require("uuid");
const fs = require("fs");
const data = require("../users.json");
function handleAuthentication(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Request Body:", req.body); // Debugging statement
        const { email, password } = req.body;
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        if (!email) {
            console.log("No email provided"); // Debugging statement
            return res.status(Number(process.env.NO_DATA_FOUND)).json({ error: "Please enter an email" });
        }
        if (!password) {
            console.log("No password provided"); // Debugging statement
            return res.status(Number(process.env.NO_DATA_FOUND)).json({ error: "Please enter a password" });
        }
        if (!emailRegex.test(email)) {
            console.log("Invalid email format"); // Debugging statement
            return res.status(Number(process.env.INVALID_INPUT)).json({ error: "Please enter a valid email" });
        }
        if (!passwordRegex.test(password)) {
            console.log("Invalid password format"); // Debugging statement
            return res.status(Number(process.env.INVALID_INPUT)).json({
                error: "Password should contain at least one lowercase alphabet, one uppercase alphabet, one numeric value, and one special character, and total length must be in the range [8-15]",
            });
        }
        const id = (0, uuid_1.v4)();
        const userExist = yield data.find((user) => user.email === email);
        if (userExist) {
            console.log("User already exists"); // Debugging statement
            return res.status(Number(process.env.USER_EXISTS)).json({ error: "User Already Exist" });
        }
        data.push({ id: id, email, password, role: "Normal" });
        fs.writeFile("./users.json", JSON.stringify(data), (error, data) => {
            if (error) {
                console.error("Error writing to file:", error); // Debugging statement
                return res.status(Number(process.env.SERVER_ERROR)).json({ error: "Internal Server Error" });
            }
            else {
                console.log("User created successfully"); // Debugging statement
                return res.status(Number(process.env.USER_CREATED)).json({ Status: "User Created" });
            }
        });
        console.log("Redirecting to login page"); // Debugging statement
        res.redirect("/api/login");
    });
}
exports.handleAuthentication = handleAuthentication;
