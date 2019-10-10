<template>
  <div class="bx">
    <van-nav-bar
      :title="titlename"
      left-text="返回"
      left-arrow
      :fixed=true
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
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          url: "https://img.yzcdn.cn/vant/apple-1.jpg",
          name: "尿不湿",
          price: "99",
          id: 1
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-2.jpg",
          name: "尿不湿",
          price: "99",
          id: 2
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-3.jpg",
          name: "尿不湿",
          price: "99",
          id: 3
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-4.jpg",
          name: "尿不湿",
          price: "99",
          id: 4
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-2.jpg",
          name: "尿不湿",
          price: "99",
          id: 5
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-3.jpg",
          name: "尿不湿",
          price: "99",
          id: 6
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-8.jpg",
          name: "尿不湿",
          price: "99",
          id: 7
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-2.jpg",
          name: "尿不湿",
          price: "99",
          id: 8
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-6.jpg",
          name: "尿不湿",
          price: "99",
          id: 9
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-3.jpg",
          name: "尿不湿",
          price: "99",
          id: 10
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-3.jpg",
          name: "尿不湿",
          price: "99",
          id: 11
        }
      ],
      loading: false,
      finished: false,
      titlename:''
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
    //   console.log(this.$route.query.id);
      this.titlename = this.$route.query.name
    },
    onClickLeft(){
        this.$router.go(-1)
    }
  }
};
</script>