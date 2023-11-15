<template>
  <section
    class="widget-wrapper"
    :class="{
      visible: mainVisible
    }"
  >
    <header
      class="wrapper-header"
      @click="handleHeaderClick"
    >
      <h3 class="title">{{ title }}</h3>
      <a-button
        text="text"
        size="small"
        class="btn"
      >
        <RightOutlined />
      </a-button>
    </header>
    <main
      v-show="mainVisible"
      class="main"
    >
      <slot />
    </main>
  </section>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'

defineProps<{
  title: string
}>()

const { token } = theme.useToken()

const mainVisible = ref(true)

const handleHeaderClick = () => useViewTransition(() => {
  mainVisible.value = !mainVisible.value
})
</script>

<style lang="scss" scoped>
.widget-wrapper {
  position: relative;
  margin: v-bind('`${token.marginLG}px`') v-bind('`${token.marginSM}px`');
  padding: v-bind('`${token.padding}px`') 0 0;
  border-radius: v-bind('`${token.borderRadius}px`');
  border-width: 1px 0 0;
  border-style: solid;
  border-color: v-bind('token.colorBorder');

  .wrapper-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    top: -12px;
    width: 100%;
    height: 24px;
    line-height: 24px;
    padding: 0 v-bind('`${token.paddingSM}px`');
    cursor: pointer;

    .title {
      display: inline-block;
      margin: 0;
      padding: 0 v-bind('`${token.paddingSM}px`');
      font-size: 14px;
      background-color: v-bind('token.colorBgContainer');
    }

    .btn {
      all: unset;
      padding: 0 v-bind('`${token.paddingSM}px`');
      background-color: v-bind('token.colorBgContainer');
    }
  }

  &.visible {
    padding: v-bind('`${token.padding}px`');
    border-width: 1px;
  }

  .main {
    position: relative;
  }
}
</style>
