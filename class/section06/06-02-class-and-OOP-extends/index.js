class 몬스터 {
    공격력 = 10

    constructor(힘) {
        this.공격력 = 힘
    }

    공격 = () => {
        console.log('공격하자!!')
        console.log('내 공격력은 ' + this.공격력 + '야!!!')
    }

    달리기() {
        console.log('도망가자!!')
    }
}

class 공중몬스터 extends 몬스터 {

    constructor(힘) {
        super(힘 + 10)
    }

    달리기 = () => {
        console.log('날라서 도망가자!!!')
    }
}

class 지상몬스터 extends 몬스터 {

    constructor(힘) {
        super(힘)
    }

    // 오버라이딩 (부모의 run을 덮어쓰기)
    달리기 = () => {
        console.log("뛰어서 도망가자!!!")
    }
}

const 몬스터1 = new 공중몬스터(20)
몬스터1.공격()
몬스터1.달리기()

const 몬스터2 = new 지상몬스터(50)
몬스터2.공격()
몬스터2.달리기()