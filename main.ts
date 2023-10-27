huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
huskylens.forgetLearn()
huskylens.clearOSD()
huskylens.writeLearn1(1)
led.plot(0, 0)
basic.forever(function on_forever() {
    huskylens.request()
    
})
