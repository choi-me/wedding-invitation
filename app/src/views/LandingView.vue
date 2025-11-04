<script setup lang="ts">
import Comments from '@/comments/Comments.vue'
import BGM from '@/components/bgm/BGM.vue'
import Gallery from '@/components/gallery/Gallery.vue'
import Headline from '@/components/headline/Headline.vue'
import CoupleInfo from '@/components/invitation/CoupleInfo.vue'
import Location from '@/components/invitation/Location.vue'
import Message from '@/components/invitation/Message.vue'
import Notice from '@/components/invitation/Notice.vue'
import Share from '@/components/invitation/Share.vue'
</script>

<template>
	<div id="top" />

	<Headline />
	<BGM />

	<Gallery />
	<Message />
	<CoupleInfo />

	<Location />
	<Notice />

	<Comments />

	<Share />
</template>
