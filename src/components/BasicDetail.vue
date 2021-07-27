<template>
<div class="basic-detail">
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
     :label-col="labelCol" :wrapper-col="wrapperCol"
  >
    <a-form-model-item label="标题" prop="title" required>
      <a-input
        v-model="form.title"
      />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
      <a-select v-model="form.category" placeholder="请选择商品类别" @change="changeCategory">
        <a-select-option :value="c.id" v-for="c in categoryList" :key="c.id">
          {{ c.name }}
        </a-select-option>
      </a-select>
        <a-select v-model="form.c_items" placeholder="请添加子类目">
        <a-select-option v-for="c in categoryItems" :key="c" :value="c">
           {{ c }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" required prop="tags">
     <a-select
      mode="tags"
      placeholder="Please select"
      :default-value="['包邮，最晚次日达']"
      v-model="form.tags"
    >
      <a-select-option value="包邮，最晚次日达" >
        包邮，最晚次日达
      </a-select-option>
      </a-select>
    </a-form-model-item>
     <a-form-model-item >
         <a-button type="primary" @click="next" class="btn" :wrapper-col="wrapperCol">
             下一步
             </a-button>
      </a-form-model-item>
  </a-form-model>
  </div>
</template>
<script>
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 19 },
      rules: {},
      categoryList: [],
      categoryItems: [],
    };
  },
  props: ['form'],
  created() {
    categoryApi.getList().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    changeCategory(category) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === category) {
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    //      if(this.categoryList[res-1].id === res){
    //          this.categoryItems = this.categoryList[res-1].c_items;
    //      }
    //   }
    },
    next() {
      //  console.log(this.form)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        //   console.log('error submit!!');
        return false;
      });
    },
  },
};
</script>

<style lang="less">
.basic-detail{
    .btn{
        left: 240px;
        text-align: center;
    }
}
</style>
