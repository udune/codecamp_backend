import { getToday } from "./utils.js";
import nodemailer from 'nodemailer'

export function checkEmail(email) {
    if (email === undefined || email.includes('@') === false) {
        console.log('에러 발생!!! 이메일 주소를 제대로 입력해주세요!')
        return false;
    } else {
        return true;
    }
}

export function getWelcomeTemplate({ name, age, school })
{
    const myTemplate = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}</div>
                <div>학교: ${school}</div>
                <div>가입일: ${getToday()}</div>
            </body>
        </html>
    `

    return myTemplate;
}

export async function sendTemplateToEmail(email, myTemplate) 
{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "udune8438@gmail.com",
            pass: "wqamcfhaahtzzwqm"
        }
    })

    const res = await transporter.sendMail({
        from: "udune8438@gmail.com",
        to: email,
        subject: "[코드캠프] 가입을 축하합니다!!",
        html: myTemplate
    })

    console.log(res)

    // console.log(`${email} 로 가입환영템플릿 ${myTemplate} 를 전송합니다.`)
}