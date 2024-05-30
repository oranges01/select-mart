<script lang="ts" setup>
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import { useCategoryStore } from '@/store/categoryStore'
import { onMounted } from 'vue'

// 初始化categoryStore
const categoryStore = useCategoryStore()
onMounted(() => {
  categoryStore.getCategoryList()
})


</script>

<template>
  <div>
    <LayoutFixed></LayoutFixed>
    <LayoutNav></LayoutNav>
    <LayoutHeader></LayoutHeader>
    <RouterView />
    <LayoutFooter></LayoutFooter>
  </div>
</template>