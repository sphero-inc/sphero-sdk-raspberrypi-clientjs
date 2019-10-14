"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DriveControl = /** @class */ (function () {
    function DriveControl(rvrToy) {
        this._baseUrl = rvrToy.baseUrl + '/driveControl';
    }
    DriveControl.prototype.resetHeading = function () {
        var url = this._baseUrl + "/resetHeading";
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
    DriveControl.prototype.driveBackwardSeconds = function (speed, heading, seconds) {
        var url = this._baseUrl + "/driveBackwardSeconds";
        var jsonBody = {
            'speed': speed,
            'heading': heading,
            'seconds': seconds,
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
    DriveControl.prototype.driveForwardSeconds = function (speed, heading, seconds) {
        var url = this._baseUrl + "/driveForwardSeconds";
        var jsonBody = {
            'speed': speed,
            'heading': heading,
            'seconds': seconds,
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
    DriveControl.prototype.turnLeftDegrees = function (heading, amount) {
        var url = this._baseUrl + "/turnLeftDegrees";
        var jsonBody = {
            'heading': heading,
            'amount': amount,
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
    DriveControl.prototype.turnRightDegrees = function (heading, amount) {
        var url = this._baseUrl + "/turnRightDegrees";
        var jsonBody = {
            'heading': heading,
            'amount': amount,
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
    DriveControl.prototype.rollStart = function (speed, heading) {
        var url = this._baseUrl + "/rollStart";
        var jsonBody = {
            'speed': speed,
            'heading': heading,
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
    DriveControl.prototype.rollStop = function (heading) {
        var url = this._baseUrl + "/rollStop";
        var jsonBody = {
            'heading': heading,
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
    DriveControl.prototype.aimStart = function () {
        var url = this._baseUrl + "/aimStart";
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
    DriveControl.prototype.aimStop = function () {
        var url = this._baseUrl + "/aimStop";
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
    return DriveControl;
}());
exports.DriveControl = DriveControl;
//# sourceMappingURL=drive-control.js.map