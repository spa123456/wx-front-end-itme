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
        <van-tabbar v-model="active" route>
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
      list: [],
      loading: false,
      finished: false,
      titlename: "", //接受路由传参待使用
      value: "", //收索框绑定数据
      options: [
        { title: "尿不湿", url: "diapers", icon: "gift-o" },
        { title: "特产", url: "specialtys", icon: "fire-o" },
        { title: "每日特惠", url: "dailyDeal", icon: "coupon-o" },
        { title: "周日狂欢", url: "CarnivalOnSunday", icon: "bag-o" },
        { title: "整点开抢", url: "integralBuy", icon: "gem-o" },
        { title: "衣服", url: "clothes", icon: "service-o" },
        { title: "日常用品", url: "dailySupplies", icon: "diamond-o" },
        { title: "玩具", url: "playthings", icon: "smile-comment-o" }
      ],
      active: ""
    };
  },
  created() {
    this.getrouterquery();
    this.gettodaylist();
  },
  methods: {
    /*
     **  @description 接受到路由传过来的判断点击哪个按钮
     **  @param {}
     **  @return
     **  @author shipingan
     */
    getrouterquery() {
      this.titlename = this.$route.query.name;
      console.log(this.titlename);
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
        filename:val.filename,
        titlename:val.name
      };
      this.$router.push({ path: url, query: query });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    gotohome() {
      this.$router.push("menusbar");
    },
    /*
     **  @description 以下是获取数据库的方法
     **  @param {}
     **  @return
     **  @author shipingan
     */
    gettodaylist() {
      this.query("diaper"); // 一。查询diapers（尿不湿）数据表中的数据
      this.query("specialty");
    },
    /*
     **  @description // 查询几个数据表，把每张表的第一条或者几条数据拿出来渲染-----------封装一个函数
     **  @param {}
     **  @return
     **  @author shipingan
     */
    query(filename) {
      this.$axios
        .post("http://127.0.0.1:3001/getdiaperlistdetalis", {
          filename: filename
        })
        .then(res => {
          //通过address查询主图展示在页面
          res.data.map((item, index) => {
            if (index <= 2) {
              this.$axios
                .post("http://127.0.0.1:3001/getmainimage", {
                  address: item.address
                })
                .then(mainres => {
                  let listarray = {
                    url: JSON.parse(mainres.data).mainimageurl[0],
                    filename: filename, //查询的哪个表
                    id: item.id, //产品在对应表中的ID
                    address: item.address, //请求图片的地址
                    name: item.name, //产品的名称
                    price: item.money //产品的价格
                  };
                  this.list.push(listarray);
                });
            }
          });
        });
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
    height: calc(100vh - 70px);
    overflow: auto;
    .van-tabbar {
      background-color: rgb(245, 228, 223);
    }
    .van-list {
      margin-bottom: 40px;
      .van-cell {
        margin-bottom: 10px;
      }
    }
  }
}
</style>