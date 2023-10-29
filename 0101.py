huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
huskylens.forget_learn()
huskylens.clear_osd()
basic.pause(1000)
huskylens.write_learn1(1)
led.plot(0, 0)
li = 0

def on_forever():
    global li, xco
    if li == 0:
        basic.pause(5000)
    li += 1
    huskylens.request()
    maqueen.motor_run(maqueen.Motors.All, maqueen.Dir.CW, 0)
    if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) == True:
        xco = huskylens.reade_box(1, Content1.X_CENTER)
        led.plot(3, 0)
        huskylens.clear_osd()
        if xco <= 159:
            huskylens.write_osd("appeared left", 40, 30)
            xco = 160 - xco
            xco = xco/16
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 50)
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 50-xco)
        elif xco <= 319:
            huskylens.write_osd("appeared right", 40, 30)
            xco = xco - 160
            xco = xco/16
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 50)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 50-xco)
        else:
            pass
    else:
        huskylens.clear_osd()
        basic.pause(2000)
        huskylens.write_osd("Didn't appeared", 150, 30)
        led.plot(1, 0)
basic.forever(on_forever)
