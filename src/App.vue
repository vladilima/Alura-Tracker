<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @ao-tema-alterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes />
      <router-view></router-view>
      
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Notificacoes from './components/Notificacoes.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Notificacoes
  },
  data () {
    return {
      modoEscuroAtivo : false
    }
  },
  methods: {
    trocarTema (modoEscuroAtivo : boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
main {
  --bg-primario: #fff;
  --texto-primario: #000;
  --form-primario: var(--bg-primario);
  --box-color: #FAF0CA;
}
main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
  --form-primario: #1b1d29;
  --box-color: #ffd11a;
}
.conteudo {
  background-color: var(--bg-primario);
}
</style>
