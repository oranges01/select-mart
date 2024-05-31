import request from '@/utils/request';

// 获取产品分类banner
interface BannerParams {
  distributionSite?: string;
}
export const getBannerApi = (params: BannerParams = {}) => {
  // 默认为1 商品为2
  const { distributionSite = '1' } = params
  return request({
    method: 'GET',
    url: 'home/banner',
    params: {
      distributionSite
    }
  })
} 

// 获取优选集萃
export const getNewApi = () => {
  return request({
    method: 'GET',
    url: '/home/new'
  })
}

// 获取热门商品
export const getHotApi = () => {
  return request({
    method: 'GET',
    url: '/home/hot'
  })
}

// 获取所有商品
export const getGoodsApi = () => {
  return request({
    method: 'GET',
    url: '/home/goods'
  })
}
