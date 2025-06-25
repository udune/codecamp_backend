console.log('안녕하세요!!')

const getToken = () => {
    const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
    console.log(result);
}

getToken()