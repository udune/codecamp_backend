import axios from 'axios'

// 1. 비동기방식
function fetchAsync() {
    const result = axios.get('https://jsonplaceholder.typicode.com/todos/1')
    console.log('비동기방식: ', result) // Promise { <pending> }    
}

fetchAsync()

// 2. 동기방식
const fetchSync = async () => {
    const result = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    console.log('동기방식: ', result) // 제대로 된 결과 => { title: "...." }
    console.log('동기방식: ', result.data.title)
}

fetchSync()