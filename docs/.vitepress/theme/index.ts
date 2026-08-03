// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import 'katex/dist/katex.min.css'
import './custom.css'
import EffectSwitch from './components/EffectSwitch.vue'
import GoogleTranslate from './components/GoogleTranslate.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import { h, ref } from 'vue'

import DarkWatcher from "../components/DarkWatcher.vue";
import Lemma from "../components/Lemma.vue";

export default {
    extends: DefaultTheme,

    Layout() {
        return h(DefaultTheme.Layout, null, {
            'nav-bar-content-after': () => [h(EffectSwitch), h(MusicPlayer), h(GoogleTranslate)]
        })
    },

    enhanceApp(ctx) {
        enhanceAppWithTabs(ctx.app);

        ctx.app.component("DarkWatcher", DarkWatcher);
        ctx.app.component("Lemma", Lemma);

        const lemmaCounter = ref(0);
        ctx.app.provide("lemmaCounter", lemmaCounter);

        ctx.router.onAfterRouteChange = () => {
            lemmaCounter.value = 0;
        };
    },
} satisfies Theme;
