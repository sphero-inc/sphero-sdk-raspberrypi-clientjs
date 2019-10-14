export declare class ApiErrorCodes {
    static readonly success: number;
    static readonly badDeviceId: number;
    static readonly badCommandId: number;
    static readonly notYetImplemented: number;
    static readonly commandIsRestricted: number;
    static readonly badDataLength: number;
    static readonly commandFailed: number;
    static readonly badParameterValue: number;
    static readonly busy: number;
    static readonly badTargetId: number;
    static readonly targetUnavailable: number;
    static getApiErrorMessageFromCode(errorCode: number): string;
}
export declare class ApiProtocolErrorCodes {
    static readonly badEscapeValue: number;
    static readonly badChecksum: number;
    static readonly earlyEndOfPacket: number;
    static readonly earlyStartOfPacket: number;
    static readonly badFlags: number;
    static readonly skippedData: number;
    static getApiProtocolErrorMessageFromCode(errorCode: number): string;
}
export declare class ApiFlags {
    static readonly isResponse: number;
    static readonly requestsResponse: number;
    static readonly requestOnlyErrorResponse: number;
    static readonly resetInactivityTimeout: number;
    static readonly packetHasTargetId: number;
    static readonly packetHasSourceId: number;
    static readonly extendedFlags: number;
    static readonly defaultRequestWithResponseFlags: number;
    static readonly defaultRequestWithNoResponseFlags: number;
    static readonly defaultResponseFlags: number;
}
export declare class ApiTargetsAndSources {
    static readonly robotNordicTarget: number;
    static readonly robotStTarget: number;
    static readonly serviceSource: number;
}
export declare class ApiParserFlags {
    static readonly escape: number;
    static readonly startOfPacket: number;
    static readonly endOfPacket: number;
    static readonly escapedEscape: number;
    static readonly escapedStartOfPacket: number;
    static readonly escapedEndOfPacket: number;
    static readonly slipEscapeMask: number;
}
