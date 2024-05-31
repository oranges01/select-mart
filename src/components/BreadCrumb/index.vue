<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { useRouter } from 'vue-router';

// 获取路由信息
const { currentRoute } = useRouter();

// 定义面包屑数据
const breadcrumbItems = ref<RouteLocationNormalizedLoaded['matched']>([]);

// 监听当前路由变化
watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    // route.matched 保存着路由记录
    breadcrumbItems.value = route.matched.filter(r => r.meta && r.meta.title);
    console.log(currentRoute.value);
  },
  { immediate: true }
);
</script>

<template>
  <div class="bread-container">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="item in breadcrumbItems"
          :key="item.path"
          :to="{ path: item.path }"
          class="breadcrumb-item"
        >
          {{ item.meta.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss">
.bread-container {
  padding: 25px 0;
}
</style>
