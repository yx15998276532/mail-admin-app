<template>
 <div class="productList">
     <!-- 搜索 -->
<Search @search="handleSubmit" :data='categoryList'/>
<a-button class="product-add-btn">
     <router-link :to="{name: 'ProductAdd'}"> 添加商品</router-link>
    </a-button>
<!-- 表格 -->
<ProductTable  :data="tableData" :page="page"
 @change="handlePage"
  :categoryList="categoryList"
  @edit="editProduct"
  @remove="removeProduct"
  />
 </div>
</template>

<script>
import categoryApi from '@/api/category';
import api from '@/api/product';
import Search from '@/components/Search.vue';
import ProductTable from '@/components/ProductTable.vue';

export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1, // 当前页数
        pageSize: 10, // 每页条数
        showSizeChanger: true, // 是否可以改变
        total: 1, // 数据总数
      },
      categoryObj: {},
    };
  },
  components: {
    Search,
    ProductTable,
  },

  async created() {
    await categoryApi.getList().then((r) => { // console.log('ccc', r.data)
      this.categoryList = r.data;
      r.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.handleTableData();
  },
  methods: {
    handleSubmit(rep) {
      // console.log('rep',rep.category);
      this.searchForm = rep;
      this.handleTableData(); // 商品类目提交搜索时，再次调用handleTableData()获取数据
    },
    handleTableData() {
      api.getList({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchForm,
      }).then((resp) => {
        // console.log('打印',resp);
        this.page.total = resp.total;
        this.tableData = resp.data.map((item) => ({ // console.log('item',item.category);
          ...item,
          categoryName: this.categoryObj[item.category].name,
        }));
      });
    },
    handlePage(page) {
      this.page = page;
      this.handleTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确认删除',
        content: () => <div style="color:red;">{ `确认删除标贴为${record.id}商品` }</div>,
        onOk: () => {
          api.remove({
            id: record.id,
          }).then(() => {
            //   console.log(this)
            this.handleTableData();
          });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'confirm-box',
      });
    },
  },
};
</script>

<style lang="less">
.productList{
    margin: 10px 90px;
    position: relative;
.product-add-btn{
   position: absolute;
    right: 0px;
    top: 3px;
    z-index: 1;
}
}
</style>
