
import {getitem} from '@/api'
//存储数据的地方
const state = {
    detailinfo:{}, //初始化状态数据
}
//直接改变数据的地方
const mutations = {
    RECEIVE_DETAILINFO(state,detailinfo){
        state.detailinfo = detailinfo
      }
}
//和vue组件用户交互、通知mutation修改数据
//action对象当中的方法，就是vue和vuex交互的桥梁  后期是在vue当中 dispatch
const actions = {
    async getdetailinfo({commit},sukid){
        //发请求      
        const result = await getitem(sukid)
       
        if(result.code === 200){
          commit('RECEIVE_DETAILINFO',result.data)
        }
      },
}
//getters是为了简化数据的操作而出现的，请求回来的数据，有点复杂，我们可以通过这个额简化
const getters = {
    spuSaleAttrList(state){
        return state.detailinfo.spuSaleAttrList || []
    },
    categoryView(state){
        return state.detailinfo.categoryView || {}
      },
      // 数据没回来之前，state.goodsDetailInfo是一个空对象，那么计算出来的skuInfo就是undefined
      // undefined被捞到vue当中就很可能出问题，所以我们必须避免出现undefined，因此|| {}
      skuInfo(state){
        return state.detailinfo.skuInfo || {}
      },
}

export default {
    state,
    mutations,
    actions,
    getters
  }