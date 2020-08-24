import Vue from 'vue'
import Vuex from 'vuex'
import { indexOf, suffix, dateFormat, removeSuffix } from '@/common/js/util.js'
Vue.use(Vuex)
const SKIN = 'UNI_BOOK_SKIN'
const BOOKS = 'UNI_BOOK_LIST'
const PATH = 'UNI_BOOK_PATH'
const store = new Vuex.Store({
    state: {
		skin: uni.getStorageSync(SKIN) || 'default', //皮肤
		books: uni.getStorageSync(BOOKS) || [],//导入的书籍列表
		path: uni.getStorageSync(PATH) || []//上次访问的文件夹记录
	},
	getters: {
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
					imgMask: 0
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
					imgMask: 0.45
				}
			}
		},
		bookList (state) {
			return state.books;
		},
		pathHistory (state) {
			return state.path;
		}
	},
    mutations: {
		changeSkin (state, skin) {
			state.skin = skin;
			uni.setStorageSync(SKIN, skin)
		},
		//新增书籍
		addBooks (state, books) {
			for ( let i in books ) {
				state.books.push({
					name: removeSuffix(books[i].name),
					image: '',
					time: dateFormat(new Date().getTime()).split(' ')[0],
					path: books[i].path,
					progress: 0.00
				})
			}
			uni.setStorageSync(BOOKS, state.books);
		},
		//删除指定名称的书籍
		deleteBook (state, name) {
			let flag = indexOf(state.books, name, 'name');
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
		pushPath (state, path) {
			state.path.push(path);
			uni.setStorageSync(PATH, state.path);
		},
		popPath (state) {
			state.path.splice(state.path.length - 1, 1);
			uni.setStorageSync(PATH, state.path);
		}
	},
    actions: {}
})
export default store