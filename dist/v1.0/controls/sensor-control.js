"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var streaming_provider_1 = require("./models/streaming-provider");
var streaming_slot_1 = require("./models/streaming-slot");
var streaming_service_1 = require("./models/streaming-service");
var streaming_service_attribute_1 = require("./models/streaming-service-attribute");
var byte_conversion_utilities_1 = require("../../utilities/byte-conversion-utilities");
var SensorControl = /** @class */ (function () {
    function SensorControl(rvrToy) {
        var _this = this;
        this._supportedStreamingServices = new Map();
        this._streamingProviders = [];
        // use an enumeration for this?
        this._eightBitEnum = 0x00;
        this._sixteenBitEnum = 0x01;
        this._thirtyTwoBitEnum = 0x02;
        this._processorIdNordic = 0x01;
        this._processorIdST = 0x02;
        this._defaultStreamingInterval = 250;
        this._baseUrl = rvrToy.baseUrl + '/sensor';
        this.quaternion = 'Quaternion';
        this.attitude = 'IMU';
        this.accelerometer = 'Accelerometer';
        this.colorDetection = 'ColorDetection';
        this.gyroscope = 'Gyroscope';
        this.coreTimeLower = 'CoreTimeLower';
        this.coreTimeUpper = 'CoreTimeUpper';
        this.locator = 'Locator';
        this.velocity = 'Velocity';
        this.speed = 'Speed';
        this.ambientLight = 'AmbientLight';
        this._initializeSensors();
        this._streamingDataHandlerByName = new Map();
        var _loop_1 = function (streamingProvider) {
            var parseData = streamingProvider.buildSensorDataParser();
            var onStreamingServiceDataNotifyHandler = function (data) {
                var sensorDataObject = parseData(data);
                for (var sensorName in sensorDataObject) {
                    var handler = _this._streamingDataHandlerByName.get(sensorName);
                    if (handler) {
                        handler(sensorDataObject[sensorName]);
                    }
                }
            };
            rvrToy.asyncHandlerByName.set(streamingProvider.processorId + ", 0x18, 0x3D", onStreamingServiceDataNotifyHandler);
        };
        for (var _i = 0, _a = this._streamingProviders; _i < _a.length; _i++) {
            var streamingProvider = _a[_i];
            _loop_1(streamingProvider);
        }
        this._isStreaming = false;
    }
    Object.defineProperty(SensorControl.prototype, "isStreaming", {
        get: function () {
            return this._isStreaming;
        },
        enumerable: true,
        configurable: true
    });
    SensorControl.prototype.enableSensor = function (streamingServiceName, handler) {
        var sensor = this._supportedStreamingServices.get(streamingServiceName);
        if (sensor == undefined)
            throw new Error("no such sensor: " + streamingServiceName);
        sensor.enable();
        this._streamingDataHandlerByName.set(streamingServiceName, handler);
    };
    SensorControl.prototype.disableSensor = function (streamingServiceName) {
        var sensor = this._supportedStreamingServices.get(streamingServiceName);
        if (sensor == undefined)
            throw new Error("no such sensor: " + streamingServiceName);
        if (this._streamingDataHandlerByName.has(streamingServiceName))
            this._streamingDataHandlerByName.delete(streamingServiceName);
        sensor.disable();
    };
    SensorControl.prototype.startSensorStreaming = function (streamingInterval) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, streamingProvider;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this._isStreaming) {
                            throw new Error('Already streaming; pause or clear sensor streaming first.');
                        }
                        if (!this._hasSensorsEnabled()) {
                            throw new Error('No sensors enabled.');
                        }
                        if (streamingInterval < 50)
                            throw new Error('Cannot have streaming interval lower than 50 milliseconds.');
                        if (streamingInterval == undefined)
                            streamingInterval = this._defaultStreamingInterval;
                        _i = 0, _a = this._streamingProviders;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        streamingProvider = _a[_i];
                        if (!streamingProvider.hasEnabledStreamingServices) {
                            return [3 /*break*/, 5];
                        }
                        return [4 /*yield*/, streamingProvider.clearStreaming()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, streamingProvider.configureStreaming()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, streamingProvider.startStreaming(streamingInterval)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        this._isStreaming = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    SensorControl.prototype.pauseSensorStreaming = function () {
        if (!this._hasSensorsEnabled())
            throw new Error('No sensors enabled.');
        for (var _i = 0, _a = this._streamingProviders; _i < _a.length; _i++) {
            var streamingProvider = _a[_i];
            if (!streamingProvider.isStreaming) {
                continue;
            }
            streamingProvider.pauseStreaming();
        }
        this._isStreaming = false;
    };
    SensorControl.prototype.clearSensorStreaming = function () {
        if (!this._hasSensorsEnabled())
            throw new Error('No enabled sensors to disable.');
        this._disableAllSensors();
        for (var _i = 0, _a = this._streamingProviders; _i < _a.length; _i++) {
            var streamingProvider = _a[_i];
            if (!streamingProvider.isStreaming) {
                continue;
            }
            streamingProvider.clearStreaming();
        }
        this._isStreaming = false;
    };
    SensorControl.prototype._initializeSensors = function () {
        var quaternionW = new streaming_service_attribute_1.StreamingServiceAttribute('W', -1.0, 1.0);
        var quaternionX = new streaming_service_attribute_1.StreamingServiceAttribute('X', -1.0, 1.0);
        var quaternionY = new streaming_service_attribute_1.StreamingServiceAttribute('Y', -1.0, 1.0);
        var quaternionZ = new streaming_service_attribute_1.StreamingServiceAttribute('Z', -1.0, 1.0);
        var quaternion = new streaming_service_1.StreamingService(0x00, this.quaternion, [quaternionW, quaternionX, quaternionY, quaternionZ], this._thirtyTwoBitEnum);
        var attitudePitch = new streaming_service_attribute_1.StreamingServiceAttribute('Pitch', -180.0, 180.0);
        var attitudeRoll = new streaming_service_attribute_1.StreamingServiceAttribute('Roll', -90.0, 90.0);
        var attitudeYaw = new streaming_service_attribute_1.StreamingServiceAttribute('Yaw', -180.0, 180.0);
        var attitude = new streaming_service_1.StreamingService(0x01, this.attitude, [attitudePitch, attitudeRoll, attitudeYaw], this._sixteenBitEnum);
        var accelerometerX = new streaming_service_attribute_1.StreamingServiceAttribute('X', -16.0, 16.0);
        var accelerometerY = new streaming_service_attribute_1.StreamingServiceAttribute('Y', -16.0, 16.0);
        var accelerometerZ = new streaming_service_attribute_1.StreamingServiceAttribute('Z', -16.0, 16.0);
        var accelerometer = new streaming_service_1.StreamingService(0x02, this.accelerometer, [accelerometerX,
            accelerometerY, accelerometerZ], this._sixteenBitEnum);
        var colorDetectionR = new streaming_service_attribute_1.StreamingServiceAttribute('R', 0, byte_conversion_utilities_1.ByteConversionUtilities.uint8MaxValue);
        var colorDetectionG = new streaming_service_attribute_1.StreamingServiceAttribute('G', 0, byte_conversion_utilities_1.ByteConversionUtilities.uint8MaxValue);
        var colorDetectionB = new streaming_service_attribute_1.StreamingServiceAttribute('B', 0, byte_conversion_utilities_1.ByteConversionUtilities.uint8MaxValue);
        var colorDetectionIndex = new streaming_service_attribute_1.StreamingServiceAttribute('Index', 0, byte_conversion_utilities_1.ByteConversionUtilities.uint8MaxValue);
        var colorDetectionConfidence = new streaming_service_attribute_1.StreamingServiceAttribute('Confidence', 0.0, 1.0);
        var colorDetection = new streaming_service_1.StreamingService(0x03, this.colorDetection, [colorDetectionR, colorDetectionG, colorDetectionB, colorDetectionIndex, colorDetectionConfidence], this._eightBitEnum);
        var gyroscopeX = new streaming_service_attribute_1.StreamingServiceAttribute('X', -2000.0, 2000.0);
        var gyroscopeY = new streaming_service_attribute_1.StreamingServiceAttribute('Y', -2000.0, 2000.0);
        var gyroscopeZ = new streaming_service_attribute_1.StreamingServiceAttribute('Z', -2000.0, 2000.0);
        var gyroscope = new streaming_service_1.StreamingService(0x04, this.gyroscope, [gyroscopeX, gyroscopeY, gyroscopeZ], this._sixteenBitEnum);
        var locatorX = new streaming_service_attribute_1.StreamingServiceAttribute('X', -16000, 16000);
        var locatorY = new streaming_service_attribute_1.StreamingServiceAttribute('Y', -16000, 16000);
        var locator = new streaming_service_1.StreamingService(0x06, this.locator, [locatorX, locatorY], this._thirtyTwoBitEnum);
        var velocityX = new streaming_service_attribute_1.StreamingServiceAttribute('X', -5.0, 5.0);
        var velocityY = new streaming_service_attribute_1.StreamingServiceAttribute('Y', -5.0, 5.0);
        var velocity = new streaming_service_1.StreamingService(0x07, this.velocity, [velocityX, velocityY], this._thirtyTwoBitEnum);
        var speedMPS = new streaming_service_attribute_1.StreamingServiceAttribute('MPS', 0, 5.0);
        var speed = new streaming_service_1.StreamingService(0x08, this.speed, [speedMPS], this._thirtyTwoBitEnum);
        var coreTimeLowerTime = new streaming_service_attribute_1.StreamingServiceAttribute('Time', 0, byte_conversion_utilities_1.ByteConversionUtilities.uint32MaxValue);
        var coreTimeLower = new streaming_service_1.StreamingService(0x05, this.coreTimeLower, [coreTimeLowerTime], this._thirtyTwoBitEnum);
        var coreTimeUpperTime = new streaming_service_attribute_1.StreamingServiceAttribute('Time', 0, byte_conversion_utilities_1.ByteConversionUtilities.uint32MaxValue);
        var coreTimeUpper = new streaming_service_1.StreamingService(0x09, this.coreTimeUpper, [coreTimeUpperTime], this._thirtyTwoBitEnum);
        var ambientLightLight = new streaming_service_attribute_1.StreamingServiceAttribute('Light', 0, 120000.0);
        var ambientLight = new streaming_service_1.StreamingService(0x0A, this.ambientLight, [ambientLightLight], this._sixteenBitEnum);
        this._supportedStreamingServices.set(quaternion.name, quaternion);
        this._supportedStreamingServices.set(attitude.name, attitude);
        this._supportedStreamingServices.set(accelerometer.name, accelerometer);
        this._supportedStreamingServices.set(colorDetection.name, colorDetection);
        this._supportedStreamingServices.set(gyroscope.name, gyroscope);
        this._supportedStreamingServices.set(locator.name, locator);
        this._supportedStreamingServices.set(velocity.name, velocity);
        this._supportedStreamingServices.set(speed.name, speed);
        this._supportedStreamingServices.set(coreTimeLower.name, coreTimeLower);
        this._supportedStreamingServices.set(coreTimeUpper.name, coreTimeUpper);
        this._supportedStreamingServices.set(ambientLight.name, ambientLight);
        var slotNordic1 = new streaming_slot_1.StreamingSlot(1, [colorDetection]);
        var slotNordic2 = new streaming_slot_1.StreamingSlot(2, [coreTimeLower, coreTimeUpper]);
        var slotNordic3 = new streaming_slot_1.StreamingSlot(3, [ambientLight]);
        var slotST1 = new streaming_slot_1.StreamingSlot(1, [quaternion, attitude, accelerometer, gyroscope]);
        var slotST2 = new streaming_slot_1.StreamingSlot(2, [locator, velocity, speed]);
        var nordicStreamingProvider = new streaming_provider_1.StreamingProvider(this._processorIdNordic, [slotNordic1, slotNordic2, slotNordic3], this._baseUrl);
        var stStreamingProvider = new streaming_provider_1.StreamingProvider(this._processorIdST, [slotST1, slotST2], this._baseUrl);
        this._streamingProviders.push(nordicStreamingProvider);
        this._streamingProviders.push(stStreamingProvider);
    };
    SensorControl.prototype._hasSensorsEnabled = function () {
        for (var _i = 0, _a = Array.from(this._supportedStreamingServices.values()); _i < _a.length; _i++) {
            var streamingService = _a[_i];
            if (streamingService.isEnabled)
                return true;
        }
        return false;
    };
    SensorControl.prototype._disableAllSensors = function () {
        for (var _i = 0, _a = Array.from(this._supportedStreamingServices.values()); _i < _a.length; _i++) {
            var streamingService = _a[_i];
            streamingService.disable();
        }
    };
    return SensorControl;
}());
exports.SensorControl = SensorControl;
//# sourceMappingURL=sensor-control.js.map