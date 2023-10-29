huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
huskylens.forgetLearn()
huskylens.clearOSD()
basic.pause(2000)
huskylens.writeLearn1(1)
led.plot(0, 0)
basic.forever(function () {
    basic.pause(1000)
    let xco: number;
huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock) == true) {
        xco = huskylens.readeBox(1, Content1.xCenter)
        led.plot(3, 0)
        huskylens.clearOSD()
        huskylens.writeOSD("appeared", 41, 30)
    } else {
        huskylens.clearOSD()
        basic.pause(2000)
        huskylens.writeOSD("Didn't appeared", 150, 30)
        led.plot(1, 0)
    }
})
