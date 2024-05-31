// InfiniteScroll.ts
import { App, DirectiveBinding, ObjectDirective } from 'vue';
import { throttle } from 'lodash-es';

// 定义默认值
const DEFAULT_DISTANCE = 100;
const DEFAULT_DELAY = 200;


type InfiniteScrollEl = HTMLElement & {
  __handleScroll__?: () => void;
  __disabled__?: boolean;
}

type InfiniteScrollCallback = () => void

const InfiniteScroll: ObjectDirective<InfiniteScrollEl, InfiniteScrollCallback> = {
  mounted(el: InfiniteScrollEl, binding: DirectiveBinding<InfiniteScrollCallback>) {
    const { value: loadMore } = binding;
    if (typeof loadMore !== 'function') {
      console.error('The value provided to v-infinite-scroll must be a function.');
      return;
    }

    const distance = parseInt(el.getAttribute('infinite-scroll-distance') || `${DEFAULT_DISTANCE}`, 10);
    const disabled = el.getAttribute('infinite-scroll-disabled') === 'true';

    const handleScroll = throttle(() => {
      if (el.__disabled__) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollHeight - scrollTop <= clientHeight + distance) {
        loadMore();
        console.log('Infinite scroll triggered');
      }
    }, DEFAULT_DELAY);

    el.__handleScroll__ = handleScroll;
    el.__disabled__ = disabled;
    el.addEventListener('scroll', handleScroll);
  },
  unmounted(el: InfiniteScrollEl) {
    if (el.__handleScroll__) {
      el.removeEventListener('scroll', el.__handleScroll__);
      delete el.__handleScroll__;
    }
  },
  updated(el: InfiniteScrollEl) {
    const disabled = el.getAttribute('infinite-scroll-disabled') === 'true';
    el.__disabled__ = disabled;
  }
};

export default {
  install(app: App<Element>) {
    app.directive('self-infinite-scroll', InfiniteScroll);
  }
};
