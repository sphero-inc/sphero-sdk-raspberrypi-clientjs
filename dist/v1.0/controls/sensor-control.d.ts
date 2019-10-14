import { IToy } from '../toy-interface';
export declare class SensorControl {
    private readonly _baseUrl;
    private readonly _streamingDataHandlerByName;
    private readonly _supportedStreamingServices;
    private readonly _streamingProviders;
    private readonly _eightBitEnum;
    private readonly _sixteenBitEnum;
    private readonly _thirtyTwoBitEnum;
    private readonly _processorIdNordic;
    private readonly _processorIdST;
    private _isStreaming;
    readonly isStreaming: boolean;
    readonly quaternion: string;
    readonly attitude: string;
    readonly accelerometer: string;
    readonly colorDetection: string;
    readonly gyroscope: string;
    readonly coreTimeLower: string;
    readonly coreTimeUpper: string;
    readonly locator: string;
    readonly velocity: string;
    readonly speed: string;
    readonly ambientLight: string;
    private _defaultStreamingInterval;
    constructor(rvrToy: IToy);
    enableSensor(streamingServiceName: string, handler: ISensorDataHandler): void;
    disableSensor(streamingServiceName: string): void;
    startSensorStreaming(streamingInterval: number): Promise<void>;
    pauseSensorStreaming(): void;
    clearSensorStreaming(): void;
    private _initializeSensors;
    private _hasSensorsEnabled;
    private _disableAllSensors;
}
export interface ISensorDataHandler {
    (sensorData: object): any;
}
export interface IStreamingServiceDataNotifyResponse {
    readonly token: number;
    readonly sensorData: Array<number>;
}
