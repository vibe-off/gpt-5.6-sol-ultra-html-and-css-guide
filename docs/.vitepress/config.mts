import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE ?? '/'

export default defineConfig({
  base,
  lang: 'en-US',
  title: 'HTML & CSS Field Guide',
  description: 'An AI-aware, fundamentals-first course for learning the language of the web.',
  cleanUrls: true,
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
    ['meta', { property: 'og:title', content: 'HTML & CSS Field Guide' }],
    ['meta', { property: 'og:description', content: 'Build web pages you can inspect, debug, and explain—with AI as a collaborator, not a substitute.' }]
  ],
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },
  themeConfig: {
    siteTitle: 'Field Guide',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vibe-off/gpt-5.6-sol-ultra-html-and-css-guide' }
    ],
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
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    search: {
      provider: 'local'
    },
    docFooter: {
      prev: 'Previous lesson',
      next: 'Next lesson'
    },
    footer: {
      message: 'Learn the platform. Use AI with evidence. Own the result.',
      copyright: 'Built for classroom learning.'
    }
  }
})
