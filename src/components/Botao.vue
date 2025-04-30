<template>
    <button class="button">
            <span class="icon" v-if="icone">
                <i :class='icone'></i>
            </span>
            <span>{{ texto }}</span>
        </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BotaoComponent',
    props: {
        texto : String,
        icone : String 
    }
})

</script>