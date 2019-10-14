import { IStreamingService, IStreamingServiceData } from './streaming-service';
export interface IStreamingSlot {
    readonly tokenId: number;
    readonly configuration: Array<number>;
    readonly hasEnabledStreamingServices: boolean;
    disableStreamingServices(): void;
    parseStreamingSlotDataToObject(sensorDataRawBytes: Array<number>): IStreamingSlotData;
}
export declare class StreamingSlot implements IStreamingSlot {
    protected _tokenId: number;
    readonly tokenId: number;
    readonly configuration: Array<number>;
    private readonly _supportedStreamingServices;
    readonly hasEnabledStreamingServices: boolean;
    constructor(tokenId: number, supportedStreamingServices: Array<IStreamingService>);
    disableStreamingServices(): void;
    parseStreamingSlotDataToObject(sensorData: Array<number>): IStreamingSlotData;
    private _enabledStreamingServices;
}
export interface IStreamingSlotData {
    [streamingServiceName: string]: IStreamingServiceData;
}
