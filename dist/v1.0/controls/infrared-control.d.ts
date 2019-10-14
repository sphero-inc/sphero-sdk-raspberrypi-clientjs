import { IAsyncDataHandler, IToy } from '../toy-interface';
export declare class InfraredControl {
    private readonly _baseUrl;
    private readonly _rvrToy;
    constructor(rvrToy: IToy);
    startInfraredBroadcasting(farCode: number, nearCode: number): void;
    stopInfraredBroadcasting(): void;
    startInfraredFollowing(farCode: number, nearCode: number): void;
    stopInfraredFollowing(): void;
    sendInfraredMessages(messages: Array<number>, strength: number): void;
    listenForInfraredMessages(handler: IAsyncDataHandler): void;
    stopListeningForInfraredMessages(): void;
}
