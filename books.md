#使用须知

* 1、请直接下载本项目导入hbuilderX运行，我用的是2.8.8版本
* 2、这个项目只支持android app端,因为没有会IOS的同事，且没有苹果手机
* 3、请注意压缩包中有个android文件夹，里面放的是原生插件，分别是读取txt文件内容和读取文件列表的插件
* 4、请注意压缩包中的原生插件，只是普通的java文件，不是打包好的插件，只能用离线打包的方式使用，需要下载官方的离线SDK包，使用方法见这个帖子:
* [uniapp直接调用安卓自定义方法](https://ask.dcloud.net.cn/article/36065)
* 5、如果只是想体验下的朋友，可以直接运行使用，项目中有为了调试而写的方法，只是性能不如原生插件，只能调试用，直接去/pages/read/index.vue和/pages/search/index.nvue文件下修改方法就行，都是注释好了的
* 6、翻页只实现了左右翻页，且没有动画效果
* 7、本人对nvue的list组件做了算不上优化的优化，让list组件只会渲染看得见的部分，其余部分不会渲染，如果滑动过快，会看到空白部分。做这个优化，是因为，在测试时，列表渲染800条数据时，会造成一些地方的明显卡顿，但列表本身的滚动不会卡顿，我不知道这个是不是我使用方法不对的原因
* 8、首页的拖曳菜单，效果不是很好，有些bug，小弟能力有限，只能写成这样，期望有大佬能告知更好的实现方法
* 9、除了阅读页是vue外，其余页面都是nvue


* 需要修改的2个方法
```javascript
getFileSystem (ff) {
	let fd = ff && ff != null && plus.android.invoke(ff, 'exists') ? ff : environment.getExternalStorageDirectory();
	this.updatePath(plus.android.invoke(fd, 'getPath'));
	
	//获取文件列表 正式用
	let GetFileList = plus.android.importClass('com.itstudy.io.GetFileList');
	let getFile = new GetFileList();
	let str = getFile.getFiles(plus.android.invoke(fd, 'getPath'));
	let list = str.split('::');
	let folder = JSON.parse(JSON.parse(JSON.stringify(list[0])));
	let file = JSON.parse(JSON.parse(JSON.stringify(list[1])));
	
	
	//获取文件列表 调试用
	// let list = plus.android.invoke(fd, "listFiles");
	// let len = list ? list.length : 0;
	// let file = [];
	// let folder = [];
	// for(let i=0; i<len; i++){
	//     // 过滤隐藏文件  
	//     if ( !plus.android.invoke(list[i],"isHidden") ){
	// 		let name = plus.android.invoke(list[i], 'getName');
	// 		if ( plus.android.invoke(list[i],"isDirectory") ){
	// 			folder.push({
	// 				name: name,
	// 				type: 'folder',
	// 				size: '0B',
	// 				time: dateFormat(plus.android.invoke(list[i],"lastModified")),
	// 				createTime: plus.android.invoke(list[i],"lastModified"),
	// 				path: plus.android.invoke(list[i],"getPath")
	// 			})
	// 		    // 文件夹
	// 		} else{
	// 			//是否是txt文件
	// 		    if ( plus.android.invoke(name, "endsWith", '.txt') ) {
	// 		    	file.push({
	// 					name: name,
	// 					type: suffix(name),
	// 					size: this.readFileSize(list[i]),
	// 					time: dateFormat(plus.android.invoke(list[i],"lastModified")),
	// 					createTime: plus.android.invoke(list[i],"lastModified"),
	// 					path: plus.android.invoke(list[i],"getPath")
	// 				})
	// 		    }
	// 		}  
	//     }
	// }
	
	file.sort((a, b) => {
		return b.createTime - a.createTime;
	})
	this.fileLength = file.length;
	this.list = folder.concat(file);
	this.checkes = [];
}

```

```javascript

//获取内容 调试用
// getContent () {
// 	plus.io.resolveLocalFileSystemURL('file://' + this.domProp.path, ( entry ) => {
// 		entry.file( ( file ) => {
// 			let reader = new plus.io.FileReader();
// 			reader.onloadend = ( e ) => {
// 				plus.nativeUI.closeWaiting();
// 				this.bookContent = e.target.result;
// 				this.updateLength();
// 				this.nowIndex[0] = this.domProp.record;
// 				this.setNowPage();
// 				this.getCatalog();
// 			};
// 			reader.readAsText( file, 'gb2312' );
// 		}, ( fail ) => {
// 			console.log("Request file system failed: " + fail.message);
// 		});
// 	}, ( fail ) => {
// 		console.log( "Request file system failed: " + fail.message );
// 	});
// }

//获取内容 正式用
getContent () {
	const contentBox = document.getElementById('contentBox');
	let ReadTxt = plus.android.importClass('com.itstudy.io.GetText');
	let readTxt = new ReadTxt();
	this.bookContent = readTxt.getTextFromText(plus.io.convertLocalFileSystemURL(this.domProp.path));
	plus.nativeUI.closeWaiting();
	this.updateLength();
	this.nowIndex[0] = this.domProp.record;
	this.setNowPage();
	this.getCatalog();
}

```

#开发不易,麻烦各位帅哥、美女行行好给个好评吧!!!