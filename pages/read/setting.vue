<template>
	<view class="read-menu" v-if="isShow" @touchmove.stop.prevent="">
		<view class="mask" @tap="hide"></view>
		<view class="read-board" ref="popup" :style="{transform: 'translateY(' + lateY + ')'}">
			
			<!-- 阅读进度 -->
			<view class="read-board-line">
				<view class="progress-btn progress-prev">
					<view @tap="prevPages">
						<c-icon name="arrow-left" :size="30" color="#EFEFEF"></c-icon>
					</view>
				</view>
				<view class="progress">
					 <c-progress :value="progress" @input="upProgress" itemShow></c-progress>
				</view>
				<view class="progress-btn progress-next">
					<view @tap="nextPages">
						<c-icon name="arrow-right" :size="30" color="#EFEFEF"></c-icon>
					</view>
				</view>
			</view>
			<view class="read-board-line">
				<view class="chapter-box btn-actived" @tap="prevChapter">
					<text class="chapter-text">上一章节</text>
				</view>
				<view class="chapter-box btn-actived" @tap="nextChapter">
					<text class="chapter-text">下一章节</text>
				</view>
			</view>
			
			<!-- 皮肤选择 -->
			<!-- <view class="read-board-line">
				<view class="skin-mode light-mode" style="background-color: #BFAD8A;" @tap="changeSkin('default')">
					<c-icon name="check-fill" :size="30" color="#ED7B1F" v-if="skinMode == 'default'"></c-icon>
				</view>
				<view class="skin-mode night-mode" style="background-color: #393E41;" @tap="changeSkin('night')">
					<c-icon name="check-fill" :size="30" color="#ED7B1F" v-if="skinMode == 'night'"></c-icon>
				</view>
			</view> -->
			
			<view class="read-board-line">
				<!-- 亮度调整 -->
				<view class="half-box">
					<view class="light-btn">
						<c-icon name="light" :size="30" color="#EFEFEF"></c-icon>
					</view>
					<view class="progress">
						 <c-progress v-model="lightPercent" itemShow></c-progress>
					</view>
					<view class="light-btn">
						<c-icon name="light-fill" :size="23" color="#EFEFEF"></c-icon>
					</view>
				</view>
				
				<!-- 字体调整 -->
				<view class="half-box font-box">
					<view class="font-btn actived" @tap="downFontSize">
						<c-icon name="font-down" color="#8A8A8A"></c-icon>
					</view>
					<text class="font-text">{{readMode.fontSize}}</text>
					<view class="font-btn actived" @tap="upFontSize">
						<c-icon name="font-up" color="#8A8A8A"></c-icon>
					</view>
				</view>
			</view>
			
			<!-- 翻页模式 -->
			<!-- <view class="read-board-line scroll-line">
				<view class="scroll-box" :class="{'scrollActived': readMode.scroll == item.value}" v-for="(item, index) in scroll" :key='index' @tap="changeScrollMode(item.value)">
					<text class="scroll-text" :class="{'scrollActived': readMode.scroll == item.value}">{{item.title}}</text>
				</view>
			</view> -->
			
			<view class="read-board-line bottom-line">
				<view class="bottom-box">
					<view class="bottom-item" @tap="$refs.catalog.show()">
						<c-icon name="menu" :size="28" color="#8A8A8A"></c-icon>
						<text class="bottom-name">目录</text>
					</view>
				</view>
				<view class="bottom-box">
					<view class="bottom-item" v-if="readMode.scroll == 'paging'" @tap="changeScrollMode('scroll')">
						<c-icon name="scroll" :size="28" color="#8A8A8A"></c-icon>
						<text class="bottom-name">滚动</text>
					</view>
					<view class="bottom-item" v-if="readMode.scroll == 'scroll'" @tap="changeScrollMode('paging')">
						<c-icon name="paging" :size="28" color="#8A8A8A"></c-icon>
						<text class="bottom-name">翻页</text>
					</view>
				</view>
				<view class="bottom-box">
					<view class="bottom-item" v-if="skinMode == 'default'" @tap="changeSkin('night')">
						<c-icon name="night" :size="28" color="#8A8A8A"></c-icon>
						<text class="bottom-name">夜间</text>
					</view>
					<view class="bottom-item" v-if="skinMode == 'night'" @tap="changeSkin('default')">
						<c-icon name="light" :size="30" color="#8A8A8A"></c-icon>
						<text class="bottom-name">日间</text>
					</view>
				</view>
			</view>
		</view>
		<catalog :path="path" :catalog="catalog" ref="catalog"></catalog>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	import { skinMixin } from '@/common/mixin/index.js'
	import { indexOf } from '@/common/js/util.js'
	import CIcon from '@/components/c-icon/c-icon.nvue'
	import CProgress from '@/components/progress/progress.nvue'
	import Catalog from './catalog.vue'
	export default {
		mixins: [skinMixin],
		props: {
			path: {
				type: String,
				default: ''
			},
			catalog: {
				type: Array,
				default () {
					return new Array();
				}
			}
		},
		data () {
			return {
				isShow: false,
				duration: 200,
				lightPercent: 0,
				scroll: [{
					title: '上下滚动',
					value: 'scroll'
				},{
					title: '左右翻页',
					value: 'paging'
				}],
				lateY: '100%'
			}
		},
		computed: {
			...mapGetters(['bookList', 'readMode']),
			bookInfo () {
				return this.bookList[indexOf(this.bookList, this.path, 'path')];
			},
			pageIndex () {
				return this.bookInfo.pageIndex
			},
			light () {
				return parseFloat(this.readMode.light) * 100;
			},
			progress () {
				if ( this.bookInfo.record == 0 ) {
					return 0
				} else {
					return parseFloat(((this.bookInfo.record / this.bookInfo.length) * 100).toFixed(2))
				}
			},
			//当前章节
			chapterNow () {
				for ( let i in this.catalog ) {
					if ( i < this.catalog.length - 1 ) {
						if ( this.bookInfo.record >= this.catalog[i].index && this.bookInfo.record < this.catalog[parseInt(i) + 1].index ) {
							return parseInt(i)
						}
					} else {
						if ( this.bookInfo.record >= this.catalog[i].index) {
							return parseInt(i)
						}
					}
				}
			}
		},
		created () {
			this.lightPercent = this.light;
		},
		methods: {
			...mapMutations(['changeFontSize', 'changeScrollMode', 'updateBookPage', 'changeLight', 'updateBookRecord']),
			show () {
				this.isShow = true;
				setTimeout(() => {
					this.lateY = 0;
				}, 100)
			},
			hide () {
				if ( this.$refs.catalog.isShow ) {
					this.$refs.catalog.hide();
					return;
				}
				this.lateY = '100%';
				setTimeout(() => {
					this.isShow = false;
				}, 300)
			},
			//增大字体
			upFontSize () {
				if ( this.readMode.fontSize >= 40 ) {
					return;
				}
				this.changeFontSize(this.readMode.fontSize + 2);
			},
			//减小字体
			downFontSize () {
				if ( this.readMode.fontSize <= 14 ) {
					return;
				}
				this.changeFontSize(this.readMode.fontSize - 2);
			},
			//上个章节
			prevChapter () {
				if ( this.catalog[this.chapterNow - 1] ) {
					this.updateBookRecord({
						path: this.path,
						record: this.catalog[this.chapterNow - 1].index
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '前面已经没有章节了'
					})
				}
			},
			//下个章节
			nextChapter () {
				if ( this.catalog[this.chapterNow + 1] ) {
					this.updateBookRecord({
						path: this.path,
						record: this.catalog[this.chapterNow + 1].index
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '后面已经没有章节了'
					})
				}
			},
			//后退0.1%
			prevPages () {
				let percent = this.progress - 0.1;
				if ( percent < 0 ) {
					percent = 0;
					uni.showToast({
						title: '前面已经没有了',
						icon: 'none'
					})
				}
				this.upRecord(percent);
			},
			//前进0.1%
			nextPages() {
				let percent = this.progress + 0.1;
				if ( percent > 100 ) {
					percent = 100;
					uni.showToast({
						title: '后面已经没有了',
						icon: 'none'
					})
				}
				this.upRecord(percent);
			},
			upRecord (percent) {
				if ( this.timer ) {
					clearTimeout(this.timer);
				}
				this.timer = setTimeout(() => {
					let record = parseInt((percent / 100) * this.bookInfo.length);
					this.updateBookRecord({
						path: this.path,
						record: record
					})
				}, 200)
			}
		},
		watch: {
			light (val) {
				this.lightPercent = val;
			},
			lightPercent (val) {
				this.changeLight((val / 100).toFixed(2));
			}
		},
		components: {
			CIcon,
			CProgress,
			Catalog
		}
	}
