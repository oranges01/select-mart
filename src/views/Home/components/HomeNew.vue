<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HomePanel from './HomePanel.vue'
import { getNewApi } from '@/api/home'

onMounted(() => {
  getNewList()
})

const newList = ref([] as any[])
const getNewList = async () => {
  const res = await getNewApi()
  newList.value = res.result
}

</script>

<template>
   <HomePanel title="优选集萃" sub-title="精心甄选 品质卓越">
    <!-- HomePanel组件的插槽，用于显示数据 -->
    <ul class="goods-list">
      <li v-for="item in newList" :key="item.id">
        <RouterLink :to="`/detail/${item.id}`">
          <img :src="item.picture" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>


</template>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}


</style>