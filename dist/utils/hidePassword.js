"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hidePassword = void 0;
const hidePassword = (user) => {
    if (!user)
        return user;
    const { password, ...safeUser } = user;
    return safeUser; // return user without password
};
exports.hidePassword = hidePassword;
