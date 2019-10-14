import {IAsyncDataHandler, IToy} from '../toy-interface';

export class InfraredControl {
    private readonly _baseUrl: string;
    private readonly _rvrToy: IToy;

    constructor(rvrToy: IToy) {
        this._baseUrl = rvrToy.baseUrl + '/infraredControl';
        this._rvrToy = rvrToy;
    }

    startInfraredBroadcasting(farCode: number, nearCode: number) {
        let url = `${this._baseUrl}/startInfraredBroadcasting`;

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

    stopInfraredBroadcasting() {
        let url = `${this._baseUrl}/stopInfraredBroadcasting`;

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

    startInfraredFollowing(farCode: number, nearCode: number) {
        let url = `${this._baseUrl}/startInfraredFollowing`;

        let jsonBody = {
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
    }

    stopInfraredFollowing() {
        let url = `${this._baseUrl}/stopInfraredFollowing`;

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

    sendInfraredMessages(messages: Array<number>, strength: number) {
        let url = `${this._baseUrl}/sendInfraredMessages`;

        let jsonBody = {
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
    }

    listenForInfraredMessages(handler: IAsyncDataHandler) {
        this._rvrToy.asyncHandlerByName.set('2, 0x18, 0x2C', handler);

        let url = `${this._baseUrl}/listenForInfraredMessages`;

        let jsonBody = {
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
    }

    stopListeningForInfraredMessages() {
        let url = `${this._baseUrl}/listenForInfraredMessages`;

        let jsonBody = {
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
    }
}
