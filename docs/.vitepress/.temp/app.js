import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrRenderVNode, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderStyle, renderToString } from "vue/server-renderer";
import { defineComponent, mergeProps, useSSRContext, shallowRef, readonly, inject, computed, ref, watch, reactive, markRaw, nextTick, h, unref, onMounted, onUpdated, onUnmounted, watchEffect, watchPostEffect, shallowReadonly, resolveComponent, createVNode, resolveDynamicComponent, withCtx, renderSlot, useTemplateRef, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, defineAsyncComponent, provide, toHandlers, withKeys, onBeforeUnmount, useSlots, createSSRApp } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import { usePreferredDark, useDark, tryOnUnmounted, useMediaQuery, useNavigatorLanguage, useWindowSize, onKeyStroke, useWindowScroll, useScrollLock } from "@vueuse/core";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
const _sfc_main$1a = /* @__PURE__ */ defineComponent({
  __name: "VPBadge",
  __ssrInlineRender: true,
  props: {
    text: {},
    type: { default: "tip" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["VPBadge", __props.type]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`${ssrInterpolate(__props.text)}`);
      }, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$1a = _sfc_main$1a.setup;
_sfc_main$1a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPBadge.vue");
  return _sfc_setup$1a ? _sfc_setup$1a(props, ctx) : void 0;
};
const _sfc_main$19 = /* @__PURE__ */ defineComponent({
  __name: "VPBackdrop",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPBackdrop" }, _attrs))} data-v-c79a1216></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPBackdrop.vue");
  return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
const VPBackdrop = /* @__PURE__ */ _export_sfc(_sfc_main$19, [["__scopeId", "data-v-c79a1216"]]);
function deserializeFunctions(r) {
  return Array.isArray(r) ? r.map(deserializeFunctions) : typeof r == "object" && r !== null ? Object.keys(r).reduce((t, n) => (t[n] = deserializeFunctions(r[n]), t), {}) : typeof r == "string" && r.startsWith("_vp-fn_") ? new Function(`return ${r.slice(7)}`)() : r;
}
const siteData = deserializeFunctions(JSON.parse('{"lang":"en-US","dir":"ltr","title":"MIMITools","description":"MIMITools - 二次元游戏 Mod 模型提取与逆向工具","base":"/MIMITools/","head":[],"router":{"prefetchLinks":true},"appearance":true,"themeConfig":{"nav":[{"text":"首页","link":"/"},{"text":"文档","items":[{"text":"Mod 逆向教程","link":"/newbie/reverse/Introduction/Introduction"},{"text":"原神 Mod 防报错","link":"/games/gimi/HowToSolveErrorCode/HowToSolveErrorCode"}]},{"text":"GitHub","link":"https://github.com/StarBobis/MIMITools"},{"text":"赞助","link":"https://afdian.com/item/ec74ee782b2f11efb5a052540025c377"}],"sidebar":{"/newbie/reverse/":[{"text":"Mod 逆向教程","items":[{"text":"自动逆向功能","link":"/newbie/reverse/Introduction/Introduction"},{"text":"如何激活自动逆向","link":"/newbie/reverse/HowToActivateAutoReverse/HowToActivateAutoReverse"},{"text":"一键逆向后导入 Blender","link":"/newbie/reverse/T004ImportIntoBlender/T004ImportIntoBlender"},{"text":"筛选正确的数据类型","link":"/newbie/reverse/T005UseCorrectDataType/T005UseCorrectDataType"},{"text":"手动逆向功能","link":"/newbie/reverse/ManualReverse/ManualReverse"},{"text":"案例：原神脸部逆向","link":"/newbie/reverse/GenshinFaceReverse/GenshinFaceReverse"},{"text":"案例：调用 TexFx 绘制的 Mod","link":"/newbie/reverse/Case_DrawWithTexFx/Case_DrawWithTexFx"},{"text":"案例：IndexBuffer 膨胀混淆","link":"/newbie/reverse/BufferInflationObfuscation/BufferInflationObfuscation"},{"text":"案例：ResourceVBList.size() 为 4 的 Mod","link":"/newbie/reverse/ResourceVBListSize4/ResourceVBListSize4"},{"text":"案例：NPC Mod","link":"/newbie/reverse/NPCModReverseIssue/NPCModReverseIssue"},{"text":"骨骼：模型如何绑定骨骼","link":"/newbie/reverse/BindModelToBone/BindModelToBone"},{"text":"骨骼：米游系列原包骨骼","link":"/newbie/reverse/HoyoGamesBone/HoyoGamesBone"},{"text":"骨骼：鸣潮解包原骨骼","link":"/newbie/reverse/WutheringWavesBone/WutheringWavesBone"},{"text":"萌新常见问题","link":"/newbie/reverse/FAQ/FAQ"},{"text":"常见问题解答 (FAQ)","link":"/newbie/reverse/T006FAQ/T006FAQ"},{"text":"逆向后没有脸部模型？","link":"/newbie/reverse/WhyNoFaceModel/WhyNoFaceModel"}]}],"/games/gimi/":[{"text":"原神","items":[{"text":"10612-4001 等报错解决方法","link":"/games/gimi/HowToSolveErrorCode/HowToSolveErrorCode"}]}]},"search":{"provider":"local"}},"locales":{},"scrollOffset":134,"cleanUrls":false,"additionalConfig":{}}'));
const __vite_import_meta_env__ = {};
const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i;
const APPEARANCE_KEY = "vitepress-theme-appearance";
const UnpackStackView = /* @__PURE__ */ Symbol("stack-view:unpack");
const HASH_RE = /#.*$/;
const HASH_OR_QUERY_RE = /[?#].*$/;
const INDEX_OR_EXT_RE = /(?:(^|\/)index)?\.(?:md|html)$/;
const inBrowser = typeof document !== "undefined";
const notFoundPageData = {
  relativePath: "404.md",
  filePath: "",
  title: "404",
  description: "Not Found",
  headers: [],
  frontmatter: { sidebar: false, layout: "page" },
  lastUpdated: 0,
  isNotFound: true
};
function isActive(currentPath, matchPath, asRegex = false) {
  if (matchPath === void 0) {
    return false;
  }
  currentPath = normalize(`/${currentPath}`);
  if (asRegex) {
    return new RegExp(matchPath).test(currentPath);
  }
  if (normalize(matchPath) !== currentPath) {
    return false;
  }
  const hashMatch = matchPath.match(HASH_RE);
  if (hashMatch) {
    return (inBrowser ? location.hash : "") === hashMatch[0];
  }
  return true;
}
function normalize(path) {
  return decodeURI(path).replace(HASH_OR_QUERY_RE, "").replace(INDEX_OR_EXT_RE, "$1");
}
function isExternal(path) {
  return EXTERNAL_URL_RE.test(path);
}
function getLocaleForPath(siteData2, relativePath) {
  return Object.keys(siteData2?.locales || {}).find((key) => key !== "root" && !isExternal(key) && isActive(relativePath, `^/${key}/`, true)) || "root";
}
function resolveSiteDataByRoute(siteData2, relativePath) {
  const localeIndex = getLocaleForPath(siteData2, relativePath);
  const { label, link: link2, ...localeConfig } = siteData2.locales[localeIndex] ?? {};
  Object.assign(localeConfig, { localeIndex });
  const additionalConfigs = resolveAdditionalConfig(siteData2, relativePath);
  const topLayer = {
    head: mergeHead(siteData2.head ?? [], localeConfig.head ?? [], ...additionalConfigs.map((data) => data.head ?? []).reverse())
  };
  return stackView(topLayer, ...additionalConfigs, localeConfig, siteData2);
}
function createTitle(siteData2, pageData) {
  const title = pageData.title || siteData2.title;
  const template = pageData.titleTemplate ?? siteData2.titleTemplate;
  if (typeof template === "string" && template.includes(":title")) {
    return template.replace(/:title/g, title);
  }
  const templateString = createTitleTemplate(siteData2.title, template);
  if (title === templateString.slice(3)) {
    return title;
  }
  return `${title}${templateString}`;
}
function createTitleTemplate(siteTitle, template) {
  if (template === false) {
    return "";
  }
  if (template === true || template === void 0) {
    return ` | ${siteTitle}`;
  }
  if (siteTitle === template) {
    return "";
  }
  return ` | ${template}`;
}
function mergeHead(...headArrays) {
  const merged = [];
  const metaKeyMap = /* @__PURE__ */ new Map();
  for (const current of headArrays) {
    for (const tag of current) {
      const [type, attrs] = tag;
      const keyAttr = Object.entries(attrs)[0];
      if (type !== "meta" || !keyAttr) {
        merged.push(tag);
        continue;
      }
      const key = `${keyAttr[0]}=${keyAttr[1]}`;
      const existingIndex = metaKeyMap.get(key);
      if (existingIndex != null) {
        merged[existingIndex] = tag;
      } else {
        metaKeyMap.set(key, merged.length);
        merged.push(tag);
      }
    }
  }
  return merged;
}
const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;
function sanitizeFileName(name) {
  const match = DRIVE_LETTER_REGEX.exec(name);
  const driveLetter = match ? match[0] : "";
  return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "_").replace(/(^|\/)_+(?=[^/]*$)/, "$1");
}
const KNOWN_EXTENSIONS = /* @__PURE__ */ new Set();
function treatAsHtml(filename) {
  if (KNOWN_EXTENSIONS.size === 0) {
    const extraExts = typeof process === "object" && process.env?.VITE_EXTRA_EXTENSIONS || __vite_import_meta_env__?.VITE_EXTRA_EXTENSIONS || "";
    ("3g2,3gp,aac,ai,apng,au,avif,bin,bmp,cer,class,conf,crl,css,csv,dll,doc,eps,epub,exe,gif,gz,ics,ief,jar,jpe,jpeg,jpg,js,json,jsonld,m4a,man,mid,midi,mjs,mov,mp2,mp3,mp4,mpe,mpeg,mpg,mpp,oga,ogg,ogv,ogx,opus,otf,p10,p7c,p7m,p7s,pdf,png,ps,qt,roff,rtf,rtx,ser,svg,t,tif,tiff,tr,ts,tsv,ttf,txt,vtt,wav,weba,webm,webp,woff,woff2,xhtml,xml,yaml,yml,zip" + (extraExts && typeof extraExts === "string" ? "," + extraExts : "")).split(",").forEach((ext2) => KNOWN_EXTENSIONS.add(ext2));
  }
  const ext = filename.split(".").pop();
  return ext == null || !KNOWN_EXTENSIONS.has(ext.toLowerCase());
}
function escapeRegExp(str) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function resolveAdditionalConfig({ additionalConfig }, path) {
  if (additionalConfig === void 0)
    return [];
  if (typeof additionalConfig === "function")
    return additionalConfig(path) ?? [];
  const configs = [];
  const segments = path.split("/").slice(0, -1);
  while (segments.length) {
    const key = `/${segments.join("/")}/`;
    configs.push(additionalConfig[key]);
    segments.pop();
  }
  configs.push(additionalConfig["/"]);
  return configs.filter((config) => config !== void 0);
}
function stackView(..._layers) {
  const layers = _layers.filter((layer) => isObject(layer));
  if (layers.length <= 1)
    return _layers[0];
  const allKeys = new Set(layers.flatMap((layer) => Reflect.ownKeys(layer)));
  const allKeysArray = [...allKeys];
  return new Proxy({}, {
    // TODO: optimize for performance, this is a hot path
    get(_, prop) {
      if (prop === UnpackStackView)
        return layers;
      return stackView(...layers.map((layer) => layer[prop]).filter((v) => v !== void 0));
    },
    set() {
      throw new Error("StackView is read-only and cannot be mutated.");
    },
    has(_, prop) {
      return allKeys.has(prop);
    },
    ownKeys() {
      return allKeysArray;
    },
    getOwnPropertyDescriptor(_, prop) {
      for (const layer of layers) {
        const descriptor = Object.getOwnPropertyDescriptor(layer, prop);
        if (descriptor)
          return descriptor;
      }
    }
  });
}
stackView.unpack = function(obj) {
  return obj?.[UnpackStackView];
};
function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
const shellLangs = ["shellscript", "shell", "bash", "sh", "zsh"];
function isShell(lang) {
  return shellLangs.includes(lang);
}
const dataSymbol = /* @__PURE__ */ Symbol();
const siteDataRef = shallowRef(readonly(siteData));
function initData(route) {
  const site = computed(() => resolveSiteDataByRoute(siteDataRef.value, route.data.relativePath));
  const appearance = site.value.appearance;
  const isDark = appearance === "force-dark" ? ref(true) : appearance === "force-auto" ? usePreferredDark() : appearance ? useDark({
    storageKey: APPEARANCE_KEY,
    initialValue: () => appearance === "dark" ? "dark" : "auto",
    ...typeof appearance === "object" ? appearance : {}
  }) : ref(false);
  const hashRef = ref(inBrowser ? location.hash : "");
  if (inBrowser) {
    window.addEventListener("hashchange", () => {
      hashRef.value = location.hash;
    });
  }
  watch(() => route.data, () => {
    hashRef.value = inBrowser ? location.hash : "";
  });
  return {
    site,
    theme: computed(() => site.value.themeConfig),
    page: computed(() => route.data),
    frontmatter: computed(() => route.data.frontmatter),
    params: computed(() => route.data.params),
    lang: computed(() => site.value.lang),
    dir: computed(() => route.data.frontmatter.dir || site.value.dir),
    localeIndex: computed(() => site.value.localeIndex || "root"),
    title: computed(() => createTitle(site.value, route.data)),
    description: computed(() => route.data.description || site.value.description),
    isDark,
    hash: computed(() => hashRef.value)
  };
}
function useData$1() {
  const data = inject(dataSymbol);
  if (!data) {
    throw new Error("vitepress data not properly injected in app");
  }
  return data;
}
function joinPath(base, path) {
  return `${base}${path}`.replace(/\/+/g, "/");
}
function withBase(path) {
  return EXTERNAL_URL_RE.test(path) || !path.startsWith("/") ? path : joinPath(siteDataRef.value.base, path);
}
function pathToFile(path) {
  let pagePath = path.replace(/\.html$/, "");
  pagePath = decodeURIComponent(pagePath);
  pagePath = pagePath.replace(/\/$/, "/index");
  {
    if (inBrowser) {
      const base = "/MIMITools/";
      pagePath = sanitizeFileName(pagePath.slice(base.length).replace(/\//g, "_") || "index") + ".md";
      let pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()];
      if (!pageHash) {
        pagePath = pagePath.endsWith("_index.md") ? pagePath.slice(0, -9) + ".md" : pagePath.slice(0, -3) + "_index.md";
        pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()];
      }
      if (!pageHash)
        return null;
      pagePath = `${base}${"assets"}/${pagePath}.${pageHash}.js`;
    } else {
      pagePath = `./${sanitizeFileName(pagePath.slice(1).replace(/\//g, "_"))}.md.js`;
    }
  }
  return pagePath;
}
let contentUpdatedCallbacks = [];
function onContentUpdated(fn) {
  contentUpdatedCallbacks.push(fn);
  tryOnUnmounted(() => {
    contentUpdatedCallbacks = contentUpdatedCallbacks.filter((f) => f !== fn);
  });
}
function getScrollOffset() {
  let scrollOffset = siteDataRef.value.scrollOffset;
  let offset = 0;
  let padding = 24;
  if (typeof scrollOffset === "object" && "padding" in scrollOffset) {
    padding = scrollOffset.padding;
    scrollOffset = scrollOffset.selector;
  }
  if (typeof scrollOffset === "number") {
    offset = scrollOffset;
  } else if (typeof scrollOffset === "string") {
    offset = tryOffsetSelector(scrollOffset, padding);
  } else if (Array.isArray(scrollOffset)) {
    for (const selector of scrollOffset) {
      const res = tryOffsetSelector(selector, padding);
      if (res) {
        offset = res;
        break;
      }
    }
  }
  return offset;
}
function tryOffsetSelector(selector, padding) {
  const el = document.querySelector(selector);
  if (!el)
    return 0;
  const bot = el.getBoundingClientRect().bottom;
  if (bot < 0)
    return 0;
  return bot + padding;
}
const RouterSymbol = /* @__PURE__ */ Symbol();
const fakeHost = "http://a.com";
const getDefaultRoute = () => ({
  path: "/",
  hash: "",
  query: "",
  component: null,
  data: notFoundPageData
});
function createRouter(loadPageModule, fallbackComponent) {
  const route = reactive(getDefaultRoute());
  const router = {
    route,
    async go(href, options) {
      href = normalizeHref(href);
      if (await router.onBeforeRouteChange?.(href) === false)
        return;
      if (!inBrowser || await changeRoute(href, options))
        await loadPage(href);
      syncRouteQueryAndHash();
      await router.onAfterRouteChange?.(href);
    }
  };
  let latestPendingPath = null;
  async function loadPage(href, scrollPosition = 0, isRetry = false) {
    if (await router.onBeforePageLoad?.(href) === false)
      return;
    const targetLoc = new URL(href, fakeHost);
    const pendingPath = latestPendingPath = targetLoc.pathname;
    try {
      let page = await loadPageModule(pendingPath);
      if (!page)
        throw new Error(`Page not found: ${pendingPath}`);
      if (latestPendingPath === pendingPath) {
        latestPendingPath = null;
        const { default: comp, __pageData } = page;
        if (!comp)
          throw new Error(`Invalid route component: ${comp}`);
        await router.onAfterPageLoad?.(href);
        route.path = inBrowser ? pendingPath : withBase(pendingPath);
        route.component = markRaw(comp);
        route.data = true ? markRaw(__pageData) : readonly(__pageData);
        syncRouteQueryAndHash(targetLoc);
        if (inBrowser) {
          nextTick(() => {
            let actualPathname = siteDataRef.value.base + __pageData.relativePath.replace(/(?:(^|\/)index)?\.md$/, "$1");
            if (!siteDataRef.value.cleanUrls && !actualPathname.endsWith("/")) {
              actualPathname += ".html";
            }
            if (actualPathname !== targetLoc.pathname) {
              targetLoc.pathname = actualPathname;
              href = actualPathname + targetLoc.search + targetLoc.hash;
              history.replaceState({}, "", href);
            }
            return scrollTo(targetLoc.hash, false, scrollPosition);
          });
        }
      }
    } catch (err) {
      if (!/fetch|Page not found/.test(err.message) && !/^\/404(\.html|\/)?$/.test(href)) {
        console.error(err);
      }
      if (!isRetry) {
        try {
          const res = await fetch(siteDataRef.value.base + "hashmap.json");
          window.__VP_HASH_MAP__ = await res.json();
          await loadPage(href, scrollPosition, true);
          return;
        } catch (e) {
        }
      }
      if (latestPendingPath === pendingPath) {
        latestPendingPath = null;
        route.path = inBrowser ? pendingPath : withBase(pendingPath);
        route.component = fallbackComponent ? markRaw(fallbackComponent) : null;
        const relativePath = inBrowser ? route.path.replace(/(^|\/)$/, "$1index").replace(/(\.html)?$/, ".md").slice(siteDataRef.value.base.length) : "404.md";
        route.data = { ...notFoundPageData, relativePath };
        syncRouteQueryAndHash(targetLoc);
      }
    }
  }
  function syncRouteQueryAndHash(loc = inBrowser ? location : { search: "", hash: "" }) {
    route.query = loc.search;
    route.hash = decodeURIComponent(loc.hash);
  }
  if (inBrowser) {
    if (history.state === null)
      history.replaceState({}, "");
    window.addEventListener("click", (e) => {
      if (e.defaultPrevented || !(e.target instanceof Element) || e.target.closest("button") || // temporary fix for docsearch action buttons
      e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
        return;
      }
      const link2 = e.target.closest("a");
      if (!link2 || link2.closest(".vp-raw") || link2.hasAttribute("download") || link2.hasAttribute("target")) {
        return;
      }
      const linkHref = link2.getAttribute("href") ?? (link2 instanceof SVGAElement ? link2.getAttribute("xlink:href") : null);
      if (linkHref == null)
        return;
      const { href, origin, pathname } = new URL(linkHref, link2.baseURI);
      const currentLoc = new URL(location.href);
      if (origin === currentLoc.origin && treatAsHtml(pathname)) {
        e.preventDefault();
        router.go(href, {
          // use smooth scroll when clicking on header anchor links
          smoothScroll: link2.classList.contains("header-anchor")
        });
      }
    }, { capture: true });
    window.addEventListener("popstate", async (e) => {
      if (e.state === null)
        return;
      const href = normalizeHref(location.href);
      await loadPage(href, e.state && e.state.scrollPosition || 0);
      syncRouteQueryAndHash();
      await router.onAfterRouteChange?.(href);
    });
    window.addEventListener("hashchange", (e) => {
      e.preventDefault();
      syncRouteQueryAndHash();
    });
  }
  return router;
}
function useRouter() {
  const router = inject(RouterSymbol);
  if (!router)
    throw new Error("useRouter() is called without provider.");
  return router;
}
function useRoute() {
  return useRouter().route;
}
function scrollTo(hash, smooth = false, scrollPosition = 0) {
  if (!hash || scrollPosition) {
    window.scrollTo(0, scrollPosition);
    return;
  }
  let target = null;
  try {
    target = document.getElementById(decodeURIComponent(hash).slice(1));
  } catch (e) {
    console.warn(e);
  }
  if (!target)
    return;
  const targetTop = window.scrollY + target.getBoundingClientRect().top - getScrollOffset() + Number.parseInt(window.getComputedStyle(target).paddingTop, 10) || 0;
  const behavior = window.matchMedia("(prefers-reduced-motion)").matches ? "instant" : (
    // only smooth scroll if distance is smaller than screen height
    smooth && Math.abs(targetTop - window.scrollY) <= window.innerHeight ? "smooth" : "auto"
  );
  const scrollToTarget = () => {
    window.scrollTo({ left: 0, top: targetTop, behavior });
    target.focus({ preventScroll: true });
    if (document.activeElement === target)
      return;
    if (target.hasAttribute("tabindex"))
      return;
    const restoreTabindex = () => {
      target.removeAttribute("tabindex");
      target.removeEventListener("blur", restoreTabindex);
    };
    target.setAttribute("tabindex", "-1");
    target.addEventListener("blur", restoreTabindex);
    target.focus({ preventScroll: true });
    if (document.activeElement !== target)
      restoreTabindex();
  };
  requestAnimationFrame(scrollToTarget);
}
function normalizeHref(href) {
  const url = new URL(href, fakeHost);
  url.pathname = url.pathname.replace(/(^|\/)index(\.html)?$/, "$1");
  if (siteDataRef.value.cleanUrls) {
    url.pathname = url.pathname.replace(/\.html$/, "");
  } else if (!url.pathname.endsWith("/") && !url.pathname.endsWith(".html")) {
    url.pathname += ".html";
  }
  return url.pathname + url.search + url.hash;
}
async function changeRoute(href, { smoothScroll = false, initialLoad = false, replace = false } = {}) {
  const loc = normalizeHref(location.href);
  const nextUrl = new URL(href, location.origin);
  const currentUrl = new URL(loc, location.origin);
  if (href === loc) {
    if (!initialLoad) {
      scrollTo(nextUrl.hash, smoothScroll);
      return false;
    }
  } else {
    if (replace) {
      history.replaceState({}, "", href);
    } else {
      history.replaceState({ scrollPosition: window.scrollY }, "");
      history.pushState({}, "", href);
    }
    if (nextUrl.pathname === currentUrl.pathname) {
      if (nextUrl.hash !== currentUrl.hash) {
        window.dispatchEvent(new HashChangeEvent("hashchange", {
          oldURL: currentUrl.href,
          newURL: nextUrl.href
        }));
        scrollTo(nextUrl.hash, smoothScroll);
      }
      return false;
    }
  }
  return true;
}
const runCbs = () => contentUpdatedCallbacks.forEach((fn) => fn());
const Content = defineComponent({
  name: "VitePressContent",
  props: {
    as: { type: [Object, String], default: "div" }
  },
  setup(props) {
    const route = useRoute();
    const { frontmatter, site } = useData$1();
    watch(frontmatter, runCbs, { deep: true, flush: "post" });
    return () => h(props.as, site.value.contentProps ?? { style: { position: "relative" } }, [
      route.component ? h(route.component, {
        onVnodeMounted: runCbs,
        onVnodeUpdated: runCbs,
        onVnodeUnmounted: runCbs
      }) : "404 Page Not Found"
    ]);
  }
});
const useData = useData$1;
function throttleAndDebounce(fn, delay) {
  let timeoutId;
  let called = false;
  return () => {
    if (timeoutId)
      clearTimeout(timeoutId);
    if (!called) {
      fn();
      (called = true) && setTimeout(() => called = false, delay);
    } else
      timeoutId = setTimeout(fn, delay);
  };
}
function ensureStartingSlash(path) {
  return path.startsWith("/") ? path : `/${path}`;
}
function normalizeLink$1(url) {
  const { pathname, search, hash, protocol } = new URL(url, "http://a.com");
  if (isExternal(url) || url.startsWith("#") || !protocol.startsWith("http") || !treatAsHtml(pathname))
    return url;
  const { site } = useData();
  const normalizedPath = pathname.endsWith("/") || pathname.endsWith(".html") ? url : url.replace(/(?:(^\.+)\/)?.*$/, `$1${pathname.replace(/(\.md)?$/, site.value.cleanUrls ? "" : ".html")}${search}${hash}`);
  return withBase(normalizedPath);
}
function useLangs({ correspondingLink = false } = {}) {
  const { site, localeIndex, page, theme: theme2, hash } = useData();
  const currentLang = computed(() => ({
    label: site.value.locales[localeIndex.value]?.label,
    link: site.value.locales[localeIndex.value]?.link || (localeIndex.value === "root" ? "/" : `/${localeIndex.value}/`)
  }));
  const localeLinks = computed(() => Object.entries(site.value.locales).flatMap(([key, value]) => currentLang.value.label === value.label ? [] : {
    text: value.label,
    link: normalizeLink(value.link || (key === "root" ? "/" : `/${key}/`), theme2.value.i18nRouting !== false && correspondingLink, page.value.relativePath.slice(currentLang.value.link.length - 1), !site.value.cleanUrls) + hash.value,
    lang: value.lang,
    dir: value.dir
  }));
  return { localeLinks, currentLang };
}
function normalizeLink(link2, addPath, path, addExt) {
  return addPath ? link2.replace(/\/$/, "") + ensureStartingSlash(path.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, addExt ? ".html" : "")) : link2;
}
const _sfc_main$18 = /* @__PURE__ */ defineComponent({
  __name: "NotFound",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const { currentLang } = useLangs();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "NotFound" }, _attrs))} data-v-829df670><p class="code" data-v-829df670>${ssrInterpolate(unref(theme2).notFound?.code ?? "404")}</p><h1 class="title" data-v-829df670>${ssrInterpolate(unref(theme2).notFound?.title ?? "PAGE NOT FOUND")}</h1><div class="divider" data-v-829df670></div><blockquote class="quote" data-v-829df670>${ssrInterpolate(unref(theme2).notFound?.quote ?? "But if you don't change your direction, and if you keep looking, you may end up where you are heading.")}</blockquote><div class="action" data-v-829df670><a class="link"${ssrRenderAttr("href", unref(withBase)(unref(theme2).notFound?.link ?? unref(currentLang).link))}${ssrRenderAttr("aria-label", unref(theme2).notFound?.linkLabel ?? "go to home")} data-v-829df670>${ssrInterpolate(unref(theme2).notFound?.linkText ?? "Take me home")}</a></div></div>`);
    };
  }
});
const _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/NotFound.vue");
  return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
const NotFound = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["__scopeId", "data-v-829df670"]]);
function getSidebar(_sidebar, path) {
  if (Array.isArray(_sidebar))
    return addBase(_sidebar);
  if (_sidebar == null)
    return [];
  path = ensureStartingSlash(path);
  const dir = Object.keys(_sidebar).sort((a, b) => {
    return b.split("/").length - a.split("/").length;
  }).find((dir2) => {
    return path.startsWith(ensureStartingSlash(dir2));
  });
  const sidebar2 = dir ? _sidebar[dir] : [];
  return Array.isArray(sidebar2) ? addBase(sidebar2) : addBase(sidebar2.items, sidebar2.base);
}
function getSidebarGroups(sidebar2) {
  const groups = [];
  let lastGroupIndex = 0;
  for (const index in sidebar2) {
    const item = sidebar2[index];
    if (item.items) {
      lastGroupIndex = groups.push(item);
      continue;
    }
    if (!groups[lastGroupIndex]) {
      groups.push({ items: [] });
    }
    groups[lastGroupIndex].items.push(item);
  }
  return groups;
}
function getFlatSideBarLinks(sidebar2) {
  const links = [];
  function recursivelyExtractLinks(items) {
    for (const item of items) {
      if (item.text && item.link) {
        links.push({
          text: item.text,
          link: item.link,
          docFooterText: item.docFooterText
        });
      }
      if (item.items) {
        recursivelyExtractLinks(item.items);
      }
    }
  }
  recursivelyExtractLinks(sidebar2);
  return links;
}
function hasActiveLink(path, items) {
  if (Array.isArray(items)) {
    return items.some((item) => hasActiveLink(path, item));
  }
  return isActive(path, items.link) ? true : items.items ? hasActiveLink(path, items.items) : false;
}
function addBase(items, _base) {
  return [...items].map((_item) => {
    const item = { ..._item };
    const base = item.base || _base;
    if (base && item.link)
      item.link = base + item.link.replace(/^\//, base.endsWith("/") ? "" : "/");
    if (item.items)
      item.items = addBase(item.items, base);
    return item;
  });
}
function useAside() {
  const { hasSidebar } = useLayout();
  const is9602 = useMediaQuery("(min-width: 960px)");
  const is1280 = useMediaQuery("(min-width: 1280px)");
  const isAsideEnabled = computed(() => {
    if (!is1280.value && !is9602.value) {
      return false;
    }
    return hasSidebar.value ? is1280.value : is9602.value;
  });
  return {
    isAsideEnabled
  };
}
const ignoreRE = /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/;
const resolvedHeaders = [];
function resolveTitle(theme2) {
  return typeof theme2.outline === "object" && !Array.isArray(theme2.outline) && theme2.outline.label || theme2.outlineTitle || "On this page";
}
function getHeaders(range) {
  const headers2 = [
    ...document.querySelectorAll(".VPDoc h1, .VPDoc h2, .VPDoc h3, .VPDoc h4, .VPDoc h5, .VPDoc h6")
  ].filter((el) => el.id && el.hasChildNodes()).map((el) => {
    const level = Number(el.tagName[1]);
    return {
      element: el,
      title: serializeHeader(el),
      link: "#" + el.id,
      level
    };
  });
  return resolveHeaders(headers2, range);
}
function serializeHeader(h2) {
  let ret = "";
  for (const node of h2.childNodes) {
    if (node.nodeType === 1) {
      if (ignoreRE.test(node.className))
        continue;
      ret += node.textContent;
    } else if (node.nodeType === 3) {
      ret += node.textContent;
    }
  }
  return ret.trim();
}
function resolveHeaders(headers2, range) {
  if (range === false) {
    return [];
  }
  const levelsRange = (typeof range === "object" && !Array.isArray(range) ? range.level : range) || 2;
  const [high, low] = typeof levelsRange === "number" ? [levelsRange, levelsRange] : levelsRange === "deep" ? [2, 6] : levelsRange;
  return buildTree(headers2, high, low);
}
function useActiveAnchor(container, marker) {
  const { isAsideEnabled } = useAside();
  const onScroll = throttleAndDebounce(setActiveLink, 100);
  let prevActiveLink = null;
  onMounted(() => {
    requestAnimationFrame(setActiveLink);
    window.addEventListener("scroll", onScroll);
  });
  onUpdated(() => {
    activateLink(location.hash);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });
  function setActiveLink() {
    if (!isAsideEnabled.value) {
      return;
    }
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const offsetHeight = document.body.offsetHeight;
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;
    const headers2 = resolvedHeaders.map(({ element, link: link2 }) => ({
      link: link2,
      top: getAbsoluteTop(element)
    })).filter(({ top }) => !Number.isNaN(top)).sort((a, b) => a.top - b.top);
    if (!headers2.length) {
      activateLink(null);
      return;
    }
    if (scrollY < 1) {
      activateLink(null);
      return;
    }
    if (isBottom) {
      activateLink(headers2[headers2.length - 1].link);
      return;
    }
    let activeLink = null;
    for (const { link: link2, top } of headers2) {
      if (top > scrollY + getScrollOffset() + 4) {
        break;
      }
      activeLink = link2;
    }
    activateLink(activeLink);
  }
  function activateLink(hash) {
    if (prevActiveLink) {
      prevActiveLink.classList.remove("active");
    }
    if (hash == null) {
      prevActiveLink = null;
    } else {
      prevActiveLink = container.value.querySelector(`a[href="${decodeURIComponent(hash)}"]`);
    }
    const activeLink = prevActiveLink;
    if (activeLink) {
      activeLink.classList.add("active");
      marker.value.style.top = activeLink.offsetTop + 39 + "px";
      marker.value.style.opacity = "1";
    } else {
      marker.value.style.top = "33px";
      marker.value.style.opacity = "0";
    }
  }
}
function getAbsoluteTop(element) {
  let offsetTop = 0;
  while (element !== document.body) {
    if (element === null) {
      return NaN;
    }
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}
function buildTree(data, min, max) {
  resolvedHeaders.length = 0;
  const result = [];
  const stack = [];
  data.forEach((item) => {
    const node = { ...item, children: [] };
    let parent = stack[stack.length - 1];
    while (parent && parent.level >= node.level) {
      stack.pop();
      parent = stack[stack.length - 1];
    }
    if (node.element.classList.contains("ignore-header") || parent && "shouldIgnore" in parent) {
      stack.push({ level: node.level, shouldIgnore: true });
      return;
    }
    if (node.level > max || node.level < min)
      return;
    resolvedHeaders.push({ element: node.element, link: node.link });
    if (parent)
      parent.children.push(node);
    else
      result.push(node);
    stack.push(node);
  });
  return result;
}
const isOpen = ref(false);
function useCloseSidebarOnEscape(close) {
  let triggerElement;
  watchEffect(() => {
    triggerElement = isOpen.value ? document.activeElement : void 0;
  });
  onMounted(() => {
    window.addEventListener("keyup", onEscape);
  });
  onUnmounted(() => {
    window.removeEventListener("keyup", onEscape);
  });
  function onEscape(e) {
    if (e.key === "Escape" && isOpen.value) {
      close();
      triggerElement?.focus();
    }
  }
}
function useSidebarControl() {
  function open() {
    isOpen.value = true;
  }
  function close() {
    isOpen.value = false;
  }
  function toggle() {
    isOpen.value ? close() : open();
  }
  return {
    isOpen,
    open,
    close,
    toggle
  };
}
function useSidebarItemControl(item) {
  const { page, hash } = useData();
  const collapsed = ref(false);
  const collapsible = computed(() => {
    return item.value.collapsed != null;
  });
  const isLink = computed(() => {
    return !!item.value.link;
  });
  const isActiveLink = ref(false);
  const updateIsActiveLink = () => {
    isActiveLink.value = isActive(page.value.relativePath, item.value.link);
  };
  watch([page, item, hash], updateIsActiveLink);
  onMounted(updateIsActiveLink);
  const hasActiveLink$1 = computed(() => {
    if (isActiveLink.value) {
      return true;
    }
    return item.value.items ? hasActiveLink(page.value.relativePath, item.value.items) : false;
  });
  const hasChildren = computed(() => {
    return !!(item.value.items && item.value.items.length);
  });
  watchEffect(() => {
    collapsed.value = !!(collapsible.value && item.value.collapsed);
  });
  watchPostEffect(() => {
    (isActiveLink.value || hasActiveLink$1.value) && (collapsed.value = false);
  });
  function toggle() {
    if (collapsible.value) {
      collapsed.value = !collapsed.value;
    }
  }
  return {
    collapsed,
    collapsible,
    isLink,
    isActiveLink,
    hasActiveLink: hasActiveLink$1,
    hasChildren,
    toggle
  };
}
const headers = shallowRef([]);
const sidebar = shallowRef([]);
const is960 = shallowRef(false);
function useLayout() {
  const { frontmatter, theme: theme2 } = useData();
  const isHome = computed(() => {
    return !!(frontmatter.value.isHome ?? frontmatter.value.layout === "home");
  });
  const hasSidebar = computed(() => {
    return frontmatter.value.sidebar !== false && sidebar.value.length > 0 && !isHome.value;
  });
  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value);
  const sidebarGroups = computed(() => {
    return hasSidebar.value ? getSidebarGroups(sidebar.value) : [];
  });
  const hasAside = computed(() => {
    if (isHome.value)
      return false;
    if (frontmatter.value.aside != null)
      return !!frontmatter.value.aside;
    return theme2.value.aside !== false;
  });
  const leftAside = computed(() => {
    if (!hasAside.value)
      return false;
    return frontmatter.value.aside == null ? theme2.value.aside === "left" : frontmatter.value.aside === "left";
  });
  const hasLocalNav = computed(() => {
    return headers.value.length > 0;
  });
  return {
    isHome,
    sidebar: shallowReadonly(sidebar),
    sidebarGroups,
    hasSidebar,
    isSidebarEnabled,
    hasAside,
    leftAside,
    headers: shallowReadonly(headers),
    hasLocalNav
  };
}
function registerWatchers({ closeSidebar }) {
  const { frontmatter, page, theme: theme2 } = useData();
  watch(() => [page.value.relativePath, theme2.value.sidebar], ([relativePath, sidebarConfig]) => {
    const newSidebar = sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
    if (JSON.stringify(newSidebar) !== JSON.stringify(sidebar.value)) {
      sidebar.value = newSidebar;
    }
  }, { immediate: true, deep: true, flush: "sync" });
  onContentUpdated(() => {
    headers.value = getHeaders(frontmatter.value.outline ?? theme2.value.outline);
  });
  if (inBrowser) {
    is960.value = window.innerWidth >= 960;
    window.addEventListener("resize", () => {
      is960.value = window.innerWidth >= 960;
    }, { passive: true });
  }
  const route = useRoute();
  watch(() => route.path, closeSidebar);
  useCloseSidebarOnEscape(closeSidebar);
}
const layoutInfoInjectionKey = /* @__PURE__ */ Symbol("layout-info");
const _sfc_main$17 = /* @__PURE__ */ defineComponent({
  __name: "VPDocOutlineItem",
  __ssrInlineRender: true,
  props: {
    headers: {},
    root: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VPDocOutlineItem = resolveComponent("VPDocOutlineItem", true);
      _push(`<ul${ssrRenderAttrs(mergeProps({
        class: ["VPDocOutlineItem", __props.root ? "root" : "nested"]
      }, _attrs))} data-v-1ce71065><!--[-->`);
      ssrRenderList(__props.headers, ({ children, link: link2, title }) => {
        _push(`<li data-v-1ce71065><a class="outline-link"${ssrRenderAttr("href", link2)}${ssrRenderAttr("title", title)} data-v-1ce71065>${ssrInterpolate(title)}</a>`);
        if (children?.length) {
          _push(ssrRenderComponent(_component_VPDocOutlineItem, { headers: children }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocOutlineItem.vue");
  return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
const VPDocOutlineItem = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["__scopeId", "data-v-1ce71065"]]);
const _sfc_main$16 = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideOutline",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const container = ref();
    const marker = ref();
    const { headers: headers2, hasLocalNav } = useLayout();
    useActiveAnchor(container, marker);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        "aria-labelledby": "doc-outline-aria-label",
        class: ["VPDocAsideOutline", { "has-outline": unref(hasLocalNav) }],
        ref_key: "container",
        ref: container
      }, _attrs))} data-v-60d5052e><div class="content" data-v-60d5052e><div class="outline-marker" data-v-60d5052e></div><div aria-level="2" class="outline-title" id="doc-outline-aria-label" role="heading" data-v-60d5052e>${ssrInterpolate(unref(resolveTitle)(unref(theme2)))}</div>`);
      _push(ssrRenderComponent(VPDocOutlineItem, {
        headers: unref(headers2),
        root: true
      }, null, _parent));
      _push(`</div></nav>`);
    };
  }
});
const _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideOutline.vue");
  return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
