"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var byte_conversion_utilities_1 = require("../../../utilities/byte-conversion-utilities");
var StreamingService = /** @class */ (function () {
    function StreamingService(id, name, streamingServiceAttributes, dataSizeEnum) {
        this._id = 0;
        this._name = '';
        this._isEnabled = false;
        this._dataSizeEnum = 0;
        this._id = id;
        this._name = name;
        this._streamingServiceAttributes = streamingServiceAttributes;
        this._dataSizeEnum = dataSizeEnum;
    }
    Object.defineProperty(StreamingService.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamingService.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamingService.prototype, "isEnabled", {
        get: function () {
            return this._isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamingService.prototype, "dataSizeEnum", {
        get: function () {
            return this._dataSizeEnum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamingService.prototype, "bytesPerStreamingServiceData", {
        get: function () {
            return this._bytesPerStreamingServiceAttributeData * this._streamingServiceAttributes.length;
        },
        enumerable: true,
        configurable: true
    });
    StreamingService.prototype.enable = function () {
        this._isEnabled = true;
    };
    StreamingService.prototype.disable = function () {
        this._isEnabled = false;
    };
    StreamingService.prototype.parseStreamingServiceBytesToObject = function (dataRawBytes) {
        if (dataRawBytes.length != this.bytesPerStreamingServiceData)
            throw new Error('input bytes length and expected bytes length mismatch');
        var streamingServiceData = {};
        var currentIndex = 0;
        for (var _i = 0, _a = this._streamingServiceAttributes; _i < _a.length; _i++) {
            var streamingServiceAttribute = _a[_i];
            var streamingServiceAttributeDataBytes = byte_conversion_utilities_1.ByteConversionUtilities.sliceBytes(dataRawBytes, currentIndex, this._bytesPerStreamingServiceAttributeData);
            streamingServiceData[streamingServiceAttribute.name] = streamingServiceAttribute.parseAttributeBytesToFloatValues(streamingServiceAttributeDataBytes, 0, this._dataSizeMaximum);
            currentIndex += streamingServiceAttributeDataBytes.length;
        }
        return streamingServiceData;
    };
    Object.defineProperty(StreamingService.prototype, "_bytesPerStreamingServiceAttributeData", {
        get: function () {
            var bitSize = StreamingService.dataSizeToBits.get(this._dataSizeEnum);
            if (bitSize == undefined)
                return 0;
            return bitSize / 8;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamingService.prototype, "_dataSizeMaximum", {
        get: function () {
            var maxValue = StreamingService.dataSizeToMaximumValue.get(this._dataSizeEnum);
            if (maxValue == undefined)
                return 0;
            return maxValue;
        },
        enumerable: true,
        configurable: true
    });
    StreamingService.dataSizeToBits = new Map([[0x00, 8], [0x01, 16], [0x02, 32]]);
    StreamingService.dataSizeToMaximumValue = new Map([[0x00, byte_conversion_utilities_1.ByteConversionUtilities.uint8MaxValue],
        [0x01, byte_conversion_utilities_1.ByteConversionUtilities.uint16MaxValue], [0x02, byte_conversion_utilities_1.ByteConversionUtilities.uint32MaxValue]]);
    return StreamingService;
}());
exports.StreamingService = StreamingService;
//# sourceMappingURL=streaming-service.js.map