<template>
  <!-- 这里应该是全部店铺的商品详情  所以应该带有收索功能的操作界面 -->
  <div class="bx">
    <van-nav-bar
      :title="titlename"
      left-text="返回"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index">
        <van-image width="100%" :src="item.url" />
        <p>
          <span>{{item.name}}</span>
          <span>{{item.price}}</span>
        </p>
      </van-cell>
    </van-list>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
      <van-goods-action-button type="warning" text="加入购物车" @click="setshowsku" />
      <van-goods-action-button type="danger" text="立即购买" @click="setbuyshowsku"/>
    </van-goods-action>
    <!-- 加入购物车商品的弹出框 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="quota"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
      :show-add-cart-btn="false"
      buy-text="确定"
      ref="querysku"
      @buy-clicked="addsku(sku)"
    />
    <!-- 购买车商品的弹出框 -->
    <van-sku
      v-model="buyshow"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="quota"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
      :show-add-cart-btn="false"
      buy-text="确定"
      ref="querysku"
      @buy-clicked="buysku(sku)"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],//产品详情列表
      loading: false,
      finished: false,
      titlename: "",//查询产品的mingzi
      filename: "",//查询产品的数据表名
      id:'',//产品对应数据表的id

      buyshow: false,
      show: false,
      sku: {
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            k_id: "1",
            v: [
              {
                id: "1193", // skuValueId：规格值 id
                name: "红色", // skuValueName：规格值名称
                imgUrl: "https://img.yzcdn.cn/1.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "https://img.yzcdn.cn/1.jpg" // 用于预览显示的规格类目图片
              },
              {
                id: "1194",
                name: "蓝色",
                imgUrl: "https://img.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img.yzcdn.cn/2.jpg"
              }
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
          {
            k: "尺寸", // skuKeyName：规格类目名称
            k_id: "2",
            v: [
              {
                id: "1195", // skuValueId：规格值 id
                name: "1" // skuValueName：规格值名称
              },
              {
                id: "1196",
                name: "2"
              }
            ],
            k_s: "s2" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: "1", // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "1193", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1195", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 0 // 当前 sku 组合对应的库存
          },
          {
            id: "2", // skuId，下单时后端需要
            price: 200, // 价格（单位分）
            s1: "1193", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1196", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 117 // 当前 sku 组合对应的库存
          },
          {
            id: "3", // skuId，下单时后端需要
            price: 300, // 价格（单位分）
            s1: "1194", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1195", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 117 // 当前 sku 组合对应的库存
          },
          {
            id: "4", // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "1194", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1196", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 117 // 当前 sku 组合对应的库存
          }
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "留言", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "0", // 是否必填 '1' 表示必填
            placeholder: "" // 可选值，占位文本
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/2.jpg"
      },
      goodsId: "1", //商品的ID
      quota: 11, //限购数量
      quotaUsed: 1 //已购买的数量
    };
  },
  created() {
    window.scroll(0, 0);
    this.getroute();
  },

  methods: {
    onLoad() {
      if (this.list.length >= this.list.length) {
        this.loading = false;
        this.finished = true;
      }
    },
    getroute() {
      this.filename = this.$route.query.filename;
      this.id = this.$route.query.id;
      console.log(this.filename + this.id);
      
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    /*
     **  @description 设置sku显示隐藏
     **  @param {}
     **  @return
     **  @author shipingan
     */
    setshowsku() {
      this.show = true;
      // this.$router.push('sku')
    },
    setbuyshowsku(){
      this.buyshow = true;
    },
    // 加入购物车的按钮获取数据
    addsku() {
      this.show = false;
      console.log(this.$refs.querysku.getSkuData()); //使用ref串串 然后通过ref调用实例化的方法getSkuData()可以获取到数据
    },
    /*
    **  @description 购买按钮获取数据
    **  @param {} 
    **  @return 
    **  @author shipingan
    */
    buysku() {
      this.buyshow = false;
      console.log(this.$refs.querysku.getSkuData()); //使用ref串串 然后通过ref调用实例化的方法getSkuData()可以获取到数据
      this.$router.push('address')//获取地址列表
    }
  }
};
</script>
<style lang="less" scoped>
.bx {
  .van-list {
    margin-top: 46px;
    margin-bottom: 40px;
  }
}
</style>