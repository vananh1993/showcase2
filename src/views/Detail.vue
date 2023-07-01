<template>
    <h3>Slug - {{ slug }}</h3>

    <component :is="ShowcaseComponent"></component>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const slug = useRoute().params.slug;
const router = useRouter();

const ShowcaseComponent = defineAsyncComponent(async () => {
    let imported;

    try {
        imported = await import(`@/components/showcases/${slug}/index.vue`);
    } catch (e) {
        alert('404');
    }

    return imported;
});
</script>
