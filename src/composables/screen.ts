import { breakpointsTailwind } from '@vueuse/core'

export const breakpoints = useBreakpoints(breakpointsTailwind)

export const isSmallScreen = breakpoints.greaterOrEqual('sm')
export const isMediumScreen = breakpoints.greaterOrEqual('md')
export const isExtraLargeScreen = breakpoints.greaterOrEqual('xl')

export const isMobile = breakpoints.smaller('sm')
export const isPC = breakpoints.greaterOrEqual('sm')
