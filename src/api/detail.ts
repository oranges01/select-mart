import request from '@/utils/request';

// 获取商品细节信息
export const getDetailApi = (id : string | string[]) => {
  return request({
    method: 'GET',
    url: '/goods',
    params: {
      id
    }
  })
}

// 获取热门商品
interface HotGoodsParams {
  id: string | string[]
  type: string
  limit?: number
}
export const getHotGoodsApi = (params: HotGoodsParams) => {
  const { id, type, limit = 3 } = params
  return request({
    method: 'GET',
    url: '/goods/hot',
    params: {
      id,
      type,
      limit
    }
  })
}