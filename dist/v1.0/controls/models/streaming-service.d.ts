import { IStreamingServiceAttribute } from './streaming-service-attribute';
export interface IStreamingService {
    readonly id: number;
    readonly name: string;
    readonly isEnabled: boolean;
    readonly dataSizeEnum: number;
    readonly bytesPerStreamingServiceData: number;
    parseStreamingServiceBytesToObject(dataRawBytes: Array<number>): IStreamingServiceData;
    enable(): void;
    disable(): void;
}
export declare class StreamingService implements IStreamingService {
    protected _id: number;
    readonly id: number;
    protected _name: string;
    readonly name: string;
    private readonly _streamingServiceAttributes;
    private _isEnabled;
    readonly isEnabled: boolean;
    protected _dataSizeEnum: number;
    readonly dataSizeEnum: number;
    readonly bytesPerStreamingServiceData: number;
    constructor(id: number, name: string, streamingServiceAttributes: Array<IStreamingServiceAttribute>, dataSizeEnum: number);
    enable(): void;
    disable(): void;
    parseStreamingServiceBytesToObject(dataRawBytes: Array<number>): IStreamingServiceData;
    private readonly _bytesPerStreamingServiceAttributeData;
    private readonly _dataSizeMaximum;
    private static readonly dataSizeToBits;
    private static readonly dataSizeToMaximumValue;
}
export interface IStreamingServiceData {
    [streamingServiceAttributeName: string]: number;
}
