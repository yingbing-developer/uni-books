<template>
	<view class="page" :id="'dom' + pageType" :prop="domProp" :change:prop="dom.domPropChange" :style="{color: color, 'font-size': this.fontSize + 'px', 'line-height': lineHeight + 'px'}">
		<text :id="'content' + pageType" class="content" ref="content"></text>
	</view>
</template>

<script>
	export default {
		props: {
			//传入文本
			content: {
				type: String,
				default: ''
			},
			//传入分页类型（是上一页: prev 还是下一页: next）
			type: {
				type: String,
				default: 'next'
			},
			//传入字体大小
			fontSize: {
				type: Number,
				default: 20
			},
			color: {
				type: String,
				default: ''
			},
			//传入是当前页:now，下一页next，还是上一页prev
			pageType: {
				type: String,
				default: ''
			},
			//传入阅读位置（如果type为next则是起始阅读位置, 如果type为prev则是结束阅读位置）
			record: {
				type: Number,
				default: 0
			}
		},
		data () {
			return {
				//保存当前页起始位置
				start: 0
			}
		},
		created () {
			if ( this.type == 'next' ) {
				this.start = this.record;
			}
		},
		computed: {
			lineHeight () {
				return this.fontSize + 10;
			},
			domProp () {
				return {
					fontSize: this.fontSize,
					lineHeight: this.lineHeight,
					bookContent: this.content,
					pageType: this.pageType,
					type: this.type
				};
			},
			finish (e) {
				let view = uni.createSelectorQuery().in(this).select("#content" + this.pageType);
				view.boundingClientRect( data => {
				  let start = 0;
				  let end = 0;
				  let length = parseInt(data.dataset.length);
				  if ( this.type == 'next' ) {
				  	start = this.record;
				  	end = this.record + length;
				  }
				  if ( this.type == 'prev' ) {
				  	start = this.record - length;
				  	end = this.record;
				  }
				  this.start = start;
				  this.$emit('ready', {start: start, end: end, pageType: this.pageType});
				}).exec();
			}
		},
		watch: {
			record (newVal) {
				if ( this.type == 'next' ) {
					this.start = this.record;
				}
			}
		}
	}
</script>

<script lang="renderjs" module="dom" type="module">
	let myDom;
	const test = 0;
	export default {
		data () {
			return {
				//根据容器高度，行高计算出的最大高度
				viewHeight: 0
			}
		},
		mounted () {
			this.initDom.bind(this);
			setTimeout(() => {
				if ( this.domProp.bookContent ) {
					this.initView();
					this.start()
				}
			}, 30)
		},
		methods: {
			setNowPage () {
				let text = this.domProp.bookContent;
				const content = document.getElementById('content' + this.domProp.pageType);
				const addNum = 50;
				let len = Math.ceil(text.length / addNum);
				//打断循环
				let isBreak = false;
				//每次添加addNum个字符
				for ( let i = 0; i < len; i++ ) {
					content.textContent += text.substring(i * addNum, (i + 1) * addNum);
					//文本高度超过规定高度
					if ( content.offsetHeight > this.viewHeight ) {
						len = content.textContent.length;
						//文本每次减去最后一个字符
						for ( let j = 0; j < len; j++ ) {
							content.textContent = content.textContent.substr(0, content.textContent.length-1);
							//文本高度等于规定高度，结束循环
							if ( content.offsetHeight == this.viewHeight ) {
								//通知外层循环中断
								isBreak = true;
								break;
							}
						}
					} else {
						//如果文本遍历完了，但文本高度没有超过容器高度则表示这是最后一页
					}
					if ( isBreak ) {
						break;
					}
				}
				this.finish();
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
					if ( content.offsetHeight > this.viewHeight ) {
						len = content.textContent.length;
						//文本每次减去最前面的一个字符
						for ( let j = 0; j < len; j++ ) {
							content.textContent = content.textContent.substr(1);
							//文本高度等于规定高度，结束循环
							if ( content.offsetHeight == this.viewHeight ) {
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
			},
			initDom () {
				myDom = dom.init(document.getElementById('dom' + this.domProp.pageType));
				// 观测更新的数据在 view 层可以直接访问到
				myDom.setOption(this.domProp);
			},
			initView () {
				let windowHeight = document.getElementById('dom' + this.domProp.pageType).offsetHeight;
				this.viewHeight = Math.floor(windowHeight / this.domProp.lineHeight) * this.domProp.lineHeight;
			},
			start () {
				if ( this.domProp.type == 'next' ) {
					this.setNowPage();
				}
				if ( this.domProp.type == 'prev' ) {
					this.setPrevPage();
				}
			},
			domPropChange (newVal, oldVal) {
				//字体改变
				if ( newVal.fontSize != oldVal.fontSize ) {
					this.fontChange(newVal.fontSize, oldVal.fontSize);
				}
				//内容改掉边
				if ( newVal.bookContent != oldVal.bookContent ) {
					this.contentChange(newVal.bookContent, oldVal.bookContent)
				}
			},
			fontChange () {
				
			},
			contentChange(newVal, oldVal) {
				if ( newVal ) {
					this.initView();
					this.start()
				}
			},
			//通知父组件文本加载完成
			finish () {
				const content = document.getElementById('content' + this.domProp.pageType);
				content.setAttribute('data-length', content.textContent.length);
				UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
					cid: this._$id,
					method: 'finish'
				})
			}
		}
	}
</script>

<style scoped>
	.page {
		height: 100%;
		padding: 0 20rpx;
	}
	.content {
		white-space: pre-wrap;
		word-break: break-all;
		word-wrap: break-word;
		display: inline-block;
	}
</style>
