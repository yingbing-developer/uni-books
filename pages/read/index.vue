<template>
	<view class="read" :style="{'background-color': skinColor.readBackColor, filter: 'brightness(' + light + '%)'}">
		
		<!-- renderjs模块 -->
		<view :prop="readModeSync" :change:prop="dom.readChange" id="dom"></view>
		
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
		'line-height': (fontSize + 10) + 'px',
		color: skinColor.readTextColor}">
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
			readModeSync () {
				return this.readMode;
			},
			light () {
				return (100 - ((1 - this.readMode.light) * 50)).toFixed(2);
			}
		},
		mounted () {
			this.updateBookReadTime(this.path);
		},
		methods: {
			...mapMutations(['updateBookReadTime']),
			updateProgress (e) {
				console.log('滚动的距离: ' + e.scrollTop);
				
			}
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
				//每页文字的开始位置
				startIndex: [0],
				count: 0
			}
		},
		mounted () {
			this.initDom.bind(this);
			this.initView();
			this.getContent();
			window.onscroll = () => {
				//为了保证兼容性，这里取两个值，哪个有值取哪一个
				//scrollTop就是触发滚轮事件时滚轮的高度
				let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
				let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
				if ( scrollHeight - scrollTop == clientHeight ) {
					console.log('到达底部');
				}
				if ( scrollTop == 0 ) {
					console.log('到达顶部');
				}
				UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
					cid: this._$id,
					method: 'updateProgress',
					args: {'scrollTop': scrollTop}
				})
			}
		},
		methods: {
			initDom() {
				myDom = dom.init(document.getElementById('dom'));
				// 观测更新的数据在 view 层可以直接访问到
				myDom.setOption(this.readModeSync);
			},
			//获取内容
			getContent () {
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const path = page.options.path;
				plus.io.resolveLocalFileSystemURL('file://' + path, ( entry ) => {
					entry.file( ( file ) => {
						let reader = new plus.io.FileReader();
						reader.onloadend = ( e ) => {
							this.bookContent = e.target.result;
							this.paging();
						};
						reader.readAsText( file, 'gb2312' );
					}, ( fail ) => {
						console.log("Request file system failed: " + fail.message);
					});
				}, ( fail ) => {
					console.log( "Request file system failed: " + fail.message );
				});
			},
			//分页计算
			paging () {
				const contentBox = document.getElementById('contentBox');
				let text = this.bookContent.substr(this.startIndex[this.count], 2000);
				let result = text.split('');
				let box = this.createContent();
				contentBox.appendChild(box);
				let content = document.getElementsByClassName('content')[this.count];
				let contentSync = null;
				for ( let i in result ) {
					content.textContent = contentSync ? contentSync + result[i] : result[i];
					if ( content.offsetHeight > this.viewHeight ) {
						content.textContent = contentSync;
						this.startIndex.push(i);
						this.count++;
						if ( this.count >= 3 ) {
							this.count = 0;
							break;
						} else {
							this.paging();
							break;
						}
					} else {
						contentSync = content.textContent;
					}
				}
			},
			readChange (newVal, oldVal) {
				console.log(newVal);
				//字体改变
				if ( newVal.fontSize != oldVal.fontSize ) {
					this.fontChange(newVal.fontSize, oldVal.fontSize);
				}
				//翻页方式改变
				if ( newVal.scroll != oldVal.scroll ) {
					this.scrollModeChange(newVal.scroll, oldVal.scroll)
				}
			},
			fontChange (newVal, oldVal) {
				const content = document.getElementsByClassName('content');
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					for ( let i in content ) {
						//字体变大
						if ( oldVal < newVal ) {
							for ( let i = this.endIndex[i]; i > 0; i-- ) {
								content[i].textContent = content[i].textContent.substr(0, i);
								if ( content[i].offsetHeight <= this.viewHeight ) {
									this.endIndex = i;
									break;
								}
							}
						} else {
							//字体变小
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
					}
				}, 50)
			},
			scrollModeChange (newVal, oldVal) {
				
			},
			//初始化内容容器
			initView () {
				const top = document.getElementById('readTop');
				const gap = document.getElementById('gapBar');
				const contentBox = document.getElementById('contentBox');
				let lineHeight = this.readModeSync.fontSize + 10;
				this.viewHeight = parseInt((window.screen.height - top.offsetHeight) / lineHeight) * lineHeight;
				gap.style.height = top.offsetHeight + 'px';
			},
			createContent() {
				const dom = document.createElement('text');
				dom.style.whiteSpace = 'pre-wrap';
				dom.style.wordBreak = 'break-all';
				dom.style.wordWrap = 'break-word';
				// dom.style.display = 'flex';
				dom.setAttribute('class', 'content');
				return dom;
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
