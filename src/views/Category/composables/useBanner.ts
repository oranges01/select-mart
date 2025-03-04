// 封装banner轮播图相关的业务代码
import { ref, onMounted } from 'vue'
import { getBannerApi } from '@/api/home'

export function useBanner () {
  const bannerList = ref([] as any[])

  const getBanner = async () => {
    const res = await getBannerApi({
      distributionSite: '2'
    })
    bannerList.value = res.result
  }

  onMounted(() => getBanner())

  return {
    bannerList
  }
}
