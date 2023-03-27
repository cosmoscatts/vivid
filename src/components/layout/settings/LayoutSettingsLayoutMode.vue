<script setup lang="ts">
const { options } = defineProps<{ options: { label: string; value: string }[] }>()
const { modelValue } = defineModel<{ modelValue: string }>()
const isChecked = (value: string) => (value === modelValue.value)
const layoutCardShadow = computed(() => {
  return ['0 1px 2.5px rgba(0, 0, 0, 0.18)', '0 1px 2.5px rgba(255, 255, 255, 0.18)'][Number(isDark.value)]
})
</script>

<template>
  <div grid="~ cols-2" h180px>
    <div v-for="{ label, value }, idx in options" :key="idx" col-span-1 flex-center>
      <div
        border-2px rd-6px cursor-pointer hover:border-primary
        :class="[isChecked(value) ? 'border-primary' : 'border-transparent']"
        @click="modelValue = value"
      >
        <a-tooltip :content="label" position="bottom">
          <div
            class="layout-card__shadow gap6px w96px h64px p6px rd-4px"
            :class="[value.includes('vertical') ? 'flex' : 'flex flex-col']"
          >
            <template v-if="value === 'vertical'">
              <div w18px h-full bg-primary:50 rd-4px />
              <div flex="~ 1 col" gap6px>
                <div h16px bg-primary rd-4px />
                <div flex-1 bg-primary:25 rd-4px />
              </div>
            </template>
            <template v-if="value === 'vertical-mix'">
              <div w8px h-full bg-primary:50 rd-4px />
              <div w16px h-full bg-primary:50 rd-4px />
              <div flex="~ 1 col" gap6px>
                <div h16px bg-primary rd-4px />
                <div flex-1 bg-primary:25 rd-4px />
              </div>
            </template>
            <template v-if="value === 'horizontal'">
              <div h16px bg-primary rd-4px />
              <div flex="~ 1" gap6px>
                <div flex-1 bg-primary:25 rd-4px />
              </div>
            </template>
            <template v-if="value === 'horizontal-mix'">
              <div h16px bg-primary rd-4px />
              <div flex="~ 1" gap6px>
                <div w18px bg-primary:50 rd-4px />
                <div flex-1 bg-primary:25 rd-4px />
              </div>
            </template>
          </div>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-card__shadow {
  box-shadow: v-bind(layoutCardShadow);
}
</style>
