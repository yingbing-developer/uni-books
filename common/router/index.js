import Vue from 'vue'

import Router, { Route } from './router.js';

const guard = new Router()

Vue.prototype.$Router = guard;//挂载$Router路由跳转

Vue.prototype.$Route = new Route();//挂载$Route路由参数

/**
 * 截取url最后一个斜杠后的内容用于判断是哪个页面
 * @param {String} path 页面路径 
*/
function pathCutLast (path) {
	return path.split('/')[1];
}

/**
 * 路由前置守卫
*/
guard.beforeEach((to, from, next) => {
  next();
});


/**
 * 路由后置守卫
*/
guard.afterEach((to, from) => {
});


/**
 * 报错钩子
*/
guard.onError((errMsg) => {
    console.log('my route-guards error: ' + errMsg);
});