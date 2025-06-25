class 공중부품 {
    달리기 = () => {
        console.log('날라서 도망가자!!')
    }
}

class 지상부품 {
    달리기 = () => {
        console.log('뛰어서 도망가자!!')
    }
}

class 몬스터 {
    공격력 = 10
    부품;

    constructor(부품) {
        this.부품 = 부품
    }

    공격 = () => {
        console.log('공격하자!!')
        console.log('내 공격력은 ' + this.공격력 + '야!!!')
    }

    달리기() {
        this.부품.달리기()
    }
}

const 몬스터1 = new 몬스터(new 공중부품())
몬스터1.공격()
몬스터1.달리기()

const 몬스터2 = new 몬스터(new 지상부품())
몬스터2.공격()
몬스터2.달리기()