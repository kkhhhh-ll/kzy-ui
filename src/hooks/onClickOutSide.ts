import type { Ref } from "vue";
import { onMounted, onUnmounted } from "vue";
const useClickOutSide = (
  elmentRef: Ref<null | undefined | HTMLElement>,
  callback: (e: MouseEvent) => void
) => {
  const handler = (e: MouseEvent) => {
    if (elmentRef.value && e.target) {
      if (!elmentRef.value.contains(e.target as HTMLElement)) {
        callback(e);
      }
    }
  };
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
};
export default useClickOutSide;
