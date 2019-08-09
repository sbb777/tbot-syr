/*
* udriver_pca9685.ts
* PCA9685 driver for the Microbit
*/

/** 
 * PCA9685 μDriver allows the MicroBit to leverge the PCA9685 pletoras of analog
 * pins for applications such controling a muiltitude of LEDs or servos.
 * Attach your PCA9685 to your MicroBit via the i2c port.
*/
//

/**
* Enumeration of motors.
*/
enum BBMotor {
    //% block="left"
    Left,
    //% block="right"
    Right,
    //% block="both"
    Both
}



/**
  * Enumeration of directions.
  */
enum BBRobotDirection {
    //% block="left"
    Left,
    //% block="right"
    Right
}

/**
  * Stop modes. Coast or Brake
  */
enum BBStopMode {
    //% block="no brake"
    Coast,
    //% block="brake"
    Brake
}





/**
  * Pre-Defined LED colours
  */
enum BBColors {
    //% block=red
    Red = 0xff0000,
    //% block=orange
    Orange = 0xffa500,
    //% block=yellow
    Yellow = 0xffff00,
    //% block=green
    Green = 0x00ff00,
    //% block=blue
    Blue = 0x0000ff,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xff00ff,
    //% block=white
    White = 0xffffff,
    //% block=black
    Black = 0x000000
}

/**
* Update mode for LEDs
* setting to Manual requires show LED changes blocks
* setting to Auto will update the LEDs everytime they change
*/
enum BBMode {
    Manual,
    Auto
}

/**
* Model Types of BitBot
* Classic or XL
*/
enum BBModel {
    Classic,
    XL
}



/**
  * Enumeration of line sensors.
  */
enum BBLineSensor {
    //% block="left"
    Left,
    //% block="right"
    Right
}

/**
  * Enumeration of light sensors.
  */
enum BBLightSensor {
    //% block="left"
    Left,
    //% block="right"
    Right
}

/**
 * Ping unit for sensor.
 */
enum BBPingUnit {
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches,
    //% block="μs"
    MicroSeconds
}



let maqueencb: Action
let maqueenmycb: Action
let maqueene = "1"
let maqueenparam = 0
let alreadyInit = 0
let IrPressEvent = 0





//% color=#b58900 icon="\uf2db" block="SUPCA908041"
namespace SUPCA908041 {
    
    
    export class Packeta {
        public mye: string;
        public myparam: number;
    }


    /**
 * Defines the analog GVS pins on the PCA9685 
*/
    export enum Pin {
        P0 = 0, /* Pin value autoincrements 0...15*/
        P1,
        P2,
        P3,
        P4,
        P5,
        P6,
        P7,
        P8,
        P9,
        P10,
        P11,
        P12,
        P13,
        P14,
        P15
    }






    let neoStrip: neopixel.Strip;
    let _updateMode = BBMode.Auto;
    let leftSpeed = 0;
    let rightSpeed = 0;
    let _model = BBModel.Classic;



    let pwm_frequency: number = 200; //Frequency for input checking


    /**
         * Drive motor(s) forward or reverse.
         * @param motor motor to drive.
         * @param brightness brightness of motor (0 to 255). eg: 180
         */
    //% blockId="LED" block="lighten %motor|led(s) at brightness %brightness"
    //% weight=80
    //% subcategory=LEDS   
    export function leds1(leds1: BBMotor, brightness: number): void {

        if ((leds1 == BBMotor.Left)) {

            //analog_write(pin: Pin, value: number)

            analog_write(8, brightness)

            serial.writeValue("leds1", leds1)



        }

        if ((leds1 == BBMotor.Right)) {
            //  analog_write(2, 0)
            analog_write(9, brightness)

            serial.writeValue("leds1", leds1)

        }

        if ((leds1 == BBMotor.Both)) {
            analog_write(8, brightness)

            analog_write(9, brightness)

            serial.writeValue("leds1", leds1)

        }


    }



