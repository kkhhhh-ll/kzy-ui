import type { DropdownInstance, MenuOption } from "./types";
import { computed, defineComponent, Fragment, ref } from "vue";
import type { PropType } from "vue";
import type { Placement, Options } from "@popperjs/core";
import Tooltip from "@/components/Tooltip/Tooltip.vue";
import type { TooltipInstance } from "../Tooltip/types";

export default defineComponent({
  name: "KDropdown",
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: "bottom",
    },
    trigger: {
      type: String as PropType<"hover" | "click">,
      default: "hover",
    },
    transition: {
      type: String,
      default: "k",
    },
    openDelay: {
      type: Number,
      default: 0,
    },
    closeDelay: {
      type: Number,
      default: 0,
    },
    popperOptions: {
      type: Object as PropType<Options>,
    },
    menuOptions: {
      type: Object as PropType<MenuOption[]>,
    },
    hideAfterClick: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["visible-change", "select"],
  setup(props, { slots, emit, expose }) {
    const tooltipRef = ref<TooltipInstance | null>(null);
    const visibleChange = (e: boolean) => {
      emit("visible-change", e);
    };
    const itemClick = (e: MenuOption) => {
      if (e.disabled) return;
      emit("select", e);
      if (props.hideAfterClick) {
        tooltipRef.value?.hide();
      }
    };
    expose<DropdownInstance>({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide(),
    });
    const options = computed(() => {
      return props.menuOptions?.map((item) => {
        return (
          <Fragment key={item.key}>
            {item.divided ? (
              <li role="separator" class="divided-placeholder"></li>
            ) : (
              ""
            )}
            <li
              class={{
                "k-dropdown__item": true,
                "is-disabled": item.disabled,
                "is-divided": item.divided,
              }}
              id={`dropdown-item-${item.key}`}
              onClick={() => itemClick(item)}
            >
              {item.label}
            </li>
          </Fragment>
        );
      });
    });

    return () => (
      <div class="k-dropdown">
        <Tooltip
          trigger={props.trigger}
          placement={props.placement}
          popper-options={props.popperOptions}
          open-delay={props.openDelay}
          close-delay={props.closeDelay}
          onVisible-change={visibleChange}
          ref={tooltipRef}
        >
          {{
            default: () => slots.default && slots.default(),
            content: () => <ul class="k-dropdown__menu">{options.value}</ul>,
          }}
        </Tooltip>
      </div>
    );
  },
});
