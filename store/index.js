import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const SKIN = 'UNI_BOOK_SKIN'
const store = new Vuex.Store({
    state: {
		skin: uni.getStorageSync(SKIN) || 'default', //皮肤
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
		}
	},
    mutations: {
		changeSkin (state, skin) {
			state.skin = skin;
			uni.setStorageSync(SKIN, skin)
		}
	},
    actions: {}
})
export default store