<template>
	<view class="page" :id="'dom' + dataId" :prop="domProp" :change:prop="dom.domPropChange" :style="{color: color, 'font-size': this.fontSize + 'px', 'line-height': lineHeight + 'px'}">
		<text :id="'content' + dataId" class="content" ref="content"></text>
	</view>
</template>

<script>
	export default {
		props: {
			//传入唯一标识动态命名ID用于获取dom对象
			dataId: {
				type: String,
				default () {
					let mydate = new Date();
					return 'cms' + mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds() + Math.round(Math.random() * 10000);
				}
			},
			//传入文本
			content: {
				type: String,
				default: ''
			},
			//传入候补文本，用于字体变小时的补充文本
			supContent: {
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
			//传入字体颜色
			color: {
				type: String,
				default: ''
			},
			//传入阅读位置（如果type为next则是起始阅读位置, 如果type为prev则是结束阅读位置）
			record: {
				type: Number,
				default: 0
			},
			//文本总长度
			length: {
				type: Number,
				default: 0
			},
			//是否是当前页面
			isPageNow: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				//保存当前页起始位置
				start: 0,
				//保存当前页结束位置
				end: 0
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
					supContent: this.supContent,
					isPageNow: this.isPageNow,
					dataId: this.dataId,
					record: this.record,
					type: this.type,
					isLast: this.end >= this.length
				};
			}
		},
		methods: {
			ready (e) {
				//计算开始和结束位置
				this.countRecord(e.length);
				//判断是否是首屏加载的初始页面
				if ( this.isPageNow ) {
					let isReaded = this.end >= this.length ? true : false;
					//抛出初始页面ready事件(开始位置,结束位置,是否读完)
					this.$emit('ready', {start: this.start, end: this.end, isReaded: isReaded});
				}
			},
			//计算开始和结束位置
			countRecord (length) {
				if ( this.type == 'next' ) {
					this.start = this.record;
					this.end = this.record + length;
				}
				if ( this.type == 'prev' ) {
					this.start = this.record - length > 0 ? this.record - length : 0;
					this.end = this.record;
				}
			}
		},
		watch: {
			record (newVal) {
				if ( this.type == 'next' ) {
					this.start = this.record;
				}
			},
			isPageNow (newVal) {
				if ( newVal ) {
					let isReaded = this.end >= this.length ? true : false;
					this.$emit('ready', {start: this.start, end: this.end, isReaded: isReaded});
				}
			}
		}
	}
</script>

<script lang="renderjs" module="dom" type="module">
	let myDom
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
			//设置下一页内容
			setNowPage () {
				let text = this.domProp.bookContent;
				const content = document.getElementById('content' + this.domProp.dataId);
				content.textContent = '';
				this.addText(content, text);
				this.ready();
			},
			//添加文字
			addText (content, text) {
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
					}
					if ( isBreak ) {
						break;
					}
				}
			},
			//设置上一页内容
			setPrevPage () {
				let text = this.domProp.bookContent;
				const content = document.getElementById('content' + this.domProp.dataId);
				const addNum = 50;
				let len = Math.ceil(text.length / addNum);
				//打断循环
				let isBreak = false;
				content.textContent = '';
				let end = addNum;
				//遍历截取的文本内容，从文本的末尾开始循环放入新建的文本容器
				for ( let i = 0; i < len; i++) {
					//每次从最后面添加addNum个字符
					if ( i == len - 1 ) {
						end = text.length - (i * addNum);
					}
					content.textContent = text.substr(-(i + 1) * addNum, end) + content.textContent;
					if ( content.offsetHeight > this.viewHeight ) {
						len = content.textContent.length;
						//文本每次减去最前面的一个字符
						for ( let j = 0; j < len; j++ ) {
							content.textContent = content.textContent.substr(1);
							//文本高度等于规定高度，结束循环
							if ( content.offsetHeight == this.viewHeight ) {
								//通知外层循环中断
								isBreak = true;
								break;
							}
						}
					} else {
						//如果文本遍历完后文本高度还是小于等于规定的高度, 这是第一页, 则请求新的文本补全整个页面
						if ( i == len - 1 ) {
							text = this.domProp.supContent;
							this.addText(content, text);
						}
					}
					if ( isBreak ) {
						break;
					}
				}
				this.ready();
			},
			initDom () {
				myDom = dom.init(document.getElementById('dom' + this.domProp.dataId));
				// 观测更新的数据在 view 层可以直接访问到
				myDom.setOption(this.domProp);
			},
			initView () {
				let windowHeight = document.getElementById('dom' + this.domProp.dataId).offsetHeight;
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
				//内容改变
				if ( newVal.bookContent != oldVal.bookContent ) {
					this.contentChange(newVal.bookContent, oldVal.bookContent)
				}
			},
			fontChange (newVal, oldVal) {
				//不是当前页面不操作
				if ( !this.domProp.isPageNow ) {
					return;
				}
				this.initView();
				const content = document.getElementById('content' + this.domProp.dataId);
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					//字体变大
					if ( oldVal < newVal ) {
						//如果文本高度没有超过规定高度则不操作
						if ( content.offsetHeight <= this.viewHeight ) {
							return;
						}
						let len = content.textContent.length;
						for ( let i = 0; i < len; i++ ) {
							content.textContent = content.textContent.substr(0, content.textContent.length - 1);
							if ( content.offsetHeight == this.viewHeight ) {
								break;
							}
						}
					} 
					if ( oldVal > newVal ) {
						//字体变小
						//如果是最后一页则不操作
						if ( !this.domProp.isLast ) {
							//从页面显示的文本后面截取全部剩余的文本，添加补充页面
							let text = this.domProp.bookContent.substr(content.textContent.length) + this.domProp.supContent;
							this.addText(content, text);
						}
					}
					//更新上下页内容
					this.ready();
				}, 100)
			},
			contentChange(newVal, oldVal) {
				if ( newVal ) {
					this.initView();
					this.start()
				}
			},
			//通知父组件文本加载完成
			ready () {
				let length = document.getElementById('content' + this.domProp.dataId).textContent.length;
				UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
					cid: this._$id,
					method: 'ready',
					args: {'length': length}
				})
			}
		}
	}
</script>

<style scoped>
	.page {
		height: 100%;
		max-height: 100%;
		overflow: hidden;
	}
	.content {
		white-space: pre-wrap;
		word-break: break-all;
		word-wrap: break-word;
		display: inline-block;
	}
</style>
