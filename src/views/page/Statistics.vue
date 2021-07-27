<template>
<div class="statistics">
      <div class="card">
          <Card />
       <Charts />
      </div>
</div>
</template>

<script>
import Card from '@/components/Card.vue';
import Charts from '@/components/Charts.vue';

export default {
  components: {
    Card,
    Charts,
  },
};
</script>

<style lane="less">

</style>
