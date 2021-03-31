<template lang="">
                    <!--banner轮播-->
                    <div class="swiper-container" >
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="banner in  BannerList" :key="banner.id">
                                <img :src="banner.imgUrl" />
                            </div>
                        </div>
                        <!-- 如果需要分页器 -->
                        <div class="swiper-pagination"></div>
                        <!-- 如果需要导航按钮 -->
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                          <!-- 如果需要滚动条 -->
            <div class="swiper-scrollbar"></div>
                    </div>
</template>
<script>
import Swiper from "swiper/js/swiper";
export default {
    name:'slideshow',
    props:['BannerList'],
    watch:{
        BannerList:{
        immediate: true,
        handler(){
        //监视bannerList数据是不是请求回来了（0-4）、
        //直接new不行，虽然我们把数据拿回来了，但是上面的结构是通过vfor遍历数据动态创建div结构，也需要时间
        this.$nextTick(() => {
        //等待页面最近的一次更新完成之后自动调用
        //通常用在当数据更新后需要做一些操作，而这些操作又需要等待页面更新完成才有效，此时就要用nextTick      
        var mySwiper = new Swiper ('.swiper-container', {
            //direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            
            // 如果需要分页器
            pagination: {
            el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            },
            
            // 如果需要滚动条
            scrollbar: {
            el: '.swiper-scrollbar',
            },
        })  
          
        });
            },
            
        }
    }
}
</script>
<style lang="">
    
</style>