<template>
  <!-- 提交订单界面 -->
  <div class="bx">
    <!-- 顶部导航 -->
    <van-nav-bar title="订单确认" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 商品详情 -->
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
    >
      <div slot="footer">
        <van-button size="mini">-</van-button>
        <van-button size="mini">+</van-button>
      </div>
    </van-card>

    <!-- 地址详情 -->
    <van-cell title="地址详情：" size="large" :label="adresslable" />
    <!-- 优惠劵使用区 -->
    <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />

    <van-popup v-model="showList" position="bottom">
      <van-coupon-list
        :show-exchange-bar="false"
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @change="onChange"
      />
    </van-popup>
    <!-- 底部提交订单 -->
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      adresslable: "四川省成都市天河路核能橙中心1501",
      coupons: [
        {
          available: 1,
          condition: "无使用门槛\n最多优惠12元",
          reason: "",
          value: 1050, //实际传参
          name: "优惠券名称",
          startAt: 1489104000,
          endAt: 1514592000,
          valueDesc: "10.5", //显示金额
          unitDesc: "元"
        },
        {
          available: 2,
          condition: "无使用门槛\n最多优惠12元",
          reason: "",
          value: 2050, //实际传参
          name: "优惠券名称",
          startAt: 1489104000,
          endAt: 1514592000,
          valueDesc: "20.5", //显示金额
          unitDesc: "元"
        }
      ],
      chosenCoupon: -1,
      showList: true,
    };
  },
  methods: {
    /*
     **  @description 优惠劵改变的按钮
     **  @param {}
     **  @return
     **  @author shipingan
     */
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },

    /*
     **  @description 提交订单的按钮
     **  @param {}
     **  @return
     **  @author shipingan
     */
    onSubmit() {},
    /*
     **  @description 导航返回按钮
     **  @param {}
     **  @return
     **  @author shipingan
     */
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.bx {
  .van-cell__title {
    text-align: left;
  }
}
</style>