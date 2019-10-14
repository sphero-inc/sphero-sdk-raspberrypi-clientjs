import {IToy} from '../toy-interface';

export class DriveControl {
    private readonly _baseUrl: string;

    constructor(rvrToy: IToy) {
        this._baseUrl = rvrToy.baseUrl + '/driveControl';
    }

    resetHeading() {
        let url = `${this._baseUrl}/resetHeading`;

        let jsonBody = {
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
    }

    driveBackwardSeconds(speed: number, heading: number, seconds: number) {
        let url = `${this._baseUrl}/driveBackwardSeconds`;

        let jsonBody = {
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
    }

    driveForwardSeconds(speed: number, heading: number, seconds: number) {
        let url = `${this._baseUrl}/driveForwardSeconds`;

        let jsonBody = {
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
    }

    turnLeftDegrees(heading: number, amount: number) {
        let url = `${this._baseUrl}/turnLeftDegrees`;

        let jsonBody = {
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
    }

    turnRightDegrees(heading: number, amount: number) {
        let url = `${this._baseUrl}/turnRightDegrees`;

        let jsonBody = {
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
    }

    rollStart(speed: number, heading: number) {
        let url = `${this._baseUrl}/rollStart`;

        let jsonBody = {
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
    }

    rollStop(heading: number) {
        let url = `${this._baseUrl}/rollStop`;

        let jsonBody = {
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
    }

    aimStart() {
        let url = `${this._baseUrl}/aimStart`;

        let jsonBody = {
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
    }

    aimStop() {
        let url = `${this._baseUrl}/aimStop`;

        let jsonBody = {
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
    }
}
