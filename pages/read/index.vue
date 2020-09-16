<template>
	<view class="read" :style="{'background-color': skinColor.readBackColor, filter: 'brightness(' + light + '%)'}">
		
		<!-- renderjs模块 -->
		<view :prop="domProp" :change:prop="dom.readChange" id="dom"></view>
		
		<view id="readTop" class="read-top" :style="{color: skinColor.readTextColor, 'background-color': skinColor.readBackColor}">
			<gap-bar></gap-bar>
			<view class="read-top-line">
				<text>{{bookInfo.name}}</text>
				<text>{{progress}}%</text>
			</view>
		</view>
		
		<!-- 顶部间隔 -->
		<view id="gapBar"></view>
		
		<!-- 文本内容区域 -->
		<view class="box-view">
			<view
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
			<view class="touch-box touch-left" v-if="scrollMode == 'paging'">
				<view class="touch-item touch-prev"></view>
			</view>
			<view class="touch-box touch-center">
				<view class="touch-item" @tap="$refs.readSetting.show()"></view>
			</view>
			<view class="touch-box touch-right" v-if="scrollMode == 'paging'">
				<view class="touch-item touch-next"></view>
			</view>
		</view>
		
		<!-- 阅读设置 -->
		<read-setting :catalog="catalog" :path="path" ref="readSetting"></read-setting>
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
			progress () {
				if ( this.bookInfo.record == 0 ) {
					return 0
				} else {
					return parseFloat(((this.bookInfo.record / this.bookInfo.length) * 100).toFixed(2))
				}
			},
			light () {
				return (100 - ((1 - this.readMode.light) * 50)).toFixed(2);
			}
		},
		mounted () {
			this.updateBookReadTime(this.path);
		},
		methods: {
			...mapMutations(['updateBookReadStatus', 'updateBookLength', 'updateBookReadTime', 'updateBookRecord']),
			//更新阅读记录
			updateRecord (e) {
				this.updateBookRecord({
					path: this.path,
					record: e.record
				});
			},
			//更新阅读状态
			updateReadStatus (e) {
				this.updateBookReadStatus({
					path: this.path,
					isReaded: e.status
				});
			},
			//填充章节目录
			setCatalog (e) {
				this.catalog = e.catalog;
			},
			//跳往章节
			selectCatalog (e) {
				console.log(e);
			},
			//设置文本总长度
			updatetLength (e) {
				this.updateBookLength({
					path: this.path,
					length: e.length
				})
			},
			//弹窗
			toast (e) {
				uni.showToast({
					title: e.title,
					icon: 'none'
				})
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
			this.initMonitor();
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
			//初始化监听
			initMonitor () {
				//上一页
				document.getElementsByClassName('touch-prev')[0].addEventListener('click', () => {
					if ( this.nowIndex[0] > 0 ) {
						this.setPrevPage();
					} else {
						this.toast('已经是最前面了');
					}
				})
				//下一页
				document.getElementsByClassName('touch-next')[0].addEventListener('click', () => {
					if ( this.nowIndex[1] < this.bookContent.length ) {
						this.updateRecord(this.nowIndex[1]);
						this.setNowPage();
					} else {
						this.toast('已经是最后面了');
					}
				})
			},
			//初始化数据
			initDom() {
				myDom = dom.init(document.getElementById('dom'));
				// 观测更新的数据在 view 层可以直接访问到
				myDom.setOption(this.domProp);
			},
			//获取内容
			async getContent () {
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const path = page.options.path;
				plus.io.resolveLocalFileSystemURL('file://' + path, ( entry ) => {
					entry.file( ( file ) => {
						let reader = new plus.io.FileReader();
						reader.onloadend = ( e ) => {
							this.bookContent = e.target.result;
							this.updateLength();
							this.nowIndex[0] = this.domProp.record;
							this.setNowPage();
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
				const reg = new RegExp(/(第?[一二两三四五六七八九十○零百千万亿0-9１２３４５６７８９０]{1,6}[章回卷节折篇幕集部]?[.\s][^\n]*)[_,-]?/g);
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
				this.updateReadStatus(false);
				//截取内容
				let text = this.bookContent.substr(this.nowIndex[0], 1500);
				let result = text.split('');
				
				//创建新的文本容器，插入节点中
				const box = this.createContent();
				const contentBox = document.getElementById('contentBox');
				contentBox.appendChild(box);
				const contents = document.getElementsByClassName('content');
				
				//如果为翻页模式移除原本的内容
				if ( this.domProp.scrollMode == 'paging' && contents.length > 1 ) {
					contentBox.removeChild(contents[0])
				}
				
				//获取新插入的文本容器
				const content = contents[contents.length - 1];
				//遍历文本一个字符一个字符的插入
				// for ( let i in result ) {
				// 	content.textContent += result[i];
				// 	if ( ( parseInt(i) + 1) % 10 == 0 ) {
				// 		if ( content.offsetHeight > this.viewHeight ) {
				// 			for ( let j = content.textContent.length - 1; j >= 0; j-- ) {
				// 				content.textContent = content.textContent.substr(0, j);
				// 				if ( content.offsetHeight <= this.viewHeight ) {
				// 					//当前页内容最后的位置
				// 					this.nowIndex[1] = this.nowIndex[0] + content.textContent.length;
				// 					break;
				// 				}
				// 			}
				// 		}
				// 	}
				// }
				let contentSync = null;
				for ( let i in result ) {
					content.textContent = contentSync ? contentSync + result[i] : result[i];
					if ( content.offsetHeight > this.viewHeight ) {
						content.textContent = contentSync;
						//当前页内容最后的位置
						this.nowIndex[1] = parseInt(i) + this.nowIndex[0];
						break;
					} else {
						//如果文本遍历完了，但文本高度没有超过容器高度则表示这是最后一页
						if ( i == result.length - 1 ) {
							//当前页内容最后的位置
							this.nowIndex[1] = parseInt(i) + 1 + this.nowIndex[0];
							this.updateReadStatus(true);
						}
						contentSync = content.textContent;
					}
				}
			},
			//设置上一页内容
			setPrevPage () {
				this.updateReadStatus(false);
				
				//将内容的开始位置变为结束位置
				this.nowIndex[1] = this.nowIndex[0];
				
				//截取结束位置前1500个字，如果没有1500个字，则截取到首位
				let index = this.nowIndex[1] - 1500 > 0 ? this.nowIndex[1] - 1500 : 0;
				let text = this.bookContent.substring(index, this.nowIndex[1]);
				let result = text.split('');
				
				//创建新的文本容器
				const box = this.createContent();
				const contentBox = document.getElementById('contentBox');
				let content = document.getElementsByClassName('content')[0];
				//插入当前文本的前方
				contentBox.insertBefore(box, content);
				
				//如果为翻页模式，则移除当前的文本容器
				if ( this.domProp.scrollMode == 'paging' ) {
					contentBox.removeChild(content);
					content = document.getElementsByClassName('content')[0];
				}
				
				//遍历截取的文本内容，从文本的末尾开始循环放入新建的文本容器
				let contentSync = null;
				for ( let i = result.length - 1; i >= 0; i--) {
					content.textContent = contentSync ? result[i] + contentSync : result[i];
					if ( content.offsetHeight > this.viewHeight ) {
						content.textContent = contentSync;
						this.nowIndex[0] = this.nowIndex[1] - ( result.length - 1 - parseInt(i) );
						break;
					} else {
						contentSync = content.textContent;
					}
					//如果文本遍历完后，文本高度还是小于等于规定的高度,则请求新的文本补全整个页面
					if ( i == 0 && content.offsetHeight <= this.viewHeight ) {
						this.nowIndex[0] = 0;
						text = this.bookContent.substr(this.nowIndex[1], 1500);
						let ment = text.split('');
						contentSync = content.textContent;
						content.textContent = '';
						for ( let j in ment ) {
							content.textContent = contentSync ? contentSync + ment[j] : ment[j];
							if ( content.offsetHeight > this.viewHeight ) {
								content.textContent = contentSync;
								this.nowIndex[1] = this.nowIndex[1] + parseInt(j);
								break;
							} else {
								contentSync = content.textContent;
							}
						}
					}
				}
				this.updateRecord(this.nowIndex[0]);
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
				const content = document.getElementsByClassName('content')[0];
				this.initLine();
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					//字体变大
					if ( oldVal < newVal ) {
						let contentSync = content.textContent;
						for ( let j = content.textContent.length - 1; j >= 0; j-- ) {
							content.textContent = content.textContent.substr(0, j);
							if ( content.offsetHeight <= this.viewHeight ) {
								content.textContent = contentSync;
								this.nowIndex[1] = this.nowIndex[0] + content.textContent.length;
								break;
							} else {
								contentSync = content.textContent;
							}
						}
					} else {
						//字体变小
						let text = this.bookContent.substr(this.nowIndex[1], 400);
						let result = text.split('');
						let contentSync = content.textContent;
						for ( let j in result ) {
							content.textContent = contentSync ? contentSync + result[j] : result[j];
							if ( content.offsetHeight > this.viewHeight ) {
								content.textContent = contentSync;
								this.nowIndex[1] = this.nowIndex[1] + parseInt(j);
								break;
							} else {
								if ( j >= result.length - 1 ) {
									this.nowIndex[1] = result.length - 1;
								} else {
									contentSync = content.textContent;
								}
							}
						}
					}
				}, 50)
			},
			scrollModeChange (newVal, oldVal) {
				// const content = document.getElementsByClassName('content');
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
				this.nowIndex[0] = newVal;
				this.setNowPage();
			},
			//初始化容器
			initView () {
				const top = document.getElementById('readTop');
				const gap = document.getElementById('gapBar');
				const contentBox = document.getElementById('contentBox');
				//设置分页的首位索引
				// this.nowIndex[0] = this.domProp.record;
				// this.nowIndex[0] = 1000;
				//设置页面
				// let count = 3;
				// while (count > 0) {
				// 	let box = this.createContent();
				// 	contentBox.appendChild(box);
				// 	count--;
				// }
				this.initLine();
				//设置顶部间隔高度
				gap.style.height = top.offsetHeight + 'px';
			},
			//设置行高和规定高度
			initLine () {
				const top = document.getElementById('readTop');
				let lineHeight = this.domProp.fontSize + 10;
				this.viewHeight = parseInt((window.screen.height - top.offsetHeight) / lineHeight) * lineHeight;
			},
			createContent() {
				const dom = document.createElement('text');
				dom.style.whiteSpace = 'pre-wrap';
				dom.style.wordBreak = 'break-all';
				dom.style.wordWrap = 'break-word';
				dom.style.width = '100%';
				dom.style.display = 'inline-block';
				dom.setAttribute('class', 'content');
				return dom;
			},
			toast (title) {
				UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
					cid: this._$id,
					method: 'toast',
					args: {'title': title}
				})
			},
			//更新阅读记录
			updateRecord (record) {
				UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
					cid: this._$id,
					method: 'updateRecord',
					args: {'record': record}
				})
			},
			//更新阅读状态
			updateReadStatus (status) {
				UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
					cid: this._$id,
					method: 'updateReadStatus',
					args: {'status': status}
				})
			},
			//更新文本总长度
			updateLength () {
				UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
					cid: this._$id,
					method: 'updatetLength',
					args: {'length': this.bookContent.length}
				})
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
	.touch-prev, .touch-next {
		height: 70%;
	}
</style>
