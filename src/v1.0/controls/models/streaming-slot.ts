import {IStreamingService, IStreamingServiceData} from './streaming-service';
import {ByteConversionUtilities} from '../../../utilities/byte-conversion-utilities'

export interface IStreamingSlot {
    readonly tokenId: number;
    readonly configuration: Array<number>;
    readonly hasEnabledStreamingServices: boolean;

    disableStreamingServices(): void;
    parseStreamingSlotDataToObject(sensorDataRawBytes: Array<number>): IStreamingSlotData;
}


export class StreamingSlot implements IStreamingSlot{

    protected _tokenId: number = 0;
    public get tokenId(): number {
        return this._tokenId;
    }

    public get configuration(): Array<number> {
        if (!this.hasEnabledStreamingServices){
            throw new Error();
        }

        let dataRawBytes: Array<number> = [];

        // let tokenBytes: Array<number> = ByteConversionUtilities.int8ToByteArray(this._tokenId);
        // dataRawBytes = dataRawBytes.concat(tokenBytes);

        for(let streamingService of this._enabledStreamingServices()){
            dataRawBytes = dataRawBytes.concat(ByteConversionUtilities.int16ToByteArray(streamingService.id).reverse());
            dataRawBytes = dataRawBytes.concat(ByteConversionUtilities.int8ToByteArray(streamingService.dataSizeEnum));
        }
        return dataRawBytes;
    }

    private readonly _supportedStreamingServices: Array<IStreamingService> = [];

    public get hasEnabledStreamingServices(): boolean {
        for(let streamingService of this._supportedStreamingServices) {
            if (streamingService.isEnabled)
                return true;
        }
        return false;
    }

    constructor(tokenId: number, supportedStreamingServices: Array<IStreamingService>) {
        this._tokenId = tokenId;
        this._supportedStreamingServices = supportedStreamingServices;
    }

    public disableStreamingServices(): void {
        for(let streamingService of this._supportedStreamingServices)
            streamingService.disable();
    }

    public parseStreamingSlotDataToObject(sensorData: Array<number>): IStreamingSlotData {
        let streamingSlotData: IStreamingSlotData = {};

        let currentIndex: number = 0;
        for(let streamingService of this._enabledStreamingServices()){
            let streamingServiceData: Array<number> = ByteConversionUtilities.sliceBytes(sensorData, currentIndex, streamingService.bytesPerStreamingServiceData);
            streamingSlotData[streamingService.name] = streamingService.parseStreamingServiceBytesToObject(streamingServiceData);
            currentIndex += streamingServiceData.length;
        }
        return streamingSlotData;
    }

    private _enabledStreamingServices(): Array<IStreamingService> {
        let enabledStreamingServices: Array<IStreamingService> = [];
        for(let streamingService of this._supportedStreamingServices) {
            if (streamingService.isEnabled)
                enabledStreamingServices.push(streamingService);
        }
        return enabledStreamingServices;
    }
}


export interface IStreamingSlotData {
    [streamingServiceName: string]: IStreamingServiceData;
}
