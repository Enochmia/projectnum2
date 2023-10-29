huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
huskylens.forget_learn()
huskylens.clear_osd()
basic.pause(2000)
huskylens.write_learn1(1)
led.plot(0, 0)

def on_forever():
    basic.pause(1000)
    huskylens.request()
    if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) == True:
        xco = huskylens.reade_box(1, Content1.X_CENTER)
        led.plot(3, 0)
        huskylens.clear_osd()
        huskylens.write_osd("appeared", 41, 30)
    else:
        huskylens.clear_osd()
        basic.pause(2000)
        huskylens.write_osd("Didn't appeared", 150, 30)
        led.plot(1, 0)
basic.forever(on_forever)
