import { ref, computed } from "vue";
const zIndex = ref(0);

const useZIndex = (initialValue = 2000) => {
  const initialZIndex = ref(initialValue);
  const currentIndex = computed(() => initialZIndex.value + zIndex.value);
  const nextZIndex = () => {
    zIndex.value++;
    return currentIndex.value;
  };
  return {
    nextZIndex,
    currentIndex,
    initialZIndex,
  };
};

export default useZIndex;
