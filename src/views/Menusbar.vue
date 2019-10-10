<template>
  <div class="bx">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" width="100%" height="auto" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="3">
      <van-grid-item v-for="(itme,index) in options" :key="index" :icon="itme.icon" :text="itme.name"  @click="gotocommoditylist(itme)"/> 
    </van-grid>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
        "https://img.yzcdn.cn/vant/apple-3.jpg",
      ],
      options:[
          {name:'商品详情',icon:'lock',url:'commoditylist'},
          {name:'娱乐放松',icon:'audio',url:'commoditylist'},
          {name:'优惠劵',icon:'graphic',url:'commoditylist'},
          {name:'个人中心',icon:'map-marked',url:'commoditylist'},
          {name:'购物车',icon:'shopping-cart-o',url:'commoditylist'},
          {name:'支付中心',icon:'alipay',url:'commoditylist'},
      ]
    };
  },
  methods:{
    gotocommoditylist(itme){
      let url = itme.url
      let params = {
        name:itme.name
      }
      this.$router.push({path:url,query:params})
    }
  }
};
</script>
<style lang="less" scoped>
.bx {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
  .van-grid{
      margin-top: 20px;
  }
}
</style> 