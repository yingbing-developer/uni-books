
/* *
 * 时间格式化
 * @param {String} time 时间戳or时间
 * */
export function dateFormat (time) {
	const d = new Date(time);
	return d.getFullYear() + '-' + zeroize(d.getMonth() + 1) + '-' + zeroize(d.getDate()) + ' ' + zeroize(d.getHours()) + ':' + zeroize(d.getMinutes())
}

/* *
 * 时间格式化补零
 * @param {Number} val 数字
 * */
function zeroize (val) {
	return val >= 10 ? val : '0' + val;
}

/* *
 * 获取文件后缀
 * @param {String} name 带后缀的文件名称
 * */
export function suffix (name) {
  	//获取图片后缀
  	let fileName = name.lastIndexOf(".");
  	let fileNameLength = name.length;
  	let fileFormat = name.substring(fileName + 1, fileNameLength);
  	return fileFormat;
}

/**
 * 数组查找符合条件元素并返回下标
 * @param {Array} arr 传入数组
 * @param {String} value 条件元素
 * @param {String} query 对比key值
*/
export const indexOf = function (arr, value, query) {
	for ( let i in arr ) {
		if ( arr[i][query] == value ) {
			return i;
		}
	}
	return -1;
}