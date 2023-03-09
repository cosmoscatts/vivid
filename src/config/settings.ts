interface ConfigSettings {
  layout: 'vertical' | 'horizontal'
  showLogo: boolean
  showTabs: boolean
  showFoot: boolean
  fixNav: boolean

  showAnimation: boolean
  animationMode: string

  primaryColor: string

  cacheTabs: boolean
  tabShapeStyle: 'default' | 'chrome'
}

export const APP_SETTINGS: ConfigSettings = {
  layout: 'vertical',
  showLogo: true,
  showTabs: true,
  showFoot: true,
  fixNav: true,

  showAnimation: true,
  // 页面切换动画类型
  //  - | 'fade-slide' | 'fade' | 'fade-bottom' |
  //  - | 'fade-scale' | 'zoom-fade' | 'zoom-out' |
  animationMode: 'fade-slide',

  primaryColor: '#377BB5',

  cacheTabs: true,
  tabShapeStyle: 'chrome',
}
