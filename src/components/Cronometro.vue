<template>
    <span class="icon display">
        <i class="fas fa-clock mr-2"></i>
        <strong >
            {{ tempoDecorrido }}
        </strong>
    </span>
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
.display strong {
    color: var(--texto-primario)
}

.tarefa strong {
    color: #000;
}
</style>