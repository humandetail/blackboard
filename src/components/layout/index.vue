<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <more-menu class="more-menu" />
      <toolbar-section class="section" />
    </a-layout-header>
    <a-layout class="container">
      <a-layout>
        <a-layout-content class="main">
          <main-canvas />
        </a-layout-content>
        <a-layout-footer
          class="footer"
        >
          <frames-section />
        </a-layout-footer>
      </a-layout>
      <a-layout-sider
        class="aside"
      >
        <div class="tabs">
          <div
            v-for="tab of tabs"
            :key="tab.value"
            class="tab"
            :class="{ active: tab.value === activeTab }"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </div>
        </div>

        <styles-section v-show="activeTab === 1" />
        <layers-section v-show="activeTab === 2" />
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'

const { token } = theme.useToken()

const activeTab = ref(1)
const tabs = [
  { label: '样式', value: 1 },
  { label: '图层', value: 2 }
]
</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  color: v-bind('token.colorText');
  background-color: v-bind('token.colorBgContainer');
  user-select: none;

  .section {
    padding: v-bind('`${token.padding}px`');
    border: 1px solid v-bind('token.colorBorder');
    border-radius: v-bind('`${token.borderRadius}px`');
  }

  .container {
    .aside {
      position: relative;
      padding: 0;
      height: 100%;
      background-color: v-bind('token.colorBgContainer');
      overflow-y: auto;

      .tabs {
        --radius: 8px;
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 2;
        padding: var(--radius) var(--radius) 0 var(--radius);
        background-color: v-bind('token.colorBgElevated');

        .tab {
          position: relative;
          width: 50%;
          height: 32px;
          line-height: 32px;
          text-align: center;
          border-top-right-radius: var(--radius);
          border-top-left-radius: var(--radius);
          cursor: pointer;

          &::before,
          &::after {
            content: '';
            display: none;
            position: absolute;
            width: var(--radius);
            height: var(--radius);
            top: 100%;
            background-color: v-bind('token.colorBgContainer');
          }

          &::before {
            left: 0;
            transform: translate(-100%, -100%);
            clip-path: path('M0,8 Q8,8 8,0 L8,8 z');
          }

          &::after {
            right: 0;
            transform: translate(100%, -100%);
            clip-path: path('M8,8 Q0,8 0,0 L0,8 z');
          }

          &:hover {
            // color: v-bind('token.colorPrimary');
            background-color: v-bind('token.colorBgContainer');
            opacity: 0.6;
            &::before,
            &::after {
              display: block;
            }
          }

          &.active {
            color: v-bind('token.colorPrimary');
            background-color: v-bind('token.colorBgContainer');
            // clip-path: path('M0,32 Q8,32 8,24, L8,10 Q8,2 16,2 L84,2 Q92,2 92,10, L92,24, Q92,32 100,32');

            &::before,
            &::after {
              display: block;
            }
          }
        }
      }
    }
  }

  .header,
  .footer {
    height: auto;
    line-height: 1.15;
    padding: 0;
    background-color: transparent;
  }

  .footer {
    background-color: v-bind('token.colorBgContainer');
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: v-bind('`${token.padding}px`');

    :deep(.more-menu) {
      position: absolute;
      left: v-bind('`${token.padding}px`');
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
