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
  selected: boolean
}

export type { SkuObjType, GoodsType }