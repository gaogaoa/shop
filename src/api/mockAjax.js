//这个文件主要是对axios进行每次封装，让axios封装后发请求自带一些额外效果
//对axios进行二次封装发送任意的请求都能达到最终以下目的
// 配置基础路径和超时限制
// 添加进度条信息  nprogress
// 返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
// 统一处理请求错误, 具体请求也可以选择处理或不处理

import axios from 'axios'
import NProgress from 'nprogress' //默认找的就是nprogress.js
import 'nprogress/nprogress.css'

//axios.create()用来创建一个新的axios实例，它可以和本来的axios具有同样的功能
//都可以去发请求
const service = axios.create({
  baseURL: '/mock',  //基础路径, 可以理解是所有的接口路径公共的部分
  timeout: 20000, //超时时间 20秒还是没有请求成功，就报timeout
})
//请求拦截器和响应拦截器
//给axios添加额外的功能或者修改对应的请求头
//请求拦截器

service.interceptors.request.use(
  (config)=>{
    //请求拦截器成功的回调
    //我们一般在这要么是给请求头添加信息，要么就是添加额外的功能
    //config 其实就是请求报文
    NProgress.start() //启动进度条
    return config
  },
  // ()=>{
  // }
);

//响应拦截器
service.interceptors.response.use(
  (response) => {
    //拦截的响应成功的回调
    NProgress.done()//停止进度条
    return response.data  //代表相映成功以后，直接返给前台用户的就是相应的数据。省的还得写.data
  },
  (error) =>{
    //拦截的响应失败的回调
    NProgress.done()
    //发请求失败，统一处理
    alert('发送ajax请求失败' + error.message || '未知错误')
    
    //错误需不需要后面还能继续处理，关键看这里怎么写
    //如果想继续后面可以处理这个错误
    // return Promise.reject(new Error('发送ajax请求失败'))
    //如果后面不再对这个错误进行处理
    return new Promise(() => {}) //中断promise链
  }
);

export default service  //暴露我们封装好的axios实例，后面去发请求使用



