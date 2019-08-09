// Auto-generated. Do not edit.



    //% deprecated=true
declare namespace TeddybotIR {

    /**
     * button pushed.
     */
    //% blockId=ir_received_left_event
    //% block="on |%btn| button pressed" shim=TeddybotIR::onPressEvent
    function onPressEvent(btn: RemoteButton, body: () => void): void;

    /**
     * initialises local variablesssss
     */
    //% blockId=ir_init
    //% block="connect ir receiver to %pin" shim=TeddybotIR::initIR
    function initIR(pin: Pins): void;
}

// Auto-generated. Do not edit. Really.