</script>

<style scoped>
	.btn-actived:active {
		background-color: #8A8A8A!important;
		
	}
	.btn-actived:active .chapter-text {
		color: #EFEFEF!important;
	}
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.read-board {
		position: fixed;
		background-color: #333333;
		bottom: 0;
		left: 0;
		right: 0;
		transition: transform .3s;
	}
	.read-board-line {
		display: flex;
		padding: 0 10px;
		border-bottom-width: 1px;
		border-bottom-color: #3D3D3D;
		border-bottom-style: solid;
		height: 100rpx;
		align-items: center;
	}
	.progress-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 90rpx;
	}
	.progress-prev {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.progress-next {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.progress {
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: center;
	}
	.half-box {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
	}
	.light-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70rpx;
	}
	.skin-mode {
		display: flex;
		flex-direction: column;
		width: 50%;
		height: 80rpx;
		border-radius: 5px;
		margin: 0 5px;
		justify-content: center;
		align-items: center;
	}
	.font-btn {
		display: flex;
		flex-direction: column;
		border-width: 1px;
		border-style: solid;
		border-color: #8A8A8A;
		flex: 1;
		height: 70rpx;
		border-radius: 5px;
		margin: 0 5px;
		justify-content: center;
		align-items: center;
	}
	.font-text {
		color: #8A8A8A;
		font-size: 28rpx;
		margin: 5px;
	}
	.scroll-box {
		display: flex;
		flex-direction: column;
		margin: 0 5px;
		flex: 1;
		border-width: 1px;
		border-style: solid;
		border-color: #8A8A8A;
		height: 70rpx;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
	}
	.scroll-text {
		font-size: 28rpx;
		color: #8A8A8A;
	}
	.scrollActived {
		border-color: #EFEFEF;
		color: #EFEFEF;
	}
	.chapter-box {
		display: flex;
		flex-direction: column;
		margin: 0 5px;
		flex: 1;
		border-width: 1px;
		border-style: solid;
		border-color: #8A8A8A;
		height: 65rpx;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
	}
	.chapter-text {
		font-size: 28rpx;
		color: #8A8A8A;
	}
	.bottom-line {
		justify-content: space-between;
		height: 110rpx;
	}
	.bottom-box {
		flex: 1;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bottom-item {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		box-sizing: border-box;
		padding: 8px 0;
	}
	.bottom-name {
		color: #8A8A8A;
		font-size: 28rpx;
	}
</style>
