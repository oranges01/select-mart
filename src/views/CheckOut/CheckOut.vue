<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { CheckoutType, AddressType } from "@/types/index";
import { createOrderApi, getCheckInfoApi, addAddressApi } from '@/api/checkout'
import { useCartStore } from '@/store/cartStore'
import SelectAddress from "./components/SelectAddressCode.vue";
import { ElMessage } from "element-plus";

onMounted(() => {
  getCheckInfo()
})

// 获取购物车数据
const cartStore = useCartStore()

// 获取路由对象
const router = useRouter()

// 订单对象
const checkInfo = ref<CheckoutType>({
  goods: [],
  userAddresses: [],
  summary: {
    goodsCount: 0,
    totalPrice: 0,
    totalPayPrice: 0,
    postFee: 0,
  }
})  
// 地址对象
const curAddress = ref<AddressType>({
  id: "",
  receiver: "",
  contact: "",
  fullLocation: "",
  address: "",
  isDefault: 0
}) 

// 获取订单信息
const getCheckInfo = async () => {
  const res = await getCheckInfoApi()
  checkInfo.value = res.result

  // 适配默认地址
  curAddress.value = checkInfo.value.userAddresses.find(item => item.isDefault === 0) || checkInfo.value.userAddresses[0]
}

// 控制切换地址弹窗
const showDialog = ref(false)
// 切换地址
const activeAddress = ref<AddressType>()
const switchAddress = (item : AddressType) => {
  activeAddress.value = item
}
// 确认切换地址
const confirm = () => {
  curAddress.value = activeAddress.value || {} as AddressType
  showDialog.value = false
  activeAddress.value = {} as AddressType
}

// 控制添加地址弹窗
const addFlag = ref(false)
const addressForm = reactive({
  receiver: '',
  contact: '',
  address: {
    province: '', 
    city: '',
    area: '',
    detail: '',
  },
  postalCode: '',
  addressTags: "",
  isDefault: null,
  fullLocation: ''
})
// 
const code = reactive({
  provinceCode:'', 
  cityCode: '', 
  areaCode: ''  
})

const handleChange = (obj: any) => {
  if (obj.flag == 1) {
    addressForm.address.city = ''
    addressForm.address.area = ''
  } else if (obj.flag == 2){
    addressForm.address.area = ''
  } else {
    // addressForm.address.detail = ''
  }
  code.provinceCode = obj.provinceCode
  code.cityCode = obj.cityCode
  code.areaCode = obj.areaCode
}


// 确认收货地址
const confirmAdd = async () => {
  const res = await addAddressApi({
    receiver: addressForm.receiver,
    contact: addressForm.contact,
    provinceCode: code.provinceCode,
    cityCode: code.cityCode,
    countyCode: code.areaCode,
    address: addressForm.address.detail,
    postalCode: addressForm.postalCode,
    addressTags: addressForm.addressTags,
    isDefault: addressForm.isDefault,
    fullLocation: `${addressForm.address.province}` +" "+ `${addressForm.address.city}` + " "+ `${addressForm.address.area}` + " "+ `${addressForm.address.detail}`
  })
  if (res.msg == "操作成功") {
    ElMessage.success("添加地址成功")
    // 更新地址数组
    getCheckInfo()
  }
  addFlag.value = false
}


// 配送时间
const deliveryTimeOptions = ref([
  {1:'不限送货时间：周一至周日'},
  {2: '工作日送货：周一至周五'},
  {3:'双休日、假日送货：周六至周日'},  
])
const selectedDeliveryTimeOption = ref<number>(0)
const selectDeliveryTimeOption = (index: number) => {
  selectedDeliveryTimeOption.value = index;
}


// 创建订单
const createOrder = async () => {
  const res = await createOrderApi({
    deliveryTimeType: 1 + selectedDeliveryTimeOption.value,
    payType: 1,
    payChannel: 1,
    buyerMessage: '',
    goods: checkInfo.value.goods.map(item => {
      return {
        skuId: item.skuId,
        count: item.count
      }
    }),
    addressId: curAddress.value.id
  })
  const orderId = res.result.id
  router.push({
    path: '/pay',
    query: {
      id: orderId
    }
  })
  // 更新购物车
  cartStore.updateNewList()
}




</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i />货<i />人：</span>{{ curAddress.receiver }}</li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li><span>收货地址：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">切换地址</el-button>
              <el-button size="large" @click="addFlag = true">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.price }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a v-for="(option, index) in deliveryTimeOptions" :key="index" :class="['my-btn', { active: selectedDeliveryTimeOption === index }]"
            href="javascript:;"
            @click="selectDeliveryTimeOption(index)"
          >
            {{ Object.values(option)[0] }}
          </a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="createOrder" >提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
    <div class="addressWrapper">
      <div class="text item" :class="{ active: activeAddress?.id === item.id }" 
  @click="switchAddress(item)" v-for="item in checkInfo.userAddresses" :key="item.id">
        <ul>
        <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
        <li><span>联系方式：</span>{{ item.contact }}</li>
        <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 添加地址 -->
  <el-dialog v-model="addFlag" title="添加收货地址" width="60%" center>
    <div class="addressWrapper">
      <el-form :model="addressForm" label-width="120px">
        <el-form-item label="收货人姓名">
          <el-input v-model="addressForm.receiver" />
        </el-form-item>
        <el-form-item label="收货人联系方式">
          <el-input v-model="addressForm.contact" />
        </el-form-item>
        <el-form-item  class="address-item" :model="addressForm.address" label="收货地址">
          <SelectAddress :form="addressForm.address" @change="handleChange"></SelectAddress>
        </el-form-item>
        <el-form-item label="收货人邮政编码">
          <el-input v-model="addressForm.postalCode" />
        </el-form-item>
        <el-form-item label="地址标签">
          <el-input v-model="addressForm.addressTags" />
        </el-form-item>
        <el-form-item label="是否默认地址" for="isDefault">
          <el-radio-group v-model="addressForm.isDefault" id="isDefault" aria-labelledby="isDefaultLabel">
            <el-radio value="0">是</el-radio>
            <el-radio value="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addFlag = false">取消</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}

.address-item {
  display: flex;
  align-items: center;
}
</style>
