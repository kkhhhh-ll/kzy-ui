import { render, h, shallowReactive } from "vue";
import type { CreateMessageProps, MessageInstance } from "./types";
import MessageConstructor from "./Message.vue";
import useZIndex from "@/hooks/useZIndex";
let seed = 1;
const instances: Array<MessageInstance> = shallowReactive([]);
export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`;
  const { nextZIndex } = useZIndex();
  const container = document.createElement("div");
  const destroy = () => {
    const idx = instances.findIndex(
      (instance: MessageInstance) => instance.id === id
    );
    if (idx === -1) return;
    instances.splice(idx, 1);
    render(null, container);
  };
  const manualDestroy = () => {
    const idx = instances.findIndex(
      (instance: MessageInstance) => instance.id === id
    );
    if (idx === -1) return;
    instances[idx].vm.exposed!.visible.value = false;
  };
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destroy,
  };
  const vnode = h(MessageConstructor, newProps);
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);
  const vm = vnode.component!;
  const instance: MessageInstance = {
    id,
    vnode,
    vm,
    props: newProps,
    destroy: manualDestroy,
  };
  instances.push(instance);
  return instance;
};

export const getLastInstance = () => {
  return instances?.[instances?.length - 1];
};

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex(
    (instance: MessageInstance) => instance.id === id
  );
  if (idx <= 0) return 0;
  return instances[idx - 1].vm.exposed!.bottomOffset.value;
};
