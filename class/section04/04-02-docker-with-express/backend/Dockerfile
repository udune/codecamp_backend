# 1. 운영체제 및 프로그램 설치 (하나 하나 입력하는 방식)
# FROM ubuntu:22.04

# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn

# 1. 운영체제 및 프로그램 설치(이미 리눅스, node, npm, yarn까지 모두 깔려있는 컴퓨터 다운로드하는 방식)
FROM node:18

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
# RUN mkdir myfolder => 아래에서 COPY할 때, 자동으로 만들어주므로 굳이 필요 없음
COPY . /myfolder/
# RUN cd ./myfolder/
WORKDIR /myfolder/
RUN yarn install

# 3. 도커안에서 index.js 실행시키기
CMD yarn start:dev