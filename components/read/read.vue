<template>
	<view id="readBox" class="read-box" :style="{'background-color': bgColor, color: color}">
		
		<!-- renderjs模块 -->
		<view :prop="domProp" :change:prop="dom.readChange" id="dom"></view>
		
		<!-- 文本内容区域 -->
		<view id="flipbook" class="flipbook" :style="{'font-size': fontSize + 'px'}">
		  <view style="background-color: #BFAD8A;"> Page 1 </view>
		  <view style="background-color: #BFAD8A;"> Page 2 </view>
		  <view style="background-color: #BFAD8A;"> Page 3 </view>
		  <view style="background-color: #BFAD8A;"> Page 4 </view>
		</view>
		
	</view>
</template>

<script>
	import { skinMixin } from '@/common/mixin/index.js'
	import { indexOf } from '@/common/js/util.js'
	export default {
		mixins: [skinMixin],
		props: {
			//传入文本内容
			bookContent: {
				type: String,
				default: ''
			},
			//传入开始位置(小说阅读记录)
			start: {
				type: Number,
				default: 0
			},
			//传入字体大小
			fontSize: {
				type: Number,
				default: 20
			},
			//传入字体颜色
			color: {
				type: String,
				default: '#2E2B23'
			},
			//传入背景颜色
			bgColor: {
				type: String,
				default: '#BFAD8A'
			}
		},
		data () {
			return {
				//设置窗口是否打开
				settingShow: false,
				catalog: [],
				markTitle: ''
			}
		},
		computed: {
			domProp () {
				return {
					fontSize: this.fontSize,
					record: this.start
				};
			}
		},
		created () {
		},
		methods: {
			//当阅读位置改变时触发（必须是子组件自身的事件触发的改变才能触发，因为子组件外造成的改变不会触发）
			change (e) {
				
			},
			//更新阅读状态
			updateReadStatus (e) {
				
			}
		},
		beforeDestroy () {
			//注销监听原生子窗体是否显示
			uni.$off('setting-isShow');
		}
	}
