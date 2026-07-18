import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import AiWorkflow from './components/AiWorkflow.vue'
import BoxModelLab from './components/BoxModelLab.vue'
import CascadeLab from './components/CascadeLab.vue'
import FlexLab from './components/FlexLab.vue'
import LearningPath from './components/LearningPath.vue'
import './styles.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AiWorkflow', AiWorkflow)
    app.component('BoxModelLab', BoxModelLab)
    app.component('CascadeLab', CascadeLab)
    app.component('FlexLab', FlexLab)
    app.component('LearningPath', LearningPath)
  }
} satisfies Theme
