"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var byte_conversion_utilities_1 = require("../../../utilities/byte-conversion-utilities");
var StreamingSlot = /** @class */ (function () {
    function StreamingSlot(tokenId, supportedStreamingServices) {
        this._tokenId = 0;
        this._supportedStreamingServices = [];
        this._tokenId = tokenId;
        this._supportedStreamingServices = supportedStreamingServices;
    }
    Object.defineProperty(StreamingSlot.prototype, "tokenId", {
        get: function () {
            return this._tokenId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamingSlot.prototype, "configuration", {
        get: function () {
            if (!this.hasEnabledStreamingServices) {
                throw new Error();
            }
            var dataRawBytes = [];
            // let tokenBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(this._tokenId);
            // dataRawBytes = dataRawBytes.concat(tokenBytes);
            for (var _i = 0, _a = this._enabledStreamingServices(); _i < _a.length; _i++) {
                var streamingService = _a[_i];
                dataRawBytes = dataRawBytes.concat(byte_conversion_utilities_1.ByteConversionUtilities.int16ToByteArray(streamingService.id).reverse());
                dataRawBytes = dataRawBytes.concat(byte_conversion_utilities_1.ByteConversionUtilities.int8ToByteArray(streamingService.dataSizeEnum));
            }
            return dataRawBytes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamingSlot.prototype, "hasEnabledStreamingServices", {
        get: function () {
            for (var _i = 0, _a = this._supportedStreamingServices; _i < _a.length; _i++) {
                var streamingService = _a[_i];
                if (streamingService.isEnabled)
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    StreamingSlot.prototype.disableStreamingServices = function () {
        for (var _i = 0, _a = this._supportedStreamingServices; _i < _a.length; _i++) {
            var streamingService = _a[_i];
            streamingService.disable();
        }
    };
    StreamingSlot.prototype.parseStreamingSlotDataToObject = function (sensorData) {
        var streamingSlotData = {};
        var currentIndex = 0;
        for (var _i = 0, _a = this._enabledStreamingServices(); _i < _a.length; _i++) {
            var streamingService = _a[_i];
            var streamingServiceData = byte_conversion_utilities_1.ByteConversionUtilities.sliceBytes(sensorData, currentIndex, streamingService.bytesPerStreamingServiceData);
            streamingSlotData[streamingService.name] = streamingService.parseStreamingServiceBytesToObject(streamingServiceData);
            currentIndex += streamingServiceData.length;
        }
        return streamingSlotData;
    };
    StreamingSlot.prototype._enabledStreamingServices = function () {
        var enabledStreamingServices = [];
        for (var _i = 0, _a = this._supportedStreamingServices; _i < _a.length; _i++) {
            var streamingService = _a[_i];
            if (streamingService.isEnabled)
                enabledStreamingServices.push(streamingService);
        }
        return enabledStreamingServices;
    };
    return StreamingSlot;
}());
exports.StreamingSlot = StreamingSlot;
//# sourceMappingURL=streaming-slot.js.map