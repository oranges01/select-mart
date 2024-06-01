import request from '@/utils/request'

// 支付页 --- 获取订单详情
export const getOrderApi = (id : string) => {
  return request({
    method: 'GET',
    url: `/member/order/${id}`
  })
}