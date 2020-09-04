import Vue from 'vue'
import Vuex from 'vuex'
import { indexOf, suffix, dateFormat, removeSuffix, randomString } from '@/common/js/util.js'
Vue.use(Vuex)
const SKIN = 'UNI_BOOK_SKIN'
const BOOKS = 'UNI_BOOK_LIST'
const PATH = 'UNI_BOOK_PATH'
const READ = 'UNI_BOOK_READ'
const store = new Vuex.Store({
    state: {
		skin: uni.getStorageSync(SKIN) || 'default', //皮肤
		books: uni.getStorageSync(BOOKS) || [],//导入的书籍列表
		read: uni.getStorageSync(READ) || {scroll: 'upDown', fontSize: 20},//阅读模式包含字体大小，翻页方式
		path: uni.getStorageSync(PATH) || ''//上次访问的文件夹路径
	},
	getters: {
		//当前皮肤模式
		skinMode (state) {
			return state.skin
		},
		skinColor (state) {
			// 默认皮肤
			if ( state.skin == 'default' ) {
				return {
					bgColor: '#FAFAFA',
					titleColor: '#333333',
					textColor: '#666666',
					itemColor: '#1776D3',
					navColor: '#2196F5',
					iconColor: '#FFFFFF',
					gapColor: '#E0E0E0',
					menuBgColor: '#FAFAFA',
					menuIconColor: '#737373',
					menuTitleColor: '#727272',
					menuActiveColor: '#2397EE',
					menuActiveBgColor: '#DDDDDD',
					imgMask: 0,
					readBackColor: '#BFAD8A',
					readTextColor: '#2E2B23'
				}
			}
			// 夜间模式
			if ( state.skin == 'night' ) {
				return {
					bgColor: '#2C2C2C',
					titleColor: '#8F8F8F',
					textColor: '#5E5E5E',
					itemColor: '#3D3D3D',
					navColor: '#3C3C3C',
					iconColor: '#777777',
					gapColor: '#8F8F8F',
					menuBgColor: '#373737',
					menuIconColor: '#777777',
					menuTitleColor: '#8F8F8F',
					menuActiveColor: '#FAFAFA',
					menuActiveBgColor: '#CACACA',
					imgMask: 0.45,
					readBackColor: '#393E41',
					readTextColor: '#95A3A6'
				}
			}
		},
		bookList (state) {
			return state.books;
		},
		pathHistory (state) {
			return state.path;
		},
		readMode (state) {
			return state.read;
		}
	},
    mutations: {
		//改变皮肤模式
		changeSkin (state, skin) {
			state.skin = skin;
			uni.setStorageSync(SKIN, skin)
		},
		//新增书籍
		addBooks (state, books) {
			for ( let i in books ) {
				let time = new Date().getTime();
				state.books.push({
					name: removeSuffix(books[i].name),
					image: '/static/cover/cover_' + Math.floor(Math.random()*6 + 1) + '.png',
					creatime: time,
					time: dateFormat(time).split(' ')[0],
					path: books[i].path,
					size: books[i].realSize,
					progress: '0.00',
					pageIndex: 1
				})
			}
			uni.setStorageSync(BOOKS, state.books);
		},
		//删除指定的书籍
		deleteBook (state, path) {
			let flag = indexOf(state.books, path, 'path');
			if ( flag > -1 ) {
				state.books.splice(flag, 1);
				uni.setStorageSync(BOOKS, state.books)
			}
		},
		//清空所有书籍
		clearBooks (state) {
			state.books = [];
			uni.removeStorageSync(BOOKS);
		},
		// 更新书籍阅读页数
		updateBookPage (state, book) {
			let index = indexOf(state.books, book.path, 'path');
			state.books[index].pageIndex = book.page;
			uni.setStorageSync(BOOKS, state.books);
		},
		// 更新书籍阅读进度
		updateBookProgress (state, book) {
			let index = indexOf(state.books, book.path, 'path');
			state.books[index].progress = book.progress;
			uni.setStorageSync(BOOKS, state.books);
		},
		//更新访问的文件夹路径
		updatePath (state, path) {
			state.path = path;
			uni.setStorageSync(PATH, state.path);
		},
		//改变字体大小
		changeFontSize (state, fontSize) {
			state.read.fontSize = fontSize;
			uni.setStorageSync(READ, state.read);
		},
		//改变翻页模式
		changeScrollMode (state, scroll) {
			state.read.scroll = scroll;
			uni.setStorageSync(READ, state.read);
		}
	},
    actions: {}
})
export default store