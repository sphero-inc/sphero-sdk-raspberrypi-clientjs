import { IStreamingServiceDataNotifyResponse } from '../sensor-control';
import { IStreamingSlotData, IStreamingSlot } from './streaming-slot';
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
export declare class StreamingProvider implements IStreamingProvider {
    private static readonly _sensorDeviceId;
    private static readonly _sensorDataCommandId;
    private readonly _baseUrl;
    private readonly _streamingSlots;
    private readonly _streamingSlotByToken;
    private readonly _processorId;
    readonly processorId: number;
    readonly hasEnabledStreamingServices: boolean;
    _isStreaming: boolean;
    readonly isStreaming: boolean;
    private _isConfigured;
    readonly isConfigured: boolean;
    constructor(processorId: number, streamingSlots: Array<IStreamingSlot>, baseUrl: string);
    configureStreaming(): Promise<void>;
    startStreaming(streamingInterval: number): Promise<void>;
    pauseStreaming(): Promise<void>;
    clearStreaming(): Promise<void>;
    private _configureStreamingForEnabledSlots;
    buildSensorDataParser(): ISensorDataParser;
    private _sendConfigureStreamingSlotRequest;
    private _sendStartStreamingRequest;
    private _sendStopStreamingRequest;
    private _sendStopAndClearStreamingRequest;
}
export interface ISensorDataParser {
    (data: IStreamingServiceDataNotifyResponse): IStreamingSlotData;
}
