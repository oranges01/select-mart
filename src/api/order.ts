import request from '@/utils/request'

// 获取用户订单列表
/*
params: {
  orderState:0,
  page:1,
  pageSize:2
}
*/
export const getUserOrderApi = (params : any) => {
  return request({
    url: '/member/order',
    method: 'GET',
    params
  })
}