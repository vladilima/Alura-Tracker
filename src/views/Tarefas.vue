<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    <Box v-if="tarefas.length === 0">
      Você não está muito produtivo hoje :(
    </Box>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';

import ITarefa from '../interfaces/ITarefa';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { NOTIFICAR } from '@/store/tipo-mutacoes';
import { useStore } from '@/store';

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box
  },
  data() {
    return {
      tarefas: [] as ITarefa[]
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      if (tarefa.projeto) {
        this.tarefas.push(tarefa)
      }
      else {
        this.store.commit(NOTIFICAR, {
                titulo: 'Tarefa não foi salva',
                texto: 'Erro: A tarefa deve ter um projeto vinculado.',
                tipo: TipoNotificacao.FALHA
            })
      }
    }
  },
    setup () {
        const store = useStore()
        return {
            store
        }
    }
});
</script>