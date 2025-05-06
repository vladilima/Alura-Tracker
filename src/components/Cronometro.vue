<template>
    <strong class="display">
        {{ tempoDecorrido }}
    </strong>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CronometroComponent',
    props: {
        tempoEmSegundos: {
            type: Number,
            default: 0,
            required: true
        }
    },
    computed: {
        tempoDecorrido(): string {
            return new Date(this.tempoEmSegundos * 1000).toISOString().substring(11, 19)

        }
    }
})

</script>

<style scoped>
.display {
    color: var(--texto-primario)
}

.tarefa {
    color: #000;
}
</style>