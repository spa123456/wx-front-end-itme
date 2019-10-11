<template>
  <div class="bx">
    <van-address-list
      v-model="chosenAddressId"
      :list="addresslist"
      @add="onAdd"
      @edit="onEdit"
      v-if="!flag"
    >
      <van-button type="primary" @click="paymoney()">确定选择</van-button>
    </van-address-list>

    <van-nav-bar title="地址编辑" left-text="返回" left-arrow v-if="flag" @click-left="onClickLeft" />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      v-if="flag"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      chosenAddressId: "1",
      addresslist: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号"
        }
      ],
      areaList: {}, //地区列表
      searchResult: [], //详细地址搜索结果
      flag: false
    };
  },

  methods: {
    onAdd() {
      console.log("添加");
      this.flag = true;
    },

    onEdit(item, index) {
      console.log("编辑" + index);
    },
    /*
     **  @description 保存地址的回调函数
     **  @param {}
     **  @return
     **  @author shipingan
     */
    onSave() {
      console.log("aaa");
    },
    onDelete() {},
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    },
    onClickLeft() {
      this.flag = false;
    },
    // 点击地址确认后就跳转到支付界面
    paymoney() {
      this.$router.push("commodityquery");
    }
  }
};
</script>

<style lang="less" scoped>
.bx {
  height: calc(100vh - 20px);
  .van-address-list {
    padding: 0;
    .van-button {
      margin-top: 20px;
      width: 100%;
    }
  }
  .van-nav-bar {
    margin-bottom: 40px;
  }
}
</style>