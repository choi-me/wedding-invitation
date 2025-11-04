<script setup lang="ts">
import type { MobileOS } from '@/utils'

import { useScriptTag } from '@vueuse/core'
import { onMounted, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { env } from '@/env'
import { getMobileOperatingSystem, openWithNewTab } from '@/utils'
import Icon from '../icon/Icon.vue'
import AppButton from './AppButton.vue'

const { t } = useI18n()

const kakaoKey = env.KAKAO_KEY
const lat = 35.142304
const lng = 126.838703

let mobile: MobileOS
let Kakao: any
let kakao: any

const mapArea = useTemplateRef<HTMLDivElement>('mapArea')

const place = t('info.place')

const openGoogleMap = () => {
	openWithNewTab('https://goo.gl/maps/xkcKVNUaeB9iskVB9')
}

const openNaverMap = () => {
	openWithNewTab(
		mobile === 'Android' || mobile === 'iOS'
			? 'http://naver.me/5qCpf1Dw'
			: 'http://naver.me/GMFE7CaG',
	)
}

const openKakaoMap = () => {
	openWithNewTab('https://place.map.kakao.com/1943035846')
}

const openKakaoNavi = () => {
	Kakao.Navi.share({
		name: place,
		x: lng,
		y: lat,
		coordType: 'wgs84',
	})
}

onMounted(() => {
	mobile = getMobileOperatingSystem()
})

useScriptTag(
	`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${kakaoKey}&libraries=services`,
	() => {
		kakao = window.kakao

		kakao.maps.load(() => {
			const map = new kakao.maps.Map(mapArea.value, {
				center: new kakao.maps.LatLng(lat, lng),
				level: 4, // zoom level
			})

			// 주소-좌표 변환 객체를 생성합니다
			const geocoder = new kakao.maps.services.Geocoder()

			// 주소로 좌표를 검색합니다
			geocoder.addressSearch(env.ADDRESS, (result: any, status: any) => {
				if (status === kakao.maps.services.Status.OK) {
					const coords = new kakao.maps.LatLng(result[0].y, result[0].x)

					const marker = new kakao.maps.Marker({
						map: map,
						position: coords,
					})

					const infowindow = new kakao.maps.InfoWindow({
						content: `<div class="info-box" style="width: 150px; padding: 6px 0;">${place}</div>`,
					})
					infowindow.open(map, marker)

					map.setCenter(coords)
				}
			})
		})
	},
)

useScriptTag('//developers.kakao.com/sdk/js/kakao.min.js', () => {
	Kakao = window.Kakao
	Kakao.init(kakaoKey)
})
</script>

<template>
	<div class="bg-whiteF5 py-48">
		<div id="location" />

		<Icon name="location" color="#e2e2e2" :size="48" class="mx-auto mb-16" />
		<div class="text-grayB text-center text-10 tracking-[.25rem]">LOCATION</div>

		<div ref="mapArea" class="map-area mt-32 h-200 border-t border-b border-[#eaeaea]" />

		<div class="mt-24 mb-36 flex items-center justify-center gap-16">
			<AppButton app-name="google-map" @click="openGoogleMap" />
			<AppButton app-name="naver-map" @click="openNaverMap" />
			<AppButton app-name="kakao-map" @click="openKakaoMap" />
			<AppButton app-name="kakao-navi" @click="openKakaoNavi" />
		</div>

		<div class="text-grayA text-center text-14">
			<!-- eslint-disable-next-line vue/no-v-html -->
			<div v-html="$t('info.address')" />
			<div class="mt-4">TEL. {{ $t('info.contact') }}</div>
		</div>
	</div>
</template>

<style>
.map-area {
	* {
		box-sizing: content-box;
	}
	.info-box {
		text-align: center;
	}
}
</style>
