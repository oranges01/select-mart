import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi } from '@/api/user'
import { useCartStore } from './cartStore'
import { mergeCartApi } from '@/api/cart'
export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  // 1. 定义管理用户数据的state
  const userInfo = ref({} as any)
  // 2. 定义获取接口数据的action函数
  const getUserInfo = async (account: string, password: string) => {
    const res = await loginApi(account, password)
    userInfo.value = res.result

    // 合并购物车的操作 --- 把非登录状态下的购物车（二本地存储）合并到登录状态下的购物车（服务器上）
    await mergeCartApi(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateNewList()
  }

  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    // 执行清除购物车的action
    cartStore.clearCart()
  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, 
{
  persist: true,
})