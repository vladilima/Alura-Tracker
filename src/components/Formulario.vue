<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
            </div>

            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="column">
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { computed, defineComponent, ref } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from 'vuex';
import { key } from '@/store';

export default defineComponent({
    name: 'FormulárioComponent',
    emits: ['aoSalvarTarefa'],
    components: {
        Temporizador
    },
    setup(props, { emit }) {

        const store = useStore(key);
        
        const projetos = computed(() => store.state.projeto.projetos)
        
        const descricao = ref("")
        const idProjeto = ref("")

        const finalizarTarefa = (tempoEmSegundos: number) => {
            emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoEmSegundos,
                descricao: descricao.value,
                projeto: projetos.value.find(proj => proj.id == idProjeto.value)
            })
            descricao.value = ''
        }

        return {
            projetos,
            descricao,
            idProjeto,
            finalizarTarefa
        }
    }
})

</script>

<style>
.formulario {
    border-radius: 0px;
    color: var(--texto-primario);
    background-color: var(--form-primario);
}
.box.formulario {
    margin-bottom: 0rem;
}
</style>