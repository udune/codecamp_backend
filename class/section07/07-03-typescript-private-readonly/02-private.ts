// // public, private, protected, readonly

// class 몬스터3 {
//     // 공격력 = 10 // => public, private, protected, readonly 중 1개라도 있으면 생략 가능

//     constructor(private 힘) {
//         // this.공격력 = 힘 // => public, private, protected, readonly 중 1개라도 있으면 생략 가능
//     }

//     공격1 = () => {
//         console.log('공격하자!!')
//         console.log('내 공격력은 ' + this.힘 + '야!!!') // 안에서 접근 가능
//         this.힘 = 30 // 안에서 수정 가능
//     }
// }

// class 공중몬스터3 extends 몬스터3 {

//     공격2 = () => {
//         console.log('공격하자!!')
//         console.log('내 공격력은 ' + this.힘 + '야!!!') // 자식이 접근 불가
//         this.힘 = 30 // 자식이 수정 불가
//     }
// }

// const 몬스터33 = new 공중몬스터3(20)
// 몬스터33.공격1()
// 몬스터33.공격2()
// console.log(몬스터33.힘) // 밖에서 접근 불가

// 몬스터33.힘 = 10 // 밖에수 수정 불가