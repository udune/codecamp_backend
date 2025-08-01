import {Test, TestingModule} from @netjs

describe("AppController", () => {

    let appService: AppService;
    let appController: AppController;

    beforeEach(() => {
        const app = await Test.createTestingModule({
            acontrollers: [AppConroller],
            providers: [AppSer]
        })
        appService = new AppService();
        appController = new AppController(appService);
    })

    describe("getHello", () => {
        it('이 테스트의 검증 결과는 Hello World를 리턴해ㅑ')
        expect(appController.getHello()).toBe('Hello World!');
    })

    // describe("fetchBoards", () => {
    //     const appService = new AppService();
    //     const appController = new AppController(appService);
    // })

    // describe("createBoard", () => {
    //     const appService = new AppService();
    //     const appController = new AppController(appService);
    // })
})