<template>
  <div class="bx">
    <van-row>
      <van-col span="18">
        <van-cell-group>
          <van-field
            v-model="value"
            placeholder="请输入收索内容"
            :clearable="true"
            left-icon="search"
            border
          />
        </van-cell-group>
      </van-col>
      <van-col span="4" offset="2" class="text-right">
        <van-tabbar :fixed="false">
          <van-tabbar-item icon="chat-o"></van-tabbar-item>
        </van-tabbar>
      </van-col>
    </van-row>
    <div class="list-bx">
      <div>
        <van-grid square>
          <van-grid-item
            v-for="(itme,index) in options"
            :key="index"
            :icon="itme.icon"
            :text="itme.title"
          />
        </van-grid>
      </div>
      <h5>今日推荐</h5>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index" @click="gotoquery(item)">
          <van-image width="100%" :src="item.url" />
          <p>
            <span>{{item.name}}</span>
            <span>{{item.price}}</span>
          </p>
        </van-cell>
      </van-list>
      <div>
        <van-tabbar v-model="active" route="">
          <van-tabbar-item icon="home-o" url="menusbar">首页</van-tabbar-item>
          <van-tabbar-item icon="search">收索</van-tabbar-item>
          <van-tabbar-item icon="friends-o">人脉</van-tabbar-item>
          <van-tabbar-item icon="setting-o">会员中心</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
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
          url: "https://img.yzcdn.cn/vant/apple-5.jpg",
          name: "尿不湿",
          price: "99",
          id: 5
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-6.jpg",
          name: "尿不湿",
          price: "99",
          id: 6
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-7.jpg",
          name: "尿不湿",
          price: "99",
          id: 7
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-8.jpg",
          name: "尿不湿",
          price: "99",
          id: 8
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-4.jpg",
          name: "尿不湿",
          price: "99",
          id: 9
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-7.jpg",
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
      titlename: "", //接受路由传参待使用
      value: "", //收索框绑定数据
      options: [
        { title: "花王", url: "huawang", icon: "gift-o" },
        { title: "贝因美", url: "huawang", icon: "fire-o" },
        { title: "宜婴", url: "huawang", icon: "coupon-o" },
        { title: "大王", url: "huawang", icon: "bag-o" },
        { title: "趣多多", url: "huawang", icon: "gem-o" },
        { title: "衣服", url: "huawang", icon: "service-o" },
        { title: "日常用品", url: "huawang", icon: "diamond-o" },
        { title: "玩具", url: "huawang", icon: "smile-comment-o" }
      ]
    };
  },
  created() {
    this.getrouterquery();
  },
  methods: {
    getrouterquery() {
      this.titlename = this.$route.query.name;
    },
    onLoad() {
      if (this.list.length >= this.list.length) {
        this.loading = false;
        this.finished = true;
      }
    },
    gotoquery(val) {
      let url = "/commodityquery";
      let query = {
        id: val.id,
        name: val.name
      };
      this.$router.push({ path: url, query: query });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    gotohome(){
      this.$router.push("menusbar")
    }

  }
};
</script>
<style lang="less" scoped>
.bx {
  height: 100%;
  box-sizing: border-box;
  .van-row {
    width: 100%;
    margin-bottom: 10px;
    .van-field {
      height: 40px;
    }
    .van-tabbar {
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }
  }
  .list-bx {
    height: calc(100vh - 50px);
    overflow: auto;
    .van-tabbar{
      background-color: rgb(248, 132, 97);
    }
    .van-list{
      margin-bottom: 40px;
      .van-cell{
        margin-bottom: 10px;
      }
    }
  }
}
</style>