const VPDocAsideOutline = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["__scopeId", "data-v-60d5052e"]]);
const _sfc_main$15 = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideCarbonAds",
  __ssrInlineRender: true,
  props: {
    carbonAds: {}
  },
  setup(__props) {
    const VPCarbonAds = () => null;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAsideCarbonAds" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(VPCarbonAds), { "carbon-ads": __props.carbonAds }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideCarbonAds.vue");
  return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
const _sfc_main$14 = /* @__PURE__ */ defineComponent({
  __name: "VPDocAside",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAside" }, _attrs))} data-v-3f215769>`);
      ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(VPDocAsideOutline, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push, _parent);
      _push(`<div class="spacer" data-v-3f215769></div>`);
      ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push, _parent);
      if (unref(theme2).carbonAds) {
        _push(ssrRenderComponent(_sfc_main$15, {
          "carbon-ads": unref(theme2).carbonAds
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAside.vue");
  return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
const VPDocAside = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["__scopeId", "data-v-3f215769"]]);
function useEditLink() {
  const { theme: theme2, page } = useData();
  return computed(() => {
    const { text = "Edit this page", pattern = "" } = theme2.value.editLink || {};
    let url;
    if (typeof pattern === "function") {
      url = pattern(page.value);
    } else {
      url = pattern.replace(/:path/g, page.value.filePath);
    }
    return { url, text };
  });
}
function usePrevNext() {
  const { page, theme: theme2, frontmatter } = useData();
  return computed(() => {
    const sidebar2 = getSidebar(theme2.value.sidebar, page.value.relativePath);
    const links = getFlatSideBarLinks(sidebar2);
    const candidates = uniqBy(links, (link2) => link2.link.replace(/[?#].*$/, ""));
    const index = candidates.findIndex((link2) => {
      return isActive(page.value.relativePath, link2.link);
    });
    const hidePrev = theme2.value.docFooter?.prev === false && !frontmatter.value.prev || frontmatter.value.prev === false;
    const hideNext = theme2.value.docFooter?.next === false && !frontmatter.value.next || frontmatter.value.next === false;
    return {
      prev: hidePrev ? void 0 : {
        text: (typeof frontmatter.value.prev === "string" ? frontmatter.value.prev : typeof frontmatter.value.prev === "object" ? frontmatter.value.prev.text : void 0) ?? candidates[index - 1]?.docFooterText ?? candidates[index - 1]?.text,
        link: (typeof frontmatter.value.prev === "object" ? frontmatter.value.prev.link : void 0) ?? candidates[index - 1]?.link
      },
      next: hideNext ? void 0 : {
        text: (typeof frontmatter.value.next === "string" ? frontmatter.value.next : typeof frontmatter.value.next === "object" ? frontmatter.value.next.text : void 0) ?? candidates[index + 1]?.docFooterText ?? candidates[index + 1]?.text,
        link: (typeof frontmatter.value.next === "object" ? frontmatter.value.next.link : void 0) ?? candidates[index + 1]?.link
      }
    };
  });
}
function uniqBy(array, keyFn) {
  const seen = /* @__PURE__ */ new Set();
  return array.filter((item) => {
    const k = keyFn(item);
    return seen.has(k) ? false : seen.add(k);
  });
}
const _sfc_main$13 = /* @__PURE__ */ defineComponent({
  __name: "VPLink",
  __ssrInlineRender: true,
  props: {
    tag: {},
    href: {},
    noIcon: { type: Boolean },
    target: {},
    rel: {}
  },
  setup(__props) {
    const props = __props;
    const tag = computed(() => props.tag ?? (props.href ? "a" : "span"));
    const isExternal2 = computed(
      () => props.href && EXTERNAL_URL_RE.test(props.href) || props.target === "_blank"
    );
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tag.value), mergeProps({
        class: ["VPLink", {
          link: __props.href,
          "vp-external-link-icon": isExternal2.value,
          "no-icon": __props.noIcon
        }],
        href: __props.href ? unref(normalizeLink$1)(__props.href) : void 0,
        target: __props.target ?? (isExternal2.value ? "_blank" : void 0),
        rel: __props.rel ?? (isExternal2.value ? "noreferrer" : void 0)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLink.vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
const _sfc_main$12 = /* @__PURE__ */ defineComponent({
  __name: "VPDocFooterLastUpdated",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2, page, lang: pageLang } = useData();
    const { language: browserLang } = useNavigatorLanguage();
    const timeRef = useTemplateRef("timeRef");
    const date = computed(() => new Date(page.value.lastUpdated));
    const isoDatetime = computed(() => date.value.toISOString());
    const datetime = shallowRef("");
    onMounted(() => {
      watchEffect(() => {
        const lang = theme2.value.lastUpdated?.formatOptions?.forceLocale ? pageLang.value : browserLang.value;
        datetime.value = new Intl.DateTimeFormat(
          lang,
          theme2.value.lastUpdated?.formatOptions ?? {
            dateStyle: "medium",
            timeStyle: "medium"
          }
        ).format(date.value);
        if (lang && pageLang.value !== lang) {
          timeRef.value?.setAttribute("lang", lang);
        } else {
          timeRef.value?.removeAttribute("lang");
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({ class: "VPLastUpdated" }, _attrs))} data-v-3c637f39>${ssrInterpolate(unref(theme2).lastUpdated?.text || unref(theme2).lastUpdatedText || "Last updated")}: <time${ssrRenderAttr("datetime", isoDatetime.value)} data-v-3c637f39>${ssrInterpolate(datetime.value)}</time></p>`);
    };
  }
});
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocFooterLastUpdated.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const VPDocFooterLastUpdated = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["__scopeId", "data-v-3c637f39"]]);
const _sfc_main$11 = /* @__PURE__ */ defineComponent({
  __name: "VPDocFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2, page, frontmatter } = useData();
    const editLink = useEditLink();
    const control = usePrevNext();
    const hasEditLink = computed(
      () => theme2.value.editLink && frontmatter.value.editLink !== false
    );
    const hasLastUpdated = computed(() => page.value.lastUpdated);
    const showFooter = computed(
      () => hasEditLink.value || hasLastUpdated.value || control.value.prev || control.value.next
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (showFooter.value) {
        _push(`<footer${ssrRenderAttrs(mergeProps({ class: "VPDocFooter" }, _attrs))} data-v-e257564d>`);
        ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push, _parent);
        if (hasEditLink.value || hasLastUpdated.value) {
          _push(`<div class="edit-info" data-v-e257564d>`);
          if (hasEditLink.value) {
            _push(`<div class="edit-link" data-v-e257564d>`);
            _push(ssrRenderComponent(_sfc_main$13, {
              class: "edit-link-button",
              href: unref(editLink).url,
              "no-icon": true
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="vpi-square-pen edit-link-icon" data-v-e257564d${_scopeId}></span> ${ssrInterpolate(unref(editLink).text)}`);
                } else {
                  return [
                    createVNode("span", { class: "vpi-square-pen edit-link-icon" }),
                    createTextVNode(" " + toDisplayString(unref(editLink).text), 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (hasLastUpdated.value) {
            _push(`<div class="last-updated" data-v-e257564d>`);
            _push(ssrRenderComponent(VPDocFooterLastUpdated, null, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(control).prev?.link || unref(control).next?.link) {
          _push(`<nav class="prev-next" aria-labelledby="doc-footer-aria-label" data-v-e257564d><span class="visually-hidden" id="doc-footer-aria-label" data-v-e257564d>Pager</span><div class="pager" data-v-e257564d>`);
          if (unref(control).prev?.link) {
            _push(ssrRenderComponent(_sfc_main$13, {
              class: "pager-link prev",
              href: unref(control).prev.link
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="desc" data-v-e257564d${_scopeId}>${(unref(theme2).docFooter?.prev || "Previous page") ?? ""}</span><span class="title" data-v-e257564d${_scopeId}>${unref(control).prev.text ?? ""}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "desc",
                      innerHTML: unref(theme2).docFooter?.prev || "Previous page"
                    }, null, 8, ["innerHTML"]),
                    createVNode("span", {
                      class: "title",
                      innerHTML: unref(control).prev.text
                    }, null, 8, ["innerHTML"])
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="pager" data-v-e257564d>`);
          if (unref(control).next?.link) {
            _push(ssrRenderComponent(_sfc_main$13, {
              class: "pager-link next",
              href: unref(control).next.link
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="desc" data-v-e257564d${_scopeId}>${(unref(theme2).docFooter?.next || "Next page") ?? ""}</span><span class="title" data-v-e257564d${_scopeId}>${unref(control).next.text ?? ""}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "desc",
                      innerHTML: unref(theme2).docFooter?.next || "Next page"
                    }, null, 8, ["innerHTML"]),
                    createVNode("span", {
                      class: "title",
                      innerHTML: unref(control).next.text
                    }, null, 8, ["innerHTML"])
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></nav>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</footer>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocFooter.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const VPDocFooter = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["__scopeId", "data-v-e257564d"]]);
const _sfc_main$10 = /* @__PURE__ */ defineComponent({
  __name: "VPDoc",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const route = useRoute();
    const { hasSidebar, hasAside, leftAside } = useLayout();
    const pageName = computed(
      () => route.path.replace(/[./]+/g, "_").replace(/_html$/, "")
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = resolveComponent("Content");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPDoc", { "has-sidebar": unref(hasSidebar), "has-aside": unref(hasAside) }]
      }, _attrs))} data-v-7011f0d8>`);
      ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push, _parent);
      _push(`<div class="container" data-v-7011f0d8>`);
      if (unref(hasAside)) {
        _push(`<div class="${ssrRenderClass([{ "left-aside": unref(leftAside) }, "aside"])}" data-v-7011f0d8><div class="aside-curtain" data-v-7011f0d8></div><div class="aside-container" data-v-7011f0d8><div class="aside-content" data-v-7011f0d8>`);
        _push(ssrRenderComponent(VPDocAside, null, {
          "aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
              ];
            }
          }),
          "aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="content" data-v-7011f0d8><div class="content-container" data-v-7011f0d8>`);
      ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push, _parent);
      _push(`<main class="main" data-v-7011f0d8>`);
      _push(ssrRenderComponent(_component_Content, {
        class: ["vp-doc", [
          pageName.value,
          unref(theme2).externalLinkIcon && "external-link-icon-enabled"
        ]]
      }, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(VPDocFooter, null, {
        "doc-footer-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push, _parent);
      _push(`</div></div></div>`);
      ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDoc.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const VPDoc = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["__scopeId", "data-v-7011f0d8"]]);
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  __name: "VPButton",
  __ssrInlineRender: true,
  props: {
    tag: {},
    size: { default: "medium" },
    theme: { default: "brand" },
    text: {},
    href: {},
    target: {},
    rel: {}
  },
  setup(__props) {
    const props = __props;
    const isExternal2 = computed(
      () => props.href && EXTERNAL_URL_RE.test(props.href)
    );
    const component = computed(() => {
      return props.tag || (props.href ? "a" : "button");
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(component.value), mergeProps({
        class: ["VPButton", [__props.size, __props.theme]],
        href: __props.href ? unref(normalizeLink$1)(__props.href) : void 0,
        target: props.target ?? (isExternal2.value ? "_blank" : void 0),
        rel: props.rel ?? (isExternal2.value ? "noreferrer" : void 0)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(`${ssrInterpolate(__props.text)}`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(toDisplayString(__props.text), 1)
              ], true)
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPButton.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const VPButton = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["__scopeId", "data-v-01bff58b"]]);
const _sfc_main$_ = /* @__PURE__ */ defineComponent({
  ...{ inheritAttrs: false },
  __name: "VPImage",
  __ssrInlineRender: true,
  props: {
    image: {},
    alt: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VPImage = resolveComponent("VPImage", true);
      if (__props.image) {
        _push(`<!--[-->`);
        if (typeof __props.image === "string" || "src" in __props.image) {
          _push(`<img${ssrRenderAttrs(mergeProps({ class: "VPImage" }, typeof __props.image === "string" ? _ctx.$attrs : { ...__props.image, ..._ctx.$attrs }, {
            src: unref(withBase)(typeof __props.image === "string" ? __props.image : __props.image.src),
            alt: __props.alt ?? (typeof __props.image === "string" ? "" : __props.image.alt || "")
          }))} data-v-8426fc1a>`);
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_VPImage, mergeProps({
            class: "dark",
            image: __props.image.dark,
            alt: __props.image.alt
          }, _ctx.$attrs), null, _parent));
          _push(ssrRenderComponent(_component_VPImage, mergeProps({
            class: "light",
            image: __props.image.light,
            alt: __props.image.alt
          }, _ctx.$attrs), null, _parent));
          _push(`<!--]-->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPImage.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const VPImage = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["__scopeId", "data-v-8426fc1a"]]);
const _sfc_main$Z = /* @__PURE__ */ defineComponent({
  __name: "VPHero",
  __ssrInlineRender: true,
  props: {
    name: {},
    text: {},
    tagline: {},
    image: {},
    actions: {}
  },
  setup(__props) {
    const { heroImageSlotExists } = inject(
      layoutInfoInjectionKey,
      { heroImageSlotExists: computed(() => false) }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPHero", { "has-image": __props.image || unref(heroImageSlotExists) }]
      }, _attrs))} data-v-e394c869><div class="container" data-v-e394c869><div class="main" data-v-e394c869>`);
      ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, () => {
        _push(`<h1 class="heading" data-v-e394c869>`);
        if (__props.name) {
          _push(`<span class="name clip" data-v-e394c869>${__props.name ?? ""}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.text) {
          _push(`<span class="text" data-v-e394c869>${__props.text ?? ""}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</h1>`);
        if (__props.tagline) {
          _push(`<p class="tagline" data-v-e394c869>${__props.tagline ?? ""}</p>`);
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push, _parent);
      if (__props.actions) {
        _push(`<div class="actions" data-v-e394c869><!--[-->`);
        ssrRenderList(__props.actions, (action) => {
          _push(`<div class="action" data-v-e394c869>`);
          _push(ssrRenderComponent(VPButton, {
            tag: "a",
            size: "medium",
            theme: action.theme,
            text: action.text,
            href: action.link,
            target: action.target,
            rel: action.rel
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push, _parent);
      _push(`</div>`);
      if (__props.image || unref(heroImageSlotExists)) {
        _push(`<div class="image" data-v-e394c869><div class="image-container" data-v-e394c869><div class="image-bg" data-v-e394c869></div>`);
        ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, () => {
          if (__props.image) {
            _push(ssrRenderComponent(VPImage, {
              class: "image-src",
              image: __props.image
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHero.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const VPHero = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["__scopeId", "data-v-e394c869"]]);
const _sfc_main$Y = /* @__PURE__ */ defineComponent({
  __name: "VPHomeHero",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter: fm } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(fm).hero) {
        _push(ssrRenderComponent(VPHero, mergeProps({
          class: "VPHomeHero",
          name: unref(fm).hero.name,
          text: unref(fm).hero.text,
          tagline: unref(fm).hero.tagline,
          image: unref(fm).hero.image,
          actions: unref(fm).hero.actions
        }, _attrs), {
          "home-hero-info-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-before")
              ];
            }
          }),
          "home-hero-info": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info")
              ];
            }
          }),
          "home-hero-info-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-after")
              ];
            }
          }),
          "home-hero-actions-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-actions-after")
              ];
            }
          }),
          "home-hero-image": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-image")
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeHero.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  __name: "VPFeature",
  __ssrInlineRender: true,
  props: {
    icon: {},
    title: {},
    details: {},
    link: {},
    linkText: {},
    rel: {},
    target: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$13, mergeProps({
        class: "VPFeature",
        href: __props.link,
        rel: __props.rel,
        target: __props.target,
        "no-icon": true,
        tag: __props.link ? "a" : "div"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<article class="box" data-v-5219619b${_scopeId}>`);
            if (typeof __props.icon === "object" && __props.icon.wrap) {
              _push2(`<div class="icon" data-v-5219619b${_scopeId}>`);
              _push2(ssrRenderComponent(VPImage, {
                image: __props.icon,
                alt: __props.icon.alt,
                height: __props.icon.height || 48,
                width: __props.icon.width || 48
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (typeof __props.icon === "object") {
              _push2(ssrRenderComponent(VPImage, {
                image: __props.icon,
                alt: __props.icon.alt,
                height: __props.icon.height || 48,
                width: __props.icon.width || 48
              }, null, _parent2, _scopeId));
            } else if (__props.icon) {
              _push2(`<div class="icon" data-v-5219619b${_scopeId}>${__props.icon ?? ""}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h2 class="title" data-v-5219619b${_scopeId}>${__props.title ?? ""}</h2>`);
            if (__props.details) {
              _push2(`<p class="details" data-v-5219619b${_scopeId}>${__props.details ?? ""}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.linkText) {
              _push2(`<div class="link-text" data-v-5219619b${_scopeId}><p class="link-text-value" data-v-5219619b${_scopeId}>${ssrInterpolate(__props.linkText)} <span class="vpi-arrow-right link-text-icon" data-v-5219619b${_scopeId}></span></p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</article>`);
          } else {
            return [
              createVNode("article", { class: "box" }, [
                typeof __props.icon === "object" && __props.icon.wrap ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "icon"
                }, [
                  createVNode(VPImage, {
                    image: __props.icon,
                    alt: __props.icon.alt,
                    height: __props.icon.height || 48,
                    width: __props.icon.width || 48
                  }, null, 8, ["image", "alt", "height", "width"])
                ])) : typeof __props.icon === "object" ? (openBlock(), createBlock(VPImage, {
                  key: 1,
                  image: __props.icon,
                  alt: __props.icon.alt,
                  height: __props.icon.height || 48,
                  width: __props.icon.width || 48
                }, null, 8, ["image", "alt", "height", "width"])) : __props.icon ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "icon",
                  innerHTML: __props.icon
                }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                createVNode("h2", {
                  class: "title",
                  innerHTML: __props.title
                }, null, 8, ["innerHTML"]),
                __props.details ? (openBlock(), createBlock("p", {
                  key: 3,
                  class: "details",
                  innerHTML: __props.details
                }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                __props.linkText ? (openBlock(), createBlock("div", {
                  key: 4,
                  class: "link-text"
                }, [
                  createVNode("p", { class: "link-text-value" }, [
                    createTextVNode(toDisplayString(__props.linkText) + " ", 1),
                    createVNode("span", { class: "vpi-arrow-right link-text-icon" })
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFeature.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const VPFeature = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__scopeId", "data-v-5219619b"]]);
const _sfc_main$W = /* @__PURE__ */ defineComponent({
  __name: "VPFeatures",
  __ssrInlineRender: true,
  props: {
    features: {}
  },
  setup(__props) {
    const props = __props;
    const grid = computed(() => {
      const length = props.features.length;
      if (!length) {
        return;
      } else if (length === 2) {
        return "grid-2";
      } else if (length === 3) {
        return "grid-3";
      } else if (length % 3 === 0) {
        return "grid-6";
      } else if (length > 3) {
        return "grid-4";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.features) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPFeatures" }, _attrs))} data-v-a6181336><div class="container" data-v-a6181336><div class="items" data-v-a6181336><!--[-->`);
        ssrRenderList(__props.features, (feature) => {
          _push(`<div class="${ssrRenderClass([[grid.value], "item"])}" data-v-a6181336>`);
          _push(ssrRenderComponent(VPFeature, {
            icon: feature.icon,
            title: feature.title,
            details: feature.details,
            link: feature.link,
            "link-text": feature.linkText,
            rel: feature.rel,
            target: feature.target
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFeatures.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const VPFeatures = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__scopeId", "data-v-a6181336"]]);
const _sfc_main$V = /* @__PURE__ */ defineComponent({
  __name: "VPHomeFeatures",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter: fm } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(fm).features) {
        _push(ssrRenderComponent(VPFeatures, mergeProps({
          class: "VPHomeFeatures",
          features: unref(fm).features
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeFeatures.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const _sfc_main$U = /* @__PURE__ */ defineComponent({
  __name: "VPHomeContent",
  __ssrInlineRender: true,
  setup(__props) {
    const { width: vw } = useWindowSize({
      initialWidth: 0,
      includeScrollbar: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "vp-doc container",
        style: unref(vw) ? { "--vp-offset": `calc(50% - ${unref(vw) / 2}px)` } : {}
      }, _attrs))} data-v-8e2d4988>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeContent.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const VPHomeContent = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["__scopeId", "data-v-8e2d4988"]]);
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  __name: "VPHome",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter, theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = resolveComponent("Content");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPHome", {
          "external-link-icon-enabled": unref(theme2).externalLinkIcon
        }]
      }, _attrs))} data-v-8b561e3d>`);
      ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$Y, null, {
        "home-hero-info-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)
            ];
          }
        }),
        "home-hero-info": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)
            ];
          }
        }),
        "home-hero-info-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)
            ];
          }
        }),
        "home-hero-actions-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)
            ];
          }
        }),
        "home-hero-image": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$V, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push, _parent);
      if (unref(frontmatter).markdownStyles !== false) {
        _push(ssrRenderComponent(VPHomeContent, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Content, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Content)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_Content, null, null, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHome.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const VPHome = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__scopeId", "data-v-8b561e3d"]]);
const _sfc_main$S = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_Content = resolveComponent("Content");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPPage" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push, _parent);
  _push(ssrRenderComponent(_component_Content, null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPPage.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const VPPage = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  __name: "VPContent",
  __ssrInlineRender: true,
  setup(__props) {
    const { page, frontmatter } = useData();
    const { isHome, hasSidebar } = useLayout();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPContent", { "has-sidebar": unref(hasSidebar), "is-home": unref(isHome) }],
        id: "VPContent"
      }, _attrs))} data-v-c87f25bf>`);
      if (unref(page).isNotFound) {
        ssrRenderSlot(_ctx.$slots, "not-found", {}, () => {
          _push(ssrRenderComponent(NotFound, null, null, _parent));
        }, _push, _parent);
      } else if (unref(frontmatter).layout === "page") {
        _push(ssrRenderComponent(VPPage, null, {
          "page-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "page-top", {}, void 0, true)
              ];
            }
          }),
          "page-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "page-bottom", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
      } else if (unref(frontmatter).layout === "home") {
        _push(ssrRenderComponent(VPHome, null, {
          "home-hero-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-before", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)
              ];
            }
          }),
          "home-hero-actions-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)
              ];
            }
          }),
          "home-hero-image": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)
              ];
            }
          }),
          "home-hero-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-after", {}, void 0, true)
              ];
            }
          }),
          "home-features-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-before", {}, void 0, true)
              ];
            }
          }),
          "home-features-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
      } else if (unref(frontmatter).layout && unref(frontmatter).layout !== "doc") {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(frontmatter).layout), null, null), _parent);
      } else {
        _push(ssrRenderComponent(VPDoc, null, {
          "doc-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-top", {}, void 0, true)
              ];
            }
          }),
          "doc-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-bottom", {}, void 0, true)
              ];
            }
          }),
          "doc-footer-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
              ];
            }
          }),
          "doc-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-before", {}, void 0, true)
              ];
            }
          }),
          "doc-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)
              ];
            }
          }),
          "aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
              ];
            }
          }),
          "aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPContent.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const VPContent = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__scopeId", "data-v-c87f25bf"]]);
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  __name: "VPFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2, frontmatter } = useData();
    const { hasSidebar } = useLayout();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).footer && unref(frontmatter).footer !== false) {
        _push(`<footer${ssrRenderAttrs(mergeProps({
          class: ["VPFooter", { "has-sidebar": unref(hasSidebar) }]
        }, _attrs))} data-v-c3855bb3><div class="container" data-v-c3855bb3>`);
        if (unref(theme2).footer.message) {
          _push(`<p class="message" data-v-c3855bb3>${unref(theme2).footer.message ?? ""}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(theme2).footer.copyright) {
          _push(`<p class="copyright" data-v-c3855bb3>${unref(theme2).footer.copyright ?? ""}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></footer>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFooter.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const VPFooter = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__scopeId", "data-v-c3855bb3"]]);
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  __name: "VPLocalNavOutlineDropdown",
  __ssrInlineRender: true,
  props: {
    headers: {},
    navHeight: {}
  },
  setup(__props) {
    const { theme: theme2 } = useData();
    const open = ref(false);
    const vh = ref(0);
    const main = ref();
    ref();
    function closeOnClickOutside(e) {
      if (!main.value?.contains(e.target)) {
        open.value = false;
      }
    }
    watch(open, (value) => {
      if (value) {
        document.addEventListener("click", closeOnClickOutside);
        return;
      }
      document.removeEventListener("click", closeOnClickOutside);
    });
    onKeyStroke("Escape", () => {
      open.value = false;
    });
    onContentUpdated(() => {
      open.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "VPLocalNavOutlineDropdown",
        style: { "--vp-vh": vh.value + "px" },
        ref_key: "main",
        ref: main
      }, _attrs))} data-v-0bf0e06f>`);
      if (__props.headers.length > 0) {
        _push(`<button class="${ssrRenderClass({ open: open.value })}" data-v-0bf0e06f><span class="menu-text" data-v-0bf0e06f>${ssrInterpolate(unref(resolveTitle)(unref(theme2)))}</span><span class="vpi-chevron-right icon" data-v-0bf0e06f></span></button>`);
      } else {
        _push(`<button data-v-0bf0e06f>${ssrInterpolate(unref(theme2).returnToTopLabel || "Return to top")}</button>`);
      }
      if (open.value) {
        _push(`<div class="items" data-v-0bf0e06f><div class="header" data-v-0bf0e06f><a class="top-link" href="#" data-v-0bf0e06f>${ssrInterpolate(unref(theme2).returnToTopLabel || "Return to top")}</a></div><div class="outline" data-v-0bf0e06f>`);
        _push(ssrRenderComponent(VPDocOutlineItem, { headers: __props.headers }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLocalNavOutlineDropdown.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const VPLocalNavOutlineDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__scopeId", "data-v-0bf0e06f"]]);
const _sfc_main$O = /* @__PURE__ */ defineComponent({
  __name: "VPLocalNav",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  emits: ["open-menu"],
  setup(__props) {
    const { theme: theme2 } = useData();
    const { isHome, hasSidebar, headers: headers2, hasLocalNav } = useLayout();
    const { y } = useWindowScroll();
    const navHeight = ref(0);
    onMounted(() => {
      navHeight.value = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--vp-nav-height"
        )
      );
    });
    const classes = computed(() => {
      return {
        VPLocalNav: true,
        "has-sidebar": hasSidebar.value,
        empty: !hasLocalNav.value,
        fixed: !hasLocalNav.value && !hasSidebar.value
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (!unref(isHome) && (unref(hasLocalNav) || unref(hasSidebar) || unref(y) >= navHeight.value)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: classes.value }, _attrs))} data-v-db738f89><div class="container" data-v-db738f89>`);
        if (unref(hasSidebar)) {
          _push(`<button class="menu"${ssrRenderAttr("aria-expanded", __props.open)} aria-controls="VPSidebarNav" data-v-db738f89><span class="vpi-align-left menu-icon" data-v-db738f89></span><span class="menu-text" data-v-db738f89>${ssrInterpolate(unref(theme2).sidebarMenuLabel || "Menu")}</span></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(VPLocalNavOutlineDropdown, {
          headers: unref(headers2),
          navHeight: navHeight.value
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPLocalNav.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const VPLocalNav = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__scopeId", "data-v-db738f89"]]);
function useNav() {
  const isScreenOpen = ref(false);
  function openScreen() {
    isScreenOpen.value = true;
    window.addEventListener("resize", closeScreenOnTabletWindow);
  }
  function closeScreen() {
    isScreenOpen.value = false;
    window.removeEventListener("resize", closeScreenOnTabletWindow);
  }
  function toggleScreen() {
    isScreenOpen.value ? closeScreen() : openScreen();
  }
  function closeScreenOnTabletWindow() {
    window.outerWidth >= 768 && closeScreen();
  }
  const route = useRoute();
  watch(() => route.path, closeScreen);
  return {
    isScreenOpen,
    openScreen,
    closeScreen,
    toggleScreen
  };
}
const navInjectionKey = /* @__PURE__ */ Symbol("nav");
const _sfc_main$N = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    class: "VPSwitch",
    type: "button",
    role: "switch"
  }, _attrs))} data-v-1d5665e3><span class="check" data-v-1d5665e3>`);
  if (_ctx.$slots.default) {
    _push(`<span class="icon" data-v-1d5665e3>`);
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</span></button>`);
}
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSwitch.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const VPSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-1d5665e3"]]);
const _sfc_main$M = /* @__PURE__ */ defineComponent({
  __name: "VPSwitchAppearance",
  __ssrInlineRender: true,
  setup(__props) {
    const { isDark, theme: theme2 } = useData();
    const toggleAppearance = inject("toggle-appearance", () => {
      isDark.value = !isDark.value;
    });
    const switchTitle = ref("");
    watchPostEffect(() => {
      switchTitle.value = isDark.value ? theme2.value.lightModeSwitchTitle || "Switch to light theme" : theme2.value.darkModeSwitchTitle || "Switch to dark theme";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VPSwitch, mergeProps({
        title: switchTitle.value,
        class: "VPSwitchAppearance",
        "aria-checked": unref(isDark),
        onClick: unref(toggleAppearance)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="vpi-sun sun" data-v-5337faa4${_scopeId}></span><span class="vpi-moon moon" data-v-5337faa4${_scopeId}></span>`);
          } else {
            return [
              createVNode("span", { class: "vpi-sun sun" }),
              createVNode("span", { class: "vpi-moon moon" })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const VPSwitchAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-5337faa4"]]);
const _sfc_main$L = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarAppearance",
  __ssrInlineRender: true,
  setup(__props) {
    const { site } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavBarAppearance" }, _attrs))} data-v-6c893767>`);
        _push(ssrRenderComponent(VPSwitchAppearance, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarAppearance.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const VPNavBarAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__scopeId", "data-v-6c893767"]]);
const focusedElement = ref();
let active = false;
let listeners = 0;
function useFlyout(options) {
  const focus = ref(false);
  if (inBrowser) {
    !active && activateFocusTracking();
    listeners++;
    const unwatch = watch(focusedElement, (el) => {
      if (el === options.el.value || options.el.value?.contains(el)) {
        focus.value = true;
        options.onFocus?.();
      } else {
        focus.value = false;
        options.onBlur?.();
      }
    });
    onUnmounted(() => {
      unwatch();
      listeners--;
      if (!listeners) {
        deactivateFocusTracking();
      }
    });
  }
  return readonly(focus);
}
function activateFocusTracking() {
  document.addEventListener("focusin", handleFocusIn);
  active = true;
  focusedElement.value = document.activeElement;
}
function deactivateFocusTracking() {
  document.removeEventListener("focusin", handleFocusIn);
}
function handleFocusIn() {
  focusedElement.value = document.activeElement;
}
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  ...{ inheritAttrs: false },
  __name: "VPMenuLink",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const { page } = useData();
    const href = computed(
      () => typeof props.item.link === "function" ? props.item.link(page.value) : props.item.link
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenuLink" }, _attrs))} data-v-faf5b206>`);
      _push(ssrRenderComponent(_sfc_main$13, mergeProps(_ctx.$attrs, {
        class: {
          active: unref(isActive)(
            unref(page).relativePath,
            __props.item.activeMatch || href.value,
            !!__props.item.activeMatch
          )
        },
        href: href.value,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon
      }), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-faf5b206${_scopeId}>${__props.item.text ?? ""}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: __props.item.text
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenuLink.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const VPMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-faf5b206"]]);
const _sfc_main$J = /* @__PURE__ */ defineComponent({
  __name: "VPMenuGroup",
  __ssrInlineRender: true,
  props: {
    text: {},
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenuGroup" }, _attrs))} data-v-1963e1bb>`);
      if (__props.text) {
        _push(`<p class="title" data-v-1963e1bb>${ssrInterpolate(__props.text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<!--[-->`);
        if ("link" in item) {
          _push(ssrRenderComponent(VPMenuLink, { item }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenuGroup.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const VPMenuGroup = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-1963e1bb"]]);
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  __name: "VPMenu",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPMenu" }, _attrs))} data-v-25a6cce8>`);
      if (__props.items) {
        _push(`<div class="items" data-v-25a6cce8><!--[-->`);
        ssrRenderList(__props.items, (item) => {
          _push(`<!--[-->`);
          if ("link" in item) {
            _push(ssrRenderComponent(VPMenuLink, { item }, null, _parent));
          } else if ("component" in item) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props), null), _parent);
          } else {
            _push(ssrRenderComponent(VPMenuGroup, {
              text: item.text,
              items: item.items
            }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPMenu.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const VPMenu = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__scopeId", "data-v-25a6cce8"]]);
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "VPFlyout",
  __ssrInlineRender: true,
  props: {
    icon: {},
    button: {},
    label: {},
    items: {}
  },
  setup(__props) {
    const open = ref(false);
    const el = ref();
    useFlyout({ el, onBlur });
    function onBlur() {
      open.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "VPFlyout",
        ref_key: "el",
        ref: el
      }, _attrs))} data-v-42cb505d><button type="button" class="button" aria-haspopup="true"${ssrRenderAttr("aria-expanded", open.value)}${ssrRenderAttr("aria-label", __props.label)} data-v-42cb505d>`);
      if (__props.button || __props.icon) {
        _push(`<span class="text" data-v-42cb505d>`);
        if (__props.icon) {
          _push(`<span class="${ssrRenderClass([__props.icon, "option-icon"])}" data-v-42cb505d></span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.button) {
          _push(`<span data-v-42cb505d>${__props.button ?? ""}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="vpi-chevron-down text-icon" data-v-42cb505d></span></span>`);
      } else {
        _push(`<span class="vpi-more-horizontal icon" data-v-42cb505d></span>`);
      }
      _push(`</button><div class="menu" data-v-42cb505d>`);
      _push(ssrRenderComponent(VPMenu, { items: __props.items }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPFlyout.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const VPFlyout = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-42cb505d"]]);
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  __name: "VPSocialLink",
  __ssrInlineRender: true,
  props: {
    icon: {},
    link: {},
    ariaLabel: {},
    me: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const el = ref();
    onMounted(async () => {
      await nextTick();
      const span = el.value?.children[0];
      if (span instanceof HTMLElement && span.className.startsWith("vpi-social-") && (getComputedStyle(span).maskImage || getComputedStyle(span).webkitMaskImage) === "none") {
        span.style.setProperty(
          "--icon",
          `url('https://api.iconify.design/simple-icons/${props.icon}.svg')`
        );
      }
    });
    const svg = computed(() => {
      if (typeof props.icon === "object") return props.icon.svg;
      return `<span class="vpi-social-${props.icon}"></span>`;
    });
    {
      typeof props.icon === "string" && useSSRContext()?.vpSocialIcons.add(props.icon);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        ref_key: "el",
        ref: el,
        class: "VPSocialLink no-icon",
        href: __props.link,
        "aria-label": __props.ariaLabel ?? (typeof __props.icon === "string" ? __props.icon : ""),
        target: "_blank",
        rel: __props.me ? "me noopener" : "noopener"
      }, _attrs))} data-v-591a6b30>${svg.value ?? ""}</a>`);
    };
  }
});
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSocialLink.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const VPSocialLink = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-591a6b30"]]);
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "VPSocialLinks",
  __ssrInlineRender: true,
  props: {
    links: {},
    me: { type: Boolean, default: true }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPSocialLinks" }, _attrs))} data-v-d07f11e6><!--[-->`);
      ssrRenderList(__props.links, ({ link: link2, icon, ariaLabel }) => {
        _push(ssrRenderComponent(VPSocialLink, {
          key: link2,
          icon,
          link: link2,
          ariaLabel,
          me: __props.me
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSocialLinks.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const VPSocialLinks = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-d07f11e6"]]);
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarExtra",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, theme: theme2 } = useData();
    const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
    const hasExtraContent = computed(
      () => localeLinks.value.length && currentLang.value.label || site.value.appearance || theme2.value.socialLinks
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (hasExtraContent.value) {
        _push(ssrRenderComponent(VPFlyout, mergeProps({
          class: "VPNavBarExtra",
          label: "extra navigation"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(localeLinks).length && unref(currentLang).label) {
                _push2(`<div class="group translations" data-v-bf2fac68${_scopeId}><p class="trans-title" data-v-bf2fac68${_scopeId}>${ssrInterpolate(unref(currentLang).label)}</p><!--[-->`);
                ssrRenderList(unref(localeLinks), (locale) => {
                  _push2(ssrRenderComponent(VPMenuLink, {
                    item: locale,
                    lang: locale.lang,
                    dir: locale.dir
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto") {
                _push2(`<div class="group" data-v-bf2fac68${_scopeId}><div class="item appearance" data-v-bf2fac68${_scopeId}><p class="label" data-v-bf2fac68${_scopeId}>${ssrInterpolate(unref(theme2).darkModeSwitchLabel || "Appearance")}</p><div class="appearance-action" data-v-bf2fac68${_scopeId}>`);
                _push2(ssrRenderComponent(VPSwitchAppearance, null, null, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(theme2).socialLinks) {
                _push2(`<div class="group" data-v-bf2fac68${_scopeId}><div class="item social-links" data-v-bf2fac68${_scopeId}>`);
                _push2(ssrRenderComponent(VPSocialLinks, {
                  class: "social-links-list",
                  links: unref(theme2).socialLinks
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(localeLinks).length && unref(currentLang).label ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "group translations"
                }, [
                  createVNode("p", { class: "trans-title" }, toDisplayString(unref(currentLang).label), 1),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(localeLinks), (locale) => {
                    return openBlock(), createBlock(VPMenuLink, {
                      key: locale.link,
                      item: locale,
                      lang: locale.lang,
                      dir: locale.dir
                    }, null, 8, ["item", "lang", "dir"]);
                  }), 128))
                ])) : createCommentVNode("", true),
                unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "group"
                }, [
                  createVNode("div", { class: "item appearance" }, [
                    createVNode("p", { class: "label" }, toDisplayString(unref(theme2).darkModeSwitchLabel || "Appearance"), 1),
                    createVNode("div", { class: "appearance-action" }, [
                      createVNode(VPSwitchAppearance)
                    ])
                  ])
                ])) : createCommentVNode("", true),
                unref(theme2).socialLinks ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "group"
                }, [
                  createVNode("div", { class: "item social-links" }, [
                    createVNode(VPSocialLinks, {
                      class: "social-links-list",
                      links: unref(theme2).socialLinks
                    }, null, 8, ["links"])
                  ])
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarExtra.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const VPNavBarExtra = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-bf2fac68"]]);
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarHamburger",
  __ssrInlineRender: true,
  props: {
    active: { type: Boolean }
  },
  emits: ["click"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: ["VPNavBarHamburger", { active: __props.active }],
        "aria-label": "mobile navigation",
        "aria-expanded": __props.active,
        "aria-controls": "VPNavScreen"
      }, _attrs))} data-v-e5dd9c1c><span class="container" data-v-e5dd9c1c><span class="top" data-v-e5dd9c1c></span><span class="middle" data-v-e5dd9c1c></span><span class="bottom" data-v-e5dd9c1c></span></span></button>`);
    };
  }
});
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarHamburger.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const VPNavBarHamburger = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-e5dd9c1c"]]);
const _sfc_main$C = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenuLink",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const { page } = useData();
    const href = computed(
      () => typeof props.item.link === "function" ? props.item.link(page.value) : props.item.link
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$13, mergeProps({
        class: {
          VPNavBarMenuLink: true,
          active: unref(isActive)(
            unref(page).relativePath,
            __props.item.activeMatch || href.value,
            !!__props.item.activeMatch
          )
        },
        href: href.value,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon,
        tabindex: "0"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-52a1d768${_scopeId}>${__props.item.text ?? ""}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: __props.item.text
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const VPNavBarMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-52a1d768"]]);
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenuGroup",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const { page } = useData();
    const isChildActive = (navItem) => {
      if ("component" in navItem) return false;
      if ("link" in navItem) {
        return isActive(
          page.value.relativePath,
          typeof navItem.link === "function" ? navItem.link(page.value) : navItem.link,
          !!props.item.activeMatch
        );
      }
      return navItem.items.some(isChildActive);
    };
    const childrenActive = computed(() => isChildActive(props.item));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VPFlyout, mergeProps({
        class: {
          VPNavBarMenuGroup: true,
          active: unref(isActive)(unref(page).relativePath, __props.item.activeMatch, !!__props.item.activeMatch) || childrenActive.value
        },
        button: __props.item.text,
        items: __props.item.items
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).nav) {
        _push(`<nav${ssrRenderAttrs(mergeProps({
          "aria-labelledby": "main-nav-aria-label",
          class: "VPNavBarMenu"
        }, _attrs))} data-v-39714824><span id="main-nav-aria-label" class="visually-hidden" data-v-39714824> Main Navigation </span><!--[-->`);
        ssrRenderList(unref(theme2).nav, (item) => {
          _push(`<!--[-->`);
          if ("link" in item) {
            _push(ssrRenderComponent(VPNavBarMenuLink, { item }, null, _parent));
          } else if ("component" in item) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props), null), _parent);
          } else {
            _push(ssrRenderComponent(_sfc_main$B, { item }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarMenu.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const VPNavBarMenu = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-39714824"]]);
function resolveMode(options) {
  const mode = options.mode ?? "auto";
  const hasKeyword = hasKeywordSearch(options);
  const askAi = options.askAi;
  const hasSidePanelConfig = Boolean(askAi && typeof askAi === "object" && askAi.sidePanel);
  switch (mode) {
    case "sidePanel":
      return {
        mode,
        showKeywordSearch: false,
        useSidePanel: true
      };
    case "hybrid":
      if (!hasKeyword) {
        console.error('[vitepress] mode: "hybrid" requires keyword search credentials (appId, apiKey, indexName).');
      }
      return {
        mode,
        showKeywordSearch: hasKeyword,
        useSidePanel: true
      };
    case "modal":
      return {
        mode,
        showKeywordSearch: hasKeyword,
        useSidePanel: false
      };
    case "auto":
    default:
      return {
        mode: "auto",
        showKeywordSearch: hasKeyword,
        useSidePanel: hasSidePanelConfig
      };
  }
}
function hasKeywordSearch(options) {
  return Boolean(options.appId && options.apiKey && options.indexName);
}
function mergeLangFacetFilters(rawFacetFilters, lang) {
  const input = Array.isArray(rawFacetFilters) ? rawFacetFilters : rawFacetFilters ? [rawFacetFilters] : [];
  const filtered = input.map((filter) => {
    if (Array.isArray(filter)) {
      return filter.filter((f) => typeof f === "string" && !f.startsWith("lang:"));
    }
    return filter;
  }).filter((filter) => {
    if (typeof filter === "string") {
      return !filter.startsWith("lang:");
    }
    return Array.isArray(filter) && filter.length > 0;
  });
  return [...filtered, `lang:${lang}`];
}
function buildAskAiConfig(askAiProp, options, lang) {
  const isAskAiString = typeof askAiProp === "string";
  const askAiSearchParameters = !isAskAiString && askAiProp.searchParameters ? { ...askAiProp.searchParameters } : void 0;
  const askAiFacetFiltersSource = askAiSearchParameters?.facetFilters ?? options.searchParameters?.facetFilters;
  const askAiFacetFilters = mergeLangFacetFilters(askAiFacetFiltersSource, lang);
  const mergedAskAiSearchParameters = {
    ...askAiSearchParameters,
    facetFilters: askAiFacetFilters.length ? askAiFacetFilters : void 0
  };
  const result = {
    ...isAskAiString ? {} : askAiProp,
    indexName: isAskAiString ? options.indexName : askAiProp.indexName,
    apiKey: isAskAiString ? options.apiKey : askAiProp.apiKey,
    appId: isAskAiString ? options.appId : askAiProp.appId,
    assistantId: isAskAiString ? askAiProp : askAiProp.assistantId
  };
  if (Object.values(mergedAskAiSearchParameters).some((v) => v != null)) {
    result.searchParameters = mergedAskAiSearchParameters;
  }
  return result;
}
function resolveOptionsForLanguage(options, localeIndex, lang) {
  options = deepMerge(options, options.locales?.[localeIndex] || {});
  const facetFilters = mergeLangFacetFilters(options.searchParameters?.facetFilters, lang);
  const askAi = options.askAi ? buildAskAiConfig(options.askAi, options, lang) : void 0;
  return {
    ...options,
    searchParameters: { ...options.searchParameters, facetFilters },
    askAi
  };
}
function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    const value = source[key];
    if (value === void 0)
      continue;
    if (key === "searchParameters") {
      result[key] = value;
      continue;
    }
    if (isObject(value) && isObject(result[key])) {
      result[key] = deepMerge(result[key], value);
    } else {
      result[key] = value;
    }
  }
  delete result.locales;
  return result;
}
function smartComputed(getter, comparator = (oldValue, newValue) => JSON.stringify(oldValue) === JSON.stringify(newValue)) {
  return computed((oldValue) => {
    const newValue = getter();
    return oldValue === void 0 || !comparator(oldValue, newValue) ? newValue : oldValue;
  });
}
const _sfc_main$z = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    type: "button",
    class: "VPNavBarAskAiButton"
  }, _attrs))} data-v-4eb17e89><span class="vpi-sparkles" aria-hidden="true" data-v-4eb17e89></span></button>`);
}
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarAskAiButton.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const VPNavBarAskAiButton = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4eb17e89"]]);
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarSearchButton",
  __ssrInlineRender: true,
  props: {
    text: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: "VPNavBarSearchButton"
      }, _attrs))} data-v-baa3be99><span class="vpi-search" aria-hidden="true" data-v-baa3be99></span><span class="text" data-v-baa3be99>${ssrInterpolate(__props.text)}</span><span class="keys" aria-hidden="true" data-v-baa3be99><kbd class="key-cmd" data-v-baa3be99>⌘</kbd><kbd class="key-ctrl" data-v-baa3be99>Ctrl</kbd><kbd data-v-baa3be99>K</kbd></span></button>`);
    };
  }
});
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSearchButton.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const VPNavBarSearchButton = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-baa3be99"]]);
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarSearch",
  __ssrInlineRender: true,
  setup(__props) {
    const VPLocalSearchBox = defineAsyncComponent(() => import("./VPLocalSearchBox.DmSetyus.js"));
    const VPAlgoliaSearchBox = () => null;
    const { theme: theme2, localeIndex, lang } = useData();
    const provider = "local";
    const algoliaOptions = smartComputed(() => {
      return resolveOptionsForLanguage(
        theme2.value.search?.options || {},
        localeIndex.value,
        lang.value
      );
    });
    const resolvedMode = computed(() => resolveMode(algoliaOptions.value));
    const askAiSidePanelConfig = computed(() => {
      if (!resolvedMode.value.useSidePanel) return null;
      const askAi = algoliaOptions.value.askAi;
      if (!askAi || typeof askAi === "string") return null;
      if (!askAi.sidePanel) return null;
      return askAi.sidePanel === true ? {} : askAi.sidePanel;
    });
    const askAiShortcutEnabled = computed(() => {
      return askAiSidePanelConfig.value?.keyboardShortcuts?.["Ctrl/Cmd+I"] !== false;
    });
    const openRequest = ref(null);
    let openNonce = 0;
    const loaded = ref(false);
    const actuallyLoaded = ref(false);
    onMounted(() => {
      return;
    });
    function loadAndOpen(target) {
      if (!loaded.value) {
        loaded.value = true;
      }
      openRequest.value = { target, nonce: ++openNonce };
    }
    const showSearch = ref(false);
    {
      onKeyStroke("k", (event) => {
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          showSearch.value = true;
        }
      });
      onKeyStroke("/", (event) => {
        if (!isEditingContent(event)) {
          event.preventDefault();
          showSearch.value = true;
        }
      });
    }
    function isEditingContent(event) {
      const element = event.target;
      const tagName = element.tagName;
      return element.isContentEditable || tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavBarSearch" }, _attrs))} data-v-2fc7f2c6>`);
      if (unref(provider) === "algolia") {
        _push(`<!--[-->`);
        if (resolvedMode.value.showKeywordSearch) {
          _push(ssrRenderComponent(VPNavBarSearchButton, {
            text: unref(algoliaOptions).translations?.button?.buttonText || "Search",
            "aria-label": unref(algoliaOptions).translations?.button?.buttonAriaLabel || "Search",
            "aria-keyshortcuts": "/ control+k meta+k",
            onClick: ($event) => loadAndOpen("search")
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (askAiSidePanelConfig.value) {
          _push(ssrRenderComponent(VPNavBarAskAiButton, {
            "aria-label": askAiSidePanelConfig.value.button?.translations?.buttonAriaLabel || "Ask AI",
            "aria-keyshortcuts": askAiShortcutEnabled.value ? "control+i meta+i" : void 0,
            onClick: ($event) => actuallyLoaded.value ? loadAndOpen("toggleAskAi") : loadAndOpen("askAi")
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (loaded.value) {
          _push(ssrRenderComponent(unref(VPAlgoliaSearchBox), {
            "algolia-options": unref(algoliaOptions),
            "open-request": openRequest.value,
            onVnodeBeforeMount: ($event) => actuallyLoaded.value = true
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else if (unref(provider) === "local") {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(VPNavBarSearchButton, {
          text: unref(algoliaOptions).translations?.button?.buttonText || "Search",
          "aria-label": unref(algoliaOptions).translations?.button?.buttonAriaLabel || "Search",
          "aria-keyshortcuts": "/ control+k meta+k",
          onClick: ($event) => showSearch.value = true
        }, null, _parent));
        if (showSearch.value) {
          _push(ssrRenderComponent(unref(VPLocalSearchBox), {
            onClose: ($event) => showSearch.value = false
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSearch.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const VPNavBarSearch = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-2fc7f2c6"]]);
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarSocialLinks",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).socialLinks) {
        _push(ssrRenderComponent(VPSocialLinks, mergeProps({
          class: "VPNavBarSocialLinks",
          links: unref(theme2).socialLinks
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const VPNavBarSocialLinks = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-0394ad82"]]);
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarTitle",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, theme: theme2 } = useData();
    const { hasSidebar } = useLayout();
    const { currentLang } = useLangs();
    const link2 = computed(
      () => typeof theme2.value.logoLink === "string" ? theme2.value.logoLink : theme2.value.logoLink?.link
    );
    const rel = computed(
      () => typeof theme2.value.logoLink === "string" ? void 0 : theme2.value.logoLink?.rel
    );
    const target = computed(
      () => typeof theme2.value.logoLink === "string" ? void 0 : theme2.value.logoLink?.target
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPNavBarTitle", { "has-sidebar": unref(hasSidebar) }]
      }, _attrs))} data-v-1e38c6bc><a class="title"${ssrRenderAttr("href", link2.value ?? unref(normalizeLink$1)(unref(currentLang).link))}${ssrRenderAttr("rel", rel.value)}${ssrRenderAttr("target", target.value)} data-v-1e38c6bc>`);
      ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push, _parent);
      if (unref(theme2).logo) {
        _push(ssrRenderComponent(VPImage, {
          class: "logo",
          image: unref(theme2).logo
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(theme2).siteTitle) {
        _push(`<span data-v-1e38c6bc>${unref(theme2).siteTitle ?? ""}</span>`);
      } else if (unref(theme2).siteTitle === void 0) {
        _push(`<span data-v-1e38c6bc>${ssrInterpolate(unref(site).title)}</span>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push, _parent);
      _push(`</a></div>`);
    };
  }
});
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarTitle.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const VPNavBarTitle = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-1e38c6bc"]]);
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarTranslations",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(localeLinks).length && unref(currentLang).label) {
        _push(ssrRenderComponent(VPFlyout, mergeProps({
          class: "VPNavBarTranslations",
          icon: "vpi-languages",
          label: unref(theme2).langMenuLabel || "Change language"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="items" data-v-4c1766e2${_scopeId}><p class="title" data-v-4c1766e2${_scopeId}>${ssrInterpolate(unref(currentLang).label)}</p><!--[-->`);
              ssrRenderList(unref(localeLinks), (locale) => {
                _push2(ssrRenderComponent(VPMenuLink, {
                  item: locale,
                  lang: locale.lang,
                  dir: locale.dir
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "items" }, [
                  createVNode("p", { class: "title" }, toDisplayString(unref(currentLang).label), 1),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(localeLinks), (locale) => {
                    return openBlock(), createBlock(VPMenuLink, {
                      key: locale.link,
                      item: locale,
                      lang: locale.lang,
                      dir: locale.dir
                    }, null, 8, ["item", "lang", "dir"]);
                  }), 128))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBarTranslations.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const VPNavBarTranslations = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-4c1766e2"]]);
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "VPNavBar",
  __ssrInlineRender: true,
  props: {
    isScreenOpen: { type: Boolean }
  },
  emits: ["toggle-screen"],
  setup(__props) {
    const { y } = useWindowScroll();
    const { isHome, hasSidebar } = useLayout();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPNavBar", {
          "has-sidebar": unref(hasSidebar),
          "home": unref(isHome),
          "top": unref(y) === 0,
          "screen-open": __props.isScreenOpen
        }]
      }, _attrs))} data-v-9ca1369d><div class="wrapper" data-v-9ca1369d><div class="container" data-v-9ca1369d><div class="title" data-v-9ca1369d>`);
      _push(ssrRenderComponent(VPNavBarTitle, null, {
        "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
            ];
          }
        }),
        "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div><div class="content" data-v-9ca1369d><div class="content-body" data-v-9ca1369d>`);
      ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push, _parent);
      _push(ssrRenderComponent(VPNavBarSearch, { class: "search" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarMenu, { class: "menu" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarTranslations, { class: "translations" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarAppearance, { class: "appearance" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarSocialLinks, { class: "social-links" }, null, _parent));
      _push(ssrRenderComponent(VPNavBarExtra, { class: "extra" }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push, _parent);
      _push(ssrRenderComponent(VPNavBarHamburger, {
        class: "hamburger",
        active: __props.isScreenOpen,
        onClick: ($event) => _ctx.$emit("toggle-screen")
      }, null, _parent));
      _push(`</div></div></div></div><div class="divider" data-v-9ca1369d><div class="divider-line" data-v-9ca1369d></div></div></div>`);
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavBar.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const VPNavBar = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-9ca1369d"]]);
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenAppearance",
  __ssrInlineRender: true,
  setup(__props) {
    const { site, theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavScreenAppearance" }, _attrs))} data-v-b44890b2><p class="text" data-v-b44890b2>${ssrInterpolate(unref(theme2).darkModeSwitchLabel || "Appearance")}</p>`);
        _push(ssrRenderComponent(VPSwitchAppearance, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenAppearance.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const VPNavScreenAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-b44890b2"]]);
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuLink",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const { page } = useData();
    const href = computed(
      () => typeof props.item.link === "function" ? props.item.link(page.value) : props.item.link
    );
    const isActiveLink = computed(
      () => isActive(
        page.value.relativePath,
        props.item.activeMatch || href.value,
        !!props.item.activeMatch
      )
    );
    const { closeScreen } = inject(navInjectionKey);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$13, mergeProps({
        class: { VPNavScreenMenuLink: true, active: isActiveLink.value },
        href: href.value,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon,
        onClick: unref(closeScreen)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-b924ab8a${_scopeId}>${__props.item.text ?? ""}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: __props.item.text
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuLink.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const VPNavScreenMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-b924ab8a"]]);
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroupLink",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const { page } = useData();
    const href = computed(
      () => typeof props.item.link === "function" ? props.item.link(page.value) : props.item.link
    );
    const isActiveLink = computed(
      () => isActive(
        page.value.relativePath,
        props.item.activeMatch || href.value,
        !!props.item.activeMatch
      )
    );
    const { closeScreen } = inject(navInjectionKey);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$13, mergeProps({
        class: { VPNavScreenMenuGroupLink: true, active: isActiveLink.value },
        href: href.value,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon,
        onClick: unref(closeScreen)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-ecf4b472${_scopeId}>${__props.item.text ?? ""}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: __props.item.text
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupLink.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const VPNavScreenMenuGroupLink = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-ecf4b472"]]);
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroupSection",
  __ssrInlineRender: true,
  props: {
    text: {},
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPNavScreenMenuGroupSection" }, _attrs))} data-v-4b7a798b>`);
      if (__props.text) {
        _push(`<p class="title" data-v-4b7a798b>${ssrInterpolate(__props.text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(ssrRenderComponent(VPNavScreenMenuGroupLink, {
          key: item.text,
          item
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupSection.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const VPNavScreenMenuGroupSection = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-4b7a798b"]]);
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroup",
  __ssrInlineRender: true,
  props: {
    text: {},
    items: {}
  },
  setup(__props) {
    const props = __props;
    const isOpen2 = ref(false);
    const groupId = computed(
      () => `NavScreenGroup-${props.text.replace(" ", "-").toLowerCase()}`
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPNavScreenMenuGroup", { open: isOpen2.value }]
      }, _attrs))} data-v-956364f9><button class="button"${ssrRenderAttr("aria-controls", groupId.value)}${ssrRenderAttr("aria-expanded", isOpen2.value)} data-v-956364f9><span class="button-text" data-v-956364f9>${__props.text ?? ""}</span><span class="vpi-plus button-icon" data-v-956364f9></span></button><div${ssrRenderAttr("id", groupId.value)} class="items" data-v-956364f9><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<!--[-->`);
        if ("link" in item) {
          _push(`<div class="item" data-v-956364f9>`);
          _push(ssrRenderComponent(VPNavScreenMenuGroupLink, { item }, null, _parent));
          _push(`</div>`);
        } else if ("component" in item) {
          _push(`<div class="item" data-v-956364f9>`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props, { "screen-menu": "" }), null), _parent);
          _push(`</div>`);
        } else {
          _push(`<div class="group" data-v-956364f9>`);
          _push(ssrRenderComponent(VPNavScreenMenuGroupSection, {
            text: item.text,
            items: item.items
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenuGroup.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const VPNavScreenMenuGroup = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-956364f9"]]);
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).nav) {
        _push(`<nav${ssrRenderAttrs(mergeProps({ class: "VPNavScreenMenu" }, _attrs))}><!--[-->`);
        ssrRenderList(unref(theme2).nav, (item) => {
          _push(`<!--[-->`);
          if ("link" in item) {
            _push(ssrRenderComponent(VPNavScreenMenuLink, { item }, null, _parent));
          } else if ("component" in item) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props, { "screen-menu": "" }), null), _parent);
          } else {
            _push(ssrRenderComponent(VPNavScreenMenuGroup, {
              text: item.text || "",
              items: item.items
            }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenMenu.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenSocialLinks",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(theme2).socialLinks) {
        _push(ssrRenderComponent(VPSocialLinks, mergeProps({
          class: "VPNavScreenSocialLinks",
          links: unref(theme2).socialLinks
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenSocialLinks.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenTranslations",
  __ssrInlineRender: true,
  setup(__props) {
    const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
    const isOpen2 = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(localeLinks).length && unref(currentLang).label) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["VPNavScreenTranslations", { open: isOpen2.value }]
        }, _attrs))} data-v-a4d9b172><button class="title" data-v-a4d9b172><span class="vpi-languages icon lang" data-v-a4d9b172></span> ${ssrInterpolate(unref(currentLang).label)} <span class="vpi-chevron-down icon chevron" data-v-a4d9b172></span></button><ul class="list" data-v-a4d9b172><!--[-->`);
        ssrRenderList(unref(localeLinks), (locale) => {
          _push(`<li class="item" data-v-a4d9b172>`);
          _push(ssrRenderComponent(_sfc_main$13, {
            class: "link",
            href: locale.link,
            lang: locale.lang,
            dir: locale.dir
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(locale.text)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(locale.text), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreenTranslations.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const VPNavScreenTranslations = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-a4d9b172"]]);
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreen",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  setup(__props) {
    useScrollLock(inBrowser ? document.body : null);
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.open) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "VPNavScreen",
          id: "VPNavScreen"
        }, _attrs))} data-v-05f3d7bc><div class="container" data-v-05f3d7bc>`);
        ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push, _parent);
        _push(ssrRenderComponent(_sfc_main$n, { class: "menu" }, null, _parent));
        _push(ssrRenderComponent(VPNavScreenTranslations, { class: "translations" }, null, _parent));
        _push(ssrRenderComponent(VPNavScreenAppearance, { class: "appearance" }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$m, { class: "social-links" }, null, _parent));
        ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push, _parent);
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNavScreen.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const VPNavScreen = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-05f3d7bc"]]);
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "VPNav",
  __ssrInlineRender: true,
  setup(__props) {
    const { isScreenOpen, closeScreen, toggleScreen } = useNav();
    const { frontmatter } = useData();
    const hasNavbar = computed(() => {
      return frontmatter.value.navbar !== false;
    });
    provide(navInjectionKey, { closeScreen });
    watchEffect(() => {
      if (inBrowser) {
        document.documentElement.classList.toggle("hide-nav", !hasNavbar.value);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (hasNavbar.value) {
        _push(`<header${ssrRenderAttrs(mergeProps({ class: "VPNav" }, _attrs))} data-v-9f75dce3>`);
        _push(ssrRenderComponent(VPNavBar, {
          "is-screen-open": unref(isScreenOpen),
          onToggleScreen: unref(toggleScreen)
        }, {
          "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(ssrRenderComponent(VPNavScreen, { open: unref(isScreenOpen) }, {
          "nav-screen-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)
              ];
            }
          }),
          "nav-screen-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(`</header>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPNav.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const VPNav = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-9f75dce3"]]);
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "VPSidebarItem",
  __ssrInlineRender: true,
  props: {
    item: {},
    depth: {}
  },
  setup(__props) {
    const props = __props;
    const {
      collapsed,
      collapsible,
      isLink,
      isActiveLink,
      hasActiveLink: hasActiveLink2,
      hasChildren,
      toggle
    } = useSidebarItemControl(computed(() => props.item));
    const sectionTag = computed(() => hasChildren.value ? "section" : `div`);
    const linkTag = computed(() => isLink.value ? "a" : "div");
    const textTag = computed(() => {
      return !hasChildren.value ? "p" : props.depth + 2 === 7 ? "p" : `h${props.depth + 2}`;
    });
    const itemRole = computed(() => isLink.value ? void 0 : "button");
    const classes = computed(() => [
      [`level-${props.depth}`],
      { collapsible: collapsible.value },
      { collapsed: collapsed.value },
      { "is-link": isLink.value },
      { "is-active": isActiveLink.value },
      { "has-active": hasActiveLink2.value }
    ]);
    function onItemInteraction(e) {
      if ("key" in e && e.key !== "Enter") {
        return;
      }
      !props.item.link && toggle();
    }
    function onCaretClick() {
      props.item.link && toggle();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VPSidebarItem = resolveComponent("VPSidebarItem", true);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(sectionTag.value), mergeProps({
        class: ["VPSidebarItem", classes.value]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.item.text) {
              _push2(`<div class="item"${ssrRenderAttr("role", itemRole.value)}${ssrRenderAttr("tabindex", __props.item.items && 0)} data-v-d81de50c${_scopeId}><div class="indicator" data-v-d81de50c${_scopeId}></div>`);
              if (__props.item.link) {
                _push2(ssrRenderComponent(_sfc_main$13, {
                  tag: linkTag.value,
                  class: "link",
                  href: __props.item.link,
                  rel: __props.item.rel,
                  target: __props.item.target
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(textTag.value), { class: "text" }, null), _parent3, _scopeId2);
                    } else {
                      return [
                        (openBlock(), createBlock(resolveDynamicComponent(textTag.value), {
                          class: "text",
                          innerHTML: __props.item.text
                        }, null, 8, ["innerHTML"]))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(textTag.value), { class: "text" }, null), _parent2, _scopeId);
              }
              if (__props.item.collapsed != null && __props.item.items && __props.item.items.length) {
                _push2(`<div class="caret" role="button" aria-label="toggle section" tabindex="0" data-v-d81de50c${_scopeId}><span class="vpi-chevron-right caret-icon" data-v-d81de50c${_scopeId}></span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.item.items && __props.item.items.length) {
              _push2(`<div class="items" data-v-d81de50c${_scopeId}>`);
              if (__props.depth < 5) {
                _push2(`<!--[-->`);
                ssrRenderList(__props.item.items, (i) => {
                  _push2(ssrRenderComponent(_component_VPSidebarItem, {
                    key: i.text,
                    item: i,
                    depth: __props.depth + 1
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.item.text ? (openBlock(), createBlock("div", mergeProps({
                key: 0,
                class: "item",
                role: itemRole.value
              }, toHandlers(
                __props.item.items ? { click: onItemInteraction, keydown: onItemInteraction } : {},
                true
              ), {
                tabindex: __props.item.items && 0
              }), [
                createVNode("div", { class: "indicator" }),
                __props.item.link ? (openBlock(), createBlock(_sfc_main$13, {
                  key: 0,
                  tag: linkTag.value,
                  class: "link",
                  href: __props.item.link,
                  rel: __props.item.rel,
                  target: __props.item.target
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(textTag.value), {
                      class: "text",
                      innerHTML: __props.item.text
                    }, null, 8, ["innerHTML"]))
                  ]),
                  _: 1
                }, 8, ["tag", "href", "rel", "target"])) : (openBlock(), createBlock(resolveDynamicComponent(textTag.value), {
                  key: 1,
                  class: "text",
                  innerHTML: __props.item.text
                }, null, 8, ["innerHTML"])),
                __props.item.collapsed != null && __props.item.items && __props.item.items.length ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "caret",
                  role: "button",
                  "aria-label": "toggle section",
                  onClick: onCaretClick,
                  onKeydown: withKeys(onCaretClick, ["enter"]),
                  tabindex: "0"
                }, [
                  createVNode("span", { class: "vpi-chevron-right caret-icon" })
                ], 32)) : createCommentVNode("", true)
              ], 16, ["role", "tabindex"])) : createCommentVNode("", true),
              __props.item.items && __props.item.items.length ? (openBlock(), createBlock("div", {
                key: 1,
                class: "items"
              }, [
                __props.depth < 5 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.item.items, (i) => {
                  return openBlock(), createBlock(_component_VPSidebarItem, {
                    key: i.text,
                    item: i,
                    depth: __props.depth + 1
                  }, null, 8, ["item", "depth"]);
                }), 128)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }), _parent);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebarItem.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const VPSidebarItem = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-d81de50c"]]);
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "VPSidebarGroup",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const disableTransition = ref(true);
    let timer = null;
    onMounted(() => {
      timer = setTimeout(() => {
        timer = null;
        disableTransition.value = false;
      }, 300);
    });
    onBeforeUnmount(() => {
      if (timer != null) {
        clearTimeout(timer);
        timer = null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<div class="${ssrRenderClass([{ "no-transition": disableTransition.value }, "group"])}" data-v-8d50c081>`);
        _push(ssrRenderComponent(VPSidebarItem, {
          item,
          depth: 0
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebarGroup.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const VPSidebarGroup = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-8d50c081"]]);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "VPSidebar",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  setup(__props) {
    const { sidebarGroups, hasSidebar } = useLayout();
    const props = __props;
    const navEl = ref(null);
    const isLocked = useScrollLock(inBrowser ? document.body : null);
    watch(
      [props, navEl],
      () => {
        if (props.open) {
          isLocked.value = true;
          navEl.value?.focus();
        } else isLocked.value = false;
      },
      { immediate: true, flush: "post" }
    );
    const key = ref(0);
    watch(
      sidebarGroups,
      () => {
        key.value += 1;
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(hasSidebar)) {
        _push(`<aside${ssrRenderAttrs(mergeProps({
          class: ["VPSidebar", { open: __props.open }],
          ref_key: "navEl",
          ref: navEl
        }, _attrs))} data-v-af661f50><div class="curtain" data-v-af661f50></div><nav class="nav" id="VPSidebarNav" aria-labelledby="sidebar-aria-label" tabindex="-1" data-v-af661f50><span class="visually-hidden" id="sidebar-aria-label" data-v-af661f50> Sidebar Navigation </span>`);
        ssrRenderSlot(_ctx.$slots, "sidebar-nav-before", {}, null, _push, _parent);
        _push(ssrRenderComponent(VPSidebarGroup, {
          items: unref(sidebarGroups),
          key: key.value
        }, null, _parent));
        ssrRenderSlot(_ctx.$slots, "sidebar-nav-after", {}, null, _push, _parent);
        _push(`</nav></aside>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSidebar.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const VPSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-af661f50"]]);
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "VPSkipLink",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme: theme2 } = useData();
    const route = useRoute();
    const backToTop = ref();
    watch(() => route.path, () => backToTop.value.focus());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><span tabindex="-1" data-v-331ec75c></span><a href="#VPContent" class="VPSkipLink visually-hidden" data-v-331ec75c>${ssrInterpolate(unref(theme2).skipToContentLabel || "Skip to content")}</a><!--]-->`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSkipLink.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const VPSkipLink = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-331ec75c"]]);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      isOpen: isSidebarOpen,
      open: openSidebar,
      close: closeSidebar
    } = useSidebarControl();
    registerWatchers({ closeSidebar });
    const { frontmatter } = useData();
    const slots = useSlots();
    const heroImageSlotExists = computed(() => !!slots["home-hero-image"]);
    provide(layoutInfoInjectionKey, { heroImageSlotExists });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = resolveComponent("Content");
      if (unref(frontmatter).layout !== false) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["Layout", unref(frontmatter).pageClass]
        }, _attrs))} data-v-1df9f90f>`);
        ssrRenderSlot(_ctx.$slots, "layout-top", {}, null, _push, _parent);
        _push(ssrRenderComponent(VPSkipLink, null, null, _parent));
        _push(ssrRenderComponent(VPBackdrop, {
          class: "backdrop",
          show: unref(isSidebarOpen),
          onClick: unref(closeSidebar)
        }, null, _parent));
        _push(ssrRenderComponent(VPNav, null, {
          "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)
              ];
            }
          }),
          "nav-bar-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)
              ];
            }
          }),
          "nav-screen-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)
              ];
            }
          }),
          "nav-screen-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(ssrRenderComponent(VPLocalNav, {
          open: unref(isSidebarOpen),
          onOpenMenu: unref(openSidebar)
        }, null, _parent));
        _push(ssrRenderComponent(VPSidebar, { open: unref(isSidebarOpen) }, {
          "sidebar-nav-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "sidebar-nav-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "sidebar-nav-before", {}, void 0, true)
              ];
            }
          }),
          "sidebar-nav-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "sidebar-nav-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "sidebar-nav-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(ssrRenderComponent(VPContent, null, {
          "page-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "page-top", {}, void 0, true)
              ];
            }
          }),
          "page-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "page-bottom", {}, void 0, true)
              ];
            }
          }),
          "not-found": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "not-found", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "not-found", {}, void 0, true)
              ];
            }
          }),
          "home-hero-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-before", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)
              ];
            }
          }),
          "home-hero-info-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-info-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)
              ];
            }
          }),
          "home-hero-actions-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-actions-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)
              ];
            }
          }),
          "home-hero-image": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-image", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)
              ];
            }
          }),
          "home-hero-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-hero-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-hero-after", {}, void 0, true)
              ];
            }
          }),
          "home-features-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-before", {}, void 0, true)
              ];
            }
          }),
          "home-features-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "home-features-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "home-features-after", {}, void 0, true)
              ];
            }
          }),
          "doc-footer-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
              ];
            }
          }),
          "doc-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-before", {}, void 0, true)
              ];
            }
          }),
          "doc-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)
              ];
            }
          }),
          "doc-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-top", {}, void 0, true)
              ];
            }
          }),
          "doc-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-bottom", {}, void 0, true)
              ];
            }
          }),
          "aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
              ];
            }
          }),
          "aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
              ];
            }
          }),
          "aside-ads-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
        _push(ssrRenderComponent(VPFooter, null, null, _parent));
        ssrRenderSlot(_ctx.$slots, "layout-bottom", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_component_Content, _attrs, null, _parent));
      }
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/Layout.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const Layout = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-1df9f90f"]]);
const GridSettings = {
  xmini: [[0, 2]],
  mini: [],
  small: [
    [920, 6],
    [768, 5],
    [640, 4],
    [480, 3],
    [0, 2]
  ],
  medium: [
    [960, 5],
    [832, 4],
    [640, 3],
    [480, 2]
  ],
  big: [
    [832, 3],
    [640, 2]
  ]
};
function useSponsorsGrid({ el, size = "medium" }) {
  const onResize = throttleAndDebounce(manage, 100);
  onMounted(() => {
    manage();
    window.addEventListener("resize", onResize);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });
  function manage() {
    adjustSlots(el.value, size);
  }
}
function adjustSlots(el, size) {
  const tsize = el.children.length;
  const asize = el.querySelectorAll(".vp-sponsor-grid-item:not(.empty)").length;
  const grid = setGrid(el, size, asize);
  manageSlots(el, grid, tsize, asize);
}
function setGrid(el, size, items) {
  const settings = GridSettings[size];
  const screen = window.innerWidth;
  let grid = 1;
  settings.some(([breakpoint, value]) => {
    if (screen >= breakpoint) {
      grid = items < value ? items : value;
      return true;
    }
  });
  setGridData(el, grid);
  return grid;
}
function setGridData(el, value) {
  el.dataset.vpGrid = String(value);
}
function manageSlots(el, grid, tsize, asize) {
  const diff = tsize - asize;
  const rem = asize % grid;
  const drem = rem === 0 ? rem : grid - rem;
  neutralizeSlots(el, drem - diff);
}
function neutralizeSlots(el, count) {
  if (count === 0) {
    return;
  }
  count > 0 ? addSlots(el, count) : removeSlots(el, count * -1);
}
function addSlots(el, count) {
  for (let i = 0; i < count; i++) {
    const slot = document.createElement("div");
    slot.classList.add("vp-sponsor-grid-item", "empty");
    el.append(slot);
  }
}
function removeSlots(el, count) {
  for (let i = 0; i < count; i++) {
    el.removeChild(el.lastElementChild);
  }
}
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "VPSponsorsGrid",
  __ssrInlineRender: true,
  props: {
    size: { default: "medium" },
    data: {}
  },
  setup(__props) {
    const props = __props;
    const el = ref(null);
    useSponsorsGrid({ el, size: props.size });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPSponsorsGrid vp-sponsor-grid", [__props.size]],
        ref_key: "el",
        ref: el
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.data, (sponsor) => {
        _push(`<div class="vp-sponsor-grid-item"><a class="vp-sponsor-grid-link"${ssrRenderAttr("href", sponsor.url)} target="_blank" rel="sponsored noopener"><article class="vp-sponsor-grid-box"><img class="vp-sponsor-grid-image"${ssrRenderAttr("src", sponsor.img)}${ssrRenderAttr("alt", sponsor.name)}></article></a></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSponsorsGrid.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "VPSponsors",
  __ssrInlineRender: true,
  props: {
    mode: { default: "normal" },
    tier: {},
    size: {},
    data: {}
  },
  setup(__props) {
    const props = __props;
    const sponsors = computed(() => {
      const isSponsors = props.data.some((s) => {
        return "items" in s;
      });
      if (isSponsors) {
        return props.data;
      }
      return [
        { tier: props.tier, size: props.size, items: props.data }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPSponsors vp-sponsor", [__props.mode]]
      }, _attrs))}><!--[-->`);
      ssrRenderList(sponsors.value, (sponsor, index) => {
        _push(`<section class="vp-sponsor-section">`);
        if (sponsor.tier) {
          _push(`<h3 class="vp-sponsor-tier">${ssrInterpolate(sponsor.tier)}</h3>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$d, {
          size: sponsor.size,
          data: sponsor.items
        }, null, _parent));
        _push(`</section>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPSponsors.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideSponsors",
  __ssrInlineRender: true,
  props: {
    tier: {},
    size: {},
    data: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VPDocAsideSponsors" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$c, {
        mode: "aside",
        tier: __props.tier,
        size: __props.size,
        data: __props.data
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "VPHomeSponsors",
  __ssrInlineRender: true,
  props: {
    message: {},
    actionText: { default: "Become a sponsor" },
    actionLink: {},
    data: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "VPHomeSponsors" }, _attrs))} data-v-0eeda4b8><div class="container" data-v-0eeda4b8><div class="header" data-v-0eeda4b8><div class="love" data-v-0eeda4b8><span class="vpi-heart icon" data-v-0eeda4b8></span></div>`);
      if (__props.message) {
        _push(`<h2 class="message" data-v-0eeda4b8>${ssrInterpolate(__props.message)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="sponsors" data-v-0eeda4b8>`);
      _push(ssrRenderComponent(_sfc_main$c, { data: __props.data }, null, _parent));
      _push(`</div>`);
      if (__props.actionLink) {
        _push(`<div class="action" data-v-0eeda4b8>`);
        _push(ssrRenderComponent(VPButton, {
          theme: "sponsor",
          text: __props.actionText,
          href: __props.actionLink
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPHomeSponsors.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "VPTeamMembersItem",
  __ssrInlineRender: true,
  props: {
    size: { default: "medium" },
    member: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: ["VPTeamMembersItem", [__props.size]]
      }, _attrs))} data-v-962fd8c0><div class="profile" data-v-962fd8c0><figure class="avatar" data-v-962fd8c0><img class="avatar-img"${ssrRenderAttr("src", __props.member.avatar)}${ssrRenderAttr("alt", __props.member.name)} data-v-962fd8c0></figure><div class="data" data-v-962fd8c0><h1 class="name" data-v-962fd8c0>${ssrInterpolate(__props.member.name)}</h1>`);
      if (__props.member.title || __props.member.org) {
        _push(`<p class="affiliation" data-v-962fd8c0>`);
        if (__props.member.title) {
          _push(`<span class="title" data-v-962fd8c0>${ssrInterpolate(__props.member.title)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.member.title && __props.member.org) {
          _push(`<span class="at" data-v-962fd8c0> @ </span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.member.org) {
          _push(ssrRenderComponent(_sfc_main$13, {
            class: ["org", { link: __props.member.orgLink }],
            href: __props.member.orgLink,
            "no-icon": ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(__props.member.org)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(__props.member.org), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.member.desc) {
        _push(`<p class="desc" data-v-962fd8c0>${__props.member.desc ?? ""}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.member.links) {
        _push(`<div class="links" data-v-962fd8c0>`);
        _push(ssrRenderComponent(VPSocialLinks, {
          links: __props.member.links,
          me: false
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.member.sponsor) {
        _push(`<div class="sp" data-v-962fd8c0>`);
        _push(ssrRenderComponent(_sfc_main$13, {
          class: "sp-link",
          href: __props.member.sponsor,
          "no-icon": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="vpi-heart sp-icon" data-v-962fd8c0${_scopeId}></span> ${ssrInterpolate(__props.member.actionText || "Sponsor")}`);
            } else {
              return [
                createVNode("span", { class: "vpi-heart sp-icon" }),
                createTextVNode(" " + toDisplayString(__props.member.actionText || "Sponsor"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</article>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamMembersItem.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const VPTeamMembersItem = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-962fd8c0"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "VPTeamMembers",
  __ssrInlineRender: true,
  props: {
    size: { default: "medium" },
    members: {}
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => [props.size, `count-${props.members.length}`]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["VPTeamMembers", classes.value]
      }, _attrs))} data-v-0e8561f6><div class="container" data-v-0e8561f6><!--[-->`);
      ssrRenderList(__props.members, (member) => {
        _push(`<div class="item" data-v-0e8561f6>`);
        _push(ssrRenderComponent(VPTeamMembersItem, {
          size: __props.size,
          member
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamMembers.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPage.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPageSection.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const theme = {
  Layout,
  enhanceApp: ({ app }) => {
    app.component("Badge", _sfc_main$1a);
  }
};
let animationId = null;
let resizeHandler = null;
let activeCanvas = null;
function initMeteorEffect() {
  if (typeof window === "undefined") return;
  if (document.getElementById("meteor-canvas")) return;
  const canvas = document.createElement("canvas");
  canvas.id = "meteor-canvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "-1";
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);
  activeCanvas = canvas;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    activeCanvas = null;
    return;
  }
  let width = window.innerWidth;
  let height = window.innerHeight;
  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  };
  window.addEventListener("resize", resize);
  resizeHandler = resize;
  resize();
  const colors = [
    "#6ECC54",
    "#D34947",
    "#018B8D",
    "#002FA7",
    "#470125",
    "#F9D46C",
    "#71E2D1",
    "#C8161D",
    "#492D22",
    "#EB5C20",
    "#0D3A69"
  ];
  const parseHexColor = (hex) => {
    const value = Number.parseInt(hex.slice(1), 16);
    return {
      r: value >> 16 & 255,
      g: value >> 8 & 255,
      b: value & 255
    };
  };
  const palette = colors.map(parseHexColor);
  const mixPaletteColor = (position) => {
    const wrapped = (position % palette.length + palette.length) % palette.length;
    const currentIndex = Math.floor(wrapped);
    const nextIndex = (currentIndex + 1) % palette.length;
    const mix = wrapped - currentIndex;
    const current = palette[currentIndex];
    const next = palette[nextIndex];
    const r = Math.round(current.r + (next.r - current.r) * mix);
    const g = Math.round(current.g + (next.g - current.g) * mix);
    const b = Math.round(current.b + (next.b - current.b) * mix);
    return `rgb(${r}, ${g}, ${b})`;
  };
  const STAR_VERTICES = [];
  const angleStep = Math.PI * 2 / 10;
  const startAngle = -Math.PI / 2;
  for (let i = 0; i < 10; i++) {
    const angle = startAngle + i * angleStep;
    const radius = i % 2 === 0 ? 1 : 0.4;
    STAR_VERTICES.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    });
  }
  class Star {
    constructor(x, y, size, hue, alpha = 1) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.hue = hue;
      this.alpha = alpha;
      this.baseAlpha = alpha;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.035;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.pulseSpeed = 8e-3 + Math.random() * 0.012;
      this.colorSpeed = 4e-3 + Math.random() * 6e-3;
    }
    update() {
      this.rotation += this.rotationSpeed;
      this.pulsePhase += this.pulseSpeed;
      this.hue += this.colorSpeed;
      if (this.hue > palette.length) this.hue -= palette.length;
    }
    draw(ctx2) {
      ctx2.translate(this.x, this.y);
      ctx2.rotate(this.rotation);
      const pulse = (Math.sin(this.pulsePhase) + 1) / 2;
      const currentAlpha = this.alpha * (0.72 + 0.28 * pulse);
      ctx2.beginPath();
      ctx2.moveTo(STAR_VERTICES[0].x * this.size, STAR_VERTICES[0].y * this.size);
      for (let i = 1; i < STAR_VERTICES.length; i++) {
        ctx2.lineTo(STAR_VERTICES[i].x * this.size, STAR_VERTICES[i].y * this.size);
      }
      ctx2.closePath();
      const color = mixPaletteColor(this.hue);
      ctx2.fillStyle = color;
      ctx2.globalAlpha = Math.max(0, currentAlpha);
      ctx2.shadowBlur = this.size * (1.8 + 0.8 * pulse);
      ctx2.shadowColor = color;
      ctx2.fill();
      ctx2.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
  class Meteor {
    constructor() {
      this.trail = [];
      this.dead = false;
      if (Math.random() < 0.6) {
        this.x = Math.random() * (width + height * 0.5) - height * 0.2;
        this.y = -60;
      } else {
        this.x = width + 60;
        this.y = Math.random() * height;
      }
      const speed = 3 + Math.random() * 4;
      const angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1);
      this.vx = -Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = 8 + Math.random() * 8;
      this.hue = Math.random() * colors.length;
      this.head = new Star(this.x, this.y, this.size, this.hue, 1);
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      const outOfBounds = this.y > height + 100 || this.x < -100;
      this.head.x = this.x;
      this.head.y = this.y;
      this.head.update();
      this.hue = this.head.hue;
      if (!outOfBounds && Math.random() < 0.7) {
        const trailStar = new Star(
          this.x,
          this.y,
          this.size * (0.2 + Math.random() * 0.3),
          this.hue,
          // 继承当前颜色
          0.6
          // 初始透明度
        );
        trailStar.rotationSpeed = (Math.random() - 0.5) * 0.025;
        this.trail.push(trailStar);
      }
      for (let i = this.trail.length - 1; i >= 0; i--) {
        const p = this.trail[i];
        p.update();
        p.alpha -= 0.015;
        p.x += this.vx * 0.2;
        p.y += this.vy * 0.2;
        if (p.alpha <= 0) {
          this.trail.splice(i, 1);
        }
      }
      if (outOfBounds) {
        if (this.trail.length === 0) {
          this.dead = true;
        }
      }
    }
    draw(ctx2) {
      this.trail.forEach((t) => t.draw(ctx2));
      this.head.draw(ctx2);
    }
  }
  const meteors = [];
  function animate() {
    if (!ctx) return;
    if (!document.body.contains(canvas) || activeCanvas !== canvas) return;
    ctx.clearRect(0, 0, width, height);
    if (Math.random() < 0.04) {
      meteors.push(new Meteor());
    }
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.update();
      m.draw(ctx);
      if (m.dead) {
        meteors.splice(i, 1);
      }
    }
    animationId = requestAnimationFrame(animate);
  }
  animate();
}
function stopMeteorEffect() {
  if (typeof window === "undefined") return;
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
    resizeHandler = null;
  }
  const canvas = document.getElementById("meteor-canvas");
  if (canvas) {
    canvas.remove();
  }
  activeCanvas = null;
}
const isEffectsEnabled = ref(false);
const customStyles = '@import"https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&family=Outfit:wght@100..900&family=Rajdhani:wght@300;400;500;600;700&display=swap";:root{--vp-font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans CJK SC", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif !important;--vp-font-family-mono: Menlo, Consolas, "Courier New", monospace !important}h1,h2,h3,h4,h5,h6{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Noto Sans CJK SC,Noto Sans SC,PingFang SC,Microsoft YaHei,sans-serif!important;font-weight:600}::selection{background:#ff008033;color:inherit}body{background-color:#fffcf9;transition:background-color .5s ease;overflow-x:hidden}.dark body{background-color:#0b0c15;animation:darkPulse 8s ease-in-out infinite}@keyframes darkPulse{0%,to{background-color:#0b0c15}50%{background-color:#110f1a}}.VPHero .name{font-weight:700!important;letter-spacing:4px!important;text-transform:uppercase;animation:textThrob 4s ease-in-out infinite}@keyframes textThrob{0%,to{text-shadow:0 0 20px rgba(167,85,247,.4),0 0 40px rgba(167,85,247,.2);transform:scale(1)}50%{text-shadow:0 0 30px rgba(255,0,128,.5),0 0 60px rgba(255,0,128,.3);transform:scale(1.02)}}.VPHero .VPButton{position:relative;overflow:hidden;background-color:#ffffff0d!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid transparent!important;border-radius:24px!important;transition:all .6s cubic-bezier(.22,1,.36,1);z-index:1;box-shadow:0 0 15px #a755f733;animation:buttonPulse 3s ease-in-out infinite}@keyframes buttonPulse{0%{box-shadow:0 0 15px #a755f733;transform:scale(1)}50%{box-shadow:0 0 25px #ff008066;transform:scale(1.03)}to{box-shadow:0 0 15px #a755f733;transform:scale(1)}}.VPHero .VPButton:hover{transform:scale(1.05) translateY(-2px);box-shadow:0 10px 40px #ff008080;background-color:#ff00801a!important}:not(.dark) .VPHero .VPButton{background-color:#0000000d!important;color:var(--vp-c-text-1)!important;animation:none}.VPHero .VPButton:before{content:"";position:absolute;inset:0;border-radius:24px;padding:1.5px;background:linear-gradient(45deg,#ffffff1a,#ffffff4d);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;transition:all .3s ease}:not(.dark) .VPHero .VPButton:before{background:linear-gradient(45deg,#0000001a,#0003)}.VPHero .VPButton:hover{transform:translateY(-2px) scale(1.02);letter-spacing:.5px;animation:none}.VPHero .VPButton[href*=SSMT3]:hover{box-shadow:0 0 20px #00c6ff66,inset 0 0 10px #00c6ff1a}.VPHero .VPButton[href*=SSMT3]:hover:before{background:linear-gradient(90deg,#00c6ff,#0072ff,#00c6ff);background-size:200% 100%;animation:borderFlow 2s linear infinite}.VPHero .VPButton[href*=TheHerta3]:hover{box-shadow:0 0 20px #ff640066,inset 0 0 10px #ff64001a}.VPHero .VPButton[href*=TheHerta3]:hover:before{background:linear-gradient(90deg,#f96,#ff5e62,#f96);background-size:200% 100%;animation:borderFlow 2s linear infinite}@keyframes borderFlow{to{background-position:200% 0}}.VPFeature{background-color:#00000008!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid transparent!important;border-radius:12px;transition:transform .4s cubic-bezier(.25,.8,.25,1),box-shadow .4s ease,background-color .4s ease;position:relative;overflow:hidden;z-index:1}.dark .VPFeature{background-color:#ffffff0d!important}.VPFeature:hover{transform:translateY(-2px);background-color:#0000000d!important;box-shadow:0 5px 15px #0000001a}.dark .VPFeature:hover{background-color:#ffffff1a!important;box-shadow:0 15px 30px -10px #0000004d}.VPFeature:before{content:"";position:absolute;inset:0;border-radius:12px;padding:1.5px;background:linear-gradient(135deg,#0000001a,#00000005);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;transition:background .3s ease}.dark .VPFeature:before{background:linear-gradient(135deg,#ffffff4d,#ffffff0d)}.VPFeature:hover:before{background:linear-gradient(90deg,#7928ca,#ff0080,#00c6ff,gold,#7928ca);background-size:200% 100%;animation:borderRotate 2s linear infinite}@keyframes borderRotate{to{background-position:200% 0}}.VPFeature:after{content:"";position:absolute;top:0;left:-100%;width:50%;height:100%;background:linear-gradient(to right,transparent,rgba(255,255,255,.4),transparent);transform:skew(-25deg);pointer-events:none}.dark .VPFeature:after{background:linear-gradient(to right,transparent,rgba(255,255,255,.15),transparent)}.VPFeature:hover:after{animation:shinePass .75s ease-in-out}@keyframes shinePass{0%{left:-100%}to{left:200%}}.VPFeature .title{transition:transform .3s ease}.VPFeature:hover .title{transform:translate(4px);background:linear-gradient(to right,#0072ff,#00c6ff);-webkit-background-clip:text;background-clip:text;color:transparent}.dark .VPFeature:hover .title{background:linear-gradient(to right,#00c6ff,#0072ff);-webkit-background-clip:text;background-clip:text;color:transparent}:root{--vp-home-hero-name-color: transparent;--vp-home-hero-name-background: transparent}.VPHero .name,.VPHero .name span,.vp-doc h1{background-image:linear-gradient(to right,#7928ca,#ff0080,#00c6ff,#7928ca);background-size:200% auto;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;animation:nebulaFlow 5s linear infinite}.dark .VPHero .name,.dark .VPHero .name span,.dark .vp-doc h1{background-image:linear-gradient(to right,#d53369,#daae51,#a755f7,#d53369)}@keyframes nebulaFlow{to{background-position:200% center}}.VPHero .text{background:linear-gradient(120deg,#333,#4a90e2,#9013fe,#333,#4a90e2);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:600;letter-spacing:1.5px;animation:holographicShine 6s linear infinite;opacity:1}.dark .VPHero .text{background:linear-gradient(120deg,#fff,#8ec5fc,#e0c3fc,#fff,#8ec5fc);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;opacity:.9;text-shadow:0 0 10px rgba(142,197,252,.3)}.VPHero .tagline{background:linear-gradient(90deg,#d35400,#c0392b,#f39c12,#d35400);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:passionFlow 3s linear infinite,passionPulseLight 2s ease-in-out infinite}.dark .VPHero .tagline{background:linear-gradient(90deg,gold,#ff0080,#7928ca,gold);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:passionFlow 3s linear infinite,passionPulse 2s ease-in-out infinite}@keyframes passionPulseLight{0%,to{opacity:.8}50%{opacity:1}}@keyframes liquidMove{0%{background-position:0% 0%,0% 0%,100% 0%,100% 100%,0% 100%,50% 0%}25%{background-position:25% 25%,10% 10%,90% 10%,90% 90%,10% 90%,50% 20%}50%{background-position:50% 50%,20% 0%,80% 20%,80% 80%,20% 100%,50% 50%}75%{background-position:75% 75%,10% 90%,90% 90%,90% 10%,10% 10%,50% 80%}to{background-position:100% 100%,0% 100%,100% 100%,0% 0%,100% 0%,50% 100%}}@keyframes liquidPulse{0%{background-size:150% 150%}to{background-size:250% 250%}}@keyframes chromaShift{0%{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}@keyframes holographicShine{to{background-position:200% center}}@keyframes passionFlow{to{background-position:200% center}}@keyframes passionPulse{0%,to{filter:drop-shadow(0 0 2px rgba(229,46,113,.3));opacity:.9}50%{filter:drop-shadow(0 0 8px rgba(229,46,113,.6));opacity:1}}.VPSocialLink{position:relative;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}.VPSocialLink:hover{transform:translateY(-3px) scale(1.1)}.VPSocialLink svg{transition:filter .3s ease}.VPSocialLink[href*=github]:hover{color:#00c6ff!important;filter:drop-shadow(0 0 8px rgba(0,198,255,.6)) drop-shadow(0 0 15px rgba(0,198,255,.3))}:not(.dark) .VPSocialLink[href*=github]:hover{color:#0072ff!important;filter:drop-shadow(0 0 8px rgba(0,114,255,.4)) drop-shadow(0 0 15px rgba(0,114,255,.2))}.VPSocialLink[href*=discord]:hover{color:#5865f2!important;filter:drop-shadow(0 0 8px rgba(88,101,242,.8)) drop-shadow(0 0 15px rgba(88,101,242,.4));animation:discordShake .5s ease-in-out infinite alternate}@keyframes discordShake{0%{transform:rotate(-10deg)}to{transform:rotate(10deg)}}.VPFooter{position:relative;z-index:10;background-color:transparent!important;border-top:1px solid rgba(255,255,255,.05)!important}:not(.dark) .VPFooter{border-top:1px solid rgba(0,0,0,.05)!important}.VPFooter .copyright{font-size:14px;letter-spacing:.5px;opacity:.8}.VPFooter .copyright a{display:inline-block;text-decoration:none!important;font-weight:700;position:relative;transition:all .3s ease;color:var(--vp-c-text-1)!important;background:none;-webkit-background-clip:border-box;background-clip:border-box;filter:none}.VPFooter .copyright a:hover{background:linear-gradient(90deg,#00f260,#0575e6,#b20a2c,#fffb00);background-size:300% auto;-webkit-background-clip:text;background-clip:text;color:transparent!important;animation:gradientMove 2s linear infinite;transform:scale(1.1)}@keyframes gradientMove{to{background-position:300% center}}.VPFooter .copyright a:before,.VPFooter .copyright a:after{content:"★";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100%;height:100%;font-size:10px;color:transparent;pointer-events:none;opacity:0}.VPFooter .copyright a:hover:before{animation:fireworkSmall .8s ease-out forwards}.VPFooter .copyright a:hover:after{animation:fireworkBig .8s ease-out .1s forwards}@keyframes fireworkSmall{0%{opacity:1;text-shadow:0 0 0 #00ffcc,0 0 0 #ff00ff,0 0 0 #ffff00;transform:translate(-50%,-50%) scale(.5)}to{opacity:0;text-shadow:-20px -25px 0 #00ffcc,20px -20px 0 #ff00ff,0px -35px 0 #ffff00;transform:translate(-50%,-50%) scale(1.5)}}@keyframes fireworkBig{0%{opacity:1;text-shadow:0 0 0 #ff3366,0 0 0 #3366ff,0 0 0 #00ff00;transform:translate(-50%,-50%) scale(.5) rotate(0)}to{opacity:0;text-shadow:-30px 10px 0 #ff3366,30px 10px 0 #3366ff,0px 30px 0 #00ff00;transform:translate(-50%,-50%) scale(2) rotate(45deg)}}html{scroll-behavior:smooth}::-webkit-scrollbar-track{background:#0000000d}.dark ::-webkit-scrollbar-track{background:#0003}::-webkit-scrollbar-thumb{background:#00c6ff4d;border-radius:4px;border:2px solid transparent;background-clip:content-box;transition:background-color .3s}.dark ::-webkit-scrollbar-thumb{background:#00c6ff66;box-shadow:none}::-webkit-scrollbar-thumb:hover{background-color:#ff0080!important;box-shadow:none}::selection{background:#00c6ff4d;color:inherit;text-shadow:0 0 5px rgba(0,198,255,.5)}.VPNav{background-color:#ffffff1a!important;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid rgba(0,0,0,.08);transition:all .3s ease;width:100%!important}.dark .VPNav{background-color:#0b0c151a!important;border-bottom:1px solid rgba(255,255,255,.08)}.VPNavBar,.dark .VPNavBar{background-color:transparent!important;border-bottom:none!important}.VPNavBar .content-body,.dark .VPNavBar .content-body{background-color:transparent!important}.VPNavBar .title{font-weight:700!important;font-size:15px!important;letter-spacing:.5px;background:linear-gradient(135deg,var(--vp-c-text-1),#a755f7);-webkit-background-clip:text;background-clip:text;color:transparent!important;transition:all .3s ease}.VPNavBar .title:hover{background:linear-gradient(135deg,#ff0080,#a755f7,#00c6ff);background-size:200% auto;-webkit-background-clip:text;background-clip:text;animation:titleShimmer 1.5s linear infinite}@keyframes titleShimmer{to{background-position:200% center}}.dark .VPNavBar .title{background:linear-gradient(135deg,#e0e0e0,#a755f7);-webkit-background-clip:text;background-clip:text}.dark .VPNavBar .title:hover{background:linear-gradient(135deg,#ff0080,#daae51,#00c6ff);background-size:200% auto;-webkit-background-clip:text;background-clip:text}.VPNavBarMenuLink{position:relative;transition:all .3s ease!important}.VPNavBarMenuLink:after{content:"";position:absolute;bottom:-2px;left:50%;width:0;height:2px;background:linear-gradient(90deg,#ff0080,#a755f7);border-radius:2px;transition:all .3s ease;transform:translate(-50%)}.VPNavBarMenuLink:hover:after,.VPNavBarMenuLink.active:after{width:70%}.VPNavBarMenuLink:hover,.VPNavBarMenuLink.active{color:#ff0080!important;text-shadow:0 0 8px rgba(255,0,128,.4)}.dark .VPNavBarMenuLink:hover,.dark .VPNavBarMenuLink.active{text-shadow:0 0 12px rgba(255,0,128,.6)}.VPFlyout .button .text{transition:all .3s ease;position:relative}.VPFlyout .button:hover .text{color:#ff0080!important;text-shadow:0 0 8px rgba(255,0,128,.4)}.dark .VPFlyout .button:hover .text{text-shadow:0 0 12px rgba(255,0,128,.6)}.VPFlyout .button .text-icon{transition:all .3s ease}.VPFlyout .button:hover .text-icon{color:#ff0080!important;transform:translateY(1px)}.VPFlyout .button .vpi-chevron-down{color:var(--vp-c-text-3);transition:all .3s ease;font-size:14px}.VPFlyout .button:hover .vpi-chevron-down{color:#ff0080!important;transform:translateY(1px)}.dark .VPFlyout .button .vpi-chevron-down{color:#fff6}.VPNavBarMenuGroup .button{transition:all .25s ease;border-radius:6px;padding:0 10px!important}.VPNavBarMenuGroup .button:hover{background-color:#ff00800f}.dark .VPNavBarMenuGroup .button:hover{background-color:#ff00801a}.VPFlyout .menu{transition:opacity .25s ease}.VPNavBar .content button:not(.VPNavBarSearchButton):not(.translate-btn):not(.music-toggle):not(.VPMenu *){transition:all .3s ease;border-radius:6px;padding:4px 6px}.VPNavBar .content button:not(.VPNavBarSearchButton):not(.translate-btn):not(.music-toggle):not(.VPMenu *):hover{background-color:#ff008014;color:#ff0080!important;text-shadow:0 0 6px rgba(255,0,128,.3);transform:scale(1.1)}.dark .VPNavBar .content button:not(.VPNavBarSearchButton):not(.translate-btn):not(.music-toggle):not(.VPMenu *):hover{background-color:#ff00801f}.VPNavBar .divider{background:linear-gradient(90deg,transparent,rgba(255,0,128,.2),rgba(167,85,247,.2),transparent)!important;height:1px!important;opacity:.6}.dark .VPNavBar .divider{background:linear-gradient(90deg,transparent,rgba(255,0,128,.25),rgba(167,85,247,.25),transparent)!important}.VPSidebar{border-right:1px solid transparent!important;background-color:transparent!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}.VPSidebar{--vp-layout-top-height: var(--vp-nav-height)}.VPSidebar .curtain{background-color:transparent!important}.VPSidebar:after{content:"";position:absolute;top:0;right:0;width:1px;height:100%;background:linear-gradient(180deg,transparent,#00c6ff,#ff0080,transparent);opacity:.3}.vp-doc h2{border-bottom:none!important;position:relative;display:inline-block;padding-bottom:.5rem;margin-top:2.8em!important;margin-bottom:1em!important;font-size:1.5em}.vp-doc h2:after{content:"";position:absolute;bottom:0;left:0;width:100%;height:2.5px;background:linear-gradient(90deg,#ff0080,#a755f7,transparent);border-radius:3px}.dark .vp-doc h2:after{background:linear-gradient(90deg,#ff0080,#a755f7,transparent)}.vp-doc h3{font-size:1.2em;margin-top:2em;margin-bottom:.8em;color:var(--vp-c-text-1);position:relative;padding-left:14px}.vp-doc h3:before{content:"";position:absolute;left:0;top:.25em;width:4px;height:.85em;background:linear-gradient(180deg,#ff0080,#a755f7);border-radius:2px}.vp-doc a{transition:all .3s ease;position:relative}.vp-doc a:hover{color:#0072ff!important;text-shadow:none}.dark .vp-doc a:hover{color:#00c6ff!important;text-shadow:0 0 8px rgba(0,198,255,.4)}.vp-doc hr{border:none;height:1.5px;background:linear-gradient(90deg,transparent,rgba(255,0,128,.2),rgba(167,85,247,.2),transparent);margin:2.5em 0;border-radius:2px}.dark .vp-doc hr{background:linear-gradient(90deg,transparent,rgba(255,0,128,.25),rgba(167,85,247,.25),transparent)}.vp-doc img{transition:transform .3s ease,box-shadow .3s ease;border-radius:10px;box-shadow:0 2px 8px #0000000a}.vp-doc img:hover{transform:scale(1.01);box-shadow:0 8px 24px #0000001a}.vp-doc img{transition:transform .3s ease,box-shadow .3s ease;border-radius:8px}.vp-doc img:hover{transform:scale(1.01);box-shadow:0 10px 30px #0003}.dark body{background-color:#0b0c15;background-image:radial-gradient(circle at 15% 50%,rgba(76,29,149,.15),transparent 40%),radial-gradient(circle at 85% 30%,rgba(56,189,248,.15),transparent 40%);background-attachment:fixed}.VPHero{position:relative;z-index:0;overflow:hidden}.VPHero:after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;background-image:radial-gradient(circle at 20% 30%,rgba(255,105,180,.15) 0%,transparent 20%),radial-gradient(circle at 80% 70%,rgba(255,215,0,.1) 0%,transparent 20%),radial-gradient(circle at 50% 50%,rgba(148,0,211,.1) 0%,transparent 30%);filter:blur(30px);animation:nebulaPulse 8s ease-in-out infinite alternate;pointer-events:none}@keyframes nebulaPulse{0%{opacity:.6;transform:scale(1)}to{opacity:.9;transform:scale(1.05)}}.VPHero .name{animation:heroNameEntrance 1.2s cubic-bezier(.2,.8,.2,1) backwards,nebulaFlow 5s linear infinite 1.2s}@keyframes heroNameEntrance{0%{opacity:0;transform:scale(.5) translateY(50px);filter:blur(20px)}to{opacity:1;transform:scale(1) translateY(0);filter:blur(0)}}.VPHero .text{animation:slideUpFade 1s ease-out .3s backwards,holographicShine 6s linear infinite 1.3s}.VPHero .tagline{animation:slideUpFade 1s ease-out .5s backwards,passionFlow 3s linear infinite 1.5s,passionPulseLight 2s ease-in-out infinite 1.5s}.VPHero .VPButton{animation:popIn .8s cubic-bezier(.34,1.56,.64,1) .8s backwards}.VPFeature{animation:cardFlyIn .8s cubic-bezier(.2,.8,.2,1) backwards}.VPFeatures .VPFeature:nth-child(1){animation-delay:1s}.VPFeatures .VPFeature:nth-child(2){animation-delay:1.1s}.VPFeatures .VPFeature:nth-child(3){animation-delay:1.2s}.VPFeatures .VPFeature:nth-child(n+4){animation-delay:1.3s}@keyframes slideUpFade{0%{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes popIn{0%{opacity:0;transform:scale(.8) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes cardFlyIn{0%{opacity:0;transform:translateY(50px) rotateX(10deg)}to{opacity:1;transform:translateY(0) rotateX(0)}}.dark body:before{content:"";position:fixed;top:-50%;left:-50%;width:200%;height:100%;background:radial-gradient(ellipse at top,rgba(121,40,202,.15),transparent 70%);z-index:-2;animation:auroraWave 15s ease-in-out infinite alternate;pointer-events:none}@keyframes auroraWave{0%{transform:rotate(0) scale(1);opacity:.5}to{transform:rotate(5deg) scale(1.1);opacity:.8}}.VPHero:before{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background-image:linear-gradient(to right,#fff0,#fffc,#fff0),linear-gradient(to right,#fff0,#ffd70099,#fff0);background-size:150px 2px,100px 2px;background-repeat:no-repeat;background-position:-200px 20%,-200px 60%;z-index:-1;opacity:0;animation:shootingStar 8s linear infinite;pointer-events:none}@keyframes shootingStar{0%{background-position:-200px 20%,-200px 60%;opacity:0}10%{opacity:1}20%{background-position:120% 25%,120% 65%;opacity:0}to{background-position:120% 25%,120% 65%;opacity:0}}.VPFooter:before{content:"";position:absolute;bottom:0;left:50%;transform:translate(-50%);width:60%;height:1px;background:radial-gradient(circle,rgba(255,255,255,.5) 0%,transparent 100%);box-shadow:0 0 20px #ffffff4d;opacity:.3}.dark body{text-shadow:0 0 1px rgba(255,255,255,.1)}.dark .vp-doc h1,.dark .vp-doc h2,.dark .vp-doc h3{text-shadow:0 0 15px rgba(167,85,247,.4)}.vp-doc{text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.dark .vp-doc strong{color:gold;font-weight:700;text-shadow:0 0 10px rgba(255,215,0,.6);padding:0 2px}.dark .vp-doc p,.dark .vp-doc li{line-height:1.8;letter-spacing:.02em;color:#ffffffe6;text-shadow:0 0 1px rgba(255,255,255,.1);margin-bottom:1.2em}.vp-doc blockquote{border-left:4px solid #a755f7;background:linear-gradient(90deg,rgba(167,85,247,.1),transparent);border-radius:0 8px 8px 0;padding:16px 24px;color:#581c87;font-style:italic;position:relative;overflow:hidden;transition:all .3s ease}.dark .vp-doc blockquote{color:#d8b4fe}.vp-doc blockquote:hover{border-left-color:#00c6ff;background:linear-gradient(90deg,rgba(0,198,255,.1),transparent);color:#0369a1;transform:translate(5px)}.dark .vp-doc blockquote:hover{color:#bae6fd}.vp-doc blockquote:before{content:"❝";position:absolute;top:-10px;right:10px;font-size:4em;color:#0000000d;font-family:serif}.dark .vp-doc blockquote:before{color:#ffffff0d}::selection{background:#ff00804d;color:#fff;text-shadow:0 0 8px #ff0080}.vp-doc div[class*=language-]{--vp-code-font-size: 14px;--vp-code-line-height: 1.6;border-radius:12px;border:1px solid rgba(0,0,0,.08);background:#f8f6fa!important;box-shadow:0 2px 8px #0000000a,0 8px 24px #0000000f;transition:all .35s ease;margin:28px 0;position:relative;overflow:hidden}.dark .vp-doc div[class*=language-]{border:1px solid rgba(255,255,255,.08);background:#11111a!important;box-shadow:0 2px 8px #0003,0 8px 24px #0000004d}.vp-doc div[class*=language-]:hover{border-color:#ff008033;box-shadow:0 2px 8px #0000000a,0 12px 32px #ff00800f}.dark .vp-doc div[class*=language-]:hover{border-color:#ff008040;box-shadow:0 2px 8px #0003,0 12px 32px #ff00801a}.vp-doc div[class*=language-]:before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#ff0080,#a755f7,#00c6ff);opacity:.6;z-index:2}.vp-doc div[class*=language-]>button.copy+span.lang{position:absolute;top:8px;right:40px;font-size:11px;color:#00000040;font-family:Fira Code,monospace;letter-spacing:.5px;text-transform:uppercase;-webkit-user-select:none;user-select:none}.dark .vp-doc div[class*=language-]>button.copy+span.lang{color:#fff3}.vp-doc div[class*=language-] pre{font-family:Fira Code,JetBrains Mono,monospace;font-size:13.5px;line-height:1.7;color:#1e1e1e}.dark .vp-doc div[class*=language-] pre{color:#d4d4d8}.vp-doc div[class*=language-] code,.vp-doc div[class*=language-] .line-numbers-wrapper{font-family:Fira Code,monospace}.vp-doc div[class*=language-] .copy{border-radius:6px;opacity:.4;transition:all .25s ease;z-index:3}.vp-doc div[class*=language-]:hover .copy{opacity:.8}.vp-doc div[class*=language-] .copy:hover{opacity:1;background-color:#ff00801a;color:#ff0080;transform:scale(1.1)}.vp-doc div[class*=language-] .line-numbers-wrapper{color:#0003;border-right:1px solid rgba(0,0,0,.06);padding-top:16px;line-height:1.5;font-size:13.5px}.dark .vp-doc div[class*=language-] .line-numbers-wrapper{color:#ffffff26;border-right:1px solid rgba(255,255,255,.06)}.vp-doc div[class*=language-] pre.shiki{padding:16px 20px!important}.vp-doc div[class*=language-] pre.shiki code{font-size:13.5px;line-height:1.5;padding:0}.dark .VPSidebarItem .text{transition:text-shadow .3s ease}.dark .VPSidebarItem .text:hover{text-shadow:0 0 5px rgba(255,255,255,.4)}.vp-doc details{border:1px solid rgba(255,255,255,.1);border-radius:8px;background:#0003;padding:12px 16px;margin:16px 0;transition:all .3s ease}.vp-doc details[open]{background:#0006;border-color:#00c6ff4d;box-shadow:0 0 15px #00c6ff1a}.vp-doc summary{cursor:pointer;font-weight:600;color:#fff;position:relative;padding-left:24px;list-style:none;transition:color .3s ease}.vp-doc summary::-webkit-details-marker{display:none}.vp-doc summary:before{content:"▶";position:absolute;left:0;top:2px;font-size:.8em;color:#00c6ff;transition:transform .3s ease}.vp-doc details[open] summary:before{transform:rotate(90deg);color:#ff0080}.vp-doc summary:hover{color:#00c6ff;text-shadow:0 0 8px rgba(0,198,255,.6)}.vp-doc :not(pre)>code{font-family:Fira Code,JetBrains Mono,monospace;font-size:.85em;font-weight:500;color:#c026d3!important;background-color:#c026d314!important;padding:3px 8px;border-radius:5px;border:1px solid rgba(192,38,211,.12);box-shadow:none;transition:all .25s ease}.dark .vp-doc :not(pre)>code{color:#e879f9!important;background-color:#e879f91a!important;border:1px solid rgba(232,121,249,.15)}.vp-doc :not(pre)>code:hover{background-color:#c026d326!important;border-color:#c026d3;box-shadow:0 0 8px #c026d326}.dark .vp-doc :not(pre)>code:hover{background-color:#e879f92e!important;box-shadow:0 0 10px #e879f933;border-color:#e879f9}.vp-doc table{position:relative;overflow:hidden;border-radius:10px;box-shadow:0 2px 8px #0000000a,0 8px 24px #0000000a;border:1px solid rgba(0,0,0,.06);width:100%;border-collapse:separate;border-spacing:0}.dark .vp-doc table{box-shadow:0 2px 8px #00000026,0 8px 24px #00000026;border:1px solid rgba(255,255,255,.06)}.vp-doc table th{background:linear-gradient(135deg,#ff00800f,#a755f70f);font-weight:600;font-size:.9em;text-transform:uppercase;letter-spacing:.5px;padding:12px 16px!important;border-bottom:2px solid rgba(255,0,128,.15)}.dark .vp-doc table th{background:linear-gradient(135deg,#ff00801a,#a755f71a);border-bottom:2px solid rgba(255,0,128,.2)}.vp-doc table td{padding:10px 16px!important;border-bottom:1px solid rgba(0,0,0,.04)}.dark .vp-doc table td{border-bottom:1px solid rgba(255,255,255,.04)}.vp-doc table tr:last-child td{border-bottom:none}.vp-doc table tr:hover td{background:#ff008005}.dark .vp-doc table tr:hover td{background:#ff00800a}.vp-doc p{line-height:1.85;margin-bottom:1.4em;color:var(--vp-c-text-1)}.dark .vp-doc p{color:#ffffffe0}.vp-doc h3{margin-top:2em;margin-bottom:.8em}.vp-doc a{text-decoration:none;background:linear-gradient(to right,#00c6ff,#ff0080);background-size:0% 2px;background-repeat:no-repeat;background-position:left bottom;transition:background-size .3s ease,color .3s ease}.vp-doc a:hover{background-size:100% 2px;color:#fff!important}.dark .VPSidebarItem.is-active .text{text-shadow:0 0 10px rgba(0,198,255,.6);color:#00c6ff!important}.dark .VPSidebarItem.text:hover{text-shadow:0 0 5px rgba(255,255,255,.4)}.dark .vp-doc img{filter:drop-shadow(0 0 3px rgba(255,255,255,.1));transition:all .3s ease}.dark .vp-doc img:hover{filter:drop-shadow(0 0 8px rgba(0,198,255,.4))}.dark .VPNavBarMenuLink{transition:text-shadow .3s ease}.dark .VPNavBarMenuLink:hover,.dark .VPNavBarMenuLink.active{text-shadow:0 0 8px rgba(255,0,128,.5)}.vp-doc .custom-block{border-radius:8px;border:1px solid transparent;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);transition:transform .3s ease,box-shadow .3s ease}.vp-doc .custom-block:hover{transform:translate(5px)}.vp-doc .custom-block.info{background-color:#0072ff0d;border-color:#0072ff33;box-shadow:0 4px 12px #0072ff0d}.dark .vp-doc .custom-block.info{background-color:#00c6ff0d;border-color:#00c6ff4d;box-shadow:inset 0 0 20px #00c6ff0d}.vp-doc .custom-block.info .custom-block-title{color:#0072ff}.dark .vp-doc .custom-block.info .custom-block-title{color:#00c6ff;text-shadow:0 0 5px rgba(0,198,255,.4)}.vp-doc .custom-block.tip{background-color:#00b45a0d;border-color:#00b45a33;box-shadow:0 4px 12px #00b45a0d}.dark .vp-doc .custom-block.tip{background-color:#00ff800d;border-color:#00ff804d;box-shadow:inset 0 0 20px #00ff800d}.vp-doc .custom-block.tip .custom-block-title{color:#00b45a}.dark .vp-doc .custom-block.tip .custom-block-title{color:#00ff80;text-shadow:0 0 5px rgba(0,255,128,.4)}.vp-doc .custom-block.warning{background-color:#ffa5000d;border-color:#ffa50033;box-shadow:0 4px 12px #ffa5000d}.dark .vp-doc .custom-block.warning{background-color:#ffd7000d;border-color:#ffd7004d;box-shadow:inset 0 0 20px #ffd7000d}.vp-doc .custom-block.warning .custom-block-title{color:#d35400}.dark .vp-doc .custom-block.warning .custom-block-title{color:gold;text-shadow:0 0 5px rgba(255,215,0,.4)}.vp-doc .custom-block.danger{background-color:#dc143c0d;border-color:#dc143c33;box-shadow:0 4px 12px #dc143c0d}.dark .vp-doc .custom-block.danger{background-color:#ff00550d;border-color:#ff00554d;box-shadow:inset 0 0 20px #ff00550d}.vp-doc .custom-block.danger .custom-block-title{color:#dc143c}.dark .vp-doc .custom-block.danger .custom-block-title{color:#f05;text-shadow:0 0 5px rgba(255,0,85,.4)}.vp-doc ul{list-style:none;padding-left:1.5em}.vp-doc ul>li{position:relative;transition:transform .2s ease,text-shadow .2s ease;margin-bottom:.5em}.vp-doc ul>li:hover{transform:translate(5px);text-shadow:0 0 8px rgba(255,255,255,.3)}.vp-doc ul>li:before{content:"✦";position:absolute;left:-1.5em;color:#ff0080;font-size:1.2em;top:-.1em;text-shadow:0 0 5px rgba(255,0,128,.4);animation:starTwinkle 3s infinite alternate;transition:transform .3s ease}.vp-doc ul>li:hover:before{transform:rotate(180deg) scale(1.2);color:#00c6ff;text-shadow:0 0 8px rgba(0,198,255,.6)}@keyframes starTwinkle{0%{opacity:.6;transform:scale(.8)}to{opacity:1;transform:scale(1.1)}}.vp-doc ol{list-style:none;counter-reset:step-counter;padding-left:2em}.vp-doc ol>li{position:relative;counter-increment:step-counter}.vp-doc ol>li:before{content:counter(step-counter);position:absolute;left:-2em;width:1.5em;height:1.5em;background:#7928ca1a;color:#a755f7;border-radius:50%;text-align:center;line-height:1.5em;font-family:Rajdhani,sans-serif;font-weight:700;font-size:.9em;border:1px solid rgba(121,40,202,.3);box-shadow:0 0 5px #7928ca33;top:.2em}.vp-doc a{text-decoration:none!important;background:linear-gradient(to right,#00c6ff,#ff0080);background-size:0% 2px;background-position:0 100%;background-repeat:no-repeat;transition:background-size .3s cubic-bezier(.25,.8,.25,1),color .3s ease;padding-bottom:2px}.vp-doc a:hover{background-size:100% 2px;color:#00c6ff!important}.vp-doc hr{border:none;height:1px;background:linear-gradient(90deg,transparent,#0072ff,#c50063,transparent);margin:3rem 0;opacity:.4;position:relative}.dark .vp-doc hr{background:linear-gradient(90deg,transparent,#00c6ff,#ff0080,transparent);opacity:.6}.vp-doc hr:after{content:"❖";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);color:#999;background:var(--vp-c-bg);padding:0 10px;font-size:14px}.dark .vp-doc hr:after{color:#ff0080;text-shadow:0 0 5px rgba(255,0,128,.5)}.vp-doc kbd{background:#f0f0f0;border:1px solid #dcdcdc;border-bottom:3px solid #dcdcdc;border-radius:6px;padding:2px 6px;font-family:Fira Code,monospace;font-size:.85em;box-shadow:0 2px 4px #0000000d;color:#555;transition:all .1s ease}.vp-doc kbd:active{transform:translateY(2px);border-bottom:1px solid #dcdcdc;box-shadow:none}.dark .vp-doc kbd{background:linear-gradient(180deg,#0000004d,#00000080);border:1px solid rgba(0,198,255,.3);border-bottom:3px solid rgba(0,198,255,.5);color:#00c6ff;text-shadow:0 0 5px rgba(0,198,255,.5);box-shadow:0 5px 10px #0003}.vp-doc .header-anchor{opacity:0;transition:opacity .3s ease;text-decoration:none!important;margin-left:-.8em;padding-right:.5em;color:#ff0080!important}.vp-doc h1:hover .header-anchor,.vp-doc h2:hover .header-anchor,.vp-doc h3:hover .header-anchor,.vp-doc h4:hover .header-anchor,.vp-doc h5:hover .header-anchor,.vp-doc h6:hover .header-anchor{opacity:1}.vp-doc .header-anchor:before{content:"🔗";font-size:.8em;filter:grayscale(100%)}.vp-doc .header-anchor:hover:before{filter:none;text-shadow:0 0 5px rgba(255,0,128,.5)}.vp-doc .VPDocFooter .pager-link{border:1px solid rgba(0,0,0,.1)!important;background:linear-gradient(135deg,rgba(0,0,0,.03),transparent);-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);border-radius:12px;transition:all .6s cubic-bezier(.22,1,.36,1);position:relative;overflow:hidden}.dark .vp-doc .VPDocFooter .pager-link{border:1px solid rgba(255,255,255,.1)!important;background:linear-gradient(135deg,rgba(255,255,255,.03),transparent)}.vp-doc .VPDocFooter .pager-link:hover{border-color:#ff008080!important;transform:translateY(-3px) scale(1.02);box-shadow:0 15px 40px -10px #ff008066}.vp-doc .VPDocFooter .pager-link .title{font-family:Rajdhani,sans-serif;font-weight:600;font-size:1.1em;background:linear-gradient(90deg,#333,#666);-webkit-background-clip:text;background-clip:text;color:transparent;transition:all .5s ease}.dark .vp-doc .VPDocFooter .pager-link .title{background:linear-gradient(90deg,#fff,#ccc);-webkit-background-clip:text;background-clip:text}.vp-doc .VPDocFooter .pager-link:hover .title{background:linear-gradient(90deg,#ff0080,#a755f7);-webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:2px;text-shadow:0 0 10px rgba(255,0,128,.3)}.vp-doc .VPDocFooter .pager-link.prev:before,.vp-doc .VPDocFooter .pager-link.next:after{transition:transform .3s ease}.vp-doc .VPDocFooter .pager-link.prev:hover:before{transform:translate(-5px)}.vp-doc .VPDocFooter .pager-link.next:hover:after{transform:translate(5px)}.VPDocOutline .outline-link{transition:all .5s cubic-bezier(.22,1,.36,1);border-left:2px solid transparent;padding-left:10px;opacity:.6;position:relative}.VPDocOutline .outline-link:hover{opacity:1;color:#c50063!important;transform:translate(8px)}.dark .VPDocOutline .outline-link:hover{color:#ff0080!important;text-shadow:0 0 8px rgba(255,0,128,.6)}.VPDocOutline .outline-link.active{opacity:1;color:#7e22ce!important;border-left-color:#7e22ce;background:linear-gradient(90deg,rgba(126,34,206,.1),transparent);padding-left:18px;font-weight:600}.dark .VPDocOutline .outline-link.active{color:#a755f7!important;border-left-color:#a755f7;background:linear-gradient(90deg,rgba(167,85,247,.15),transparent);text-shadow:0 0 15px rgba(167,85,247,.6)}.VPDocAsideOutline{background:#fff6!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important;border:1px solid rgba(0,0,0,.04)!important;border-radius:12px!important;padding:16px 12px!important;transition:all .3s ease}.dark .VPDocAsideOutline{background:#0b0c1566!important;border:1px solid rgba(255,255,255,.04)!important}.VPDocAsideOutline .title{font-size:13px!important;font-weight:600!important;letter-spacing:.5px;text-transform:uppercase;color:var(--vp-c-text-2)!important;padding-bottom:8px;border-bottom:1px solid rgba(0,0,0,.06);margin-bottom:8px!important}.dark .VPDocAsideOutline .title{border-bottom:1px solid rgba(255,255,255,.06)}.VPLocalNav{background:#ffffffbf!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important;border-bottom:1px solid rgba(0,0,0,.04)!important;transition:background .3s ease}.dark .VPLocalNav{background:#0b0c15bf!important;border-bottom:1px solid rgba(255,255,255,.04)!important}.VPLocalNav .title{font-weight:600!important;transition:color .25s}.VPLocalNav .title:hover{color:#ff0080!important}.VPLocalNav .open-sidebar-btn{transition:all .25s ease;border-radius:6px}.VPLocalNav .open-sidebar-btn:hover{background:#ff008014;color:#ff0080}.DocSearch{--docsearch-primary-color: #ff0080 !important;--docsearch-highlight-color: #ff0080 !important;--docsearch-searchbox-shadow: 0 0 0 3px rgba(255, 0, 128, .2) !important;--docsearch-container-background: rgba(0, 0, 0, .4) !important;--docsearch-modal-background: rgba(255, 255, 255, .85) !important;--docsearch-modal-shadow: 0 10px 40px rgba(0, 0, 0, .1) !important;--docsearch-footer-background: rgba(255, 255, 255, .9) !important;--docsearch-hit-background: rgba(255, 255, 255, .9) !important;--docsearch-hit-shadow: none !important;--docsearch-hit-color: var(--vp-c-text-1) !important;--docsearch-footer-shadow: none !important}.dark .DocSearch{--docsearch-modal-background: rgba(11, 12, 21, .9) !important;--docsearch-modal-shadow: 0 10px 40px rgba(0, 0, 0, .5) !important;--docsearch-footer-background: rgba(11, 12, 21, .95) !important;--docsearch-hit-background: rgba(255, 255, 255, .05) !important;--docsearch-hit-active-color: #ff0080 !important;--docsearch-logo-color: rgba(255, 255, 255, .3) !important}.DocSearch-Modal{backdrop-filter:blur(20px)!important;-webkit-backdrop-filter:blur(20px)!important;border:1px solid rgba(255,0,128,.1)!important;border-radius:16px!important;overflow:hidden}.DocSearch-Hit a{border-radius:8px!important;transition:all .2s ease}.DocSearch-Hit[aria-selected=true] a{background:linear-gradient(135deg,#ff00801a,#a755f71a)!important;border-left:3px solid #ff0080!important}.DocSearch-Form{border-radius:10px!important;box-shadow:0 0 0 2px #ff008026!important}.DocSearch-Form:focus-within{box-shadow:0 0 0 2px #ff0080!important}.DocSearch-Reset{transition:all .2s ease}.DocSearch-Reset:hover{color:#ff0080!important;transform:scale(1.15)}.DocSearch-Footer{border-top:1px solid rgba(0,0,0,.05)!important}.dark .DocSearch-Footer{border-top:1px solid rgba(255,255,255,.05)!important}@keyframes pageFadeIn{0%{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.vp-doc{animation:pageFadeIn .4s cubic-bezier(.22,1,.36,1)}.vp-doc .shiki .highlighted{background-color:#ff00800f!important;display:block;position:relative}.dark .vp-doc .shiki .highlighted{background-color:#ff008014!important}.vp-doc .shiki .highlighted:before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#ff0080,#a755f7);border-radius:0 2px 2px 0}.vp-doc .shiki .highlighted.added{background-color:#00c85314!important}.vp-doc .shiki .highlighted.added:before{background:linear-gradient(180deg,#00c853,#00e676)}.dark .vp-doc .shiki .highlighted.added{background-color:#00c8531f!important}.vp-doc .shiki .highlighted.removed{background-color:#ff000014!important}.vp-doc .shiki .highlighted.removed:before{background:linear-gradient(180deg,#ff1744,#ff5252)}.dark .vp-doc .shiki .highlighted.removed{background-color:#ff00001f!important}.vp-doc .shiki .line-numbers-wrapper .highlighted{background-color:transparent!important}.vp-doc .shiki .line-numbers-wrapper .highlighted:before{display:none!important}@media(min-width:960px){.vp-doc{max-width:860px}}.VPNavBarSearchButton{background-color:#0000000d!important;border:1px solid rgba(0,0,0,.1)!important;border-radius:8px!important;transition:all .5s cubic-bezier(.22,1,.36,1)}.dark .VPNavBarSearchButton{background-color:#0003!important;border:1px solid rgba(255,255,255,.1)!important}.VPNavBarSearchButton:hover{border-color:#ff0080!important;box-shadow:0 0 20px #ff008066;background-color:#ff00801a!important;transform:scale(1.05)}.VPNavBarSearchButton .DocSearch-Search-Icon{color:#a755f7!important;transition:transform .5s ease}.VPNavBarSearchButton:hover .DocSearch-Search-Icon{transform:scale(1.3) rotate(180deg);color:#ff0080!important}.VPNavBarSearchButton .DocSearch-Button-Placeholder{font-family:Fira Code,monospace;font-size:.9em;transition:color .3s ease;color:var(--vp-c-text-2)}.VPNavBarSearchButton:hover .DocSearch-Button-Placeholder{color:#ff0080;text-shadow:0 0 5px rgba(255,0,128,.5)}.vp-doc img{animation:hologramUnfold .8s cubic-bezier(.2,.8,.2,1) backwards}@keyframes hologramUnfold{0%{opacity:0;transform:scaleY(.01) scaleX(.5);filter:brightness(2) blur(10px)}50%{transform:scaleY(1) scaleX(.8);filter:brightness(1.5) blur(5px)}to{opacity:1;transform:scale(1);filter:brightness(1) blur(0)}}.VPNavScreen{background-color:#fffcf9eb!important;backdrop-filter:blur(24px)!important;-webkit-backdrop-filter:blur(24px)!important;height:calc(100vh - var(--vp-nav-height))!important;padding:16px 24px!important}.dark .VPNavScreen{background-color:#0b0c15eb!important}.VPNavScreen .container{max-width:100%}.VPNavScreen .VPNavScreenMenuLink{border-bottom:1px solid rgba(0,0,0,.06)!important}.dark .VPNavScreen .VPNavScreenMenuLink{border-bottom-color:#ffffff0f!important}.VPNavScreen .VPNavScreenMenuLink a{font-family:Rajdhani,sans-serif;font-size:16px;font-weight:600;letter-spacing:3px;text-transform:uppercase;padding:14px 16px!important;border-radius:10px;transition:all .3s ease;position:relative}.VPNavScreen .VPNavScreenMenuLink a:hover{color:#ff0080!important;padding-left:24px!important;background:linear-gradient(90deg,rgba(255,0,128,.08),transparent)}.VPNavScreen .VPNavScreenMenuLink.active a{color:#ff0080!important;background:linear-gradient(90deg,rgba(255,0,128,.06),transparent);border-left:3px solid #ff0080}.VPNavScreen .VPNavScreenMenuGroup{border-bottom:1px solid rgba(0,0,0,.06)!important;overflow:hidden;transition:border-color .3s}.dark .VPNavScreen .VPNavScreenMenuGroup{border-bottom-color:#ffffff0f!important}.VPNavScreen .VPNavScreenMenuGroup .button{display:flex;align-items:center;justify-content:space-between;width:100%;padding:14px 16px!important;border-radius:10px;background:none;border:none;cursor:pointer;transition:all .3s ease;color:var(--vp-c-text-1)}.VPNavScreen .VPNavScreenMenuGroup .button:hover{background:linear-gradient(90deg,rgba(255,0,128,.08),transparent);color:#ff0080}.VPNavScreen .VPNavScreenMenuGroup .button-text{font-family:Rajdhani,sans-serif;font-size:16px;font-weight:600;letter-spacing:3px;text-transform:uppercase}.VPNavScreen .VPNavScreenMenuGroup .button-icon{font-size:14px;color:#ff0080;transition:transform .4s cubic-bezier(.22,1,.36,1)}.VPNavScreen .VPNavScreenMenuGroup.open .button-icon{transform:rotate(45deg)}.VPNavScreen .VPNavScreenMenuGroup .items{padding:2px 0 8px 12px}.VPNavScreen .VPNavScreenMenuGroup .item{border-left:1px solid rgba(0,0,0,.08);margin-left:8px;padding-left:4px}.dark .VPNavScreen .VPNavScreenMenuGroup .item{border-left-color:#ffffff14}.VPNavScreen .VPNavScreenMenuGroup .item a{display:block;padding:8px 16px!important;font-size:14px;line-height:1.5;color:var(--vp-c-text-2);border-radius:8px;transition:all .25s ease;position:relative}.VPNavScreen .VPNavScreenMenuGroup .item a:hover{color:#ff0080!important;background:linear-gradient(90deg,rgba(255,0,128,.06),transparent);padding-left:22px!important;border-left:2px solid #ff0080;margin-left:-2px}.VPNavScreen .VPNavScreenAppearance{display:flex;justify-content:space-between;align-items:center;margin:16px 0;padding:14px 18px;border-radius:12px;background:#00000008;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border:1px solid rgba(0,0,0,.06);transition:all .3s ease}.dark .VPNavScreen .VPNavScreenAppearance{background:#ffffff0a;border-color:#ffffff0f}.VPNavScreen .VPNavScreenAppearance .text{font-family:Rajdhani,sans-serif;font-size:14px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--vp-c-text-2)}.VPNavScreen .VPNavScreenSocialLinks{display:flex;justify-content:center;padding:16px 0;border-top:1px solid rgba(0,0,0,.06);margin-top:auto}.dark .VPNavScreen .VPNavScreenSocialLinks{border-top-color:#ffffff0f}.VPNavScreen .VPNavScreenSocialLinks a{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;color:var(--vp-c-text-2);transition:all .3s ease;background:#00000008}.dark .VPNavScreen .VPNavScreenSocialLinks a{background:#ffffff0a}.VPNavScreen .VPNavScreenSocialLinks a:hover{color:#ff0080;background:#ff00801a;transform:scale(1.1);box-shadow:0 0 20px #ff008033}.VPNavBarTitle:hover .logo{animation:glitch-anim .3s infinite;filter:drop-shadow(0 0 5px #ff0080)}@keyframes glitch-anim{0%{transform:translate(0)}20%{transform:translate(-2px,2px)}40%{transform:translate(-2px,-2px)}60%{transform:translate(2px,2px)}80%{transform:translate(2px,-2px)}to{transform:translate(0)}}.Layout{animation:dreamStart 1.5s ease-out}@keyframes dreamStart{0%{opacity:0;filter:blur(10px);transform:scale(.98)}to{opacity:1;filter:blur(0);transform:scale(1)}}::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#0003;border-radius:4px}::-webkit-scrollbar-thumb:hover{background:#ff008080}.dark ::-webkit-scrollbar-track{background:linear-gradient(to bottom,transparent,rgba(167,85,247,.1),transparent)}.dark ::-webkit-scrollbar-thumb{background:#fff3;border-radius:4px;border:1px solid rgba(255,255,255,.1)}.dark ::-webkit-scrollbar-thumb:hover{background:#ff0080;box-shadow:none}.dark .VPSidebar{background-color:transparent!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-right:1px solid rgba(255,255,255,.05)}.VPSwitchAppearance{background-color:#0000000d!important;border:1px solid rgba(0,0,0,.1)!important;border-radius:22px!important;transition:all .5s ease}.dark .VPSwitchAppearance{background-color:#0003!important;border:1px solid rgba(255,255,255,.1)!important}.VPSwitchAppearance:hover{border-color:#a755f7!important;box-shadow:0 0 15px #a755f766;transform:rotate(180deg)}.VPSwitchAppearance .check{transform:none!important;border-radius:50%!important}.VPBackToTop{background-color:#ff0080cc!important;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);border-radius:50%!important;width:48px!important;height:48px!important;bottom:32px!important;right:32px!important;transition:all .5s cubic-bezier(.22,1,.36,1)!important;opacity:0;transform:translateY(20px)}.VPBackToTop.show{opacity:1;transform:translateY(0);animation:floatBtn 3s ease-in-out infinite}@keyframes floatBtn{0%,to{transform:translateY(0)}50%{transform:translateY(-10px)}}.VPBackToTop:hover{background-color:#ff0080!important;box-shadow:0 0 20px #ff008099,0 0 40px #ff00804d;transform:scale(1.1)!important}.VPBackToTop:before{content:"▲";color:#fff;font-size:1.2em}.VPSidebarItem.is-active .text{background:linear-gradient(90deg,rgba(197,0,99,.1),transparent);border-left:3px solid #c50063;padding-left:12px;color:#c50063!important;border-radius:0 8px 8px 0;font-weight:600}.dark .VPSidebarItem.is-active .text{background:linear-gradient(90deg,rgba(255,0,128,.1),transparent);border-left:3px solid #ff0080;color:#ff0080!important;text-shadow:0 0 10px rgba(255,0,128,.4)}.VPSidebarItem .text:not(.is-active):hover{color:#7e22ce!important;transform:translate(5px)}.dark .VPSidebarItem .text:not(.is-active):hover{color:#a755f7!important;text-shadow:0 0 5px rgba(167,85,247,.4)}.VPDocAsideOutline:before,.VPDocAsideOutline:after,.VPDocAside .content:before,.VPDocAside .content:after,.aside-curtain{display:none!important;content:none!important;background:none!important;opacity:0!important}';
const _sfc_main$4 = {
  __name: "EffectSwitch",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(false);
    const videoElement = ref(null);
    const disableEffects = () => {
      if (videoElement.value) {
        videoElement.value.pause();
        videoElement.value.removeAttribute("src");
        videoElement.value.load();
        videoElement.value.remove();
        videoElement.value = null;
      } else {
        const el = document.querySelector(".bg-video");
        if (el) {
          el.pause();
          el.removeAttribute("src");
          el.load();
          el.remove();
        }
      }
      stopMeteorEffect();
      const styleTag = document.getElementById("custom-theme-styles");
      if (styleTag) {
        styleTag.remove();
      }
    };
    const enableEffects = () => {
      if (!document.getElementById("custom-theme-styles")) {
        const style = document.createElement("style");
        style.id = "custom-theme-styles";
        style.textContent = customStyles;
        document.head.appendChild(style);
      }
      initMeteorEffect();
      loadVideo();
    };
    const loadVideo = () => {
      const videoUrl = withBase("/background.webm");
      createVideoElement(videoUrl);
    };
    const createVideoElement = (src) => {
      if (document.querySelector(".bg-video")) return;
      const video = document.createElement("video");
      video.className = "bg-video";
      video.muted = true;
      video.loop = true;
      video.preload = "auto";
      video.playsInline = true;
      video.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
    will-change: transform;
    transform: translateZ(0);
    transition: opacity 1.5s ease-in-out;
  `;
      document.body.appendChild(video);
      videoElement.value = video;
      const showPausedFrame = () => {
        video.style.opacity = "0.3";
        isLoading.value = false;
      };
      const startPlayback = () => {
        video.currentTime = 0;
        video.play().catch(() => {
        });
      };
      video.addEventListener("loadeddata", () => {
        video.currentTime = 1;
        showPausedFrame();
        if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
          startPlayback();
        }
      }, { once: true });
      video.addEventListener("canplaythrough", startPlayback, { once: true });
      video.addEventListener("error", () => {
        if (src.endsWith(".webm")) {
          video.pause();
          video.removeAttribute("src");
          video.load();
          video.remove();
          if (videoElement.value === video) {
            videoElement.value = null;
          }
          createVideoElement(withBase("/background.mp4"));
        } else {
          isLoading.value = false;
        }
      }, { once: true });
      video.src = src;
      video.load();
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        video.currentTime = 1;
        showPausedFrame();
      }
      if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
        startPlayback();
      }
    };
    onMounted(() => {
      isEffectsEnabled.value = true;
      isLoading.value = true;
      enableEffects();
    });
    onBeforeUnmount(() => {
      disableEffects();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["effect-control", { active: unref(isEffectsEnabled), loading: isLoading.value }]
      }, _attrs))} data-v-8945e2f0><button class="effect-switch"${ssrRenderAttr("title", unref(isEffectsEnabled) ? "关闭视觉特效 (节省性能)" : "开启视觉特效 (消耗性能)")}${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${ssrRenderAttr("aria-pressed", unref(isEffectsEnabled))} data-v-8945e2f0><span class="effect-track" aria-hidden="true" data-v-8945e2f0><span class="effect-thumb" data-v-8945e2f0></span></span><span class="effect-label" data-v-8945e2f0>FX</span><span class="effect-status" data-v-8945e2f0>${ssrInterpolate(isLoading.value ? "..." : unref(isEffectsEnabled) ? "ON" : "OFF")}</span></button></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/EffectSwitch.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const EffectSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-8945e2f0"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "GoogleTranslate",
  __ssrInlineRender: true,
  setup(__props) {
    const showDropdown = ref(false);
    const currentLang = ref("zh-CN");
    let observer = null;
    let scriptEl = null;
    const languages = [
      { code: "zh-CN", label: "简体中文" },
      { code: "en", label: "English" },
      { code: "ja", label: "日本語" },
      { code: "ko", label: "한국어" },
      { code: "ru", label: "Русский" },
      { code: "es", label: "Español" },
      { code: "fr", label: "Français" },
      { code: "de", label: "Deutsch" }
    ];
    const currentLabel = computed(
      () => languages.find((l) => l.code === currentLang.value)?.label ?? "简体中文"
    );
    const handleClickOutside = (e) => {
      const target = e.target;
      if (!target.closest(".translate-wrapper")) {
        showDropdown.value = false;
      }
    };
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
      const cookies = document.cookie.split(";");
      const googtrans = cookies.find((c) => c.trim().startsWith("googtrans="));
      if (googtrans) {
        const lang = googtrans.split("/").pop();
        if (lang && languages.some((l) => l.code === lang)) {
          currentLang.value = lang;
        }
      }
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "zh-CN",
            includedLanguages: "en,ja,ko,ru,zh-CN,es,fr,de",
            autoDisplay: false
          },
          "google_translate_element"
        );
      };
      const existingScript = document.querySelector('script[src*="translate_a/element.js"]');
      if (existingScript) {
        scriptEl = existingScript;
      } else {
        scriptEl = document.createElement("script");
        scriptEl.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        scriptEl.async = true;
        document.body.appendChild(scriptEl);
      }
      observer = new MutationObserver(() => {
        const banner = document.querySelector(".goog-te-banner-frame");
        if (banner) {
          banner.remove();
        }
        if (document.body.style.top !== "0px" && document.body.style.top !== "") {
          document.body.style.top = "0px";
        }
        const frames = document.querySelectorAll('iframe[id*=":1.container"]');
        frames.forEach((frame) => {
          if (frame instanceof HTMLElement) frame.style.display = "none";
        });
      });
      observer.observe(document.body, {
        childList: true,
        attributes: true,
        attributeFilter: ["style", "class"]
      });
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
      observer?.disconnect();
      observer = null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "translate-wrapper notranslate",
        translate: "no"
      }, _attrs))}><button class="${ssrRenderClass([{ active: showDropdown.value }, "translate-btn"])}"><svg class="translate-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"></path><path d="m4 14 6-8 2-2"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path></svg><span class="selected-text">${ssrInterpolate(currentLabel.value)}</span><svg class="${ssrRenderClass([{ open: showDropdown.value }, "chevron-icon"])}" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg></button>`);
      if (showDropdown.value) {
        _push(`<div class="translate-dropdown"><!--[-->`);
        ssrRenderList(languages, (lang) => {
          _push(`<button class="${ssrRenderClass([{ active: lang.code === currentLang.value }, "dropdown-item"])}"><span class="item-label">${ssrInterpolate(lang.label)}</span>`);
          if (lang.code === currentLang.value) {
            _push(`<span class="item-check">✓</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div id="google_translate_element" style="${ssrRenderStyle({ "display": "none" })}"></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/GoogleTranslate.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MusicPlayer",
  __ssrInlineRender: true,
  setup(__props) {
    const audioEl = ref(null);
    const isPlaying = ref(false);
    const blockedByPolicy = ref(false);
    const volume = ref(0.3);
    const musicSrc = withBase("/Background.ogg");
    const volumePercent = computed(() => `${Math.round(volume.value * 100)}%`);
    const buttonTitle = computed(() => {
      if (blockedByPolicy.value) return "浏览器限制自动播放，点击后开始播放";
      return isPlaying.value ? "暂停背景音乐" : "播放背景音乐";
    });
    const playNow = async () => {
      const el = audioEl.value;
      if (!el) return;
      try {
        await el.play();
        isPlaying.value = true;
        blockedByPolicy.value = false;
      } catch {
        isPlaying.value = false;
        blockedByPolicy.value = true;
      }
    };
    const setVolume = (value) => {
      const normalized = Math.min(1, Math.max(0, value));
      volume.value = normalized;
      const el = audioEl.value;
      if (el) {
        el.volume = normalized;
      }
      localStorage.setItem("bgm-volume", String(normalized));
    };
    const resumeOnGesture = () => {
      void playNow();
    };
    onMounted(() => {
      const saved = Number(localStorage.getItem("bgm-volume"));
      if (!Number.isNaN(saved)) {
        setVolume(saved);
      }
      if (audioEl.value) {
        audioEl.value.volume = volume.value;
      }
      void playNow();
      window.addEventListener("pointerdown", resumeOnGesture, { once: true });
      window.addEventListener("keydown", resumeOnGesture, { once: true });
      window.addEventListener("touchstart", resumeOnGesture, { once: true });
    });
    onBeforeUnmount(() => {
      window.removeEventListener("pointerdown", resumeOnGesture);
      window.removeEventListener("keydown", resumeOnGesture);
      window.removeEventListener("touchstart", resumeOnGesture);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["music-control", { blocked: blockedByPolicy.value }]
      }, _attrs))} data-v-08714a44><div class="music-shell" data-v-08714a44><button class="music-toggle"${ssrRenderAttr("title", buttonTitle.value)} data-v-08714a44><span class="${ssrRenderClass([{ pause: isPlaying.value }, "play-mark"])}" aria-hidden="true" data-v-08714a44></span></button><div class="music-meta" data-v-08714a44><span class="label" data-v-08714a44>BGM</span><span class="${ssrRenderClass([{ on: isPlaying.value }, "status"])}" data-v-08714a44>${ssrInterpolate(isPlaying.value ? "ON" : "OFF")}</span></div><div class="volume-control" data-v-08714a44><span class="volume-mark" aria-hidden="true" data-v-08714a44></span><input class="volume-slider" type="range" min="0" max="1" step="0.01"${ssrRenderAttr("value", volume.value)} aria-label="背景音乐音量" title="背景音乐音量" data-v-08714a44><span class="volume-value" data-v-08714a44>${ssrInterpolate(volumePercent.value)}</span></div></div><audio${ssrRenderAttr("src", unref(musicSrc))} preload="none" loop data-v-08714a44></audio></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/MusicPlayer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MusicPlayer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-08714a44"]]);
const _sfc_main$1 = {
  __name: "DarkWatcher",
  __ssrInlineRender: true,
  setup(__props) {
    const isClient = typeof document !== "undefined";
    const checkDark = () => isClient ? document.documentElement.classList.contains("dark") : false;
    const isDark = ref(checkDark());
    let observer = null;
    if (isClient) {
      observer = new MutationObserver(() => {
        isDark.value = checkDark();
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"]
      });
    }
    onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSlot(_ctx.$slots, "default", { isDark: isDark.value }, null, _push, _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/components/DarkWatcher.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Lemma",
  __ssrInlineRender: true,
  props: {
    title: {}
  },
  setup(__props) {
    const lemmaCounter = inject("lemmaCounter");
    lemmaCounter.value++;
    const id = lemmaCounter.value;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "lemma-box" }, _attrs))}><div class="lemma-title"> 引理 ${ssrInterpolate(unref(id))} `);
      if (__props.title) {
        _push(`<span>（${ssrInterpolate(__props.title)}）</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="lemma-body">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/components/Lemma.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RawTheme = {
  extends: theme,
  Layout() {
    return h(theme.Layout, null, {
      "nav-bar-content-after": () => [h(EffectSwitch), h(MusicPlayer), h(_sfc_main$3)]
    });
  },
  enhanceApp(ctx) {
    enhanceAppWithTabs(ctx.app);
    ctx.app.component("DarkWatcher", _sfc_main$1);
    ctx.app.component("Lemma", _sfc_main);
    const lemmaCounter = ref(0);
    ctx.app.provide("lemmaCounter", lemmaCounter);
    ctx.router.onAfterRouteChange = () => {
      lemmaCounter.value = 0;
    };
  }
};
const ClientOnly = defineComponent({
  setup(_, { slots }) {
    const show = ref(false);
    onMounted(() => {
      show.value = true;
    });
    return () => show.value && slots.default ? slots.default() : null;
  }
});
function useCodeGroups() {
  if (inBrowser) {
    window.addEventListener("click", (e) => {
      const el = e.target;
      if (el.matches(".vp-code-group input")) {
        const group = el.parentElement?.parentElement;
        if (!group)
          return;
        const i = Array.from(group.querySelectorAll("input")).indexOf(el);
        if (i < 0)
          return;
        const blocks = group.querySelector(".blocks");
        if (!blocks)
          return;
        const current = Array.from(blocks.children).find((child) => child.classList.contains("active"));
        if (!current)
          return;
        const next = blocks.children[i];
        if (!next || current === next)
          return;
        current.classList.remove("active");
        activate(next);
        const label = group?.querySelector(`label[for="${el.id}"]`);
        label?.scrollIntoView({ block: "nearest" });
      }
    });
  }
}
function activate(el) {
  el.classList.add("active");
  window.dispatchEvent(new CustomEvent("vitepress:codeGroupTabActivate", { detail: el }));
}
const ignoredNodes = [".vp-copy-ignore", ".diff.remove"].join(", ");
function useCopyCode() {
  if (inBrowser) {
    const timeoutIdMap = /* @__PURE__ */ new WeakMap();
    window.addEventListener("click", (e) => {
      const el = e.target;
      if (el.matches('div[class*="language-"] > button.copy')) {
        const parent = el.parentElement;
        const sibling = el.nextElementSibling?.nextElementSibling;
        if (!parent || !sibling) {
          return;
        }
        const clone = sibling.cloneNode(true);
        clone.querySelectorAll(ignoredNodes).forEach((node) => node.remove());
        clone.innerHTML = clone.innerHTML.replace(/\n+/g, "\n");
        let text = clone.textContent || "";
        const lang = /language-(\w+)/.exec(parent.className)?.[1] || "";
        if (isShell(lang)) {
          text = text.replace(/^ *(\$|>) /gm, "").trim();
        }
        copyToClipboard(text).then(() => {
          el.classList.add("copied");
          clearTimeout(timeoutIdMap.get(el));
          const timeoutId = setTimeout(() => {
            el.classList.remove("copied");
            el.blur();
            timeoutIdMap.delete(el);
          }, 2e3);
          timeoutIdMap.set(el, timeoutId);
        });
      }
    });
  }
}
async function copyToClipboard(text) {
  try {
    return navigator.clipboard.writeText(text);
  } catch {
    const element = document.createElement("textarea");
    const previouslyFocusedElement = document.activeElement;
    element.value = text;
    element.setAttribute("readonly", "");
    element.style.contain = "strict";
    element.style.position = "absolute";
    element.style.left = "-9999px";
    element.style.fontSize = "12pt";
    const selection = document.getSelection();
    const originalRange = selection ? selection.rangeCount > 0 && selection.getRangeAt(0) : null;
    document.body.appendChild(element);
    element.select();
    element.selectionStart = 0;
    element.selectionEnd = text.length;
    document.execCommand("copy");
    document.body.removeChild(element);
    if (originalRange) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }
}
function useUpdateHead(route, siteDataByRouteRef) {
  let isFirstUpdate = true;
  let managedHeadElements = [];
  const updateHeadTags = (newTags) => {
    if (isFirstUpdate) {
      isFirstUpdate = false;
      newTags.forEach((tag) => {
        const headEl = createHeadElement(tag);
        for (const el of document.head.children) {
          if (el.isEqualNode(headEl)) {
            managedHeadElements.push(el);
            return;
          }
        }
      });
      return;
    }
    const newElements = newTags.map(createHeadElement);
    managedHeadElements.forEach((oldEl, oldIndex) => {
      const matchedIndex = newElements.findIndex((newEl) => newEl?.isEqualNode(oldEl ?? null));
      if (matchedIndex !== -1) {
        delete newElements[matchedIndex];
      } else {
        oldEl?.remove();
        delete managedHeadElements[oldIndex];
      }
    });
    newElements.forEach((el) => el && document.head.appendChild(el));
    managedHeadElements = [...managedHeadElements, ...newElements].filter(Boolean);
  };
  watchEffect(() => {
    const pageData = route.data;
    const siteData2 = siteDataByRouteRef.value;
    const pageDescription = pageData && pageData.description;
    const frontmatterHead = pageData && pageData.frontmatter.head || [];
    const title = createTitle(siteData2, pageData);
    if (title !== document.title) {
      document.title = title;
    }
    const description = pageDescription || siteData2.description;
    let metaDescriptionElement = document.querySelector(`meta[name=description]`);
    if (metaDescriptionElement) {
      if (metaDescriptionElement.getAttribute("content") !== description) {
        metaDescriptionElement.setAttribute("content", description);
      }
    } else {
      createHeadElement(["meta", { name: "description", content: description }]);
    }
    updateHeadTags(mergeHead(siteData2.head, filterOutHeadDescription(frontmatterHead)));
  });
}
function createHeadElement([tag, attrs, innerHTML]) {
  const el = document.createElement(tag);
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
  if (innerHTML) {
    el.innerHTML = innerHTML;
  }
  if (tag === "script" && attrs.async == null) {
    el.async = false;
  }
  return el;
}
function isMetaDescription(headConfig) {
  return headConfig[0] === "meta" && headConfig[1] && headConfig[1].name === "description";
}
function filterOutHeadDescription(head) {
  return head.filter((h2) => !isMetaDescription(h2));
}
const hasFetched = /* @__PURE__ */ new Set();
const createLink = () => document.createElement("link");
const viaDOM = (url) => {
  const link2 = createLink();
  link2.rel = `prefetch`;
  link2.href = url;
  document.head.appendChild(link2);
};
const viaXHR = (url) => {
  const req = new XMLHttpRequest();
  req.open("GET", url, req.withCredentials = true);
  req.send();
};
let link;
const doFetch = inBrowser && (link = createLink()) && link.relList && link.relList.supports && link.relList.supports("prefetch") ? viaDOM : viaXHR;
function usePrefetch() {
  if (!inBrowser) {
    return;
  }
  if (!window.IntersectionObserver) {
    return;
  }
  let conn;
  if ((conn = navigator.connection) && (conn.saveData || /2g/.test(conn.effectiveType))) {
    return;
  }
  const rIC = window.requestIdleCallback || setTimeout;
  let observer = null;
  const observeLinks = () => {
    if (observer) {
      observer.disconnect();
    }
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link2 = entry.target;
          observer.unobserve(link2);
          const { pathname } = link2;
          if (!hasFetched.has(pathname)) {
            hasFetched.add(pathname);
            const pageChunkPath = pathToFile(pathname);
            if (pageChunkPath)
              doFetch(pageChunkPath);
          }
        }
      });
    });
    rIC(() => {
      document.querySelectorAll("#app a").forEach((link2) => {
        const { hostname, pathname } = new URL(link2.href instanceof SVGAnimatedString ? link2.href.animVal : link2.href, link2.baseURI);
        const extMatch = pathname.match(/\.\w+$/);
        if (extMatch && extMatch[0] !== ".html") {
          return;
        }
        if (
          // only prefetch same tab navigation, since a new tab will load
          // the lean js chunk instead.
          link2.target !== "_blank" && // only prefetch inbound links
          hostname === location.hostname
        ) {
          if (pathname !== location.pathname) {
            observer.observe(link2);
          } else {
            hasFetched.add(pathname);
          }
        }
      });
    });
  };
  onMounted(observeLinks);
  const route = useRoute();
  watch(() => route.path, observeLinks);
  onUnmounted(() => {
    observer && observer.disconnect();
  });
}
function resolveThemeExtends(theme2) {
  if (theme2.extends) {
    const base = resolveThemeExtends(theme2.extends);
    return {
      ...base,
      ...theme2,
      async enhanceApp(ctx) {
        if (base.enhanceApp)
          await base.enhanceApp(ctx);
        if (theme2.enhanceApp)
          await theme2.enhanceApp(ctx);
      }
    };
  }
  return theme2;
}
const Theme = resolveThemeExtends(RawTheme);
const VitePressApp = defineComponent({
  name: "VitePressApp",
  setup() {
    const { site, lang, dir } = useData$1();
    onMounted(() => {
      watchEffect(() => {
        document.documentElement.lang = lang.value;
        document.documentElement.dir = dir.value;
      });
    });
    if (site.value.router.prefetchLinks) {
      usePrefetch();
    }
    useCopyCode();
    useCodeGroups();
    if (Theme.setup)
      Theme.setup();
    return () => h(Theme.Layout);
  }
});
async function createApp() {
  globalThis.__VITEPRESS__ = true;
  const router = newRouter();
  const app = newApp();
  app.provide(RouterSymbol, router);
  const data = initData(router.route);
  app.provide(dataSymbol, data);
  app.component("Content", Content);
  app.component("ClientOnly", ClientOnly);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: {
      get() {
        return data.frontmatter.value;
      }
    },
    $params: {
      get() {
        return data.page.value.params;
      }
    }
  });
  if (Theme.enhanceApp) {
    await Theme.enhanceApp({
      app,
      router,
      siteData: siteDataRef
    });
  }
  return { app, router, data };
}
function newApp() {
  return createSSRApp(VitePressApp);
}
function newRouter() {
  let isInitialPageLoad = inBrowser;
  return createRouter((path) => {
    let pageFilePath = pathToFile(path);
    let pageModule = null;
    if (pageFilePath) {
      if (isInitialPageLoad) {
        pageFilePath = pageFilePath.replace(/\.js$/, ".lean.js");
      }
      if (false) ;
      else {
        pageModule = import(
          /*@vite-ignore*/
          pageFilePath
        );
      }
    }
    if (inBrowser) {
      isInitialPageLoad = false;
    }
    return pageModule;
  }, Theme.NotFound);
}
if (inBrowser) {
  createApp().then(({ app, router, data }) => {
    router.go(location.href, { initialLoad: true }).then(() => {
      useUpdateHead(router.route, data.site);
      app.mount("#app");
    });
  });
}
async function render(path) {
  const { app, router } = await createApp();
  await router.go(path);
  const ctx = { content: "", vpSocialIcons: /* @__PURE__ */ new Set() };
  ctx.content = await renderToString(app, ctx);
  return ctx;
}
export {
  useRouter as a,
  dataSymbol as d,
  escapeRegExp as e,
  inBrowser as i,
  pathToFile as p,
  render,
  useData as u
};
