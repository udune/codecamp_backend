import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
    input CreateBoardInput {
        writer: String
        title: String
        contents: String
    }

    type MyResult {
        number: Int
        writer: String
        title: String
        contents : String
    }

    type Query {
        # fetchBoards: MyResult 객체 1개를 의미
        fetchBoards: [MyResult] # 배열 안에 객체 1개 이상을 의미
    }

    type Mutation {
        # createBoard(writer: String, title: String, contents: String!): String
        createBoard(createBoardInput: CreateBoardInput!): String
    }
`

const resolvers = {
    Query: {
        fetchBoards: (parent, args, context, info) => {
            // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
            const result = [
                { number: 1, writer: "철수", title: "제목입니다~~", contents: "내용이에요!" },
                { number: 2, writer: "영희", title: "영희입니다~~", contents: "영희이에요!" },
                { number: 3, writer: "훈이", title: "훈이입니다~~", contents: "훈이이에요!" }
            ]

            // 2. DB에서 꺼내온 결과를 브라우저에 응답(response)으로 주기
            return result
        }
    },

    Mutation: {
        createBoard: (_, args) => {

            // 1. 브라우저에서 보내준 데이터 확인하기
            console.log(args.createBoardInput.writer)
            console.log(args.createBoardInput.title)
            console.log(args.createBoardInput.contents)

            // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정
  
            // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
            return "게시물 등록에 성공하였습니다."
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: true
    // cors: {origin: ["https://naver.com", "https://daum.net"]} // 특정 사이트만 허용하고 싶을때
})

startStandaloneServer(server)