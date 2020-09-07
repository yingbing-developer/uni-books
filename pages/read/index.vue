<template>
	<view class="read" :style="{'background-color': skinColor.readBackColor}">
		<nav-bar :bgColor="skinColor.readBackColor" :title="bookInfo.name" :titleColor="skinColor.readTextColor" :backColor="skinColor.readTextColor">
			<view class="nav-right" slot="right">
				<!-- <text class="nav-right-text" :style="{'color': skinColor.textColor}">{{pageIndex}}/{{totalPage}}</text> -->
				<text class="nav-right-text" :style="{'color': skinColor.textColor}">80%</text>
			</view>
		</nav-bar>
		<view class="list-view" ref="listView">
			<view>
			</view>
			<view class="touchBoard">
				<view class="touch-box touch-left" v-if="scrollMode == 'leftRight'">
					<view class="touch-item"></view>
				</view>
				<view class="touch-box touch-center">
					<view class="touch-item" @tap="$refs.readSetting.show()"></view>
				</view>
				<view class="touch-box touch-right" v-if="scrollMode == 'leftRight'">
					<view class="touch-item"></view>
				</view>
			</view>
		</view>
		<read-setting
		ref="readSetting"></read-setting>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	import { skinMixin } from '@/common/mixin/index.js'
	import { indexOf } from '@/common/js/util.js'
	import ReadSetting from './setting.vue'
	import NavBar from '@/components/nav-bar/nav-bar.nvue'
	export default {
		mixins: [skinMixin],
		computed: {
			...mapGetters(['readMode', 'bookList']),
			path () {
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				return page.options.path;
			},
			//书籍信息
			bookInfo () {
				return this.bookList[indexOf(this.bookList, this.path, 'path')];
			},
			//滚动方式
			scrollMode () {
				return this.readMode.scroll;
			},
			// //总页数
			// totalPage () {
			// 	return this.textHeight % this.viewHeight > 0 ? parseInt(this.textHeight / this.viewHeight) + 1 : parseInt(this.textHeight / this.viewHeight);
			// },
			// //阅读进度
			// progress () {
			// 	return this.bookContent.length > 0 ? (((this.pageIndex - 1) * this.viewHeight) / this.textHeight * 100).toFixed(2) : '0.00';
			// }
		},
		components: {
			NavBar,
			ReadSetting
		}
	}
</script>

<style scoped>
	.read {
		width: 100vw;
		height: 100vh;
		display: flex;
	}
	.nav-right {
		width: 100%;
		text-align: right;
		padding-right: 20px;
	}
	.nav-right-text {
		font-size: 14px;
	}
	.list-view {
		position: relative;
		display: flex;
		flex: 1;
		width: 100%;
		align-items: center;
		opacity: 0;
	}
	.content {
		display: flex;
		padding: 0 20px;
		justify-content: center;
		flex: 1;
	}
	.touchBoard {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
	}
	.touch-box  {
		display: flex;
		align-items: center;
	}
	.touch-left {
		flex: 1;
	}
	.touch-right {
		flex: 1;
	}
	.touch-center {
		width: 200rpx;
	}
	.touch-item {
		height: 200rpx;
	}
</style>
