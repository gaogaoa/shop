import Vue from 'vue'
import VueRouter  from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

Vue.use(VueRouter)

let shoprouter =[
    {path:'/home',
    component:Home
},
    {path:'/login',
    component:Login,
    meta:{
        isyincang:true
    }
},
    {path:'/register',
    component:Register,
    meta:{
        isyincang:true
    }
},
    {path:'/search/:bro?',
    component:Search,
    name:'search',
    //函数写法  传params参数和query参数
    //props: (route)=>({keyword1:route.params.bro, keyword2: route.query.bro1 })
    //布尔写法 传params参数
    //props:true
    //传静态数据,对象写法
    //props:{"qq":"我爱杨幂"}
},
{
    path:'/',
    redirect:'/home'
}
]

let router = new VueRouter({
    routes:shoprouter
})
export default router