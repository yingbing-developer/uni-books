<template>
	<view class="read" :style="{'background-color': skinColor.readBackColor, filter: 'brightness(' + light + '%)'}">
		
		<!-- renderjs模块 -->
		<view :prop="domProp" :change:prop="dom.readChange" id="dom"></view>
		
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
		<view class="box-view">
			<view
			class="content-box"
			:class="{'noWrap': readMode.scroll == 'paging'}"
			id="contentBox"
			:style="{
			'font-size': fontSize + 'px',
			'line-height': (fontSize + 10) + 'px',
			color: skinColor.readTextColor}">
			</view>
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
		<read-setting @selectCatalog="selectCatalog" :catalog="catalog" :path="path" ref="readSetting"></read-setting>
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
				catalog: []
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
			domProp () {
				return {
					fontSize: this.readMode.fontSize,
					scrollMode: this.readMode.scroll,
					record: this.bookInfo.record
				};
			},
			light () {
				return (100 - ((1 - this.readMode.light) * 50)).toFixed(2);
			}
		},
		mounted () {
			this.updateBookReadTime(this.path);
		},
		methods: {
			...mapMutations(['updateBookReadTime', 'updateBookRecord']),
			updateProgress (e) {
				console.log('滚动的距离: ' + e.scrollTop);
			},
			updateRecord (e) {
				let book = {
					path: this.path,
					record: 0
				}
				this.updateBookRecord(book);
			},
			//填充章节目录
			setCatalog (e) {
				this.catalog = e.catalog;
			},
			//跳往章节
			selectCatalog (e) {
				console.log(e);
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
				//当前页文字的开始和结束位置
				nowIndex: [0,0],
				//上一页文字的开始和结束位置
				prevIndex: [0,0],
				//下一页文字的开始和结束位置
				nextIndex: [0,0],
				count: 0
			}
		},
		mounted () {
			this.initDom.bind(this);
			this.initView();
			this.getContent();
			// window.onscroll = () => {
			// 	//为了保证兼容性，这里取两个值，哪个有值取哪一个
			// 	//scrollTop就是触发滚轮事件时滚轮的高度
			// 	let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			// 	let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			// 	let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			// 	if ( scrollHeight - scrollTop == clientHeight ) {
			// 		console.log('到达底部');
			// 	}
			// 	if ( scrollTop == 0 ) {
			// 		console.log('到达顶部');
			// 	}
			// 	UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
			// 		cid: this._$id,
			// 		method: 'updateProgress',
			// 		args: {'scrollTop': scrollTop}
			// 	})
			// }
		},
		methods: {
			initDom() {
				myDom = dom.init(document.getElementById('dom'));
				// 观测更新的数据在 view 层可以直接访问到
				myDom.setOption(this.domProp);
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
							this.setNowPage();
							this.setPrevPage();
							this.getCatalog();
						};
						reader.readAsText( file, 'gb2312' );
					}, ( fail ) => {
						console.log("Request file system failed: " + fail.message);
					});
				}, ( fail ) => {
					console.log( "Request file system failed: " + fail.message );
				});
			},
			//获取章节目录
			getCatalog () {
				const reg = new RegExp(/(\s第?\s*[一二两三四五六七八九十○零百千万亿0-9１２３４５６７８９０]{1,6}\s*[章回卷节折篇幕集部][^\n]*)[_,-]?/g);
				let match = '';
				let catalog = [];
				while ((match = reg.exec(this.bookContent)) != null) {
					catalog.push({
						title: match[0],
						index: match.index
					})
				}
				UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
					cid: this._$id,
					method: 'setCatalog',
					args: {'catalog': catalog}
				})
			},
			//设置当前页内容
			setNowPage () {
				let text = this.bookContent.substr(this.nowIndex[0], 1500);
				let result = text.split('');
				let box = this.createContent();
				let content = document.getElementsByClassName('content')[1];
				let contentSync = null;
				for ( let i in result ) {
					content.textContent = contentSync ? contentSync + result[i] : result[i];
					if ( content.offsetHeight > this.viewHeight ) {
						content.textContent = contentSync;
						this.nowIndex[1] = i - 1 + this.nowIndex[0];
						this.setNextPage();
						break;
					} else {
						contentSync = content.textContent;
					}
				}
			},
			//设置上一页内容
			setPrevPage () {
				this.prevIndex[1] = this.nowIndex[0];
				let index = this.prevIndex[1] - 1500 > 0 ? this.prevIndex[1] - 1500 : 0;
				let text = this.bookContent.substr(index, this.prevIndex[1]);
				let result = text.split('');
				const content = document.getElementsByClassName('content')[0];
				let contentSync = null;
				for ( let i = result.length ; i > 0; i--) {
					content.textContent = contentSync ? result[i] + contentSync : result[i];
					if ( content.offsetHeight > this.viewHeight ) {
						content.textContent = contentSync;
						this.prevIndex[0] = this.prevIndex[1] - i;
						break;
					} else {
						contentSync = content.textContent;
					}
				}
			},
			//设置下一页内容
			setNextPage () {
				this.nextIndex[0] = this.nowIndex[1];
				let text = this.bookContent.substr(this.nextIndex[0], 1500);
				let result = text.split('');
				const content = document.getElementsByClassName('content')[2];
				let contentSync = null;
				for ( let i in result) {
					content.textContent = contentSync ? contentSync + result[i] : result[i];
					if ( content.offsetHeight > this.viewHeight ) {
						content.textContent = contentSync;
						this.nextIndex[1] = i - 1 + this.nextIndex[0];
						break;
					} else {
						contentSync = content.textContent;
					}
				}
			},
			//阅读设置改变
			readChange (newVal, oldVal) {
				//字体改变
				if ( newVal.fontSize != oldVal.fontSize ) {
					this.fontChange(newVal.fontSize, oldVal.fontSize);
				}
				//翻页方式改变
				if ( newVal.scrollMode != oldVal.scrollMode ) {
					this.scrollModeChange(newVal.scrollMode, oldVal.scrollMode)
				}
				//阅读位置改变
				if ( newVal.record != oldVal.record ) {
					this.recordChange(newVal.record, oldVal.record)
				}
			},
			fontChange (newVal, oldVal) {
				const content = document.getElementsByClassName('content');
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					for ( let i in content ) {
						//字体变大
						if ( oldVal < newVal ) {
							for ( let j = this.endIndex[i]; j > 0; j-- ) {
								content[i].textContent = content[i].textContent.substr(0, i);
								if ( content[i].offsetHeight <= this.viewHeight ) {
									this.startIndex[i + 1] = j;
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
				const content = document.getElementsByClassName('content');
				// if ( newVal == 'upDown' ) {
				// 	for ( let i in content ) {
				// 		content[i].style.position = 'relative';
				// 		content[i].style.left = 0;
				// 		content[i].style.top = 0;
				// 	}
				// }
				// if ( newVal == 'leftRight' ) {
				// 	const top = document.getElementById('readTop');
				// 	content[i].style.position = 'absolute';
				// 	content[i].style.left = 0;
				// 	content[i].style.top = top.offsetHeight + 'px';
				// }
			},
			recordChange (newVal, oldVal) {
				
			},
			//初始化
			initView () {
				const top = document.getElementById('readTop');
				const gap = document.getElementById('gapBar');
				const contentBox = document.getElementById('contentBox');
				//设置分页的首位索引
				// this.nowIndex[0] = this.domProp.record;
				this.nowIndex[0] = 1000;
				//设置页面
				let count = 3;
				while (count > 0) {
					let box = this.createContent();
					contentBox.appendChild(box);
					count--;
				}
				//设置行高
				let lineHeight = this.domProp.fontSize + 10;
				this.viewHeight = parseInt((window.screen.height - top.offsetHeight) / lineHeight) * lineHeight;
				//设置顶部间隔高度
				gap.style.height = top.offsetHeight + 'px';
			},
			createContent() {
				const dom = document.createElement('text');
				const top = document.getElementById('readTop');
				dom.style.whiteSpace = 'pre-wrap';
				dom.style.wordBreak = 'break-all';
				dom.style.wordWrap = 'break-word';
				dom.style.width = '100%';
				dom.style.display = 'inline-block';
				dom.setAttribute('class', 'content');
				return dom;
			}
		}
	}
</script>

<style scoped>
	.read {
		min-height: 100vh;
		font-family: '微软雅黑';
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	.read-top {
		font-size: 14px;
		position: fixed;
		top: 0;
		left: 20rpx;
		right: 20rpx;
	}
	.read-top-line {
		display: flex;
		justify-content: space-between;
	}
	.box-view {
		overflow-x: hidden;
	}
	.content-box {
		
	}
	.noWrap {
		white-space: nowrap;
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
