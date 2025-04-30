<template>
    <header>
        <h1>
            <img src="../assets/logo.png">
        </h1>

        <Botao :texto="textoBotao" @click="alterarTema" />
        
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Botao from './Botao.vue';

export default defineComponent({
    name: 'BarraLateral',
    emits: ['aoTemaAlterado'],
    data () {
        return {
            modoEscuroAtivo: false
        }
    },
    components: {
        Botao
    },
    computed: {
        textoBotao () {
            if (this.modoEscuroAtivo) {
                return 'Desativar modo escuro'
            }
            return 'Ativar modo escuro'
        }
    },
    methods: {
        alterarTema () {
            this.modoEscuroAtivo = !this.modoEscuroAtivo
            this.$emit('aoTemaAlterado', this.modoEscuroAtivo)
        }
    }
})
</script>

<style scoped>
header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
}
@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
</style>