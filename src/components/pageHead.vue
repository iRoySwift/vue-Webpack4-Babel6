<template>
  <div class="page_header">
    <slot />
    <!-- 页面标题 -->
    <h4 v-if="needTitle">
      {{ pageTitle }}
    </h4>
    <slot name="header-title" />
    <div :class="{high:withBreadCrumb}"
         class="btn"
    >
      <slot name="edit-btn" />
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      needTitle: {
        required: false,
        type: Boolean,
        default: true,
      },
      pageTitle: {
        type: String,
        default: '',
        required: false,
      },
    },
    computed: {
      withBreadCrumb() {
        return this.$slots.hasOwnProperty('default');
      }
    }
  };
</script>
<style scoped lang="scss">
  .page_header{
    position: relative;
    padding: 10px 0 15px 20px;
    font-size: 20px;
    background: #fff;
    border-left: 1px solid #f2f2f2;
    h4{
      margin: 7px 0 0;
      line-height: 28px;
    }
    .btn{
      position: absolute;
      top: 14px;
      right: 32px;
      &.high{
        top:32px;
      }
    }
  }
</style>
