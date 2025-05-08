<template>
    <section>

        <router-link to="/projetos/novo" class="button mb-3">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <router-link :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        
                        <Botao class="ml-2 is-danger" icone="fas fa-trash" @click="excluir(projeto.id)"/>

                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import Botao from '@/components/Botao.vue';
import { useStore } from '@/store';
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/tipo-actions';
import { EXCLUIR_PROJETO } from '@/store/tipo-mutacoes';
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: "ListaComponent",
    components: {
        Botao
    },
    methods: {
        excluir (id: string) {
            this.store.dispatch(REMOVER_PROJETO, id)
        }
    },
    setup () {
        const store = useStore()
        store.dispatch(OBTER_PROJETOS)
        
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    }
})

</script>

<style scoped>
.table {
    border-radius: 10px;
    background-color: var(--bg-secundario);
}

.table th {
    color: var(--texto-primario);
}
.table td {
    color: var(--texto-primario);
    align-content: center;
}
</style>