</script>
<script lang="renderjs" module="dom">
	let myDom
	export default {
		data () {
			return {
				//当前页文字的开始和结束位置
				nowIndex: [0,0],
				maxHeight: 0
			}
		},
		mounted () {
			this.initProp.bind(this);
			const jquery =  document.createElement('script');
			jquery.src = 'static/js/jquery-1.7.1.min.js';
			jquery.onload = this.initJquery.bind(this);
			document.head.appendChild(jquery);
			setTimeout(() => {
				const turn = document.createElement('script');
				turn.src = 'static/js/turn.js';
				turn.onload = this.initTurn.bind(this);
				document.head.appendChild(turn);
			}, 30)
		},
		methods: {
			//初始化jquery
			initJquery () {
			},
			//初始化turn.js
			initTurn () {
				const readBox = document.getElementById('readBox');
				this.maxHeight = readBox.offsetHeight;
				$("#flipbook").turn({
				  width: readBox.offsetWidth,
				  height: this.maxHeight,
				  autoCenter: true,
				  display: 'single'
				});
			},
			//初始化数据
			initProp () {
				myDom = dom.init(document.getElementById('dom'));
				// 观测更新的数据在 view 层可以直接访问到
				myDom.setOption(this.domProp);
			},
			//设置当前页/下页内容
			setNowPage () {
				this.updateReadStatus(false);
				//截取内容
				let text = this.bookContent.substr(this.nowIndex[0], 1500);
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
				let len = text.length % 20 > 0 ? parseInt(text.length / 20) + 1 : parseInt(text.length / 20);
				//打断循环
				let isBreak = false;
				//每次添加20个字符
				for ( let i = 0; i < len; i++ ) {
					content.textContent += text.substring(i * 20, (i + 1) * 20);
					//文本高度超过规定高度
					if ( content.offsetHeight > this.maxHeight ) {
						len = content.textContent.length;
						//文本每次减去最后一个字符
						for ( let j = 0; j < len; j++ ) {
							content.textContent = content.textContent.substr(0, content.textContent.length-1);
							//文本高度等于规定高度，结束循环
							if ( content.offsetHeight == this.maxHeight ) {
								//当前页内容最后的位置
								this.nowIndex[1] = this.nowIndex[0] + content.textContent.length;
								//通知外层循环中断
								isBreak = true;
								break;
							}
						}
					} else {
						//如果文本遍历完了，但文本高度没有超过容器高度则表示这是最后一页
						if ( i == len - 1 ) {
							this.nowIndex[1] = this.nowIndex[0] + text.length;
							this.updateReadStatus(true);
						}
					}
					if ( isBreak ) {
						break;
					}
				}
				this.setMarkTitle();
			},
			//设置上一页内容
			setPrevPage () {
				this.updateReadStatus(false);
				
				//将内容的开始位置变为结束位置
				this.nowIndex[1] = this.nowIndex[0];
				
				//截取结束位置前1500个字，如果没有1500个字，则截取到首位
				let index = this.nowIndex[1] - 1500 > 0 ? this.nowIndex[1] - 1500 : 0;
				let text = this.bookContent.substring(index, this.nowIndex[1]);
				
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
				let len = text.length % 20 > 0 ? parseInt(text.length / 20) + 1 : parseInt(text.length / 20);
				//打断循环
				let isBreak = false;
				for ( let i = 0; i < len; i++) {
					//每次从最后面添加20个字符
					content.textContent = text.substr(-(i + 1) * 20, 20) + content.textContent;
					if ( content.offsetHeight > this.maxHeight ) {
						len = content.textContent.length;
						//文本每次减去最前面的一个字符
						for ( let j = 0; j < len; j++ ) {
							content.textContent = content.textContent.substr(1);
							//文本高度等于规定高度，结束循环
							if ( content.offsetHeight == this.maxHeight ) {
								//更新当前页内容的初始位置
								this.nowIndex[0] = this.nowIndex[1] - content.textContent.length > 0 ? this.nowIndex[1] - content.textContent.length : 0;
								//通知外层循环中断
								isBreak = true;
								break;
							}
						}
					} else {
						//如果文本遍历完后文本高度还是小于等于规定的高度, 这是第一页, 则请求新的文本补全整个页面
						if ( i == len - 1 ) {
							this.nowIndex[0] = 0;
						}
					}
					if ( isBreak ) {
						break;
					}
				}
				this.updateRecord(this.nowIndex[0]);
				this.setMarkTitle();
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
			//字体改变
			fontChange (newVal, oldVal) {
				const content = document.getElementsByClassName('content')[0];
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					//字体变大
					if ( oldVal < newVal ) {
						//如果文本高度没有超过规定高度则不操作
						if ( content.offsetHeight <= this.maxHeight ) {
							return;
						}
						let len = content.textContent.length;
						for ( let i = 0; i < len; i++ ) {
							content.textContent = content.textContent.substr(0, content.textContent.length - 1);
							if ( content.offsetHeight <= this.maxHeight ) {
								this.nowIndex[1] = this.nowIndex[0] + content.textContent.length;
								break;
							}
						}
					} else {
						//字体变小
						//如果已经是最后面了则不操作
						if ( this.nowIndex[1] >= this.bookContent.length ) {
							return;
						}
						let text = this.bookContent.substr(this.nowIndex[1], 400);
						let isBreak = false;
						//遍历截取的文本内容，从文本的末尾开始循环放入新建的文本容器
						let len = text.length % 20 > 0 ? parseInt(text.length / 20) + 1 : parseInt(text.length / 20);
						for ( let i = 0; i < len; i++ ) {
							content.textContent += text.substring(i * 20, (i + 1) * 20);
							//文本高度超过规定高度
							if ( content.offsetHeight > this.maxHeight ) {
								len = content.textContent.length;
								//文本每次减去最后一个字符
								for ( let j = 0; j < len; j++ ) {
									content.textContent = content.textContent.substr(0, content.textContent.length-1);
									//文本高度等于规定高度，结束循环
									if ( content.offsetHeight == this.maxHeight ) {
										//当前页内容最后的位置
										this.nowIndex[1] = this.nowIndex[0] + content.textContent.length;
										//通知外层循环中断
										isBreak = true;
										break;
									}
								}
							}
							if ( isBreak ) {
								break;
							}
						}
					}
				}, 50)
			},
			//翻页模式改变
			scrollModeChange (newVal, oldVal) {
			},
			//阅读记录改变
			recordChange (newVal, oldVal) {
				this.nowIndex[0] = newVal;
				this.setNowPage();
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
		}
	}
</script>

<style scoped>
	.read-box {
		font-family: '微软雅黑';
	}
	.box-view {
		overflow-x: hidden;
	}
	.flipbook {
		width: 100%;
		height: 100%;
	}
</style>
