<template>
  <a-dropdown
    :trigger="['click']"
    arrow
  >
    <a-button>
      <MenuOutlined />
    </a-button>

    <template #overlay>
      <a-menu>
        <a-menu-item key="0">
          <UndoOutlined />
          撤销
        </a-menu-item>
        <a-menu-item key="1">
          <RedoOutlined />
          重做
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">
          <CheckOutlined />
          帧动画面板
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="4">
          <FileImageOutlined />
          保存图片
        </a-menu-item>
        <a-menu-item key="5">
          <CloseOutlined />
          关闭
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">

</script>
