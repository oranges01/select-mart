import request from '@/utils/request'

// 加入购物车
export const insertCartApi = (skuId: string, count: number) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

// 获取最新的购物车列表
export const findNewCartListApi = () => {
  return request({
    method: 'GET',
    url: '/member/cart'
  })
}

// 删除购物车
export const delCartApi = (ids: string[]) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

// 合并购物车
export const mergeCartApi = (data: any) => {
  return request({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}