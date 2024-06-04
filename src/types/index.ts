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

// 省 市 区 地址类型(无code)
interface AddressMapType {
  [province: string]: Province;
}
interface Province {
  [city: string]: string[];
}
type City = keyof Province;

// 省 市 区 地址类型(有code)
interface AddressMapCodeType {
  code: string,
  name: string,
  children?: AddressMapCodeType[],
}


// 导出类型
export type { SkuObjType, GoodsType, CheckoutType, AddressType, AddressMapType, Province, City, AddressMapCodeType }