    /**
      * Drive motor(s) forward or reverse.
      * @param motor motor to drive.
      * @param speed speed of motor (-1023 to 1023). eg: 600
      */
    //% blockId="bitbot_motor" block="drive %motor|motor(s) at speed %speed"
    //% weight=80
    //% subcategory=Motors   
    export function motor(motor: BBMotor, speed: number): void {
        let speed0 = 0;
        let speed1 = 0;
        let speed2 = 0;

        // setPWM(Math.abs(speed));
        if (speed == 0)
            robot_stop(BBStopMode.Coast);
        else if (speed > 0) {
            speed0 = speed;
            speed1 = 0;
        }
        else {
            speed0 = 0;
            speed1 = 0 - speed;
        }


        if ((motor == BBMotor.Left)) {

            //analog_write(pin: Pin, value: number)
            //analog_write(5, 0)
            if (speed > 0) {
                speed2 = speed
                analog_write(2, speed2)
                digital_write(3, 0)
                digital_write(4, 1)
            }
            else {
                speed2 = 0 - speed
                analog_write(2, speed2)
                digital_write(3, 1)
                digital_write(4, 0)
            }

            //   serial.writeValue("motor", motor)



        }

        if ((motor == BBMotor.Right)) {

            if (speed > 0) {
                //  analog_write(2, 0)
                speed2 = speed
                analog_write(5, speed2)
                digital_write(6, 1)
                digital_write(7, 0)
            }
            else {
                speed2 = 0 - speed
                analog_write(5, speed2)
                digital_write(6, 0)
                digital_write(7, 1)

            }

            //  serial.writeValue("motor", motor)

        }

        if ((motor == BBMotor.Both)) {

            if (speed > 0) {
                speed2 = speed
                analog_write(2, speed2)
                digital_write(3, 0)
                digital_write(4, 1)

                analog_write(5, speed2)
                digital_write(6, 1)
                digital_write(7, 0)

                //  serial.writeValue("motor", motor)
            }
            else {
                speed2 = 0 - speed
                analog_write(2, speed2)
                digital_write(3, 1)
                digital_write(4, 0)

                analog_write(5, speed2)
                digital_write(6, 0)
                digital_write(7, 1)

                //  serial.writeValue("motor", motor)


            }



        }


    }


    /**
      * Stop robot by coasting slowly to a halt or braking
      * @param mode Brakes on or off
      */
    //% blockId="robot_stop" block="stop with %mode"
    //% weight=92
    //% subcategory=Motors
    export function robot_stop(mode: BBStopMode): void {
        let stopMode = 0;
        if (mode == BBStopMode.Brake)
            stopMode = 1;
        /**
            pins.digitalWritePin(DigitalPin.P0, stopMode);
            pins.digitalWritePin(DigitalPin.P1, stopMode);
            pins.digitalWritePin(DigitalPin.P8, stopMode);
            pins.digitalWritePin(DigitalPin.P12, stopMode);
         */

    }

    /**
      * Drive robot forward (or backward) at speed.
      * @param speed speed of motor between -1023 and 1023. eg: 600
      */
    //% blockId="bitbot_motor_forward" block="drive at speed %speed"
    //% speed.min=-1023 speed.max=1023
    //% weight=100
    //% subcategory=Motors
    export function drive(speed: number): void {
        motor(BBMotor.Both, speed);
    }

    /**
      * Drive robot forward (or backward) at speed for milliseconds.
      * @param speed speed of motor between -1023 and 1023. eg: 600
      * @param milliseconds duration in milliseconds to drive forward for, then stop. eg: 400
      */
    //% blockId="bitbot_motor_forward_milliseconds" block="drive at speed %speed| for %milliseconds|(ms)"
    //% speed.min=-1023 speed.max=1023
    //% weight=95
    //% subcategory=Motors
    export function driveMilliseconds(speed: number, milliseconds: number): void {
        drive(speed);
        basic.pause(milliseconds);
        let speed3 = 0;
        for (let ik = 1; ik < 60; ik++) {
            speed3 = speed * (60 - ik) / 60

            if (Math.abs(speed3) < 50) {
                drive(0)
                speed3 = 0
                ik = 200
            }
            drive(speed3)
            //  serial.writeValue("speed3", speed3)

            basic.pause(3);

        }
        drive(0)
        speed = 0

    }

    /**
      * Turn robot in direction at speed.
      * @param direction direction to turn.
      * @param speed speed of motor between 0 and 1023. eg: 600
      */
    //% blockId="bitbot_turn" block="spin %direction|at speed %speed"
    //% speed.min=0 speed.max=1023
    //% weight=90
    //% subcategory=Motors
    export function driveTurn(direction: BBRobotDirection, speed: number): void {
        if (speed < 0)
            speed = 0;
        if (direction == BBRobotDirection.Left) {
            motor(BBMotor.Left, -speed);
            motor(BBMotor.Right, speed);
        }
        else if (direction == BBRobotDirection.Right) {
            motor(BBMotor.Left, speed);
            motor(BBMotor.Right, -speed);
        }
    }

