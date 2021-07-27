<template>
  <div style="background-color: #ececec; padding: 20px;" class="card">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="商品总览" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="用户总览" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="销售总览" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {

};
</script>

<style>
.card{
width: 100%;
height: 100%;

}
</style>
