<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import GoodsItem from '@/views/Home/components/GoodsItem.vue'
import { getCategoryFilterApi, getSubCategoryApi } from '@/api/category'

onMounted(() => {
  getCategoryFilter()
  getGoodList()
})

// 获取当前路由跳转的二级分类id
const route = useRoute()
const subCategoryId = ref(route.params.id)

// 获取二级分类的列表数据
const categoryFilter = ref({} as any)
const getCategoryFilter = async () => {
  const res = await getCategoryFilterApi(subCategoryId.value)
  categoryFilter.value = res.result
}

// 获取商品列表数据
const goodList = ref([] as any[])
const reqData = ref({
  categoryId: subCategoryId.value,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
  
const getGoodList = async () => {
  const res = await getSubCategoryApi(reqData.value)
  goodList.value = res.result.items
}

// tab切换回调
const tabChange = () => {
  reqData.value.page = 1
  getGoodList()
}


// 无限加载实现
// > 基础思路
// > 1. 触底条件满足之后 page++，拉取下一页数据
// > 2. 新老数据做数组拼接
// > 3. 判断是否已经全部加载完毕，停止监听

// 加载更多
const disabled = ref(false)
const loadMore = async () => {
  // 触底条件满足之后 page++，拉取下一页数据
  reqData.value.page++
  const res = await getSubCategoryApi(reqData.value)
  // 新老数据做数组拼接
  goodList.value = [...goodList.value, ...res.result.items]
  // 加载完毕 停止监听
  if (res.result.items.length === 0) {
    disabled.value = true
  }
}


</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item  :to="{ path: `/category/${categoryFilter.parentId}` }">{{ categoryFilter.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryFilter.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-click="tabChange" >
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="loadMore" :infinite-scroll-disabled="disabled">
         <!-- 商品列表-->
        <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id" />

      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>