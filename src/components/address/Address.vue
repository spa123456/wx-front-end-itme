<template>
  <div class="bx">
    <p v-if="!addresslistdata">请添加地址</p>
    <van-address-list
      v-model="chosenAddressId"
      :list="addresslist"
      @add="onAdd"
      @edit="onEdit"
      v-if="!flag"
    >
      <van-button type="primary" @click="paymoney()" v-if="addresslistdata">确定选择</van-button>
      <van-button type="primary" disabled @click="paymoney()" v-if="!addresslistdata">确定选择</van-button>
    </van-address-list>

    <van-nav-bar title="地址编辑" left-text="返回" left-arrow v-if="flag" @click-left="onClickLeft" />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :address-info="addressjson"
      @save="onSave"
      v-if="flag"
    />
  </div>
</template>
<script>
import arealist from "./arealist";
export default {
  data() {
    return {
      chosenAddressId: "1", //当前选中的地址列表ID
      addresslist: [
        //地址列表数据展示
      ],
      addresslistdata: true, //判断是否有数据
      areaList: arealist, //地区列表----引入的arealist.js文件
      flag: false, //显示或隐藏  地址列表 或者是添加地址 界面
      addressjson: {
        //存放准备传参的地址对象
        id: "",
        name: "",
        address: "",
        tel: "",
        areaCode: "", //区域编码
        isDefault: false, //默认选择项
        addressDetail: "", //详情地址
        postalCode: "" //邮政编码
      }
    };
  },
  created() {
    this.addresslist == ""
      ? (this.addresslistdata = false)
      : (this.addresslistdata = true);
  },
  updated() {
    this.addresslist == ""
      ? (this.addresslistdata = false)
      : (this.addresslistdata = true);
  },
  methods: {
    /*
     **  @description 添加地址促发的按钮
     **  @param {}
     **  @return
     **  @author shipingan
     */
    onAdd() {
      this.flag = true;
    },
    /*
     **  @description 编辑地址促发的按钮
     **  @param {}
     **  @return
     **  @author shipingan
     */
    onEdit(item, index) {
      this.addressjson = this.addresslist[index];
      this.flag = true;
    },
    /*
     **  @description 保存地址的回调函数
     **  @param {}
     **  @return
     **  @author shipingan
     */
    onSave(item) {
      //把编辑的地址创建到addresslist列表中
      //  判断 addressjson中有没有ID，如果有则为编辑界面，没有则为添加界面
      //  有则使用，无则随机生成一个ID但是不能与addresslist中的ID重复（限制地址数量）
      //------------判断是不是编辑跳转进来的
      if (this.addressjson.id != "") {
        let newaddress = {
          id: this.addressjson.id,
          name: item.name,
          tel: item.tel,
          address: item.city + item.province + item.county + item.addressDetail, //地址详情
          areaCode: item.areaCode, //区域编码
          isDefault: item.isDefault, //默认选择项
          addressDetail: item.addressDetail,
          postalCode: item.postalCode //邮政编码
        };
        this.addresslist.map((res,index) => {
          if (res.id == this.addressjson.id) {
            this.addresslist[index] = newaddress;
            this.chosenAddressId = this.addressjson.id;
            return;
          }
        });
      } else {
        //新建的地址逻辑
        let ramID = 1;
        this.addresslist.map(res => {
          //新建的此方法
          if (ramID == res.id) {
            ramID++;
          } else {
            return ramID;
          }
        });

        if (ramID > 3) {
          this.$toast("地址数量过多,请选择地址修改");
        } else {
          let newaddress = {
            id: ramID,
            name: item.name,
            tel: item.tel,
            address:
              item.city + item.province + item.county + item.addressDetail, //地址详情
            areaCode: item.areaCode, //区域编码
            isDefault: item.isDefault, //默认选择项
            addressDetail: item.addressDetail,
            postalCode: item.postalCode //邮政编码
          };
          this.addresslist.push(newaddress);
        }
        this.chosenAddressId = ramID;
      }

      this.flag = false;
    },

    /*
     **  @description 点击新增地址的返回按钮促发
     **  @param {}
     **  @return
     **  @author shipingan
     */
    onClickLeft() {
      this.flag = false;
    },
    /*
     **  @description 点击确认支付按钮促发
     **  @param {}  此处应该是传参，目前尚未传参
     **  @return
     **  @author shipingan
     */
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