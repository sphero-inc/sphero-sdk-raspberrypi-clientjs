export interface IToy {
    readonly baseUrl: string;
    readonly asyncHandlerByName: Map<string, IAsyncDataHandler>;
}
export interface IAsyncDataHandler {
    (data: object): any;
}
