huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
huskylens.forgetLearn()
huskylens.clearOSD()
basic.pause(1000)
huskylens.writeLearn1(1)
led.plot(0, 0)
let li: number;
li = 0
let xco: number;
let coor: number;
basic.forever(function () {
    if (li == 0) {
        basic.pause(5000)
    }
    li += 1
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock) == true) {
        xco = huskylens.readeBox(1, Content1.xCenter)
        led.plot(3, 0)
        huskylens.clearOSD()
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
        if (xco <= 159) {
            coor = xco
            coor = 160 - coor
            coor = coor / 3
            huskylens.writeOSD("appeared left", 40, 30)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50 - coor)
        } else if (xco <= 319) {
            coor = xco
            coor = 160 - coor
            coor = coor / 3
            huskylens.writeOSD("appeared right", 40, 30)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50 - coor)
        } else {
        	
        }
    } else {
        huskylens.clearOSD()
        basic.pause(2000)
        huskylens.writeOSD("Didn't appeared", 150, 30)
        led.plot(1, 0)
    }
})
