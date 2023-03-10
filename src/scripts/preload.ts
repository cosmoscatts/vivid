import PreloadAnimationPage from '~/components/PreloadAnimationPage.vue'

export function preload() {
  const preload = createApp(PreloadAnimationPage)
  preload.mount('#preload')
}
