// // public, private, protected, readonly

// class 몬스터3 {
//     // 공격력 = 10 // => public, private, protected, readonly 중 1개라도 있으면 생략 가능

//     constructor(public 힘) {
//         // this.공격력 = 힘 // => public, private, protected, readonly 중 1개라도 있으면 생략 가능
//     }

//     공격1 = () => {
//         console.log('공격하자!!')
//         console.log('내 공격력은 ' + this.힘 + '야!!!')
//     }
// }

// class 공중몬스터3 extends 몬스터3 {

//     공격2 = () => {
//         console.log('공격하자!!')
//         console.log('내 공격력은 ' + this.힘 + '야!!!')
//     }
// }

// const 몬스터33 = new 공중몬스터3(20)
// 몬스터33.공격1()
// 몬스터33.공격2()
// console.log(몬스터33.힘)

// 몬스터33.힘 = 10