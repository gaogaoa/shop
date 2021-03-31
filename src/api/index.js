//这个文件是所有的接口请求函数
//每个函数，里面都是通过axios往对应的接口发请求的
//以后，你想要哪个数据，就调用对应的这个接口请求函数就ok
//一共是多少个接口，就对应有多少个接口请求函数
import  Ajax  from './ajax'
import mockAjax from './mockAjax'

export const reqCategoryList =()=>{
    return Ajax({
        url: '/product/getBaseCategoryList',
        method:'get'
    })
}
///api/list
export const getGoodsObj =(goodsparams)=>{
    return Ajax({
        url: '/list',
        method:'post',
        data: goodsparams
    })
}


// export const bannerList =()=>{
//     return Ajax({
//         url: '/product/banner',
//         method:'get'
//     })
// }



// export const floorList =()=>{
//     return Ajax({
//         url: '/product/floor',
//         method:'get'
//     })
// }


// 获取广告轮播列表
export const reqBanners=()=> mockAjax.get('/banner')

// 获取首页楼层列表
export const reqFloors=()=> mockAjax.get('/floor')