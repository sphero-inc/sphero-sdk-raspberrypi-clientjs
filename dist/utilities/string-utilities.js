"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function padWithZeros(value, padCount, padValue) {
    return Array(padCount - String(value).length + 1).join(padValue || '0') + value;
}
exports.padWithZeros = padWithZeros;
function isStringNullOrEmpty(value) {
    if (!value) {
        return true;
    }
    if (value.length == 0) {
        return true;
    }
    return false;
}
exports.isStringNullOrEmpty = isStringNullOrEmpty;
function isStringNullOrWhitespace(value) {
    if (!value) {
        return true;
    }
    if (value.trim().length == 0) {
        return true;
    }
    return false;
}
exports.isStringNullOrWhitespace = isStringNullOrWhitespace;
//# sourceMappingURL=string-utilities.js.map