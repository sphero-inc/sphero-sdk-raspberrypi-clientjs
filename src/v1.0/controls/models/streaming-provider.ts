import {IStreamingServiceDataNotifyResponse} from '../sensor-control';
import {IStreamingSlotData, IStreamingSlot} from './streaming-slot';

/**
 * This class handles sensor streaming for a given provider (Nordic, ST). It is responsible for configuring, starting,
 * and stopping streaming, as well as for enabling the functionality to parse streaming data coming from the provider.
 */
export interface IStreamingProvider {
    readonly processorId: number;
    readonly hasEnabledStreamingServices: boolean;
    readonly isStreaming: boolean;
    readonly isConfigured: boolean;

    buildSensorDataParser(): ISensorDataParser;
    configureStreaming(): void;
    startStreaming(streamingInterval: number): void;
    pauseStreaming(): void;
    clearStreaming(): void;
}


export class StreamingProvider implements IStreamingProvider {
    private static readonly _sensorDeviceId: number = 0x18;
    private static readonly _sensorDataCommandId: number = 0x3D;

    private readonly _baseUrl: string = '';

    private readonly _streamingSlots: Array<IStreamingSlot> = [];
    private readonly _streamingSlotByToken: Map<number, IStreamingSlot> = new Map<number, IStreamingSlot>();

    private readonly _processorId: number = 0;
    public get processorId(): number {
        return this._processorId;
    }

    public get hasEnabledStreamingServices(): boolean {
        for(let streamingSlot of this._streamingSlots) {
            if (streamingSlot.hasEnabledStreamingServices)
                return true;
        }
        return false;
    }

    public _isStreaming: boolean = false;
    public get isStreaming(): boolean {
        return this._isStreaming;
    }

    private _isConfigured: boolean = false;
    public get isConfigured(): boolean {
        return this._isConfigured;
    }

    constructor(processorId: number, streamingSlots: Array<IStreamingSlot>, baseUrl: string) {
        this._processorId = processorId;
        this._streamingSlots = streamingSlots;
        this._baseUrl = baseUrl;

        for(let streamingSlot of this._streamingSlots){
            this._streamingSlotByToken.set(streamingSlot.tokenId, streamingSlot);
        }
    }

    public async configureStreaming() {
        if(!this.hasEnabledStreamingServices){
            throw new Error('cannot configure streaming because has no enabled sensors');
        }
        await this._configureStreamingForEnabledSlots();
        this._isConfigured = true;
    }

    public async startStreaming(streamingInterval: number) {
        if(!this._isConfigured){
            throw new Error('cannot start streaming because is not configured');
        }
        if(this._isStreaming){
            throw new Error('cannot start streaming because is already streaming');
        }
        await this._sendStartStreamingRequest(streamingInterval);
        this._isStreaming = true;
    }

    public async pauseStreaming() {
        await this._sendStopStreamingRequest();
        this._isStreaming = false;
    }

    public async clearStreaming() {
        await this._sendStopAndClearStreamingRequest();
        this._isStreaming = false;
        this._isConfigured = false;
    }

    private async _configureStreamingForEnabledSlots() {
        for(let steamingSlot of this._streamingSlots){
            if (!steamingSlot.hasEnabledStreamingServices) {
                continue;
            }
            await this._sendConfigureStreamingSlotRequest(steamingSlot.tokenId, steamingSlot.configuration);
        }
    }

    public buildSensorDataParser(): ISensorDataParser {
        return (data: IStreamingServiceDataNotifyResponse): IStreamingSlotData => {
            let tokenId: number = data.token & 15;
            let streamingSlot: IStreamingSlot | undefined = this._streamingSlotByToken.get(tokenId);
            if (streamingSlot == undefined)
                throw new Error(`unable to parse streaming data with token ID ${data.token}`);

            return streamingSlot.parseStreamingSlotDataToObject(data.sensorData);
        }
    }

    private async _sendConfigureStreamingSlotRequest(token: number, configuration: Array<number>): Promise<Response> {
        let url = `${this._baseUrl}/configureStreamingService/${this._processorId}`;

        let jsonBody = {
            'token': token,
            'configuration': configuration,
            'isResponseRequested': true
        };

        return await fetch(url, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        });
    }


    private async _sendStartStreamingRequest(interval: number): Promise<Response> {
        let url = `${this._baseUrl}/startStreamingService/${this._processorId}`;

        let jsonBody = {
            'period': interval,
            'isResponseRequested': true
        };

        return await fetch(url, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        });
    }


    private async _sendStopStreamingRequest(): Promise<Response> {
        let url = `${this._baseUrl}/stopStreamingService/${this._processorId}`;

        let jsonBody = {
            'isResponseRequested': true
        };

        return await fetch(url, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        });
    }

    private async _sendStopAndClearStreamingRequest(): Promise<Response> {
        let url = `${this._baseUrl}/clearStreamingService/${this._processorId}`;

        let jsonBody = {
            'isResponseRequested': true
        };

        return await fetch(url, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        });
    }


}

export interface ISensorDataParser {
    (data: IStreamingServiceDataNotifyResponse): IStreamingSlotData;
}

