<script setup lang="ts">
import { ref, onMounted, h, reactive } from "vue";
import Kbutton from "./components/Button/Button.vue";
import KIcon from "./components/Icon/Icon.vue";
import KAlert from "./components/Alert/Alert.vue";
import KCollapse from "./components/Collapse/Collapse.vue";
import KCollapseItem from "./components/Collapse/CollapseItem.vue";
import KTooltip from "./components/Tooltip/Tooltip.vue";
import KDropdown from "./components/Dropdown/Dropdown";
import KInput from "./components/Input/Input.vue";
// import KMessage from "./components/Message/Message.vue";
import KSwitch from "./components/Switch/Switch.vue";
import KColor from "./components/Color/Color.vue";
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
const inputValue = ref<string | undefined>();
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
const test = ref(false);
const callback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement;
      img.src = img.dataset.src || "";
      observer.unobserve(img);
    }
  });
};
const observer = new IntersectionObserver(callback);
onMounted(() => {
  const imgs = document.querySelectorAll("img");
  imgs.forEach((img) => {
    observer.observe(img);
  });
});
const colorSet = ref<string>("#fff");
const changeColor = (val: string) => {
  console.log("color change", val);
};
</script>

<template>
  <div>
    <KColor v-model="colorSet" @change="changeColor"></KColor>
    <KColor disabled v-model="colorSet" @change="changeColor"></KColor>

    <h3>KButton</h3>
    <div class="btn">
      <Kbutton ref="buttonRef" @click="changeTooltipShow">default</Kbutton>
      <Kbutton type="primary" size="small" @click="changeTooltipHide"
        >primary</Kbutton
      >
      <Kbutton
        type="success"
        size="large"
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
      <Kbutton type="primary" loading></Kbutton>
      <Kbutton type="danger" circle loading></Kbutton>

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
    <KAlert type="warning" effect="dark" content="hhh" showIcon> </KAlert>
    <KAlert type="danger" effect="dark" content="hhh" showIcon> </KAlert>
  </div>
  <img data-src="/public/favicon.ico" />
  <img data-src="/public/favicon.ico" />
  <img data-src="/public/favicon.ico" />
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

  <h3>KInput</h3>
  <KInput v-model="inputValue" />

  <h3>KSwitch</h3>
  <KSwitch v-model="test" active-text="on" inactive-text="off" />
</template>

<style scoped lang="scss">
.btn {
  .k-button {
    margin: 0 5px;
  }
}
</style>