    /**
      * Spin robot in direction at speed for milliseconds.
      * @param direction direction to turn.
      * @param speed speed of motor between 0 and 1023. eg: 600
      * @param milliseconds duration in milliseconds to turn for, then stop. eg: 400
      */
    //% blockId="bitbot_turn_milliseconds" block="spin %direction|at speed %speed| for %milliseconds|(ms)"
    //% speed.min=0 speed.max=1023
    //% weight=85
    //% subcategory=Motors
    export function driveTurnMilliseconds(direction: BBRobotDirection, speed: number, milliseconds: number): void {
        driveTurn(direction, speed)
        basic.pause(milliseconds)
        motor(BBMotor.Both, 0)
    }




    /**
         * Read line sensor.
         * @param sensor Line sensor to read.
         */
    //% blockId="bitbot_read_line" block="%sensor|Front sensor"
    //% weight=85
    //% subcategory=Sensors
    export function readLine(sensor: BBLineSensor): number {
        
            if (sensor == BBLineSensor.Left)
                return pins.digitalReadPin(DigitalPin.P13);
            else
                return pins.digitalReadPin(DigitalPin.P14);
        

    }

    /**
      * Read light sensor.
      * @param sensor Light sensor to read.
      */
    //% blockId="bitbot_read_light" block="%sensor|Line sensor"
    //% weight=80
    //% subcategory=Sensors
    export function readLight(sensor: BBLightSensor): number {


        if (sensor == BBLightSensor.Left)
            return pins.analogReadPin(AnalogPin.P1);
        else
            return pins.analogReadPin(AnalogPin.P2);

    }


