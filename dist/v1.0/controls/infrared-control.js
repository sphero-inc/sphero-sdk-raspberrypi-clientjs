"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InfraredControl = /** @class */ (function () {
    function InfraredControl(rvrToy) {
        this._baseUrl = rvrToy.baseUrl + '/infraredControl';
        this._rvrToy = rvrToy;
    }
    InfraredControl.prototype.startInfraredBroadcasting = function (farCode, nearCode) {
        var url = this._baseUrl + "/startInfraredBroadcasting";
        var jsonBody = {
            'isResponseRequested': false
        };
        fetch(url, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        });
    };
    InfraredControl.prototype.stopInfraredBroadcasting = function () {
        var url = this._baseUrl + "/stopInfraredBroadcasting";
        var jsonBody = {
            'isResponseRequested': false
        };
        fetch(url, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        });
    };
    InfraredControl.prototype.startInfraredFollowing = function (farCode, nearCode) {
        var url = this._baseUrl + "/startInfraredFollowing";
        var jsonBody = {
            'farCode': farCode,
            'nearCode': nearCode,
            'isResponseRequested': false
        };
        fetch(url, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        });
    };
    InfraredControl.prototype.stopInfraredFollowing = function () {
        var url = this._baseUrl + "/stopInfraredFollowing";
        var jsonBody = {
            'isResponseRequested': false
        };
        fetch(url, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        });
    };
    InfraredControl.prototype.sendInfraredMessages = function (messages, strength) {
        var url = this._baseUrl + "/sendInfraredMessages";
        var jsonBody = {
            'messages': messages,
            'strength': strength,
            'isResponseRequested': false
        };
        fetch(url, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        });
    };
    InfraredControl.prototype.listenForInfraredMessages = function (handler) {
        this._rvrToy.asyncHandlerByName.set('2, 0x18, 0x2C', handler);
        var url = this._baseUrl + "/listenForInfraredMessages";
        var jsonBody = {
            'isEnabled': true,
            'isResponseRequested': false
        };
        fetch(url, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        });
    };
    InfraredControl.prototype.stopListeningForInfraredMessages = function () {
        var url = this._baseUrl + "/listenForInfraredMessages";
        var jsonBody = {
            'isEnabled': false,
            'isResponseRequested': false
        };
        fetch(url, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        });
    };
    return InfraredControl;
}());
exports.InfraredControl = InfraredControl;
//# sourceMappingURL=infrared-control.js.map