import {IToy} from '../toy-interface';

export class LedControl {
    private readonly _baseUrl: string;

    public readonly statusIndicationLeft: string;
    public readonly statusIndicationRight: string;
    public readonly headlightLeft: string;
    public readonly headlightRight: string;
    public readonly batteryDoorFront: string;
    public readonly batteryDoorRear: string;
    public readonly powerButtonFront: string;
    public readonly powerButtonRear: string;
    public readonly brakelightLeft: string;
    public readonly brakelightRight: string;
    public readonly undercarriageWhite: string;

    public readonly red: string;
    public readonly green: string;
    public readonly blue: string;
    public readonly off: string;
    public readonly white: string;
    public readonly yellow: string;
    public readonly purple: string;
    public readonly orange: string;
    public readonly pink: string;

    constructor(rvrToy: IToy) {
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

    getAvailableLedGroups() {
        let url = `${this._baseUrl}/getAvailableLedGroups`;

        return fetch(url,  {
            method: 'GET',
            headers:  {
                'accept': 'application/json',
            },
        }).then(response => {
            return response.text()
        }).then(text => {
            return text;
        })
    }

    getAvailableColors() {
        let url = `${this._baseUrl}/getAvailableColors`;

        return fetch(url,  {
            method: 'GET',
            headers:  {
                'accept': 'application/json',
            },
        }).then(response => {
            return response.text()
        }).then(text => {
            return text;
        });
    }

    turnLedsOff() {
        let url = `${this._baseUrl}/turnLedsOff`;

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

    setLedRgb(ledGroup: string, red: number, green: number, blue: number) {
        let url = `${this._baseUrl}/setLedRgb`;

        let jsonBody = {
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
    }

    setLedColor(ledGroup: string, color: string) {
        let url = `${this._baseUrl}/setLedColor`;

        let jsonBody = {
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
    }

    setAllLedsRgb(red: number, green: number, blue: number) {
        let url = `${this._baseUrl}/setAllLedsRgb`;

        let jsonBody = {
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
    }

    setAllLedsColor(color: string) {
        let url = `${this._baseUrl}/setAllLedsColor`;

        let jsonBody = {
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
    }

    setMultipleLedsRgb(ledGroups: Array<string>, red: number, green: number, blue: number) {
        let url = `${this._baseUrl}/setMultipleLedsRgb`;

        let jsonBody = {
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
    }

    setMultipleLedsColor(ledGroups: Array<string>, color: string) {
        let url = `${this._baseUrl}/setMultipleLedsColor`;

        let jsonBody = {
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
    }
}
