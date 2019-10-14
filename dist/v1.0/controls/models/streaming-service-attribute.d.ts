export interface IStreamingServiceAttribute {
    readonly name: string;
    readonly minimumValue: number;
    readonly maximumValue: number;
    parseAttributeBytesToFloatValues(dataRawBytes: Array<number>, previousMin: number, previousMax: number): number;
}
export declare class StreamingServiceAttribute implements IStreamingServiceAttribute {
    protected _name: string;
    readonly name: string;
    protected _minimumValue: number;
    readonly minimumValue: number;
    protected _maximumValue: number;
    readonly maximumValue: number;
    constructor(name: string, minimumValue: number, maximumValue: number);
    parseAttributeBytesToFloatValues(dataRawBytes: Array<number>, minimumIn: number, maximumIn: number): number;
}
