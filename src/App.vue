<script setup lang="ts">
import { ref, onMounted, h, reactive } from "vue";
import Kbutton from "./components/Button/Button.vue";
import KIcon from "./components/Icon/Icon.vue";
import KAlert from "./components/Alert/Alert.vue";
import KCollapse from "./components/Collapse/Collapse.vue";
import KCollapseItem from "./components/Collapse/CollapseItem.vue";
import KTooltip from "./components/Tooltip/Tooltip.vue";
import KDropdown from "./components/Dropdown/Dropdown";
import KMessage from "./components/Message/Message.vue";
import { createMessage } from "./components/Message/method.ts";
import type { ButtonInstance } from "./components/Button/types.ts";
import type { TooltipInstance } from "./components/Tooltip/types.ts";
import type { MenuOption } from "./components/Dropdown/types.ts";
const buttonRef = ref<ButtonInstance | null>(null);
onMounted(() => {
  if (buttonRef.value) {
    // defineExposed的使用
    console.log(buttonRef.value.ref);
  }
});
const activeNames = ref(["a"]);
const tooltipRef = ref<TooltipInstance | null>(null);
const changeTooltipShow = () => {
  tooltipRef.value?.show();
};
const changeTooltipHide = () => {
  tooltipRef.value?.hide();
};
const menuOptions = reactive<MenuOption[]>([
  {
    label: "1",
    key: 1,
  },
  {
    label: "2",
    key: 2,
    disabled: true,
  },
  {
    label: h("b", { style: { color: "red" } }, "render"),
    key: 3,
    divided: true,
  },
]);
</script>

<template>
  <div>
    <h3>KButton</h3>
    <div class="btn">
      <Kbutton ref="buttonRef" @click="changeTooltipShow">default</Kbutton>
      <Kbutton type="primary" @click="changeTooltipHide">primary</Kbutton>
      <Kbutton
        type="success"
        @click="
          createMessage({
            message: '111',
            type: 'success',
            duration: 1000,
            showClose: true,
          })
        "
        >success</Kbutton
      >
      <Kbutton
        type="danger"
        @click="
          createMessage({
            message: '222',
            duration: 2000,
            type: 'danger',
            showClose: true,
          })
        "
        >danger</Kbutton
      >
      <Kbutton type="warning">warning</Kbutton>
      <Kbutton type="info">info</Kbutton>
    </div>
    <div class="btn">
      <Kbutton plain>plain</Kbutton>
      <Kbutton type="primary" plain>primary</Kbutton>
      <Kbutton type="success" plain>success</Kbutton>
      <Kbutton type="danger" plain>danger</Kbutton>
      <Kbutton type="warning" plain>warning</Kbutton>
      <Kbutton type="info" plain>info</Kbutton>
    </div>
    <div class="btn">
      <Kbutton round>round</Kbutton>
      <Kbutton type="primary" round>primary</Kbutton>
      <Kbutton type="success" round>success</Kbutton>
      <Kbutton type="danger" round>danger</Kbutton>
      <Kbutton type="warning" round>warning</Kbutton>
      <Kbutton type="info" round>info</Kbutton>
    </div>

    <div class="btn">
      <Kbutton :disabled="true">disabled</Kbutton>
      <Kbutton type="primary" :disabled="true">primary</Kbutton>
      <Kbutton type="success" :disabled="true">success</Kbutton>
      <Kbutton type="danger" :disabled="true">danger</Kbutton>
      <Kbutton type="warning" :disabled="true">warning</Kbutton>
      <Kbutton type="info" :disabled="true">info</Kbutton>
    </div>
    <div class="btn">
      <Kbutton plain :disabled="true">plain</Kbutton>
      <Kbutton type="primary" plain :disabled="true">primary</Kbutton>
      <Kbutton type="success" plain :disabled="true">success</Kbutton>
      <Kbutton type="danger" plain :disabled="true">danger</Kbutton>
      <Kbutton type="warning" plain :disabled="true">warning</Kbutton>
      <Kbutton type="info" plain :disabled="true">info</Kbutton>
    </div>
    <div class="btn">
      <Kbutton type="primary" loading></Kbutton>
      <Kbutton type="success" icon="arrow-up">1</Kbutton>
      <Kbutton plain icon="arrow-down">plain</Kbutton>
    </div>
  </div>
  <div>
    <h3>KCollapse</h3>
    <KCollapse v-model="activeNames" :according="true">
      <KCollapseItem name="a">
        <template #header>
          <div>标题1</div>
        </template>
        <template #content>
          <div>内容1</div>
        </template>
      </KCollapseItem>
      <KCollapseItem name="b">
        <template #header>
          <div>标题2</div>
        </template>
        <template #content>
          <div>内容2</div>
        </template>
      </KCollapseItem>
      <KCollapseItem name="c" disabled>
        <template #header>
          <div>标题3</div>
        </template>
        <template #content>
          <div>内容3</div>
        </template>
      </KCollapseItem>
    </KCollapse>
  </div>

  <div>
    <h3>KIcon</h3>
    <k-icon icon="fa-solid fa-user-secret" type="primary" color="red"></k-icon>
    <k-icon icon="xmark" type="warning"></k-icon>
    <k-icon icon="arrow-down" type="success"></k-icon>
    <k-icon icon="arrow-up" type="danger"></k-icon>
  </div>
  <div>
    <h3>KAlert</h3>
    <KAlert type="success" content="hhh" showIcon> </KAlert>
    <KAlert type="primary" content="hhh" showIcon> </KAlert>
    <KAlert type="warning" content="hhh" showIcon> </KAlert>
    <KAlert type="danger" content="hhh" showIcon> </KAlert>
    <KAlert type="success" effect="dark" content="hhh" showIcon> </KAlert>
    <KAlert type="primary" effect="dark" content="hhh" showIcon> </KAlert>
    <KAlert type="warning" effect="dark" content="hhh" showIcon> </KAlert>
    <KAlert type="danger" effect="dark" content="hhh" showIcon> </KAlert>
  </div>

  <h3>Ktootip</h3>
  <KTooltip content="点击提示词" trigger="click">
    <span>点击我就可以</span>
  </KTooltip>
  <KTooltip content="hover提示词" trigger="hover">
    <span>hover我就可以</span>
  </KTooltip>
  <KTooltip content="hover提示词" manual ref="tooltipRef">
    <span>手动触发</span>
  </KTooltip>

  <h3>KDropdown</h3>
  <KDropdown :menu-options="menuOptions" trigger="click" placement="bottom">
    <div>下拉显示</div>
  </KDropdown>
</template>

<style scoped lang="scss">
.btn {
  margin: 10px;
  display: flex;
  gap: 10px;
}
</style>
