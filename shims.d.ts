// Auto-generated. Do not edit.



    //% color=50 weight=80
    //% icon="\uf1eb"
    //% deprecated=true
declare namespace maqueenIR {

    /**
     * button pushed.
     */
    //% blockId=ir_received_left_event
    //% block="on |%btn| button pressed"
    //% deprecated=true shim=maqueenIR::onPressEvent
    function onPressEvent(btn: RemoteButton, body: () => void): void;

    /**
     * initialises local variablesssss
     */
    //% blockId=ir_init
    //% block="connect ir receiver to %pin" shim=maqueenIR::initIR
    function initIR(pin: Pins): void;
}

// Auto-generated. Do not edit. Really.
