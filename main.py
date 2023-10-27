huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
huskylens.forget_learn()
huskylens.clear_osd()
huskylens.write_learn1(1)
led.plot(0, 0)

def on_forever():
    huskylens.request()
    if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) == Ture:
        xco = huskylens.reade_box(1, Content1.X_CENTER)
        huskylens.write_osd(xco)
        led.plot(4,4)
    else:
        led.plot(2,2)
        huskylens.write_osd("Didn't appeared")
basic.forever(on_forever)
