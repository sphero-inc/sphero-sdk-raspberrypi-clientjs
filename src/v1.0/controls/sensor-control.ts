import {IAsyncDataHandler, IToy} from '../toy-interface';
import {IStreamingProvider, StreamingProvider, ISensorDataParser} from './models/streaming-provider';
import {IStreamingSlot, StreamingSlot, IStreamingSlotData} from './models/streaming-slot';
import {IStreamingService, StreamingService} from './models/streaming-service';
import {IStreamingServiceAttribute, StreamingServiceAttribute} from './models/streaming-service-attribute';
import {ByteConversionUtilities} from '../../utilities/byte-conversion-utilities';

export class SensorControl {
    private readonly _baseUrl: string;
    private readonly _streamingDataHandlerByName: Map<string, ISensorDataHandler>;

    private readonly _supportedStreamingServices: Map<string, IStreamingService> = new Map<string, IStreamingService>();
    private readonly _streamingProviders: Array<IStreamingProvider> = [];

    // use an enumeration for this?
    private readonly _eightBitEnum: number = 0x00;
    private readonly _sixteenBitEnum: number = 0x01;
    private readonly _thirtyTwoBitEnum: number = 0x02;

    private readonly _processorIdNordic: number = 0x01;
    private readonly _processorIdST: number = 0x02;

    private _isStreaming: boolean;
    public get isStreaming(): boolean {
        return this._isStreaming;
    }

    public readonly quaternion: string;
    public readonly attitude: string;
    public readonly accelerometer: string;
    public readonly colorDetection: string;
    public readonly gyroscope: string;
    public readonly coreTimeLower: string;
    public readonly coreTimeUpper: string;
    public readonly locator: string;
    public readonly velocity: string;
    public readonly speed: string;
    public readonly ambientLight: string;
    private _defaultStreamingInterval: number = 250;

    constructor(rvrToy: IToy) {
        this._baseUrl = rvrToy.baseUrl + '/sensor';

        this.quaternion = 'Quaternion';
        this.attitude = 'IMU';
        this.accelerometer = 'Accelerometer';
        this.colorDetection = 'ColorDetection';
        this.gyroscope = 'Gyroscope';
        this.coreTimeLower = 'CoreTimeLower';
        this.coreTimeUpper = 'CoreTimeUpper';
        this.locator = 'Locator';
        this.velocity = 'Velocity';
        this.speed = 'Speed';
        this.ambientLight = 'AmbientLight';

        this._initializeSensors();

        this._streamingDataHandlerByName = new Map<string, ISensorDataHandler>();

        for (let streamingProvider of this._streamingProviders){
            let parseData: ISensorDataParser = streamingProvider.buildSensorDataParser();

            let onStreamingServiceDataNotifyHandler: IAsyncDataHandler = (data: object) => {
                let sensorDataObject: IStreamingSlotData = parseData(data as IStreamingServiceDataNotifyResponse);
                for(let sensorName in sensorDataObject) {
                    let handler = this._streamingDataHandlerByName.get(sensorName);
                    if (handler) {
                        handler(sensorDataObject[sensorName]);
                    }
                }
            };

            rvrToy.asyncHandlerByName.set(`${streamingProvider.processorId}, 0x18, 0x3D`, onStreamingServiceDataNotifyHandler);
        }

        this._isStreaming = false;
    }

    public enableSensor(streamingServiceName: string, handler: ISensorDataHandler): void {
        let sensor: IStreamingService | undefined = this._supportedStreamingServices.get(streamingServiceName);
        if (sensor == undefined)
            throw new Error(`no such sensor: ${streamingServiceName}`);
        sensor.enable();
        this._streamingDataHandlerByName.set(streamingServiceName, handler);
    }

    public disableSensor(streamingServiceName: string): void {
        let sensor: IStreamingService | undefined = this._supportedStreamingServices.get(streamingServiceName);
        if (sensor == undefined)
            throw new Error(`no such sensor: ${streamingServiceName}`);
        if(this._streamingDataHandlerByName.has(streamingServiceName))
            this._streamingDataHandlerByName.delete(streamingServiceName);
        sensor.disable();
    }

