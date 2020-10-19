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
		<view class="pageBox" :style="{opacity: this.rOpacity}">
			<swiper indicator-dots :style="{'height': swiperHeight + 'px'}" :current="page" :duration="duration" @change="changePage">
				<swiper-item class="pageItem" v-for="(item, index) in pages" :key="index">
					<page
					ref="page"
					class="pageContent"
					:color="skinColor.readTextColor"
					:content="item.content"
					:supContent="item.supContent"
					:fontSize="fontSize"
					:type="item.type"
					:record="item.record"
					:length="bookContent.length"
					:isPageNow="item.isPageNow"
					@ready="ready"></page>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 触摸区域 -->
		<view class="touch-box touch-prev" v-if="scrollMode == 'paging'">
			上一页
		</view>
		<view class="touch-box touch-menu" @tap="openSettingNvue">
			菜单
		</view>
		<view class="touch-box touch-next" v-if="scrollMode == 'paging'">
			下一页
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	import { skinMixin } from '@/common/mixin/index.js'
	import { indexOf } from '@/common/js/util.js'
	import NavBar from '@/components/nav-bar/nav-bar.nvue'
	import GapBar from '@/components/nav-bar/nav-bar.nvue'
	import Page from '@/components/page/page.vue'
	//文本截取长度
	const sliceLen = 1500;
	export default {
		mixins: [skinMixin],
		data () {
			return {
				//文本内容
				bookContent: '',
				pages: [],
				//当前页
				page: 0,
				//刚打开时，文本部分会抖动,先将文本透明化,等文本加载完毕再显示
				rOpacity: 0,
				duration: 100,
				swiperHeight: 0,
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
			//监听原生子窗体显示
			uni.$on('setting-isShow', (data) => {
				this.settingShow = data.show;
			})
		},
		onReady () {
			//更新阅读时间
			this.updateBookReadTime(this.path);
			let view = uni.createSelectorQuery().in(this).select(".pageBox");
			view.boundingClientRect( data => {
				this.swiperHeight = data.height;
				this.getContent();
			}).exec();
		},
		methods: {
			...mapMutations(['updateBookReadStatus', 'updateBookLength', 'updateBookReadTime', 'updateBookRecord']),
			getContent () {
				
				//获取内容 正式用
				// let ReadTxt = plus.android.importClass('com.itstudy.io.GetText');
				// let readTxt = new ReadTxt();
				// this.bookContent = readTxt.getTextFromText(plus.io.convertLocalFileSystemURL(this.domProp.path));
				// plus.nativeUI.closeWaiting();
				
				//获取内容 调试用
				plus.io.resolveLocalFileSystemURL('file://' + this.path, ( entry ) => {
					entry.file( ( file ) => {
						let reader = new plus.io.FileReader();
						reader.onloadend = ( e ) => {
							plus.nativeUI.closeWaiting();
							this.bookContent = e.target.result;
							//更新文本总长度
							this.updateBookLength({
								path: this.path,
								length: this.bookContent.length
							})
							//获取章节目录
							this.getCatalog();
							
							//初始化当前页面
							this.pages.push({
								content: this.bookContent.substr(this.bookInfo.record, sliceLen),
								supContent: this.bookContent.substr(this.bookInfo.record + sliceLen, 500),
								record: this.bookInfo.record,
								isPageNow: true,
								type: 'next'
							})
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
			//当前页准备完成
			ready (e) {
				this.setLast(e.isReaded);
				if ( e.start > 0 && !this.pages[this.page - 1] ) {
					this.createPrev(e);
				} else {
					this.updatePrev(e);
				}
				
				if ( e.end < this.bookContent.length && !this.pages[this.page + 1] ) {
					this.createNext(e);
				} else {
					this.updateNext(e);
				}
				//显示文本
				this.rOpacity = 1;
			},
			createPrev (e) {
				let start = e.start - sliceLen > 0 ? e.start - sliceLen : 0;
				this.pages.unshift({
					content: this.bookContent.substring(start, e.start),
					supContent: this.bookContent.substr(e.start, 500),
					record: e.start,
					isPageNow: false,
					type: 'prev'
				})
				if ( this.pages[this.page + 2] ) {
					this.pages.pop();
				}
				this.duration = 0;
				this.page = e.start > 0 ? 1 : 0;
				setTimeout(() => {
					this.duration = 100;
				}, 10)
			},
			createNext (e) {
				this.pages.push({
					content: this.bookContent.substr(e.end, sliceLen),
					supContent: this.bookContent.substr(e.end + sliceLen, 500),
					record: e.end,
					isPageNow: false,
					type: 'next'
				})
				if ( this.pages[this.page - 2] ) {
					this.pages.shift();
				}
				this.duration = 0;
				this.page = e.start > 0 ? 1 : 0;
				setTimeout(() => {
					this.duration = 100;
				}, 10)
			},
			//更新上一页内容 如果有上一页的话
			updatePrev (e) {
				if ( this.pages[this.page - 1] ) {
					this.pages[0].record = e.start;
					this.pages[0].supContent = this.bookContent.substr(e.start, 500);
					this.pages[0].content = '';
					this.$nextTick(() => {
						let start = e.start - sliceLen > 0 ? e.start - sliceLen : 0;
						this.pages[0].content = this.bookContent.substring(start, e.start);
					})
				}
			},
			//更新下一页内容
			updateNext (e) {
				if ( this.pages[this.page + 1] ) {
					this.pages[this.pages.length - 1].record = e.end;
					this.pages[this.pages.length - 1].supContent = this.bookContent.substr(e.end + sliceLen, 500);
					this.pages[this.pages.length - 1].content = '';
					this.$nextTick(() => {
						//如果没有下一页初始化下一页内容
						this.pages[this.pages.length - 1].content = this.bookContent.substr(e.end, sliceLen);
					})
				}
			},
			//当前页是否是最后一页的执行事件
			setLast (status) {
				//更新阅读状态(是否读完)
				this.updateBookReadStatus({
					path: this.path,
					isReaded: status
				})
				//是最后一页
				if ( status ) {
					//如果还有下一页内容，删除掉
					if ( this.pages[this.page + 1] ) {
						this.pages.pop();
					}
				}
			},
			//滑动触发事件
			changePage (e) {
				if ( e.target.source == 'touch' ) {
					let go = this.page - e.target.current;
					this.page = e.target.current;
					//将原本的当前页面改为非当前页面
					let index = indexOf(this.pages, true, 'isPageNow');
					if ( index > -1 ) {
						this.$set(this.pages[index], 'isPageNow', false);
					}
					setTimeout(() => {
						this.updateBookRecord({
							path: this.path,
							record: this.$refs.page[this.page].start
						});
						this.$set(this.pages[this.page], 'isPageNow', true);
					}, this.duration)
				}
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
			NavBar,
			Page
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
		font-size: 12rpx;
		padding: 0 20rpx;
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
	.pageBox {
		flex: 1;
		padding: 0 20rpx;
	}
	.pageItem {
		height: 100%;
	}
	.pageContent {
		height: 100%;
	}
	.touch-box  {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		width: 200rpx;
		height: 400rpx;
		border: 5rpx dashed #FFFFFF;
		color: #333;
		font-size: 30rpx;
		background-color: rgba(255,255,255,0.4);
		font-weight: bold;
		opacity: 0;
	}
	.touch-prev {
		left: 0;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.touch-next {
		right: 0;
		border-top-left-radius: 20rpx;
		border-bottom-left-radius: 20rpx;
	}
	.touch-menu {
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 20rpx;
	}
</style>
