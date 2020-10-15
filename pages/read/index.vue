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
		<view class="pageBox">
			<swiper :style="{'height': swiperHeight + 'px'}" :current="page" :duration="100" @change="changePage">
				<swiper-item class="pageItem" v-for="(item, index) in pages" :key="index">
					<page
					class="pageContent"
					:color="skinColor.readTextColor"
					:content="item.content"
					:fontSize="fontSize"
					:type="item.type"
					:page-type="item.pageType"
					:record="item.record"
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
	export default {
		mixins: [skinMixin],
		data () {
			return {
				//文本内容
				bookContent: '',
				pages: [],
				page: 0,
				area: {
					prev: [0,0],
					now: [0,0],
					next: [0,0]
				},
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
			this.updateBookReadTime(this.path);
			
			//监听原生子窗体显示
			uni.$on('setting-isShow', (data) => {
				this.settingShow = data.show;
			})
		},
		onReady () {
			if ( this.bookInfo.record == 0 ) {
				this.pages = [{
					content: '',
					record: 0,
					pageType: 'now',
					type: 'next'
				},{
					content: '',
					record: 0,
					pageType: 'next',
					type: 'next'
				}]
			} else {
				this.pages = [{
					content: '',
					record: 0,
					pageType: 'prev',
					type: 'prev'
				},{
					content: '',
					record: 0,
					pageType: 'now',
					type: 'next'
				},{
					content: '',
					record: 0,
					pageType: 'next',
					type: 'next'
				}]
				this.page = 1;
			}
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
							
							// 初始化当前页内容
							let index = indexOf(this.pages, 'now', 'pageType');
							this.pages[index].content = this.bookContent.substr(this.bookInfo.record, 1500);
						};
						reader.readAsText( file, 'gb2312' );
					}, ( fail ) => {
						console.log("Request file system failed: " + fail.message);
					});
				}, ( fail ) => {
					console.log( "Request file system failed: " + fail.message );
				});
			},
			ready (e) {
				this.area[e.pageType] = [e.start, e.end];
				if ( e.pageType == 'now' ) {
					//获取当前页的下标
					let index = indexOf(this.pages, 'now', 'pageType');
					
					// 初始化下一页内容 如果后面还有内容的话
					if ( e.end < this.bookContent.length ) {
						this.pages[index + 1].record = e.end;
						this.pages[index + 1].content = this.bookContent.substr(e.end, 1500);
					} else {
						// 后面没有内容则删掉下一页的页面
						this.pages.splice(2, 1);
					}
					
					// 初始化上一页内容 如果前面还有内容的话
					if ( e.start > 0 ) {
						let start = e.start - 1500 > 0 ? e.start - 1500 : 0;
						this.pages[index - 1].record = start;
						this.pages[index - 1].content = this.bookContent.substr(start, e.start);
					}
					
				}
			},
			changePage (e) {
				
				let prevIndex = indexOf(this.pages, 'prev', 'pageType');
				let nowIndex = indexOf(this.pages, 'now', 'pageType');
				let nextIndex = indexOf(this.pages, 'next', 'pageType');
				//向后面翻页时
				if ( this.page - e.target.current < 0 ) {
					this.area['prev'] = this.area['now'];
					this.area['now'] = this.area['next'];
					//将原本当前页变为上一页
					this.pages[nowIndex].pageType = 'prev';
					this.pages[nextIndex].pageType = 'now';
					
					//如果后面还有内容 新增下一页页面
					if ( this.area['now'][1] < this.bookContent.length ) {
						this.pages.push({
							content: this.bookContent.substr(this.area['now'][1], 1500),
							record: this.area['now'][1],
							pageType: 'next',
							type: 'next'
						})
					}
					setTimeout(() => {
						//删除原本的上一页的页面  如果有的话
						if ( prevIndex > -1 ) {
							this.pages.splice(prevIndex, 1);
							// this.pages = this.pages.shift();
						}
						this.page = 1;
					}, 100)
				}
				
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
			//填充章节目录
			setCatalog (e) {
				this.catalog = e.catalog;
			},
			//设置文本总长度
			updatetLength (e) {
				this.updateBookLength({
					path: this.path,
					length: e.length
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
