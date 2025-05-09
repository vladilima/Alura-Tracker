<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">

    <div class="field filtro">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Filtrar tarefas" v-model="filtro" />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

    <Box v-if="tarefas?.length === 0 && filtro !== ''">
      Nenhuma tarefa correspondente a esse filtro.
    </Box>
    <Box v-else-if="tarefas?.length === 0 && filtro === ''">
      Você não está muito produtivo hoje :(
    </Box>

    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />

    <Modal :mostrar="tarefaSelecionada != null">
      <template v-slot:header>
        <p class="modal-card-title">Editar Tarefa</p>
        <button @click="selecionarTarefa(null)" class="delete" aria-label="close"></button>
      </template>
      <template v-slot:body>
        <div class="field">
          <label for="descricaoDaTarefa" class="label">
            Descrição da Tarefa
          </label>
          <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
        </div>
      </template>
      <template v-slot:footer>
        <div class="buttons">
          <button @click="alterarTarefa" class="button is-success">Salvar Alterações</button>
          <button @click="selecionarTarefa(null)" class="button">Cancelar</button>
        </div>
      </template>
    </Modal>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';

import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';

import { TipoNotificacao } from '@/interfaces/INotificacao';
import { useStore } from '@/store';
import useNotificador from '@/hooks/notificador'
import { notificacaoMixin } from '@/mixins/notificar';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-actions';
import ITarefa from '@/interfaces/ITarefa';
import { tarefa } from '@/store/modulos/tarefa';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Modal,
    Box
  },
  setup() {
    const store = useStore()
    const { notificar } = useNotificador()

    const tarefaSelecionada = ref(null as ITarefa | null)
    const filtro = ref("")

    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    const salvarTarefa = (tarefa: ITarefa) => {
      if (tarefa.projeto) {
        store.dispatch(CADASTRAR_TAREFA, tarefa)
      }
      else {
        notificar(TipoNotificacao.FALHA, 'Tarefa não foi salva', 'Erro: A tarefa deve ter um projeto vinculado.')
      }
    }

    const selecionarTarefa = (tarefa: ITarefa | null) => {
      tarefaSelecionada.value = tarefa
    }

    const alterarTarefa = () => {
      store.dispatch(ALTERAR_TAREFA, tarefaSelecionada.value)
        .then(() => tarefaSelecionada.value = null)
    }

    // const tarefas = computed(() =>
    //   store.state.tarefa.tarefas.filter(
    //     t => !filtro.value || t.descricao.includes(filtro.value)
    //   )
    // )

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value)
    })

    return {
      store,
      filtro,
      tarefas: computed(() => store.state.tarefa.tarefas),
      tarefaSelecionada,
      salvarTarefa,
      selecionarTarefa,
      alterarTarefa
    }
  }
});
</script>

<style>
.field.filtro {
  margin-bottom: 2rem;
}
</style>