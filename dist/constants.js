"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// internal imports
var byte_conversion_utilities_1 = require("./utilities/byte-conversion-utilities");
var ApiErrorCodes = /** @class */ (function () {
    function ApiErrorCodes() {
    }
    ApiErrorCodes.getApiErrorMessageFromCode = function (errorCode) {
        var errorMessage = 'Unknown';
        switch (errorCode) {
            case this.success:
                errorMessage = 'Success';
                break;
            case this.badDeviceId:
                errorMessage = 'Bad Device ID';
                break;
            case this.badCommandId:
                errorMessage = 'Bad Command ID';
                break;
            case this.notYetImplemented:
                errorMessage = 'Command Not Implemented';
                break;
            case this.commandIsRestricted:
                errorMessage = 'Restricted Command';
                break;
            case this.badDataLength:
                errorMessage = 'Bad Data Length';
                break;
            case this.commandFailed:
                errorMessage = 'Command Failed';
                break;
            case this.badParameterValue:
                errorMessage = 'Bad Parameter Value';
                break;
            case this.busy:
                errorMessage = 'Busy';
                break;
            case this.badTargetId:
                errorMessage = 'Bad Target ID';
                break;
            case this.targetUnavailable:
                errorMessage = 'Target Unavailable';
                break;
        }
        return errorMessage;
    };
    ApiErrorCodes.success = 0x00;
    ApiErrorCodes.badDeviceId = 0x01;
    ApiErrorCodes.badCommandId = 0x02;
    ApiErrorCodes.notYetImplemented = 0x03;
    ApiErrorCodes.commandIsRestricted = 0x04;
    ApiErrorCodes.badDataLength = 0x05;
    ApiErrorCodes.commandFailed = 0x06;
    ApiErrorCodes.badParameterValue = 0x07;
    ApiErrorCodes.busy = 0x08;
    ApiErrorCodes.badTargetId = 0x09;
    ApiErrorCodes.targetUnavailable = 0x0A;
    return ApiErrorCodes;
}());
exports.ApiErrorCodes = ApiErrorCodes;
var ApiProtocolErrorCodes = /** @class */ (function () {
    function ApiProtocolErrorCodes() {
    }
    ApiProtocolErrorCodes.getApiProtocolErrorMessageFromCode = function (errorCode) {
        var errorMessage = 'Unknown';
        switch (errorCode) {
            case this.badEscapeValue:
                errorMessage = 'Bad Escape Value';
                break;
            case this.badChecksum:
                errorMessage = 'Bad Checksum';
                break;
            case this.earlyEndOfPacket:
                errorMessage = 'Early End of Packet';
                break;
            case this.earlyStartOfPacket:
                errorMessage = 'Early Start of Packet';
                break;
            case this.badFlags:
                errorMessage = 'Bad Flags';
                break;
            case this.skippedData:
                errorMessage = 'Skipped Data';
                break;
        }
        return errorMessage;
    };
    ApiProtocolErrorCodes.badEscapeValue = 0x00;
    ApiProtocolErrorCodes.badChecksum = 0x01;
    ApiProtocolErrorCodes.earlyEndOfPacket = 0x02;
    ApiProtocolErrorCodes.earlyStartOfPacket = 0x03;
    ApiProtocolErrorCodes.badFlags = 0x04;
    ApiProtocolErrorCodes.skippedData = 0x05;
    return ApiProtocolErrorCodes;
}());
exports.ApiProtocolErrorCodes = ApiProtocolErrorCodes;
var ApiFlags = /** @class */ (function () {
    function ApiFlags() {
    }
    ApiFlags.isResponse = 1 << 0;
    ApiFlags.requestsResponse = 1 << 1;
    ApiFlags.requestOnlyErrorResponse = 1 << 2;
    ApiFlags.resetInactivityTimeout = 1 << 3;
    ApiFlags.packetHasTargetId = 1 << 4;
    ApiFlags.packetHasSourceId = 1 << 5;
    //public static readonly unused: number = 1 << 6;
    ApiFlags.extendedFlags = 1 << 7;
    ApiFlags.defaultRequestWithResponseFlags = ((ApiFlags.requestsResponse) | (ApiFlags.resetInactivityTimeout) | (ApiFlags.packetHasTargetId) | (ApiFlags.packetHasSourceId));
    ApiFlags.defaultRequestWithNoResponseFlags = ((ApiFlags.requestOnlyErrorResponse) | (ApiFlags.resetInactivityTimeout) | (ApiFlags.packetHasTargetId) | (ApiFlags.packetHasSourceId));
    ApiFlags.defaultResponseFlags = ((ApiFlags.isResponse) | (ApiFlags.packetHasTargetId) | (ApiFlags.packetHasSourceId));
    return ApiFlags;
}());
exports.ApiFlags = ApiFlags;
var ApiTargetsAndSources = /** @class */ (function () {
    function ApiTargetsAndSources() {
    }
    ApiTargetsAndSources.robotNordicTarget = byte_conversion_utilities_1.ByteConversionUtilities.nibblesToByte([1, 1].reverse());
    ApiTargetsAndSources.robotStTarget = byte_conversion_utilities_1.ByteConversionUtilities.nibblesToByte([1, 2].reverse());
    ApiTargetsAndSources.serviceSource = byte_conversion_utilities_1.ByteConversionUtilities.nibblesToByte([0, 1].reverse());
    return ApiTargetsAndSources;
}());
exports.ApiTargetsAndSources = ApiTargetsAndSources;
var ApiParserFlags = /** @class */ (function () {
    function ApiParserFlags() {
    }
    ApiParserFlags.escape = 0xAB;
    ApiParserFlags.startOfPacket = 0x8D;
    ApiParserFlags.endOfPacket = 0xD8;
    ApiParserFlags.escapedEscape = 0x23;
    ApiParserFlags.escapedStartOfPacket = 0x05;
    ApiParserFlags.escapedEndOfPacket = 0x50;
    ApiParserFlags.slipEscapeMask = 0x88;
    return ApiParserFlags;
}());
exports.ApiParserFlags = ApiParserFlags;
//# sourceMappingURL=constants.js.map