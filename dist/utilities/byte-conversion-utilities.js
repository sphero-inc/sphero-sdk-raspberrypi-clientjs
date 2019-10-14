"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ByteConversionUtilities = /** @class */ (function () {
    function ByteConversionUtilities() {
    }
    ByteConversionUtilities.normalize = function (value, min, max, newMin, newMax) {
        return (((value - min) / (max - min)) * (newMax - newMin)) + newMin;
    };
    ByteConversionUtilities.numberToByteArray = function (value, size) {
        var bytes = [];
        for (var i = 0; i < size; i++) {
            bytes.push(0);
        }
        if (value == undefined || value == null) {
            return bytes;
        }
        for (var i = 0; i < bytes.length; i++) {
            var byte = value & 0xFF;
            bytes[i] = byte;
            value = (value - byte) / 256;
        }
        return bytes;
    };
    ByteConversionUtilities.boolToByteArray = function (value) {
        var bytes = [0];
        if (value == undefined || value == null) {
            return bytes;
        }
        bytes[0] = !value ? 0 : 1;
        return bytes;
    };
    ByteConversionUtilities.int8ToByteArray = function (value) {
        return this.numberToByteArray(value, 1);
    };
    ByteConversionUtilities.int16ToByteArray = function (value) {
        return this.numberToByteArray(value, 2);
    };
    ByteConversionUtilities.int32ToByteArray = function (value) {
        return this.numberToByteArray(value, 4);
    };
    ByteConversionUtilities.int64ToByteArray = function (value) {
        return this.numberToByteArray(value, 8);
    };
    ByteConversionUtilities.floatToByteArray = function (value) {
        if (value == undefined || value == null) {
            return [];
        }
        var floatArray = new Float32Array(1);
        floatArray[0] = value;
        var uint8Array = new Uint8Array(floatArray.buffer);
        var bytes = [];
        for (var i = 0; i < uint8Array.byteLength; i++) {
            bytes.push(uint8Array[i]);
        }
        return bytes;
    };
    ByteConversionUtilities.doubleToByteArray = function (value) {
        if (value == undefined || value == null) {
            return [];
        }
        var floatArray = new Float64Array(1);
        floatArray[0] = value;
        var uint8Array = new Uint8Array(floatArray.buffer);
        var bytes = [];
        for (var i = 0; i < uint8Array.byteLength; i++) {
            bytes.push(uint8Array[i]);
        }
        return bytes;
    };
    ByteConversionUtilities.stringToByteArray = function (value) {
        var bytes = [];
        if (value == undefined || value == null || value.length == 0) {
            return bytes;
        }
        // add null character
        if (value[value.length - 1] != '\0') {
            value += '\0';
        }
        for (var i = 0; i < value.length; i++) {
            bytes.push(value.charCodeAt(i));
        }
        return bytes;
    };
    ByteConversionUtilities.sliceBytes = function (bytes, startingIndex, count) {
        var slicedBytes = [];
        if (!bytes || bytes.length == 0) {
            return slicedBytes;
        }
        var endingIndex = startingIndex + count; // this is an exclusive index
        if (endingIndex > bytes.length) {
            return slicedBytes;
        }
        return bytes.slice(startingIndex, endingIndex);
    };
    ByteConversionUtilities.getBoolBytes = function (bytes, currentIndex) {
        return this.sliceBytes(bytes, currentIndex, 1);
    };
    ByteConversionUtilities.getInt8Bytes = function (bytes, currentIndex) {
        return this.sliceBytes(bytes, currentIndex, 1);
    };
    ByteConversionUtilities.getInt16Bytes = function (bytes, currentIndex) {
        return this.sliceBytes(bytes, currentIndex, 2);
    };
    ByteConversionUtilities.getInt32Bytes = function (bytes, currentIndex) {
        return this.sliceBytes(bytes, currentIndex, 4);
    };
    ByteConversionUtilities.getInt64Bytes = function (bytes, currentIndex) {
        return this.sliceBytes(bytes, currentIndex, 8);
    };
    ByteConversionUtilities.getFloatBytes = function (bytes, currentIndex) {
        return this.sliceBytes(bytes, currentIndex, 4);
    };
    ByteConversionUtilities.getDoubleBytes = function (bytes, currentIndex) {
        return this.sliceBytes(bytes, currentIndex, 8);
    };
    ByteConversionUtilities.getStringBytes = function (bytes, currentIndex) {
        var slicedBytes = [];
        if (!bytes || bytes.length == 0) {
            return slicedBytes;
        }
        var nullTerminator = '\0'.charCodeAt(0);
        for (var i = currentIndex; i < bytes.length; i++) {
            var byte = bytes[i];
            if (byte == nullTerminator) {
                if (slicedBytes.length == 0) {
                    continue;
                }
                break;
            }
            slicedBytes.push(byte);
        }
        return slicedBytes;
    };
    ByteConversionUtilities.byteArrayToNumber = function (bytes) {
        var value = 0;
        if (!bytes || bytes.length == 0) {
            return value;
        }
        for (var i = bytes.length - 1; i >= 0; i--) {
            value = (value * 256) + bytes[i];
        }
        return value;
    };
    ByteConversionUtilities.byteArrayToBool = function (bytes) {
        if (!bytes) {
            return false;
        }
        if (bytes.length != 1) {
            return false;
        }
        return bytes[0] === 1 ? true : false;
    };
    ByteConversionUtilities.byteArrayToInt8 = function (bytes) {
        if (!bytes) {
            return 0;
        }
        if (bytes.length != 1) {
            return 0;
        }
        return this.byteArrayToNumber(bytes);
    };
    ByteConversionUtilities.byteArrayToInt16 = function (bytes) {
        if (!bytes) {
            return 0;
        }
        if (bytes.length != 2) {
            return 0;
        }
        return this.byteArrayToNumber(bytes);
    };
    ByteConversionUtilities.byteArrayToInt32 = function (bytes) {
        if (!bytes) {
            return 0;
        }
        if (bytes.length != 4) {
            return 0;
        }
        return this.byteArrayToNumber(bytes);
    };
    ByteConversionUtilities.byteArrayToInt64 = function (bytes) {
        if (!bytes) {
            return 0;
        }
        if (bytes.length != 8) {
            return 0;
        }
        return this.byteArrayToNumber(bytes);
    };
    ByteConversionUtilities.byteArrayToFloat = function (bytes) {
        if (!bytes) {
            return 0;
        }
        if (bytes.length != 4) {
            return 0;
        }
        var byteArray = new Uint8Array(bytes);
        var floatArray = new Float32Array(byteArray.buffer);
        return floatArray[0];
    };
    ByteConversionUtilities.byteArrayToDouble = function (bytes) {
        if (!bytes) {
            return 0;
        }
        if (bytes.length != 8) {
            return 0;
        }
        var byteArray = new Uint8Array(bytes);
        var floatArray = new Float64Array(byteArray.buffer);
        return floatArray[0];
    };
    ByteConversionUtilities.byteArrayToString = function (bytes) {
        var text = '';
        if (!bytes || bytes.length == 0) {
            return text;
        }
        for (var i = 0; i < bytes.length; i++) {
            text = text + String.fromCharCode(bytes[i]);
        }
        // remove any null terminators
        text.replace(/\0/g, '');
        return text;
    };
    ByteConversionUtilities.incrementByteValue = function (byte, incrementBy) {
        byte += incrementBy;
        if (byte >= 256) {
            byte = byte - 256;
        }
        return byte;
    };
    ByteConversionUtilities.byteToNibbles = function (byte) {
        var bytes = [0, 0];
        for (var j = 0; j < bytes.length; j++) {
            var tempByte = byte & 0x0f;
            bytes[j] = tempByte;
            byte = (byte - tempByte) / 16;
        }
        return bytes;
    };
    ByteConversionUtilities.nibblesToByte = function (nibbles) {
        var value = 0;
        if (!nibbles) {
            return value;
        }
        for (var i = nibbles.length - 1; i >= 0; i--) {
            value = (value * 16) + nibbles[i];
        }
        return value;
    };
    ByteConversionUtilities.convertNumberToHexString = function (value) {
        if (value == undefined || value == null) {
            value = 0;
        }
        if (value < 0) {
            value = value + 256;
        }
        var hexValue = value.toString(16);
        if (hexValue.length == 1) {
            hexValue = '0' + hexValue;
        }
        return '0x' + hexValue.toUpperCase();
    };
    ByteConversionUtilities.convertNumbersToHexCsvString = function (values) {
        var hexValues = [];
        for (var i = 0; i < values.length; i++) {
            hexValues.push(this.convertNumberToHexString(values[i]));
        }
        return hexValues.join(', ');
    };
    ByteConversionUtilities.clamp = function (value, minValue, maxValue) {
        if (value == undefined || value == null) {
            return minValue;
        }
        if (value < minValue) {
            return minValue;
        }
        if (value > maxValue) {
            return maxValue;
        }
        return value;
    };
    ByteConversionUtilities.clampByte = function (value) {
        return this.clamp(value, 0, 255);
    };
    Object.defineProperty(ByteConversionUtilities, "uint8MinValue", {
        get: function () {
            return this._uint8MinValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "uint8MaxValue", {
        get: function () {
            return this._uint8MaxValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "int8MinValue", {
        get: function () {
            return this._int8MinValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "int8MaxValue", {
        get: function () {
            return this._int8MaxValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "uint16MinValue", {
        get: function () {
            return this._uint16MinValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "uint16MaxValue", {
        get: function () {
            return this._uint16MaxValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "int16MinValue", {
        get: function () {
            return this._int16MinValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "int16MaxValue", {
        get: function () {
            return this._int16MaxValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "uint32MinValue", {
        get: function () {
            return this._uint32MinValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "uint32MaxValue", {
        get: function () {
            return this._uint32MaxValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "int32MinValue", {
        get: function () {
            return this._int32MinValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "int32MaxValue", {
        get: function () {
            return this._int32MaxValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "uint64MinValue", {
        get: function () {
            return this._uint64MinValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "uint64MaxValue", {
        get: function () {
            return this._uint64MaxValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "int64MinValue", {
        get: function () {
            return this._int64MinValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteConversionUtilities, "int64MaxValue", {
        get: function () {
            return this._int64MaxValue;
        },
        enumerable: true,
        configurable: true
    });
    ByteConversionUtilities._uint8MinValue = 0;
    ByteConversionUtilities._uint8MaxValue = 255;
    ByteConversionUtilities._int8MinValue = -128;
    ByteConversionUtilities._int8MaxValue = 127;
    ByteConversionUtilities._uint16MinValue = 0;
    ByteConversionUtilities._uint16MaxValue = 65535;
    ByteConversionUtilities._int16MinValue = -32768;
    ByteConversionUtilities._int16MaxValue = 32767;
    ByteConversionUtilities._uint32MinValue = 0;
    ByteConversionUtilities._uint32MaxValue = 4294967295;
    ByteConversionUtilities._int32MinValue = -2147483648;
    ByteConversionUtilities._int32MaxValue = 2147483647;
    ByteConversionUtilities._uint64MinValue = 0;
    ByteConversionUtilities._uint64MaxValue = 18446744073709551615;
    ByteConversionUtilities._int64MinValue = -9223372036854775808;
    ByteConversionUtilities._int64MaxValue = 9223372036854775807;
    return ByteConversionUtilities;
}());
exports.ByteConversionUtilities = ByteConversionUtilities;
//# sourceMappingURL=byte-conversion-utilities.js.map