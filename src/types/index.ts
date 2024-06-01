// sku object type
interface SkuObjType {
  inventory: number | null,
  oldPrice: string,
  price: string,
  skuId: string,
  specsText: string
}

// goods object type
interface GoodsType {
  id: string,
  name: string,
  picture: string,
  price: number,
  count: number,
  skuId: string,
  attrsText: string,
  selected: boolean,
  totalPrice?: string,
  totalPayPrice?: string,
}

// checkout object type
interface CheckoutType {
  goods: GoodsType[],
  userAddresses: AddressType[],
  summary: {
    goodsCount: number,
    totalPrice: number,
    totalPayPrice: number,
    postFee: number,
  }
}

// address object type
interface AddressType {
  id: string,
  receiver: string,
  contact: string,
  fullLocation: string,
  address: string,
  isDefault: 0 | 1,
}

// 导出类型
export type { SkuObjType, GoodsType, CheckoutType, AddressType }