    public async startSensorStreaming(streamingInterval: number) {
        if (this._isStreaming) {
            throw new Error('Already streaming; pause or clear sensor streaming first.');
        }
        if (!this._hasSensorsEnabled()) {
            throw new Error('No sensors enabled.');
        }
        if (streamingInterval < 50)
            throw new Error('Cannot have streaming interval lower than 50 milliseconds.');

        if(streamingInterval == undefined)
            streamingInterval = this._defaultStreamingInterval;

        for(let streamingProvider of this._streamingProviders) {
            if (!streamingProvider.hasEnabledStreamingServices) {
                continue;
            }

            await streamingProvider.clearStreaming();
            await streamingProvider.configureStreaming();
            await streamingProvider.startStreaming(streamingInterval);
        }
        this._isStreaming = true;
    }

    public pauseSensorStreaming(): void {
        if (!this._hasSensorsEnabled())
            throw new Error('No sensors enabled.');


        for(let streamingProvider of this._streamingProviders) {
            if (!streamingProvider.isStreaming) {
                continue;
            }
            streamingProvider.pauseStreaming();
        }
        this._isStreaming = false;
    }

    public clearSensorStreaming(): void {
        if (!this._hasSensorsEnabled())
            throw new Error('No enabled sensors to disable.');

        this._disableAllSensors();

        for(let streamingProvider of this._streamingProviders) {
            if (!streamingProvider.isStreaming) {
                continue;
            }
            streamingProvider.clearStreaming();
        }

        this._isStreaming = false;
    }