    /**
       * Read distance from sonar module connected to accessory connector.
       * @param unit desired conversion unit
       */
    //% blockId="bitbot_sonar" block="read sonar as %unit"
    //% weight=90
    //% subcategory=Sensors
    export function sonar(unit: BBPingUnit): number {
        // send pulse
        let trig = DigitalPin.P8;
        let echo = DigitalPin.P12;
        let maxCmDistance = 500;
        let d = 10;
        pins.setPull(trig, PinPullMode.PullNone);
        for (let x = 0; x < 10; x++) {
            pins.digitalWritePin(trig, 0);
            control.waitMicros(2);
            pins.digitalWritePin(trig, 1);
            control.waitMicros(10);
            pins.digitalWritePin(trig, 0);
            // read pulse
            d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);
            if (d > 0)
                break;
        }
        switch (unit) {
            case BBPingUnit.Centimeters: return Math.round(d / 58);
            case BBPingUnit.Inches: return d / 148;
            default: return d;
        }
    }



    //% advanced=true shim=maqueenIR::initIR
    function initIR(pin: Pins): void {
        return
    }
    //% advanced=true shim=maqueenIR::onPressEvent
    function onPressEvent(btn: RemoteButton, body: Action): void {
        return
    }
    //% advanced=true shim=maqueenIR::getParam
    function getParam(): number {
        return 0
    }

    function maqueenInit(): void {
        if (alreadyInit == 1) {
            return
        }
        initIR(Pins.P16)
        alreadyInit = 1
    }

    //% weight=62
    //% blockGap=50
    //% mutate=objectdestructuring
    //% mutateText=Packeta
    //% mutateDefaults="myparam:message"
    //% blockId=IR_callbackUser block="on IR data received"
    //% subcategory=IRdata
    export function IR_callbackUser(maqueencb: (packet: Packeta) => void) {
        maqueenInit()
        IR_callback(() => {
            const packet = new Packeta();
            packet.mye = maqueene;
            maqueenparam = getParam();
            packet.myparam = maqueenparam;
            maqueencb(packet)
        });
    }

    //% weight=10
    //% blockId=IR_read block="read IR"
    //% subcategory=IRdata
    export function IR_read(): number {
        maqueenInit()
        return getParam()
    }


    function IR_callback(a: Action): void {
        maqueencb = a
        IrPressEvent += 1
        onPressEvent(IrPressEvent, maqueencb)
    }



    /** 
     *  Write a value between 0 and 1023 as an analog signal
     *  to the given 'pin' on the PCA9685
    */
    //%blockId=UDriver_PCA9685_analog_write
    //%block="analog write|to pin %pin|value %value"
    //%shim=UDriver_PCA9685::analog_write 
    export function analog_write(pin: Pin, value: number) {
        if (value < 0 || value > 1023) {
            console.log("uDriver PCA9685: analog_write(): Invaild Argument " +
                "- Analog Write value not a value  between 0 to 1023");
            return;
        }

        //Dummy implementation for the Microbit simulator
        console.log("PWM UDriver_PCA9685: analog_write: " + value);
    }

    /** 
     *  Write a value between 0 and 1023 as an analog signal
     *  to every single pin on the PCA9685
    */
    //%blockId=UDriver_PCA9685_analog_write_all
    //%block="analog write|value %value|to all pins"
    //%shim=UDriver_PCA9685::analog_write_all
    export function analog_write_all(value: number) {
        if (value < 0 || value > 1023) {
            console.log("uDriver PCA9685: analog_write_all(): Invaild Argument " +
                "- Analog Write value not a value  between 0 to 1023");
            return;
        }
        //Dummy implementation for the Mircobit simulator
        console.log("PWM UDriver_PCA9685: analog_write_all: " + value);
    }

    /**
     * Write value 0 or 1 as a digital LOW or high respectively to the given 
     * 'pin' on the PCA9685
    */
    //%blockId=UDriver_PCA9685_digital_write
    //%block="digital write|to pin %pin|value %value"
    //%shim=UDriver_PCA9685::digital_write
    export function digital_write(pin: Pin, value: number) {
        if (value != 0 && value != 1) {
            console.log("uDriver PCA9685: digital_write(): Invaild Argument " +
                "- Digital Write value should be 0 or 1.");
            return;
        }
        //Dummy Implmentation for the Microbit simulator
        console.log("Simulate:uDriver PCA9685:digital_write:" + value);
    }


    /**
     * Write value 0 or 1 as a digital LOW or high respectively
     * to every single pin on the PCA9685
    */
    //%blockId=UDriver_PCA9685_digital_write_all
    //%block="digital write|value %value|to all pins"
    //%shim=UDriver_PCA9685::digital_write_all
    export function digital_write_all(value: number) {
        if (value != 0 && value != 1) {
            console.log("uDriver PCA9685: digital_write_all(): Invaild Argument " +
                "- Digital Write value should be 0 or 1.");
            return;
        }
        //Dummy Implmentation for the Microbit simulator
        console.log("Simulate:uDriver PCA9685:digital_write_all" + value);
    }


    /**
     * Make the servo attached on the given 'pin' move its shaft to the position
     * given by an angle in degrees between 0 and 180 degrees, with 90 degrees
     * as the servos neutral position
    */
    //%blockId=UDriver_PCA9685_move_servo
    //%block="move servo at|pin %pin |to %angle_deg|degrees"
    //%shim=UDriver_PCA9685::move_servo
    export function move_servo(pin: Pin, angle_deg: number) {
        if (angle_deg < 0 || angle_deg > 180) {
            console.log("uDriver PCA9685: move_servo(): Invaild Argument " +
                "- Only angles between 0 degree and 180 degrees are supported");
        }

        //Dummy Implmentation for the Microbit simulator
        //Simulates the PWM signals that control the servo 
        console.log("PWM Simulate:uDriver PCA9685: move_servo:" + angle_deg);
    }


    /**
     * Write value between 0 and 4095 as the width of the PWM signal sent to
     * the given 'pin' on the PCA9685
    */
    //%blockId=UDriver_PCA9685_pwm_write
    //%block="PWM write|to pin %pin|value %value"
    //%shim=UDriver_PCA9685::pwm_write
    export function pwm_write(pin: Pin, value: number) {
        if (value < 0 || value > 4095) {
            console.log("uDriver PCA9685: pwm_write(): Invaild Argument " +
                "- PWM Write value should be between 0 and 4095.");
            return;
        }
        //Dummy Implmentation for the Microbit simulator
        console.log("PWM Simulate:uDriver PCA9685:pwm_write: " + value);
    }

    /**
     * Write value between 0 and 4095 as the width of the PWM signal sent
     * to every single pin on the PCA9685. Use this to get increased precision
     * sent PWM signals
    */
    //%blockId=UDriver_PCA9685_pwm_write_all
    //%block="PWM write|value %value|to all pins"
    //%advanced=true
    //%shim=UDriver_PCA9685:pwm_write_all
    export function pwm_write_all(value: number) {
        if (value < 0 || value > 4095) {
            console.log("uDriver PCA9685: pwm_write_all(): Invaild Argument " +
                "- PWM Write value should be between 0 and 4095.");
            return;
        }
        //Dummy Implmentation for the Microbit simulator
        console.log("PWM Simulate:uDriver PCA9685:pwm_write_all:" + value);
    }

    /**
     * Pulse digital HIGH for the given number of microseconds every PWM duty
     * cycle, after which hold digital LOW for the rest of the duty cycle, after
     * the pulse. 
     * Increasing the PWM modulation frequency using set_pwm_frequency()
     * will increase the precision of actual pulse written, but decrease the 
     * allowable pulse length and vice-versa.
    */
    //%blockId=UDriver_PCA9685_pwm_pulse
    //%block="pulse for|to pin %pin |for %microseconds|microseconds every cycle"
    //%shim=UDriver_PCA9685::pwm_pulse
    export function pwm_pulse(pin: Pin, microseconds: number) {
        let period_us: number = (1.0 / pwm_frequency) * 1000.0 * 1000.0;
        if (microseconds < 0) {
            console.log("uDriver PCA9685: pwm_pulse(): Invaild Argument " +
                "- PWM pulse time should not be negative");
            return;
        }
        else if (microseconds > period_us) {
            console.log("uDriver PCA9685: pwm_pulse(): Invaild Argument " +
                "- PWM pulse time should be smaller than PWM period:" + period_us);
            return;
        }

        //Dummy Implmentation for the Microbit simulator
        console.log("PWM Simulate:uDriver PCA9685: pwm pulse:" + microseconds);
    }

    /**
     * Set the PWM modulation frequency to the given 'frequency' in hertz.
     * Only frequencies between 24 to 1526 Hertz are supported
     * Warning: If servos are attached, please check that the servo is able to 
     * withstand the frequency before changing, or risk destorying your servo.
    */
    //%blockId=UDriver_PCA9685_set_pwm_frequency
    //%block="set PWM modulation frequency|to %frequency |Hertz"
    //%advanced=true
    //%shim=UDriver_PCA9685::set_pwm_frequency
    export function set_pwm_frequency(frequency: number) {
        if (frequency < 24 || frequency > 1526) {
            console.log("uDriver PCA9685: set_pwm_frequency(): Invaild Argument " +
                "- Only frequencies between 24 Hz and 1526 Hz are supported");
            return;
        }

        //Dummy Implmentation for the Microbit simulator
        console.log("Simulate:uDriver PCA9685:set_pwm_frequency: " + frequency);

        pwm_frequency = frequency;
    }

    /** 
     * Cause the PCA9685 to go into low power sleep mode. 
     * During its slumber, all analog/PWM outputs on all pins would not work.
     * Call wake() to awaken the (chew)PCA9685
    */
    //%blockId=UDriver_PCA9685_sleep
    //%block="PCA9685 sleep"
    //%advanced=true
    //%shim=UDriver_PCA9685::sleep
    export function sleep() {
        //Dummy Implmentation for the Microbit simulator
        console.log("Simulate:uDriver PCA9685:sleep");
    }

    /**
     * Awaken the (chew)PCA9685 from its slumber.
    */
    //%blockId=UDriver_PCA9685_wake
    //%block="PCA9685 wake up"
    //%advanced=true
    //%shim=UDriver_PCA9685::wake
    export function wake() {
        //Dummy Implmentation for the Microbit simulator
        console.log("Simulate:uDriver PCA9685:awaken");
    }

    /**
     * Perform a software reset on the PCA9685
     * All prior configuration on the PCA9685 will be lost, including the output
     * for each pin.
    */
    //%blockId=UDriver_PCA9685_software_reset
    //%block="PCA9685 perform software reset"
    //%advanced=true
    //%shim=UDriver_PCA9685::software_reset
    export function software_reset() {
        //Dummy Implmentation for the Microbit simulator
        console.log("Simulate:uDriver PCA9685:software_reset");
    }

    /**
     * Change the minimum or maximum limits on the length pulses sent to the 
     * servo in microseconds
     * By default the pulses range from 1000 to 2000 microseconds.
     * Warning: Only change this if your servo supports it, or risk destorying 
     * your servo
    */
    //%blockId=UDriver_PCA9685_configure_servo
    //%block="configure servo|at pin %pin |set min pulse %min_microseconds |set max pulse %max_microseconds"
    //%advanced=true
    //%shim=UDriver_PCA9685::configure_servo
    export function configure_servo(pin: Pin, min_value: number, max_value: number) {
        //Dummy Implmentation for the Microbit simulator
        console.log("Simulate:uDriver PCA9685:configure_servo: pin:" + pin
            + " min:" + min_value + " max:" + max_value);
    }

    // LED Blocks

    // create a neopixel strip if not got one already. Default to brightness 40
    function neo(): neopixel.Strip {
        if (!neoStrip) {
            neoStrip = neopixel.create(DigitalPin.P15, 2, NeoPixelMode.RGB);
            neoStrip.setBrightness(40);
        }
        return neoStrip;
    }

    // update LEDs if _updateMode set to Auto
    function updateLEDs(): void {
        if (_updateMode == BBMode.Auto)
            neo().show();
    }

    /**
      * Show LED changes
      */
    //% blockId="bitbot_neo_show" block="show RGB LED changes"
    //% weight=100
    //% subcategory=RGBLeds
    export function neoShow(): void {
        neo().show();
    }

    /**
      * Sets all LEDs to a given color (range 0-255 for r, g, b).
      * @param rgb RGB color of the LED
      */
    //% blockId="bitbot_neo_set_color" block="set all RGB LEDs to %rgb=bb_colours"
    //% weight=95
    //% subcategory=RGBLeds
    export function neoSetColor(rgb: number) {
        neo().showColor(rgb);
        updateLEDs();
    }

    /**
      * Clear all leds.
      */
    //% blockId="bitbot_neo_clear" block="clear all RGB LEDs"
    //% weight=90
    //% subcategory=RGBLeds
    export function neoClear(): void {
        neo().clear();
        updateLEDs();
    }

    /**
     * Set LED to a given color (range 0-255 for r, g, b).
     *
     * @param ledId position of the LED (0 to 11)
     * @param rgb RGB color of the LED
     */
    //% blockId="bitbot_neo_set_pixel_color" block="set RGB LED at %ledId|to %rgb=bb_colours"
    //% weight=85
    //% subcategory=RGBLeds
    export function neoSetPixelColor(ledId: number, rgb: number): void {
        neo().setPixelColor(ledId, rgb);
        updateLEDs();
    }

    /**
      * Shows a rainbow pattern on all LEDs.
      */
    //% blockId="bitbot_neo_rainbow" block="set RGB led rainbow"
    //% weight=80
    //% subcategory=RGBLeds
    export function neoRainbow(): void {
        neo().showRainbow(1, 360);
        updateLEDs()
    }

    /**
     * Rotate LEDs forward.
     */
    //% blockId="bitbot_neo_rotate" block="rotate RGB LEDs"
    //% weight=75
    //% subcategory=RGBLeds
    export function neoRotate(): void {
        neo().rotate(1);
        updateLEDs()
    }

    /**
     * Shift LEDs forward and clear with zeros.
     */
    //% blockId="bitbot_neo_shift" block="shift RGB LEDs"
    //% weight=70
    //% subcategory=RGBLeds
    export function neoShift(): void {
        neo().shift(1);
        updateLEDs()
    }

    // Advanced blocks

    /**
      * Set LED update mode (Manual or Automatic)
      * @param updateMode setting automatic will show LED changes automatically
      */
    //% blockId="bitbot_set_updateMode" block="set %updateMode|update mode"
    //% weight=65
    //% advanced=true
    export function setUpdateMode(updateMode: BBMode): void {
        _updateMode = updateMode;
    }

    /**
     * Set the brightness of the LEDs
     * @param brightness a measure of LED brightness in 0-255. eg: 40
     */
    //% blockId="bitbot_neo_brightness" block="set RGB LED brightness %brightness"
    //% brightness.min=0 brightness.max=255
    //% weight=60
    //% advanced=true
    export function neoBrightness(brightness: number): void {
        neo().setBrightness(brightness);
        updateLEDs();
    }

    /**
      * Get numeric value of colour
      *
      * @param color Standard RGB Led Colours
      */
    //% blockId="bb_colours" block=%color
    //% weight=55
    //% advanced=true
    export function BBColours(color: BBColors): number {
        return color;
    }

    /**
      * Convert from RGB values to colour number
      *
      * @param red Red value of the LED (0 to 255)
      * @param green Green value of the LED (0 to 255)
      * @param blue Blue value of the LED (0 to 255)
      */
    //% blockId="bitbot_convertRGB" block="convert from red %red| green %green| blue %blue"
    //% weight=50
    //% advanced=true
    export function convertRGB(r: number, g: number, b: number): number {
        return ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF);
    }




} 
