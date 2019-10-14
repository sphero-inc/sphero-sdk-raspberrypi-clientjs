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
var StreamingProvider = /** @class */ (function () {
    function StreamingProvider(processorId, streamingSlots, baseUrl) {
        this._baseUrl = '';
        this._streamingSlots = [];
        this._streamingSlotByToken = new Map();
        this._processorId = 0;
        this._isStreaming = false;
        this._isConfigured = false;
        this._processorId = processorId;
        this._streamingSlots = streamingSlots;
        this._baseUrl = baseUrl;
        for (var _i = 0, _a = this._streamingSlots; _i < _a.length; _i++) {
            var streamingSlot = _a[_i];
            this._streamingSlotByToken.set(streamingSlot.tokenId, streamingSlot);
        }
    }
    Object.defineProperty(StreamingProvider.prototype, "processorId", {
        get: function () {
            return this._processorId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamingProvider.prototype, "hasEnabledStreamingServices", {
        get: function () {
            for (var _i = 0, _a = this._streamingSlots; _i < _a.length; _i++) {
                var streamingSlot = _a[_i];
                if (streamingSlot.hasEnabledStreamingServices)
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamingProvider.prototype, "isStreaming", {
        get: function () {
            return this._isStreaming;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamingProvider.prototype, "isConfigured", {
        get: function () {
            return this._isConfigured;
        },
        enumerable: true,
        configurable: true
    });
    StreamingProvider.prototype.configureStreaming = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasEnabledStreamingServices) {
                            throw new Error('cannot configure streaming because has no enabled sensors');
                        }
                        return [4 /*yield*/, this._configureStreamingForEnabledSlots()];
                    case 1:
                        _a.sent();
                        this._isConfigured = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    StreamingProvider.prototype.startStreaming = function (streamingInterval) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isConfigured) {
                            throw new Error('cannot start streaming because is not configured');
                        }
                        if (this._isStreaming) {
                            throw new Error('cannot start streaming because is already streaming');
                        }
                        return [4 /*yield*/, this._sendStartStreamingRequest(streamingInterval)];
                    case 1:
                        _a.sent();
                        this._isStreaming = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    StreamingProvider.prototype.pauseStreaming = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendStopStreamingRequest()];
                    case 1:
                        _a.sent();
                        this._isStreaming = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    StreamingProvider.prototype.clearStreaming = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendStopAndClearStreamingRequest()];
                    case 1:
                        _a.sent();
                        this._isStreaming = false;
                        this._isConfigured = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    StreamingProvider.prototype._configureStreamingForEnabledSlots = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, steamingSlot;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this._streamingSlots;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        steamingSlot = _a[_i];
                        if (!steamingSlot.hasEnabledStreamingServices) {
                            return [3 /*break*/, 3];
                        }
                        return [4 /*yield*/, this._sendConfigureStreamingSlotRequest(steamingSlot.tokenId, steamingSlot.configuration)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    StreamingProvider.prototype.buildSensorDataParser = function () {
        var _this = this;
        return function (data) {
            var tokenId = data.token & 15;
            var streamingSlot = _this._streamingSlotByToken.get(tokenId);
            if (streamingSlot == undefined)
                throw new Error("unable to parse streaming data with token ID " + data.token);
            return streamingSlot.parseStreamingSlotDataToObject(data.sensorData);
        };
    };
    StreamingProvider.prototype._sendConfigureStreamingSlotRequest = function (token, configuration) {
        return __awaiter(this, void 0, void 0, function () {
            var url, jsonBody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this._baseUrl + "/configureStreamingService/" + this._processorId;
                        jsonBody = {
                            'token': token,
                            'configuration': configuration,
                            'isResponseRequested': true
                        };
                        return [4 /*yield*/, fetch(url, {
                                method: 'PUT',
                                headers: {
                                    'accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(jsonBody)
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    StreamingProvider.prototype._sendStartStreamingRequest = function (interval) {
        return __awaiter(this, void 0, void 0, function () {
            var url, jsonBody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this._baseUrl + "/startStreamingService/" + this._processorId;
                        jsonBody = {
                            'period': interval,
                            'isResponseRequested': true
                        };
                        return [4 /*yield*/, fetch(url, {
                                method: 'PUT',
                                headers: {
                                    'accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(jsonBody)
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    StreamingProvider.prototype._sendStopStreamingRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, jsonBody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this._baseUrl + "/stopStreamingService/" + this._processorId;
                        jsonBody = {
                            'isResponseRequested': true
                        };
                        return [4 /*yield*/, fetch(url, {
                                method: 'PUT',
                                headers: {
                                    'accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(jsonBody)
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    StreamingProvider.prototype._sendStopAndClearStreamingRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, jsonBody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this._baseUrl + "/clearStreamingService/" + this._processorId;
                        jsonBody = {
                            'isResponseRequested': true
                        };
                        return [4 /*yield*/, fetch(url, {
                                method: 'PUT',
                                headers: {
                                    'accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(jsonBody)
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    StreamingProvider._sensorDeviceId = 0x18;
    StreamingProvider._sensorDataCommandId = 0x3D;
    return StreamingProvider;
}());
exports.StreamingProvider = StreamingProvider;
//# sourceMappingURL=streaming-provider.js.map