    private _initializeSensors(): void {
        let quaternionW: IStreamingServiceAttribute = new StreamingServiceAttribute('W', -1.0, 1.0);
        let quaternionX: IStreamingServiceAttribute = new StreamingServiceAttribute('X', -1.0, 1.0);
        let quaternionY: IStreamingServiceAttribute = new StreamingServiceAttribute('Y', -1.0, 1.0);
        let quaternionZ: IStreamingServiceAttribute = new StreamingServiceAttribute('Z', -1.0, 1.0);
        let quaternion: IStreamingService = new StreamingService(0x00, this.quaternion,
            [quaternionW, quaternionX, quaternionY, quaternionZ], this._thirtyTwoBitEnum);

        let attitudePitch: IStreamingServiceAttribute = new StreamingServiceAttribute('Pitch', -180.0, 180.0);
        let attitudeRoll: IStreamingServiceAttribute = new StreamingServiceAttribute('Roll', -90.0, 90.0);
        let attitudeYaw: IStreamingServiceAttribute = new StreamingServiceAttribute('Yaw', -180.0, 180.0);
        let attitude: IStreamingService = new StreamingService(0x01, this.attitude, [attitudePitch, attitudeRoll, attitudeYaw], this._sixteenBitEnum);

        let accelerometerX: IStreamingServiceAttribute = new StreamingServiceAttribute('X', -16.0, 16.0);
        let accelerometerY: IStreamingServiceAttribute = new StreamingServiceAttribute('Y', -16.0, 16.0);
        let accelerometerZ: IStreamingServiceAttribute = new StreamingServiceAttribute('Z', -16.0, 16.0);
        let accelerometer: IStreamingService  = new StreamingService(0x02, this.accelerometer, [accelerometerX,
            accelerometerY, accelerometerZ], this._sixteenBitEnum);

        let colorDetectionR: IStreamingServiceAttribute = new StreamingServiceAttribute('R', 0, ByteConversionUtilities.uint8MaxValue);
        let colorDetectionG: IStreamingServiceAttribute = new StreamingServiceAttribute('G', 0, ByteConversionUtilities.uint8MaxValue);
        let colorDetectionB: IStreamingServiceAttribute = new StreamingServiceAttribute('B', 0, ByteConversionUtilities.uint8MaxValue);
        let colorDetectionIndex: IStreamingServiceAttribute = new StreamingServiceAttribute('Index', 0, ByteConversionUtilities.uint8MaxValue);
        let colorDetectionConfidence: IStreamingServiceAttribute = new StreamingServiceAttribute('Confidence', 0.0, 1.0);
        let colorDetection: IStreamingService = new StreamingService(0x03, this.colorDetection,
            [colorDetectionR, colorDetectionG, colorDetectionB, colorDetectionIndex, colorDetectionConfidence], this._eightBitEnum);

        let gyroscopeX: IStreamingServiceAttribute = new StreamingServiceAttribute('X', -2000.0, 2000.0);
        let gyroscopeY: IStreamingServiceAttribute = new StreamingServiceAttribute('Y', -2000.0, 2000.0);
        let gyroscopeZ: IStreamingServiceAttribute = new StreamingServiceAttribute('Z', -2000.0, 2000.0);
        let gyroscope: IStreamingService = new StreamingService(0x04, this.gyroscope, [gyroscopeX, gyroscopeY, gyroscopeZ],
            this._sixteenBitEnum);

        let locatorX: IStreamingServiceAttribute = new StreamingServiceAttribute('X', -16000, 16000);
        let locatorY: IStreamingServiceAttribute = new StreamingServiceAttribute('Y', -16000, 16000);
        let locator: IStreamingService = new StreamingService(0x06, this.locator, [locatorX, locatorY], this._thirtyTwoBitEnum);

        let velocityX: IStreamingServiceAttribute = new StreamingServiceAttribute('X', -5.0, 5.0);
        let velocityY: IStreamingServiceAttribute = new StreamingServiceAttribute('Y', -5.0, 5.0);
        let velocity: IStreamingService = new StreamingService(0x07, this.velocity, [velocityX, velocityY], this._thirtyTwoBitEnum);

        let speedMPS: IStreamingServiceAttribute = new StreamingServiceAttribute('MPS', 0, 5.0);
        let speed: IStreamingService = new StreamingService(0x08, this.speed, [speedMPS], this._thirtyTwoBitEnum);

        let coreTimeLowerTime: IStreamingServiceAttribute = new StreamingServiceAttribute('Time', 0, ByteConversionUtilities.uint32MaxValue);
        let coreTimeLower: IStreamingService = new StreamingService(0x05, this.coreTimeLower, [coreTimeLowerTime], this._thirtyTwoBitEnum);

        let coreTimeUpperTime: IStreamingServiceAttribute = new StreamingServiceAttribute('Time', 0, ByteConversionUtilities.uint32MaxValue);
        let coreTimeUpper: IStreamingService = new StreamingService(0x09, this.coreTimeUpper, [coreTimeUpperTime], this._thirtyTwoBitEnum);

        let ambientLightLight: IStreamingServiceAttribute = new StreamingServiceAttribute('Light', 0, 120000.0);
        let ambientLight: IStreamingService = new StreamingService(0x0A, this.ambientLight, [ambientLightLight], this._sixteenBitEnum);

        this._supportedStreamingServices.set(quaternion.name,     quaternion);
        this._supportedStreamingServices.set(attitude.name,       attitude);
        this._supportedStreamingServices.set(accelerometer.name,  accelerometer);
        this._supportedStreamingServices.set(colorDetection.name, colorDetection);
        this._supportedStreamingServices.set(gyroscope.name,      gyroscope);
        this._supportedStreamingServices.set(locator.name,        locator);
        this._supportedStreamingServices.set(velocity.name,       velocity);
        this._supportedStreamingServices.set(speed.name,          speed);
        this._supportedStreamingServices.set(coreTimeLower.name,  coreTimeLower);
        this._supportedStreamingServices.set(coreTimeUpper.name,  coreTimeUpper);
        this._supportedStreamingServices.set(ambientLight.name,   ambientLight);

        let slotNordic1: IStreamingSlot  = new StreamingSlot(1, [colorDetection]);
        let slotNordic2: IStreamingSlot  = new StreamingSlot(2, [coreTimeLower, coreTimeUpper]);
        let slotNordic3: IStreamingSlot  = new StreamingSlot(3, [ambientLight]);

        let slotST1: IStreamingSlot  = new StreamingSlot(1, [quaternion, attitude, accelerometer, gyroscope]);
        let slotST2: IStreamingSlot  = new StreamingSlot(2, [locator, velocity, speed]);

        let nordicStreamingProvider: IStreamingProvider = new StreamingProvider(this._processorIdNordic, [slotNordic1, slotNordic2, slotNordic3], this._baseUrl);
        let stStreamingProvider: IStreamingProvider = new StreamingProvider(this._processorIdST, [slotST1, slotST2], this._baseUrl);

        this._streamingProviders.push(nordicStreamingProvider);
        this._streamingProviders.push(stStreamingProvider);
    }


    private _hasSensorsEnabled(): boolean {
        for(let streamingService of Array.from(this._supportedStreamingServices.values())){
            if (streamingService.isEnabled)
                return true;
        }
        return false;
    }

    private _disableAllSensors(): void {
        for(let streamingService of Array.from(this._supportedStreamingServices.values())){
            streamingService.disable();
        }
    }
}

export interface ISensorDataHandler {
    (sensorData: object): any;
}

export interface IStreamingServiceDataNotifyResponse {
    readonly token: number;
    readonly sensorData: Array<number>;
}


