import { defineConfig, type DefaultTheme } from 'vitepress'

function normalizeBase(value: string) {
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

const base = normalizeBase(process.env.VITEPRESS_BASE ?? '/')
const repositoryUrl = 'https://github.com/vibe-off/gpt-5.6-sol-ultra-html-and-css-guide'
const publicAsset = (path: string) => `${base}${path.replace(/^\/+/, '')}`

const sharedTheme = {
  i18nRouting: true,
  socialLinks: [
    { icon: 'github', link: repositoryUrl, ariaLabel: 'GitHub repository' }
  ],
  search: {
    provider: 'local',
    options: {
      locales: {
        zh: {
          translations: {
            button: {
              buttonText: '搜索',
              buttonAriaLabel: '搜索'
            },
            modal: {
              displayDetails: '显示详细列表',
              resetButtonTitle: '重置搜索',
              backButtonTitle: '关闭搜索',
              noResultsText: '没有结果',
              footer: {
                selectText: '选择',
                selectKeyAriaLabel: '回车',
                navigateText: '导航',
                navigateUpKeyAriaLabel: '上箭头',
                navigateDownKeyAriaLabel: '下箭头',
                closeText: '关闭',
                closeKeyAriaLabel: 'Esc'
              }
            }
          }
        }
      }
    }
  }
} satisfies DefaultTheme.Config

const englishTheme = {
  ...sharedTheme,
  siteTitle: 'Field Guide',
  nav: [
    { text: 'Start here', link: '/start/' },
    { text: 'HTML', link: '/html/' },
    { text: 'CSS', link: '/css/' },
    { text: 'Quality', link: '/quality/' },
    { text: 'Projects', link: '/projects/' },
    { text: 'Reference', link: '/reference/cheatsheet' }
  ],
  sidebar: {
    '/start/': [
      {
        text: 'Start here',
        items: [
          { text: 'Course orientation', link: '/start/' },
          { text: 'How a page becomes pixels', link: '/start/browser-model' },
          { text: 'Set up your workbench', link: '/start/workbench' },
          { text: 'Learn with AI, not from AI', link: '/start/ai-learning' },
          { text: 'Eight-week course map', link: '/start/course-map' }
        ]
      }
    ],
    '/html/': [
      {
        text: 'HTML foundations',
        items: [
          { text: 'HTML as meaning', link: '/html/' },
          { text: 'Document anatomy', link: '/html/document-anatomy' },
          { text: 'Text, lists & links', link: '/html/text-links' },
          { text: 'Semantic structure', link: '/html/semantics' },
          { text: 'Images & media', link: '/html/media' },
          { text: 'Tables & forms', link: '/html/forms-tables' },
          { text: 'HTML challenge', link: '/html/challenge' }
        ]
      }
    ],
    '/css/': [
      {
        text: 'CSS foundations',
        items: [
          { text: 'CSS as a rule system', link: '/css/' },
          { text: 'Selectors & states', link: '/css/selectors' },
          { text: 'Cascade & specificity', link: '/css/cascade' },
          { text: 'Box model & sizing', link: '/css/box-model' },
          { text: 'Type, color & units', link: '/css/visual-foundations' },
          { text: 'Flow & positioning', link: '/css/flow-positioning' },
          { text: 'Flexbox & Grid', link: '/css/layout' },
          { text: 'Responsive design', link: '/css/responsive' },
          { text: 'States & motion', link: '/css/states-motion' }
        ]
      }
    ],
    '/quality/': [
      {
        text: 'Quality & engineering',
        items: [
          { text: 'Quality is part of the build', link: '/quality/' },
          { text: 'Accessibility by default', link: '/quality/accessibility' },
          { text: 'Systematic debugging', link: '/quality/debugging' },
          { text: 'Maintainable CSS', link: '/quality/maintainable-css' },
          { text: 'Modern CSS toolkit', link: '/quality/modern-css' },
          { text: 'Performance & resilience', link: '/quality/performance' },
          { text: 'AI-assisted workflow', link: '/quality/ai-workflow' }
        ]
      }
    ],
    '/projects/': [
      {
        text: 'Practice & assessment',
        items: [
          { text: 'How projects work', link: '/projects/' },
          { text: 'Lab 1: Profile card', link: '/projects/profile-card' },
          { text: 'Lab 2: Campus article', link: '/projects/campus-article' },
          { text: 'Debugging clinic', link: '/projects/debugging-clinic' },
          { text: 'Capstone: Campus hub', link: '/projects/capstone' },
          { text: 'Rubrics & assessment', link: '/projects/rubrics' }
        ]
      }
    ],
    '/reference/': [
      {
        text: 'Reference desk',
        items: [
          { text: 'HTML & CSS cheatsheet', link: '/reference/cheatsheet' },
          { text: 'Debugging decision tree', link: '/reference/debugging-tree' },
          { text: 'AI prompt patterns', link: '/reference/prompt-patterns' },
          { text: 'Glossary', link: '/reference/glossary' },
          { text: 'Trusted sources', link: '/reference/sources' }
        ]
      }
    ]
  },
  outline: { level: [2, 3], label: 'On this page' },
  docFooter: { prev: 'Previous lesson', next: 'Next lesson' },
  footer: {
    message: 'Learn the platform. Use AI with evidence. Own the result.',
    copyright: 'Built for classroom learning.'
  },
  langMenuLabel: 'Change language',
  darkModeSwitchLabel: 'Appearance',
  lightModeSwitchTitle: 'Switch to light theme',
  darkModeSwitchTitle: 'Switch to dark theme',
  sidebarMenuLabel: 'Menu',
  returnToTopLabel: 'Return to top',
  skipToContentLabel: 'Skip to content',
  notFound: {
    title: 'PAGE NOT FOUND',
    quote: 'This route does not exist in the field guide.',
    linkLabel: 'go to home',
    linkText: 'Take me home'
  }
} satisfies DefaultTheme.Config

const chineseTheme = {
  ...sharedTheme,
  siteTitle: '前端基础指南',
  nav: [
    { text: '从这里开始', link: '/zh/start/' },
    { text: 'HTML', link: '/zh/html/' },
    { text: 'CSS', link: '/zh/css/' },
    { text: '质量', link: '/zh/quality/' },
    { text: '项目', link: '/zh/projects/' },
    { text: '参考', link: '/zh/reference/cheatsheet' }
  ],
  sidebar: {
    '/zh/start/': [
      {
        text: '从这里开始',
        items: [
          { text: '课程导览', link: '/zh/start/' },
          { text: '网页如何变成像素', link: '/zh/start/browser-model' },
          { text: '准备开发环境', link: '/zh/start/workbench' },
          { text: '借助 AI 学习，而不是依赖 AI', link: '/zh/start/ai-learning' },
          { text: '八周课程路线', link: '/zh/start/course-map' }
        ]
      }
    ],
    '/zh/html/': [
      {
        text: 'HTML 基础',
        items: [
          { text: 'HTML 表达含义', link: '/zh/html/' },
          { text: '文档结构', link: '/zh/html/document-anatomy' },
          { text: '文本、列表与链接', link: '/zh/html/text-links' },
          { text: '语义化结构', link: '/zh/html/semantics' },
          { text: '图片与媒体', link: '/zh/html/media' },
          { text: '表格与表单', link: '/zh/html/forms-tables' },
          { text: 'HTML 挑战', link: '/zh/html/challenge' }
        ]
      }
    ],
    '/zh/css/': [
      {
        text: 'CSS 基础',
        items: [
          { text: 'CSS 是一套规则系统', link: '/zh/css/' },
          { text: '选择器与状态', link: '/zh/css/selectors' },
          { text: '层叠与优先级', link: '/zh/css/cascade' },
          { text: '盒模型与尺寸', link: '/zh/css/box-model' },
          { text: '排版、颜色与单位', link: '/zh/css/visual-foundations' },
          { text: '常规流与定位', link: '/zh/css/flow-positioning' },
          { text: 'Flexbox 与 Grid', link: '/zh/css/layout' },
          { text: '响应式设计', link: '/zh/css/responsive' },
          { text: '状态与动效', link: '/zh/css/states-motion' }
        ]
      }
    ],
    '/zh/quality/': [
      {
        text: '质量与工程',
        items: [
          { text: '质量属于构建过程', link: '/zh/quality/' },
          { text: '默认考虑无障碍', link: '/zh/quality/accessibility' },
          { text: '系统化调试', link: '/zh/quality/debugging' },
          { text: '可维护的 CSS', link: '/zh/quality/maintainable-css' },
          { text: '现代 CSS 工具箱', link: '/zh/quality/modern-css' },
          { text: '性能与韧性', link: '/zh/quality/performance' },
          { text: 'AI 辅助工作流', link: '/zh/quality/ai-workflow' }
        ]
      }
    ],
    '/zh/projects/': [
      {
        text: '实践与评估',
        items: [
          { text: '项目如何开展', link: '/zh/projects/' },
          { text: '实验 1：个人资料卡', link: '/zh/projects/profile-card' },
          { text: '实验 2：校园文章', link: '/zh/projects/campus-article' },
          { text: '调试诊所', link: '/zh/projects/debugging-clinic' },
          { text: '综合项目：校园中心', link: '/zh/projects/capstone' },
          { text: '评分标准与评估', link: '/zh/projects/rubrics' }
        ]
      }
    ],
    '/zh/reference/': [
      {
        text: '参考资料',
        items: [
          { text: 'HTML 与 CSS 速查表', link: '/zh/reference/cheatsheet' },
          { text: '调试决策树', link: '/zh/reference/debugging-tree' },
          { text: 'AI 提问模式', link: '/zh/reference/prompt-patterns' },
          { text: '术语表', link: '/zh/reference/glossary' },
          { text: '可信资料来源', link: '/zh/reference/sources' }
        ]
      }
    ]
  },
  outline: { level: [2, 3], label: '本页内容' },
  docFooter: { prev: '上一课', next: '下一课' },
  footer: {
    message: '理解平台，用证据驾驭 AI，并真正掌握结果。',
    copyright: '为课堂学习而构建。'
  },
  langMenuLabel: '切换语言',
  darkModeSwitchLabel: '外观',
  lightModeSwitchTitle: '切换到浅色主题',
  darkModeSwitchTitle: '切换到深色主题',
  sidebarMenuLabel: '菜单',
  returnToTopLabel: '返回顶部',
  skipToContentLabel: '跳到正文',
  notFound: {
    title: '页面未找到',
    quote: '这条路径不在学习指南中。',
    linkLabel: '返回首页',
    linkText: '回到中文首页'
  }
} satisfies DefaultTheme.Config

export default defineConfig({
  base,
  cleanUrls: true,
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'HTML & CSS Field Guide',
      description: 'An AI-aware, fundamentals-first course for learning the language of the web.',
      head: [
        ['meta', { property: 'og:title', content: 'HTML & CSS Field Guide' }],
        ['meta', { property: 'og:description', content: 'Build web pages you can inspect, debug, and explain—with AI as a collaborator, not a substitute.' }]
      ],
      themeConfig: englishTheme
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: 'HTML 与 CSS 学习指南',
      description: '一套重视基础、合理使用 AI 的 HTML 与 CSS 课程。',
      head: [
        ['meta', { property: 'og:title', content: 'HTML 与 CSS 学习指南' }],
        ['meta', { property: 'og:description', content: '学习构建、检查、调试并解释网页，让 AI 成为协作者而不是替代品。' }]
      ],
      themeConfig: chineseTheme
    }
  },
  vite: {
    server: {
      host: '127.0.0.1',
      cors: {
        origin: /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/
      },
      fs: {
        strict: true
      }
    }
  },
  head: [
    ['meta', { name: 'theme-color', content: '#a93622' }],
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['link', { rel: 'icon', href: publicAsset('favicon.ico'), sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: publicAsset('favicon-32.png') }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: publicAsset('favicon-192.png') }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: publicAsset('apple-touch-icon.png') }]
  ],
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
