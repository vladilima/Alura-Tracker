<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <Botao :texto='"Salvar"' type="submit" />
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import Botao from '@/components/Botao.vue';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { useStore } from '@/store';
import { defineComponent, ref } from 'vue'

import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-actions';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "FormularioComponent",
    props: {
        id: { type: String }
    },
    components: {
        Botao
    },
    setup(props) {

        const router = useRouter()
        const store = useStore()
        const { notificar } = useNotificador()

        const nomeDoProjeto = ref("")

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(
                (proj) => proj.id == props.id
            );
            nomeDoProjeto.value = projeto?.nome || ""
        }

        
        const lidarComSucesso = () => {
            nomeDoProjeto.value = ''
            notificar(TipoNotificacao.SUCESSO, "Excelente!", "O projeto foi cadastrado com sucesso!")
            router.push('/projetos')
        }

        const salvar = () => {
            if (props.id) {
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                }).then(() => lidarComSucesso())
            } else {
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => lidarComSucesso())
            }
        }

        return {
            nomeDoProjeto,
            salvar
        }
    }
})

</script>

<style scoped>
.label {
    color: var(--texto-primario)
}
</style>