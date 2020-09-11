<template>
	<view class="catalog" @touchmove.stop.prevent="" v-if="isShow">
		<view class="mask" @tap="hide" :style="{opacity: opac}"></view>
		<view class="popup" :style="{'background-color': skinColor.menuBgColor, transform: 'translateX(' + lateY + ')'}">
			<block v-if="catalog.length > 0">
				<view class="title" :style="{color: skinColor.titleColor}">
					章节目录
				</view>
				<scroll-view class="scroll-view" scroll-y="true" >
					<view class="list actived" v-for="(item, index) in catalog" :key='index' :style="{color: skinColor.menuTitleColor}" @tap="selectCatalog(item.index)">
						{{item.title}}
					</view>
				</scroll-view>
			</block>
			<view class="scroll-view" v-else>
				<view class="nocata" :style="{color: skinColor.menuTitleColor}">
					暂无章节目录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { skinMixin } from '@/common/mixin/index.js'
	export default {
		mixins: [skinMixin],
		props: {
			catalog: {
				type: Array,
				default () {
					return new Array();
				}
			}
		},
		data () {
			return {
				isShow: false,
				lateY: '-100%',
				opac: 0
			}
		},
		methods: {
			show () {
				this.isShow = true;
				setTimeout(() => {
					this.lateY = 0;
					this.opac = 0.4;
				}, 50)
			},
			hide () {
				this.lateY = '-100%';
				this.opac = 0;
				setTimeout(() => {
					this.isShow = false;
				}, 300)
			},
			//跳往章节
			selectCatalog (index) {
				this.$emit('selectCatalog', index);
			}
		}
	}
</script>

<style scoped>
	.catalog {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #000000;
		transition: opacity .3s;
	}
	.popup {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 400rpx;
		display: flex;
		flex-direction: column;
		transition: transform .3s;
	}
	.title {
		padding: 40rpx 10rpx;
		font-size: 35rpx;
	}
	.scroll-view {
		flex: 1;
		overflow: hidden;
	}
	.list {
		padding: 15rpx 10rpx;
		font-size: 28rpx;
	}
	.nocata {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
	}
</style>
