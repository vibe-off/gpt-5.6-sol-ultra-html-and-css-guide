import { computed } from 'vue'
import { useData } from 'vitepress'

export function useCourseLocale<T>(messages: { en: T; zh: T }) {
  const { lang } = useData()
  const isZh = computed(() => lang.value.toLowerCase().startsWith('zh'))
  const text = computed(() => messages[isZh.value ? 'zh' : 'en'])

  function localizePath(path: string) {
    if (!isZh.value || path === '/zh/' || path.startsWith('/zh/')) return path
    return path === '/' ? '/zh/' : `/zh${path}`
  }

  return { isZh, localizePath, text }
}
