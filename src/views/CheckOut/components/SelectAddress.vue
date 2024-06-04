<script lang="ts" setup>
import { ref, computed, watch, watchEffect } from 'vue';
import {  AddressMapType } from '@/types/index';

// 详细地址(省市区 详细地址)
import areaObj from '../../../../public/area.json'; 


// 传入的参数
const props = defineProps({
  form: {
    type: Object,
    default: () => {}
  }
})

// 省市区数据
const areaData = areaObj as AddressMapType;

// 省
const provinceArr = Object.keys(areaData) as string[]
const province = ref<string>(provinceArr[6])

// 市
const cityArr = computed(() => {
  if (areaData[province.value] && typeof areaData[province.value] === 'object') {
    return Object.keys(areaData[province.value]) as string[];
  } else {
    return [];
  }
})
const city = ref<string>(cityArr.value[0])

// 区
const areaArr = computed(() => {
  if (areaData[province.value] && areaData[province.value][city.value]){
    return areaData[province.value][city.value] as string[];
  } else {
    return [];
  }
})
const area = ref<string>(areaArr.value[0])

// 详细地址
const detailArea = ref<string>('')


// 监听表单数据变化
watchEffect(() => {
  province.value = props.form.province;
  city.value = props.form.city;
  detailArea.value = props.form.detail;
});

// 监听省份变化
watchEffect(() => {
  const provinceValue = province.value;
  if (provinceValue && areaData[provinceValue]) {
    city.value = Object.keys(areaData[provinceValue])[0] as string;
  }
});

// 监听市变化
watchEffect(() => {
  const provinceValue = province.value;
  const cityValue = city.value;
  if (provinceValue && cityValue && areaData[provinceValue] && areaData[provinceValue][cityValue]) {
    area.value = areaData[provinceValue][cityValue][0] as string;
  }
});



</script>

<template> 
  <el-form ref="form" :model="form" label-width="120px">
    <el-row>
      <el-select v-model="form.province" placeholder="请选择省" >
        <el-option v-for="item in provinceArr" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select v-model="form.city" placeholder="请选择市">
        <el-option v-for="item in cityArr" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select v-model="form.area" placeholder="请选择区">
        <el-option v-for="item in areaArr" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-input placeholder="详细地址" v-model="form.detail" style="width:200px;"></el-input>
    </el-row>
  </el-form>

</template>

<style lang="scss" scoped>
.el-row {
  display: inline;
}

.el-row {
  display: inline-flex;
  flex: auto;

  .el-select {
    margin: 0 20px 0 0;
    width: 160px;
  }
}

</style>