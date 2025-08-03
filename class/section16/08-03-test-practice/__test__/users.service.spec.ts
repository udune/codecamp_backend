// 나만의 데이터베이스 만들기
class MockUsersRepository {
    mydb = [
        { email: "a@a.com", password: "0000", name: "짱구", age: 8 },
        { email: 'qqq@qqq.com', password: '1234', name: "철수", age: 12 },
    ];

    findOne({ where }) {
        const users = this.mydb.filter((el) => {
            el.email === where.email
        })
        if (users.length) {
            return users[0];
        }
        return null;
    }

    save() {

    }
}

describe("UsersService", () => {
    let usersService: UsersService;

  beforeEach(async () => {
      const usersModule = await Test.createTestingModule({
          imports: [TypeOrmModule...],
          controllers: [],
          providers: [UsersService]
      }).compile();
      
      usersService = usersModule.get<UsersService>(UsersService)
  });

//   describe("findOneByEmail", () => {
//       const result = usersService.findOneByEmail({ email: 'a@a.com' });
//       expect(result).toStrictEqual({
//           email: "a@a.com",
//           name: "짱구",
//           ...
//       })
//   });

    describe("create", () => {
        it("이미 존재하는 이메일 검증하기!!", () => {
            const myData = {
                email: "a@a.com",
                password: "1234",
                name: "철수",
                age: 13,
            }
            
            try {
                await usersService.create({ ...myData })
            } catch (error) {
                expect(error).toBeInstanceOf(ConflictException);
            }
          
            usersService.create({ ...myData });
        })
        
        it("회원 등록 잘 됐는지 검증!!", () => {
            const myData = {
                email: "bbb@bbb.com",
                password: "1234",
                name: "철수",
                age: 13,
            };

            usersService.create({ ...myData })
        })
  });
});
