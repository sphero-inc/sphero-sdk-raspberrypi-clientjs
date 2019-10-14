"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LedControl = /** @class */ (function () {
    function LedControl(rvrToy) {
        this._baseUrl = rvrToy.baseUrl + '/ledControl';
        this.statusIndicationLeft = 'statusIndicationLeft';
        this.statusIndicationRight = 'statusIndicationRight';
        this.headlightLeft = 'headlightLeft';
        this.headlightRight = 'headlightRight';
        this.batteryDoorFront = 'batteryDoorFront';
        this.batteryDoorRear = 'batteryDoorRear';
        this.powerButtonFront = 'powerButtonFront';
        this.powerButtonRear = 'powerButtonRear';
        this.brakelightLeft = 'brakelightLeft';
        this.brakelightRight = 'brakelightRight';
        this.undercarriageWhite = 'undercarriageWhite';
        this.red = 'red';
        this.green = 'green';
        this.blue = 'blue';
        this.off = 'off';
        this.white = 'white';
        this.yellow = 'yellow';
        this.purple = 'purple';
        this.orange = 'orange';
        this.pink = 'pink';
    }
    LedControl.prototype.getAvailableLedGroups = function () {
        var url = this._baseUrl + "/getAvailableLedGroups";
        return fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            },
        }).then(function (response) {
            return response.text();
        }).then(function (text) {
            return text;
        });
    };
    LedControl.prototype.getAvailableColors = function () {
        var url = this._baseUrl + "/getAvailableColors";
        return fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            },
        }).then(function (response) {
            return response.text();
        }).then(function (text) {
            return text;
        });
    };
    LedControl.prototype.turnLedsOff = function () {
        var url = this._baseUrl + "/turnLedsOff";
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
    LedControl.prototype.setLedRgb = function (ledGroup, red, green, blue) {
        var url = this._baseUrl + "/setLedRgb";
        var jsonBody = {
            'ledGroup': ledGroup,
            'red': red,
            'green': green,
            'blue': blue,
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
    LedControl.prototype.setLedColor = function (ledGroup, color) {
        var url = this._baseUrl + "/setLedColor";
        var jsonBody = {
            'ledGroup': ledGroup,
            'color': color,
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
    LedControl.prototype.setAllLedsRgb = function (red, green, blue) {
        var url = this._baseUrl + "/setAllLedsRgb";
        var jsonBody = {
            'red': red,
            'green': green,
            'blue': blue,
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
    LedControl.prototype.setAllLedsColor = function (color) {
        var url = this._baseUrl + "/setAllLedsColor";
        var jsonBody = {
            'color': color,
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
    LedControl.prototype.setMultipleLedsRgb = function (ledGroups, red, green, blue) {
        var url = this._baseUrl + "/setMultipleLedsRgb";
        var jsonBody = {
            'ledGroups': ledGroups,
            'red': red,
            'green': green,
            'blue': blue,
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
    LedControl.prototype.setMultipleLedsColor = function (ledGroups, color) {
        var url = this._baseUrl + "/setMultipleLedsColor";
        var jsonBody = {
            'ledGroups': ledGroups,
            'color': color,
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
    return LedControl;
}());
exports.LedControl = LedControl;
//# sourceMappingURL=led-control.js.map