<template>
  <div class="productAdd">
       <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <BasicInfo v-if="current === 0" @next="next" :form ="form"/>
        <SaleInfo v-else-if="current === 1" @next ="next" @prev="prev"  :form ="form" />
    </div>
  </div>
</template>

<script>
import SaleInfo from '@/components/SaleDetail.vue';
import BasicInfo from '@/components/BasicDetail.vue';
import api from '@/api/product';

export default {
  data() {
    return {
      current: 0,
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: '',
        inventory: 0,
        images: [],
      },
      steps: [
        {
          title: '填写商品基本信息',
          content: 'First-content',
        },
        {
          title: '填写商品销售信息',
          content: 'Second-content',
        },

      ],
    };
  },
  components: {
    BasicInfo,
    SaleInfo,
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
      api.detail(id).then((item) => {
        this.form = item;
      });
    }
  },
  methods: {
    next(form) {
    console.log("fo",form)
      this.form = {
        ...this.form,
        form,
      };
      if (this.current === 1) {
        if (this.$route.params) {
          console.log('file', form);
          api.edit(this.form).then((res) => {
            console.log(res);
            this.$message.success('修改成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
        } else {
          // 提交数据
          console.log('file', form);
          api.add(this.form).then((res) => {
            console.log(res);
            this.$message.success('新增成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
        }
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style scoped lang="less">
.productAdd{
   width: 50%;
   margin: 50px auto;
.steps-content {
   margin-top: 50px;
   width: 100%;
}
}
.steps-action {
  margin-top: 24px;
}
</style>
