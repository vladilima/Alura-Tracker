<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">

        <Cronometro :tempoEmSegundos="tempoEmSegundos" />

        <Botao @click="iniciar" :disabled="cronometroRodando" texto="play" icone="fas fa-play" />

        <Botao @click="finalizar" :disabled="!cronometroRodando" texto="stop" icone="fas fa-stop" />

    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';
import Botao from './Botao.vue';

export default defineComponent({
    name: 'TemporizadorComponent',
    emits: ['aoTemporizadorFinalizado'],
    components: {
        Cronometro, Botao
    },
    data () {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar() {
            this.cronometroRodando = true
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1
            }, 1000)
        },
        finalizar() {
            this.cronometroRodando = false
            clearInterval(this.cronometro)
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        }
    }
})

</script>