"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUS_CODES = exports.SUCCESS_MESSAGES = exports.ERROR_MESSAGE = exports.Roles = void 0;
exports.Roles = {
    Admin: "Admin",
    Normal: "Normal",
};
exports.ERROR_MESSAGE = {
    _NotFound(str) {
        return `${str} is not found`;
    },
    _NotMatch(str) {
        return `${str} is not match`;
    },
    _Internal_Server_Error() {
        return `Internal Server Error`;
    },
    _Bad_Request() {
        return `Could not understand the request because of invalid syntax`;
    },
    _Unauthorized(str) {
        return `You are not authorized to ${str}`;
    },
    _Conflict(str) {
        return `${str} already exists`;
    },
};
exports.SUCCESS_MESSAGES = {
    _Ok(str) {
        return `${str} successfully done`;
    },
};
exports.HTTP_STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};
