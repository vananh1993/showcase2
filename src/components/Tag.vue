<template>
    <a href="#/" class="px-3 py-1.5 whitespace-nowrap text-gray-500 rounded-lg bg-gray-100 rounded-lg capitalize"  :class="{'active': active}" @click.stop="selectTag(props.tag) >{{ props.tag }}</a>
</template>
<script setup>
const props = defineProps({
    tag: {
        type: Object,
        default: null
    }
})
</script>