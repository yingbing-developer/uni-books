<template>
	<view class="read" :style="{'background-color': skinColor.readBackColor, filter: 'brightness(' + light + '%)'}">
		
		<view id="readTop" class="read-top" :style="{color: skinColor.readTextColor, 'background-color': skinColor.readBackColor}">
			<gap-bar></gap-bar>
			<view class="read-top-line">
				<text class="read-top-text" style="width: 80%;">{{bookInfo.name}}</text>
				<text class="read-top-text">{{progress}}%</text>
			</view>
		</view>
		
		<!-- 文本内容区域 -->
		<read :book-content="bookContent" :start="bookInfo.record" class="readBox" :fontSize="fontSize" :color="skinColor.readTextColor" :bgColor="skinColor.readBackColor">
			<!-- 点击此处显示菜单 -->
			<view class="touch-menu" @tap="openSettingNvue">菜单</view>
		</read>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	import { skinMixin } from '@/common/mixin/index.js'
	import { indexOf } from '@/common/js/util.js'
	import GapBar from '@/components/nav-bar/nav-bar.nvue'
	import Read from '@/components/read/read.vue'
	export default {
		mixins: [skinMixin],
		data () {
			return {
				//小说全部内容
				bookContent: '',
				//文本最大高度
				maxHeight: 0,
				//顶部间距
				gapHeight: 0,
				//设置窗口是否打开
				settingShow: false,
				catalog: [],
				markTitle: ''
			}
		},
		computed: {
			...mapGetters(['readMode', 'bookList']),
			//书籍信息
			bookInfo () {
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				let index =  page.options.index;
				return this.bookList[index];
			},
			//文件路径
			path () {
				return this.bookInfo.path;
			},
			//滚动方式
			scrollMode () {
				return this.readMode.scroll;
			},
			fontSize () {
				return this.readMode.fontSize;
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
		created () {
			this.updateBookReadTime(this.path);
			
			//监听原生子窗体显示
			uni.$on('setting-isShow', (data) => {
				this.settingShow = data.show;
			})
			
			this.getContent();
		},
		mounted () {
			
		},
		methods: {
			...mapMutations(['updateBookReadStatus', 'updateBookLength', 'updateBookReadTime', 'updateBookRecord']),
			getContent () {
				//获取内容 正式用
				// let ReadTxt = plus.android.importClass('com.itstudy.io.GetText');
				// let readTxt = new ReadTxt();
				// this.bookContent = readTxt.getTextFromText(plus.io.convertLocalFileSystemURL(this.domProp.path));
				// plus.nativeUI.closeWaiting();
				// this.updateLength();
				// this.getCatalog();
				
				//获取内容 调试用
				plus.io.resolveLocalFileSystemURL('file://' + this.path, ( entry ) => {
					entry.file( ( file ) => {
						let reader = new plus.io.FileReader();
						reader.onloadend = ( e ) => {
							plus.nativeUI.closeWaiting();
							this.bookContent = e.target.result;
							this.updateLength();
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
				this.catalog = catalog;
			},
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
			//设置文本总长度
			updatetLength (e) {
				this.updateBookLength({
					path: this.path,
					length: this.bookContent.length
				})
			},
			//设置书签的前50个字
			setMarkTitle (e) {
				this.markTitle = e.title;
				uni.$emit('setting-mark', {
					markTitle: this.markTitle
				})
			},
			//打开设置子窗体
			openSettingNvue () {
				const subNvue = uni.getSubNVueById('setting');
				
				//向子窗体传值
				uni.$emit('setting-popup', {  
					path: this.path,
				    markTitle: this.markTitle,
				    catalog: this.catalog
				});
				
				// 打开 nvue 子窗体 
				subNvue.show();
			}
		},
		beforeDestroy () {
			//注销监听原生子窗体是否显示
			uni.$off('setting-isShow');
		},
		onBackPress (event) {
			if ( event.from == 'backbutton' ) {
				if ( this.settingShow ) {
					uni.$emit('setting-hide');
					return true;
				}
			}
			return false;
		},
		components: {
			GapBar,
			Read
		}
	}
</script>

<style scoped>
	.read {
		min-height: 100vh;
		font-family: '微软雅黑';
		display: flex;
		flex-direction: column;
	}
	.read-top {
		font-size: 14rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	.read-top-line {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.read-top-text {
		font-size: 22rpx;
		white-space:nowrap;/* 规定文本是否折行 */  
		overflow: hidden;/* 规定超出内容宽度的元素隐藏 */
		text-overflow: ellipsis;
	}
	.readBox {
		position: relative;
		flex: 1;
		overflow: unset;
	}
	.noWrap {
		white-space: nowrap;
	}
	.touch-menu {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 200rpx;
		height: 400rpx;
		border: 5rpx dashed #FFFFFF;
		box-sizing: border-box;
		color: #FFFFFF;
		font-size: 20rpx;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 20rpx;
	}
</style>
