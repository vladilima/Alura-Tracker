<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="tarefas?.length === 0">
      Você não está muito produtivo hoje :(
    </Box>
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
    <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editar Tarefa</p>
          <button @click="selecionarTarefa(null)" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">
              Descrição da Tarefa
            </label>
            <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button @click="alterarTarefa" class="button is-success">Salvar Alterações</button>
            <button @click="selecionarTarefa(null)" class="button">Cancelar</button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';

import { TipoNotificacao } from '@/interfaces/INotificacao';
import { useStore } from '@/store';
import { notificacaoMixin } from '@/mixins/notificar';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-actions';
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box
  },
  mixins: [notificacaoMixin],
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {

      if (tarefa.projeto) {
        this.store.dispatch(CADASTRAR_TAREFA, tarefa)
      }
      else {
        this.notificar(TipoNotificacao.FALHA, 'Tarefa não foi salva', 'Erro: A tarefa deve ter um projeto vinculado.')
      }
    },
    selecionarTarefa(tarefa: ITarefa | null) {
      this.tarefaSelecionada = tarefa
    },
    alterarTarefa () {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.tarefaSelecionada = null)
    }
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store
    }
  }
});
</script>

<style>
.span {
  --texto-primario: #000;
}
</style>