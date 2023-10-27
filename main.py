huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
huskylens.forget_learn()
huskylens.clear_osd()
huskylens.write_learn1(1)

led.plot(0,0)

global x
x = 0

def on_forever():
    huskylens.request()
        if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) == True:
            huskylens.write_osd("true")
            x = huskylens.reade_box(Content1, X_CENTER)
            global x
            for i in range(5):
                led.plot(4, i)
        else:
            for i in range(5):
                led.plot(4, 4-i)
    pass
basic.forever(on_forever)
