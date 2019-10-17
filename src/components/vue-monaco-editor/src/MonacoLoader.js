export default {
  // https://as.alipayobjects.com/g/cicada/monaco-editor-mirror/0.6.1/min/vs/loader.js
  load(srcPath = 'https://as.alipayobjects.com/g/cicada/monaco-editor-mirror/0.6.1/min', callback) {
    if (window.monaco) {
      callback();
      return;
    }
    const config = {
      paths: {
        vs: srcPath + '/vs'
      }
    };
    const loaderUrl = `${config.paths.vs}/loader.js`;
    const onGotAmdLoader = () => {
      if (window.LOADER_PENDING) {
        window.require.config(config);
      }
      
      window.require(['vs/editor/editor.main'], () => {
        callback();
      });

      // 当AMD加载器已被加载时调用延迟的回调
      if (window.LOADER_PENDING) {
        window.LOADER_PENDING = false;
        const loaderCallbacks = window.LOADER_CALLBACKS;
        if (loaderCallbacks && loaderCallbacks.length) {
          let currentCallback = loaderCallbacks.shift();
          while (currentCallback) {
            currentCallback.fn.call(currentCallback.window);
            currentCallback = loaderCallbacks.shift();
          }
        }
      }
    };

    if (window.LOADER_PENDING) {
      // 我们需要避免加载多个loader.js时
      // 有多个编辑器同时加载延迟调用回调除了第一个
      window.LOADER_CALLBACKS = window.LOADER_CALLBACKS || [];
      window.LOADER_CALLBACKS.push({
        window: this,
        fn: onGotAmdLoader
      });
    } else {
      if (typeof window.require === 'undefined') {
        const loaderScript = window.document.createElement('script');
        loaderScript.type = 'text/javascript';
        loaderScript.src = loaderUrl;
        loaderScript.addEventListener('load', onGotAmdLoader);
        window.document.body.appendChild(loaderScript);
        window.LOADER_PENDING = true;
      } else {
        onGotAmdLoader();
      }
    }
  }
}
