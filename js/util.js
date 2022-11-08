
const ab2hex = (buffer) => {
	const hexArr = Array.prototype.map.call(
		new Uint8Array(buffer),
		function(bit) {
			return ('00' + bit.toString(16)).slice(-2)
		}
	)
	return hexArr.join('')
}

/**
 * 字符串转ASCII十六进制
 * @param {string} str 
 */
const str2hex = (str) =>{
	let hexStr = ''
	for(let i=0; i<str.length; i++){
		hexStr += str.substr(i,1).charCodeAt().toString(16).padStart(2,0)
	}
	return hexStr 
}

/**
 * ASCII十六进制转字符串
 * @param {string} hexStr 
 */
const hex2str = (hexStr) =>{
	let str = ''
	for(let i=0; i<hexStr.length; i+=2){
		str += String.fromCharCode(Number.parseInt(hexStr.substr(i,2), 16))
	}
	return str
}


module.exports = {
	ab2hex,
	str2hex,
	hex2str,
}
