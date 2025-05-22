import { defineComponent } from "vue";
const renderContent = defineComponent({
  props: {
    vNode: {
      type: [String, Object],
      required: true,
    },
  },
  setup(props) {
    return () => props.vNode;
  },
});

export default renderContent;
