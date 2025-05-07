<template>
<Box>
    <div class="columns">
        <div class="column is-4">
            {{ tarefa.descricao || 'Tarefa sem Descrição' }}
        </div>
        <div class="column is-3">
            {{ tarefa.projeto.nome }}
        </div>
        <div class="column">
            <Cronometro :tempo-em-segundos="tarefa.duracaoEmSegundos" class="tarefa" />
        </div>
    </div>
</Box>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '@/interfaces/ITarefa';
import Box from './Box.vue';

export default defineComponent({
    name: 'TarefaComponent',
    components: {
        Cronometro, Box
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    }
});
</script>