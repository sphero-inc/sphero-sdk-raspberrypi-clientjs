"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// internal imports
var string_utilities_1 = require("./string-utilities");
function getDateAsString(dt) {
    if (!dt) {
        throw new Error('Date is required!');
    }
    var dtText = string_utilities_1.padWithZeros(dt.getMonth() + 1, 2) + '/'
        + string_utilities_1.padWithZeros(dt.getDate(), 2) + '/'
        + dt.getFullYear() + ' @ '
        + string_utilities_1.padWithZeros(dt.getHours() + 1, 2) + ':'
        + string_utilities_1.padWithZeros(dt.getMinutes(), 2) + ':'
        + string_utilities_1.padWithZeros(dt.getSeconds(), 2) + '.'
        + string_utilities_1.padWithZeros(dt.getMilliseconds(), 3);
    return dtText;
}
exports.getDateAsString = getDateAsString;
//# sourceMappingURL=date-time-utilities.js.map