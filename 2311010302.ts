huskylens.initI2c() //허스키 렌즈가 마퀸 로봇과 통신하는 채널 열어주기
huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION) //허스키 렌즈 알고리즘 설정
huskylens.forgetLearn() //허스키 렌즈가 학습했던 데이터 삭제
huskylens.clearOSD() //허스키 렌즈 위 OSD? 삭제
basic.pause(1000) //조금의 시간이 지난 다음 학습해야 좀 더 확실하게 학습이 됨
huskylens.writeLearn1(1) // "ID 1" 이라는 이름으로 가장 먼저 보이는 대상 학습
led.plot(0, 0) //지금까지의 라인이 작동하는지 확인하는 명령어
let li: number; //li를 숫자라 선언(이건 보통 TS에서 하는 행동으로 기억하는데 그래도 혹시 모르니까) - li는 별 뜻 없이 횟수 리밋(limit) 걸려고 만든 변수
let xco: number; //xco를 숫자라 선언(이건 보통 TS에서 하는 행동으로 기억하는데 그래도 혹시 모르니까) - 허스키 렌즈 속 인식된 물체의 중심 x 좌표 받아오는 변수
let coor: number; //coor을 숫자라 선언(이건 보통 TS에서 하는 행동으로 기억하는데 그래도 혹시 모르니까) - xco를 가공할 떄 활용할 변수 - 안정성을 위해
li = 0 //li 값 지정
basic.forever(function () { //함수 지정 - JS는 일케 함수 지정하나봐요 JS는 저도 거의 첨이라
    if (li == 0) { //조건 추가 - 아까 li(리밋) 걸려고 한게 이 아래 내용 때문
        basic.pause(5000) //5초 대기 - 5초가 가장 적당하더라고요
    }
    li += 1 //리밋걸려고 하는 덧셈 - 근데 이 부분에서 메모리 낭비가 일어나요 - 별로 안 좋은 코드입니다
    huskylens.request() //허스키 렌즈 속 자료 요청 huskylens.initI2C() 이거로 통신하는 것
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock) == true) { //아까 학습했던 "ID 1"이 화면에 나와있는지
        xco = huskylens.readeBox(1, Content1.xCenter) //x 좌표 받아옴
        led.plot(3, 0) //작동 확인용 명령어
        huskylens.clearOSD() //화면 세팅
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 80) //기본 속도 설정
        if (xco <= 159) { //(320, 240)이 허스키 렌즈 속 좌표 값 - 우리가 필요한건 X 범위기에 160을 기준으로 나눠야함 - 좌측
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 10) //방향 조정
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50) //방향 조정
            huskylens.writeOSD("appeared left", 40, 30) //가시성 목적
        } else if (xco <= 319) { //우측
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50) //방향 조정
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 10) //방향 조정
            huskylens.writeOSD("appeared right", 40, 30) //가시성 목적

        } else { //나머지 일부 경우 예외 처리 - 별로 좋은 코드는 아닌듯
        	
        }
    } else { //나타나지 않았을 경우 코드
        huskylens.clearOSD() //화면 세팅
        basic.pause(2000) //임시 대기
        huskylens.writeOSD("Didn't appeared", 150, 30) //가시성 목적
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0) //정지 목적
        led.plot(1, 0) //작동 확인 목적
    }
})
