import { IToy } from '../toy-interface';
export declare class DriveControl {
    private readonly _baseUrl;
    constructor(rvrToy: IToy);
    resetHeading(): void;
    driveBackwardSeconds(speed: number, heading: number, seconds: number): void;
    driveForwardSeconds(speed: number, heading: number, seconds: number): void;
    turnLeftDegrees(heading: number, amount: number): void;
    turnRightDegrees(heading: number, amount: number): void;
    rollStart(speed: number, heading: number): void;
    rollStop(heading: number): void;
    aimStart(): void;
    aimStop(): void;
}
