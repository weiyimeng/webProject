//写入cookie
const set = (name, value, { maxAge, domian, path } = {}) => {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
    if (typeof maxAge === "number") {
        cookieText += `; max-age=${maxAge}`;
    }

    if (domian) {
        cookieText += `; domin=${domian}`;
    }

    document.cookie = cookieText;


}

const get = (name) => {

    name = encodeURIComponent(name)
    var cookie = document.cookie.split("; ")
        // ['1=2', '11=2', '111=2', '1111=2', 'user=2']
    console.log(cookie)
    for (const item of cookie) {
        const [cookieName, cookieValue] = item.split("=")
        console.log(cookieName + "=====" + cookieValue)
        console.log(name + "====" + cookieName)
        if (name === cookieName) {
            return decodeURIComponent(cookieValue)
        }
    }
    return



}

export {set, get };