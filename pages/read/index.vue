<template>
	<view class="read" :style="{'background-color': skinColor.readBackColor, filter: 'brightness(' + light + '%)'}">
		
		<!-- renderjs模块 -->
		<view :prop="fontSize" :change:prop="dom.fontChange" id="dom"></view>
		
		<view id="readTop" class="read-top" :style="{color: skinColor.readTextColor, 'background-color': skinColor.readBackColor}">
			<gap-bar></gap-bar>
			<view class="read-top-line">
				<text>{{bookInfo.name}}</text>
				<text>80%</text>
			</view>
		</view>
		
		<!-- 顶部间隔 -->
		<view id="gapBar"></view>
		
		<!-- 文本内容区域 -->
		<view
		class="content-box"
		id="contentBox"
		:style="{
		'font-size': fontSize + 'px',
		'lineHeight': lineHeight + 'px',
		color: skinColor.readTextColor}">
			<text id="content" class="content"></text>
		</view>
		
		<!-- 触摸区域 -->
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
		
		<!-- 阅读设置 -->
		<read-setting :path="path" ref="readSetting"></read-setting>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	import { skinMixin } from '@/common/mixin/index.js'
	import { indexOf } from '@/common/js/util.js'
	import ReadSetting from './setting.vue'
	import NavBar from '@/components/nav-bar/nav-bar.nvue'
	import GapBar from '@/components/nav-bar/nav-bar.nvue'
	export default {
		mixins: [skinMixin],
		data () {
			return {
				boxHeight: 0
			}
		},
		mounted () {
			this.updateBookReadTime(this.path);
		},
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
			fontSize () {
				return this.readMode.fontSize;
			},
			lineHeight () {
				return this.fontSize + 10;
			},
			light () {
				return (100 - ((1 - this.readMode.light) * 50)).toFixed(2);
			}
		},
		methods: {
			...mapMutations(['updateBookReadTime'])
		},
		onBackPress (event) {
			if ( this.$refs.readSetting.isShow ) {
				this.$refs.readSetting.hide();
				return true;
			}
			return false;
		},
		components: {
			GapBar,
			NavBar,
			ReadSetting
		}
	}
</script>
<script lang="renderjs" module="dom">
	let myDom
	export default {
		data () {
			return {
				//每页内容的全部文字
				bookContent: '',
				//行数的倍数的容器高度
				viewHeight: 0,
				//每页文字的结束位置
				endIndex: 0
			}
		},
		mounted () {
			this.initDom.bind(this);
			this.setViewHeight();
			this.getContent();
		},
		methods: {
			initDom() {
				myDom = dom.init(document.getElementById('dom'));
				// 观测更新的数据在 view 层可以直接访问到
				myDom.setOption(this.fontSize);
			},
			getContent () {
				const content = document.getElementById('content');
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const path = page.options.path;
				plus.io.resolveLocalFileSystemURL('file://' + path, ( entry ) => {
					entry.file( ( file ) => {
						let reader = new plus.io.FileReader();
						reader.onloadend = ( e ) => {
							this.bookContent = e.target.result;
							let result = e.target.result.split('');
							let contentSync = null;
							// content.textContent = this.bookContent;
							for ( let i in result ) {
								content.textContent = contentSync ? contentSync + result[i] : result[i];
								if ( content.offsetHeight > this.viewHeight ) {
									content.textContent = contentSync;
									this.endIndex = i;
									break;
								} else {
									contentSync = content.textContent;
								}
							}
						};
						reader.readAsText( file, 'gb2312' );
					}, ( fail ) => {
						console.log("Request file system failed: " + fail.message);
					});
				}, ( fail ) => {
					console.log( "Request file system failed: " + fail.message );
				});
			},
			fontChange (newVal, oldVal) {
				const content = document.getElementById('content');
				setTimeout(() => {
					if ( oldVal < newVal ) {
						for ( let i = this.endIndex; i > 0; i-- ) {
							content.textContent = content.textContent.substr(0, i);
							if ( content.offsetHeight <= this.viewHeight ) {
								this.endIndex = i;
								break;
							}
						}
					} else {
						let result = this.bookContent.split('');
						let contentSync = content.textContent;
						for ( let i = this.endIndex; i < result.length; i++ ) {
							content.textContent = contentSync ? contentSync + result[i] : result[i];
							if ( content.offsetHeight > this.viewHeight ) {
								content.textContent = contentSync;
								this.endIndex = i;
								break;
							} else {
								contentSync = content.textContent;
							}
						}
					}
				}, 50)
			},
			//设置行数的倍数的容器高度和行高
			setViewHeight () {
				const top = document.getElementById('readTop');
				const content = document.getElementById('content');
				const gap = document.getElementById('gapBar');
				// let lineHeight = this.fontSize + 10;
				this.viewHeight = window.screen.height - top.offsetHeight;
				gap.style.height = top.offsetHeight + 'px';
				// content.style.lineHeight = lineHeight + 'px';
			}
		}
	}
</script>

<style scoped>
	.read {
		width: 100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: '微软雅黑';
	}
	.read-top {
		font-size: 14px;
		padding: 0 20rpx;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		box-sizing: border-box;
	}
	.read-top-line {
		display: flex;
		justify-content: space-between;
	}
	.scroll-view {
		flex: 1;
		overflow: hidden;
	}
	.content-box {
		padding: 0 20rpx;
		display: flex;
	}
	.content {
		white-space: pre-wrap;
		word-break:break-all;
		word-wrap:break-word;
	}
	.touchBoard {
		position: fixed;
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
		height: 100%;
	}
	.touch-left, .touch-right {
		flex: 1;
	}
	.touch-center {
		width: 30%;
	}
	.touch-item {
		width: 100%;
		height: 200rpx;
	}
</style>
