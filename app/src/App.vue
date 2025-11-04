<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import BaseLayout from './layouts/BaseLayout.vue'

const { locale } = useI18n()

useHead({ htmlAttrs: { lang: locale } })
</script>

<template>
	<BaseLayout>
		<router-view />
	</BaseLayout>
</template>
