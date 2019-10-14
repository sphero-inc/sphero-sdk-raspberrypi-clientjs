import { LedControl } from './controls/led-control';
import { DriveControl } from './controls/drive-control';
import { InfraredControl } from './controls/infrared-control';
import { SensorControl } from './controls/sensor-control';
import { IAsyncDataHandler, IToy } from './toy-interface';
export declare class SpheroRvrToy implements IToy {
    private readonly _baseUrl;
    readonly baseUrl: string;
    private readonly _asyncHandlerByName;
    readonly asyncHandlerByName: Map<string, IAsyncDataHandler>;
    private readonly _ledControl;
    private readonly _driveControl;
    private readonly _infraredControl;
    private readonly _sensorControl;
    static readonly primaryTarget: number;
    static readonly secondaryTarget: number;
    constructor(ipAddress: string, port: number);
    private getAsyncMapKey;
    /**
     * Retrieve LedControl object
     * @returns LedControl object with which to interact with RVR
     */
    getLedControl(): LedControl;
    /**
     * Retrieve DriveControl object
     * @returns DriveControl object with which to interact with RVR
     */
    getDriveControl(): DriveControl;
    /**
     * Retrieve InfraredControl object
     * @returns InfraredControl object with which to interact with RVR
     */
    getInfraredControl(): InfraredControl;
    /**
     * Retrieve SensorControl object
     * @returns SensorControl object with which to interact with RVR
     */
    getSensorControl(): SensorControl;
    /**
     * Echo back the payload data (zero data is equivalent to a ping).
     * @param data - Payload data to be echoed as an integer between 0 and 255.
     * @param targetId - Processor target Id to send command to.
     * @returns Promise that resolves with the response from RVR for given command
     */
    echo(data: Array<number>, targetId: number): Promise<string | never>;
    /**
     * Gets the version of the main application.
     * @param targetId - Processor target Id to send command to.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getMainApplicationVersion(targetId: number): Promise<string | never>;
    /**
     * Gets the version of the bootloader.
     * @param targetId - Processor target Id to send command to.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getBootloaderVersion(targetId: number): Promise<string | never>;
    /**
     * Gets the board revision number.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getBoardRevision(): Promise<string | never>;
    /**
     * Gets the robot's MAC address.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getMacAddress(): Promise<string | never>;
    /**
     * Gets the id number assigned by the company for activation tracking.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getStatsId(): Promise<string | never>;
    /**
     * Returns the processor name string (as specified to the System Info module). If no name is specified, returns an empty string or no string.
     * @param targetId - Processor target Id to send command to.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getProcessorName(targetId: number): Promise<string | never>;
    /**
     * Returns the SKU of the bot.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getSku(): Promise<string | never>;
    /**
     * Returns the time (in milliseconds) that has passed since the latest power cycle started.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getCoreUpTimeInMilliseconds(): Promise<string | never>;
    /**
     * Put robot into a soft sleep state. Driving, LEDS, and sensors are disabled.
     */
    sleep(): void;
    /**
     * Wake up the system from soft sleep. Nothing to do if awake.
     */
    wake(): void;
    /**
     * Get usable battery percentage remaining.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getBatteryPercentage(): Promise<string | never>;
    /**
     * Returns the current battery state
     * @returns Promise that resolves with the response from RVR for given command
     */
    getBatteryVoltageState(): Promise<string | never>;
    /**
     * Notification triggered 10 seconds before soft/deep sleep.
     * @param handler - Function called upon receiving corresponding async command; takes form handler()
     */
    onWillSleepNotify(handler: IAsyncDataHandler): void;
    /**
     * Notification triggered when robot has entered soft/deep sleep.
     * @param handler - Function called upon receiving corresponding async command; takes form handler()
     */
    onDidSleepNotify(handler: IAsyncDataHandler): void;
    /**
     * Enables or disables notifications for changes to battery voltage state.
     */
    enableBatteryVoltageStateChangeNotify(isEnabled: boolean): void;
    /**
     * Notification for battery voltage state change.
     * @param handler - Function called upon receiving corresponding async command; takes form handler(data)
     */
    onBatteryVoltageStateChangeNotify(handler: IAsyncDataHandler): void;
    /**
     * Returns the most recent battery voltage reading in volts. This results in a 'Command Failed' API error if the platform does not support calibration. Note that this command does not get a new voltage reading; it returns the most recently read value, which is updated once per second on most robots. To force the battery system to read a new value, use the 'Force Battery Refresh' command.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getBatteryVoltageInVolts(readingType: number): Promise<string | never>;
    /**
     * Returns the battery voltage state thresholds and hysteresis value. The hysteresis value is added to the thresholds for rising voltages -- e.g., the voltage must be less than the low threshold to change the state to 'low battery' but it must be greater than (low threshold + hysteresis) to go back to the 'ok battery' state.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getBatteryVoltageStateThresholds(): Promise<string | never>;
    /**
     * Get the current draw, in AMPS, from a current sense amplifier
     * @returns Promise that resolves with the response from RVR for given command
     */
    getCurrentSenseAmplifierCurrent(amplifierId: number): Promise<string | never>;
    /**
     * Run left and right motors at a speed between 0 and 255. Set driving mode using flags.
     */
    rawMotors(leftMode: number, leftSpeed: number, rightMode: number, rightSpeed: number): void;
    /**
     * Sets current yaw angle to zero. (ie current direction is now considered 'forward'.)
     */
    resetYaw(): void;
    /**
     * Drive towards a heading at a particular speed. Flags can be set to modify driving mode.
     */
    driveWithHeading(speed: number, heading: number, flags: number): void;
    /**
     * Enables motor stall notifications.
     */
    enableMotorStallNotify(isEnabled: boolean): void;
    /**
     * Motor stall protection change notification.
     * @param handler - Function called upon receiving corresponding async command; takes form handler(data)
     */
    onMotorStallNotify(handler: IAsyncDataHandler): void;
    /**
     * Enables notification for when there is a motor fault.
     */
    enableMotorFaultNotify(isEnabled: boolean): void;
    /**
     * Notification that a motor fault has occurred.
     * @param handler - Function called upon receiving corresponding async command; takes form handler(data)
     */
    onMotorFaultNotify(handler: IAsyncDataHandler): void;
    /**
     * Get the motor fault state.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getMotorFaultState(): Promise<string | never>;
    /**
     * Enables the Async messages for when the Gyro max is hit.
     */
    enableGyroMaxNotify(isEnabled: boolean): void;
    /**
     * Occurs when the robot spins faster than the sensor can see in any axis.
     * @param handler - Function called upon receiving corresponding async command; takes form handler(data)
     */
    onGyroMaxNotify(handler: IAsyncDataHandler): void;
    /**
     * Resets the locator module's current X and Y values to 0.
     */
    resetLocatorXAndY(): void;
    /**
     * Sets flags for the locator module.
     */
    setLocatorFlags(flags: number): void;
    /**
     * An 8-bit value is returned for each infrared sensor, assigned by mask.
     Mask description on BOLT: 32'h0000_00ff: front left sensor 32'h0000_ff00: front right sensor 32'h00ff_0000: back right sensor 32'hff00_0000: back left sensor
     * @returns Promise that resolves with the response from RVR for given command
     */
    getBotToBotInfraredReadings(): Promise<string | never>;
    /**
     * Return raw data being read by RGBC sensor on each sensor channel
     * @returns Promise that resolves with the response from RVR for given command
     */
    getRgbcSensorValues(): Promise<string | never>;
    /**
     * For robot following, broadcasting robots emit two codes: one for long distance (3 meters +), and one for short distance (< 1 meter). Following robots use both of these codes to determine direction and distance from the broadcasting robot.
     */
    startRobotToRobotInfraredBroadcasting(farCode: number, nearCode: number): void;
    /**
     * Registers a far code and near code for a following robot to follow. Following robots use the far code and near code emitted by a broadcaster bot to determine direction and distance to travel.
     */
    startRobotToRobotInfraredFollowing(farCode: number, nearCode: number): void;
    /**
     * Halts current broadcasting or following. De-registers far code and near code on broadcasting or following robot.
     */
    stopRobotToRobotInfraredBroadcasting(): void;
    /**
     * Async sent when a registered robot to robot infrared message is received. In response returns the infrared code listened for.
     * @param handler - Function called upon receiving corresponding async command; takes form handler(data)
     */
    onRobotToRobotInfraredMessageReceivedNotify(handler: IAsyncDataHandler): void;
    /**
     * Ambient light value is returned; higher = more light!
     * @returns Promise that resolves with the response from RVR for given command
     */
    getAmbientLightSensorValue(): Promise<string | never>;
    /**
     * Halts current following. De-registers far code and near code on following robot.
     */
    stopRobotToRobotInfraredFollowing(): void;
    /**
     * Registers a far code and near code for a evading robot to evade. Evading robots use the far code and near code emitted by a broadcaster bot to determine direction and distance to travel.
     */
    startRobotToRobotInfraredEvading(farCode: number, nearCode: number): void;
    /**
     * Halts current evading. De-registers far code and near code on evading robot.
     */
    stopRobotToRobotInfraredEvading(): void;
    /**
     * Enable or disable asynchronous color detection notifications. The user must provide an interval and a confidence threshold
     */
    enableColorDetectionNotify(isEnabled: boolean, interval: number, minimumConfidenceThreshold: number): void;
    /**
     * Notification sent on the interval set by the user in enable_color_detection_notification with information about the color detected.  The color classification ID 0xFF is a special value indicating that the color could not be identified (e.g., because the reading was too dark).  This is expected behavior when the ring is tapped in the air with the sensor facing out.
     * @param handler - Function called upon receiving corresponding async command; takes form handler(data)
     */
    onColorDetectionNotify(handler: IAsyncDataHandler): void;
    /**
     * Note: this does not return anything.  Instead, a color_detection_notify async will be sent after measurement with the answer.
     */
    getCurrentDetectedColorReading(): void;
    /**
     * Enables the color detection module.
     */
    enableColorDetection(isEnabled: boolean): void;
    /**
     * Configure streaming services.
     * @param token
     * @param configuration - Array containing the configuration of the client, like the service ID and size.
     * @param targetId - Processor target Id to send command to.
     */
    configureStreamingService(token: number, configuration: Array<number>, targetId: number): void;
    /**
     * Start all streaming services for a client
     * @param period - Interval between sensor streaming packets in milliseconds.
     * @param targetId - Processor target Id to send command to.
     */
    startStreamingService(period: number, targetId: number): void;
    /**
     * Stops all streaming services for a client
     * @param targetId - Processor target Id to send command to.
     */
    stopStreamingService(targetId: number): void;
    /**
     * Clears all streaming services for a client
     * @param targetId - Processor target Id to send command to.
     */
    clearStreamingService(targetId: number): void;
    /**
     * Streaming data notification for a client configuration
     * @param handler - Function called upon receiving corresponding async command; takes form handler(data)
     */
    onStreamingServiceDataNotify(handler: IAsyncDataHandler): void;
    /**
     * Starts listening for infrared messages sent to the robot and will send an async message when received.
     */
    enableRobotInfraredMessageNotify(isEnabled: boolean): void;
    /**
     * Send specified code to any robot in the vicinity. The on/off for each sensor is controlled individually but there can only be one range for all sensors. Therefore, the acceptable combination of emitters strength would be: 5, 5, 0, 0 or 5, 5, 5, 5 or 0, 0, 0, 5, etc.
     */
    sendInfraredMessage(infraredCode: number, frontStrength: number, leftStrength: number, rightStrength: number, rearStrength: number): void;
    /**
     * Get the motor temperature (calculated from motor current) for given a motor index.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getMotorTemperature(motorIndex: number): Promise<string | never>;
    /**
     * Get motor thermal protection status.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getMotorThermalProtectionStatus(): Promise<string | never>;
    /**
     * Enable motor thermal protection status notifications.
     */
    enableMotorThermalProtectionStatusNotify(isEnabled: boolean): void;
    /**
     * Motor thermal protection status notification.
     * @param handler - Function called upon receiving corresponding async command; takes form handler(data)
     */
    onMotorThermalProtectionStatusNotify(handler: IAsyncDataHandler): void;
    /**
     * Returns null-terminated string with the BLE advertising name (e.g., "BL-ABCD").
     * @returns Promise that resolves with the response from RVR for given command
     */
    getBluetoothAdvertisingName(): Promise<string | never>;
    /**
     * LED affected mask can affect up to 32 LEDs simultaneously. 0 = not affected. 1 = affected (update this LED). If mask value is set to 1, you must provide a value in the LED data array.
     */
    setAllLeds(ledGroup: number, ledBrightnessValues: Array<number>): void;
    /**
     * The response data will list all assigned color palette slots in the system.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getActiveColorPalette(): Promise<string | never>;
    /**
     * Each entry in the array corresponds to one color slot in the system.  Any unmentioned slot indices will be marked unassigned.
     */
    setActiveColorPalette(rgbIndexBytes: Array<number>): void;
    /**
     * The response to this command will provide an array of color palette entries that would match on the provided color with higher confidence than the given threshold.
     * @returns Promise that resolves with the response from RVR for given command
     */
    getColorIdentificationReport(red: number, green: number, blue: number, confidenceThreshold: number): Promise<string | never>;
    /**
     * Loads the specified color palette into the active palette.
     */
    loadColorPalette(paletteIndex: number): void;
    /**
     * Stores the active palette into the palette at palette index (see table above).
     */
    saveColorPalette(paletteIndex: number): void;
    /**
     * Releases LED requests to show the idle indication.
     */
    releaseLedRequests(): void;
}
export declare class IoSpecdrumsColorPaletteIndiciesEnum {
    static readonly default: number;
    static readonly midi: number;
}
export declare class DriveRawMotorModesEnum {
    static readonly off: number;
    static readonly forward: number;
    static readonly reverse: number;
}
export declare class DriveMotorIndexesEnum {
    static readonly leftMotorIndex: number;
    static readonly rightMotorIndex: number;
}
export declare class SensorMotorIndexesEnum {
    static readonly leftMotorIndex: number;
    static readonly rightMotorIndex: number;
}
export declare class SensorThermalProtectionStatusEnum {
    static readonly ok: number;
    static readonly warn: number;
    static readonly critical: number;
}
export declare class SensorStreamingDataSizesEnum {
    static readonly eightBit: number;
    static readonly sixteenBit: number;
    static readonly thirtyTwoBit: number;
}
export declare class PowerBatteryVoltageStatesEnum {
    static readonly unknown: number;
    static readonly ok: number;
    static readonly low: number;
    static readonly critical: number;
}
export declare class PowerBatteryVoltageReadingTypesEnum {
    static readonly calibratedAndFiltered: number;
    static readonly calibratedAndUnfiltered: number;
    static readonly uncalibratedAndUnfiltered: number;
}
export declare class PowerAmplifierIdsEnum {
    static readonly leftMotor: number;
    static readonly rightMotor: number;
}
export declare class DriveDriveFlagsBitmask {
    static readonly none: number;
    static readonly driveReverse: number;
    static readonly boost: number;
    static readonly fastTurn: number;
    static readonly leftDirection: number;
    static readonly rightDirection: number;
    static readonly enableDrift: number;
}
export declare class SensorGyroMaxFlagsBitmask {
    static readonly none: number;
    static readonly maxPlusX: number;
    static readonly maxMinusX: number;
    static readonly maxPlusY: number;
    static readonly maxMinusY: number;
    static readonly maxPlusZ: number;
    static readonly maxMinusZ: number;
}
export declare class SensorLocatorFlagsBitmask {
    static readonly none: number;
    static readonly autoCalibrate: number;
}
export declare class SensorInfraredSensorLocationsBitmask {
    static readonly none: number;
    static readonly frontLeft: number;
    static readonly frontRight: number;
    static readonly backRight: number;
    static readonly backLeft: number;
}
export declare class SpheroRvrLedBitmasks {
    static readonly rightHeadlightRed: number;
    static readonly rightHeadlightGreen: number;
    static readonly rightHeadlightBlue: number;
    static readonly leftHeadlightRed: number;
    static readonly leftHeadlightGreen: number;
    static readonly leftHeadlightBlue: number;
    static readonly leftStatusIndicationRed: number;
    static readonly leftStatusIndicationGreen: number;
    static readonly leftStatusIndicationBlue: number;
    static readonly rightStatusIndicationRed: number;
    static readonly rightStatusIndicationGreen: number;
    static readonly rightStatusIndicationBlue: number;
    static readonly batteryDoorRearRed: number;
    static readonly batteryDoorRearGreen: number;
    static readonly batteryDoorRearBlue: number;
    static readonly batteryDoorFrontRed: number;
    static readonly batteryDoorFrontGreen: number;
    static readonly batteryDoorFrontBlue: number;
    static readonly powerButtonFrontRed: number;
    static readonly powerButtonFrontGreen: number;
    static readonly powerButtonFrontBlue: number;
    static readonly powerButtonRearRed: number;
    static readonly powerButtonRearGreen: number;
    static readonly powerButtonRearBlue: number;
    static readonly leftBrakelightRed: number;
    static readonly leftBrakelightGreen: number;
    static readonly leftBrakelightBlue: number;
    static readonly rightBrakelightRed: number;
    static readonly rightBrakelightGreen: number;
    static readonly rightBrakelightBlue: number;
    static readonly undercarriageWhite: number;
}
export declare class RvrLedGroups {
    static readonly rightHeadlight: number;
    static readonly leftHeadlight: number;
    static readonly leftStatusIndication: number;
    static readonly rightStatusIndication: number;
    static readonly batteryDoorRear: number;
    static readonly batteryDoorFront: number;
    static readonly powerButtonFront: number;
    static readonly powerButtonRear: number;
    static readonly leftBrakelight: number;
    static readonly rightBrakelight: number;
    static readonly undercarriage: number;
    static readonly allLights: number;
}
