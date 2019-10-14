"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var byte_conversion_utilities_1 = require("../../../utilities/byte-conversion-utilities");
var StreamingServiceAttribute = /** @class */ (function () {
    function StreamingServiceAttribute(name, minimumValue, maximumValue) {
        this._name = '';
        this._minimumValue = 0;
        this._maximumValue = 0;
        this._name = name;
        this._minimumValue = minimumValue;
        this._maximumValue = maximumValue;
    }
    Object.defineProperty(StreamingServiceAttribute.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamingServiceAttribute.prototype, "minimumValue", {
        get: function () {
            return this._minimumValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamingServiceAttribute.prototype, "maximumValue", {
        get: function () {
            return this._maximumValue;
        },
        enumerable: true,
        configurable: true
    });
    StreamingServiceAttribute.prototype.parseAttributeBytesToFloatValues = function (dataRawBytes, minimumIn, maximumIn) {
        var streamingServiceAttributeData = byte_conversion_utilities_1.ByteConversionUtilities.byteArrayToNumber(dataRawBytes.reverse());
        return byte_conversion_utilities_1.ByteConversionUtilities.normalize(streamingServiceAttributeData, minimumIn, maximumIn, this._minimumValue, this._maximumValue);
    };
    return StreamingServiceAttribute;
}());
exports.StreamingServiceAttribute = StreamingServiceAttribute;
//# sourceMappingURL=streaming-service-attribute.js.map