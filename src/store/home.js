
import {reqCategoryList,reqBanners,reqFloors} from '@/api'
//存储数据的地方
const state = {
    categoryList:[], //初始化状态数据
    bannerList: [],
    flootList:[],
}
//直接改变数据的地方
const mutations = {
    RECEIVE_CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
      },
      RECEIVE_BANNERLIST(state,bannerList){
        state.bannerList = bannerList
      },
      RECEIVE_FLOOTLIST(state,flootList){
        state.flootList = flootList
      },
}
//和vue组件用户交互、通知mutation修改数据
//action对象当中的方法，就是vue和vuex交互的桥梁  后期是在vue当中 dispatch
const actions = {
    async getCategoryList({commit}){
        //发请求      
       
        const result = await reqCategoryList()
       
        if(result.code === 200){
          commit('RECEIVE_CATEGORYLIST',result.data)
        }
      },
      // async getBannerList({commit}){
      //   //发请求      
      //   const result = await bannerList()
      //   //console.log(result);
      //   if(result.code === 200){
      //       //console.log(result.data);
      //       commit('RECEIVE_BANNERLIST',result.data)
      //   }
      // },
      // async getFlootList({commit}){
      //   //发请求      
      //   const result = await floorList()
      //   if(result.code === 200){
      //       commit('RECEIVE_FLOOTLIST',result.data)
      //   }
      // }

            async getBannerList({commit}){
        //发请求      
        const result = await reqBanners()
        if(result.code === 200){
            //console.log(result.data);
            commit('RECEIVE_BANNERLIST',result.data)
        }
      },
      async getFlootList({commit}){
        //发请求      
        const result = await reqFloors()
        if(result.code === 200){
            commit('RECEIVE_FLOOTLIST',result.data)
        }
      }
}
//getters是为了简化数据的操作而出现的，请求回来的数据，有点复杂，我们可以通过这个额简化
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
  }