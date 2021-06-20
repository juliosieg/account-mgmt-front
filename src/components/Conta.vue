<template>
    <div>

        <router-link to="/">
            <fa icon="arrow-left" /> Voltar à administração de contas
        </router-link>

        <h3>Administrando Conta {{ contaInfo.number }}</h3>

        <b>Proprietário:</b> {{ contaInfo.owner }}

        <br />
        <br />

        <b>Saldo:</b> {{ formatMoney(contaInfo.balance) }}
        
        <div class='acoes'>

            <b>Ações disponíveis</b>
            <ul>
                <router-link :to="`/conta/${ accountId }/movimentar/saque`">
                    <li>
                        Sacar
                    </li>
                </router-link>
                <router-link :to="`/conta/${ accountId }/movimentar/deposito`">
                    <li>
                        Depositar
                    </li>
                </router-link>
                <router-link :to="`/conta/${ accountId }/movimentar/pagamento`">
                    <li>
                        Pagar
                    </li>
                </router-link>
            </ul>

        </div>

        <router-view :key="$route.fullPath"></router-view>

        <div class='extrato'>
            <h4>Extrato da conta</h4>
            <div class='noInfo' v-if="actions.length == 0">
                Nenhuma movimentação realizada
            </div>
            <div class='itensExtrato' v-if="actions.length > 0">
                <div class="item" :class="index % 2 == 0 ? 'par' : 'impar' " v-for="(action,index) in actions" :key="index">
                    <div class="icon" :class="action.type == 3 ? 'positivo' : 'negativo'">
                        <fa icon="plus" v-if="action.type == 3" />
                        <fa icon="minus" v-if="action.type == 1 || action.type == 2"  />
                    </div>
                    <div class="info">
                        <div class="dataAcao">{{ formatDate(action.createdAt) }}</div>
                        <div class="tipoAcao">{{ formatAction(action.type) }} - {{action.description}}</div>
                        <div class="valorAcao">{{ formatMoney(action.value) }}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import api from '@/services/api.js';
    import moment from 'moment';

    export default {
        name: 'Conta',
        data() {
            return {
                contaInfo: [],
                actions: []
            }
        },
        mounted() {
            this.getAccountInfo()
        },
        methods: {
            getAccountInfo() {
                let loader = this.$loading.show();
                var self = this;
                api.get(`/account/${self.accountId}`).then(response => {
                    self.contaInfo = response.data;

                    api.get(`/account/${self.accountId}/actions`).then(response => {
                        self.actions = response.data;
                        loader.hide();
                    }).catch((error) => {
                        this.$toast.error(error.response.data);
                        loader.hide();
                    })
                }).catch((error) => {
                    this.$toast.error(error.response.data);
                    loader.hide();
                })

                
            },
            formatDate: (v) => {
                return moment(v).format('DD/MM/YYYY HH:mm')
            },
            formatMoney: (v) => {
                if(v){
                    var formato = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }
                    return parseFloat(v).toLocaleString('pt-BR', formato);
                }
                
            },
            formatAction: (v) => {
                switch(v) {
                    case 1:
                        return 'Pagamento';
                    case 2: 
                        return 'Saque';
                    case 3:
                        return 'Depósito';
                }                
            },
        },
        watch: {
            '$route' (to) {
                if (to.path === `/conta/${this.accountId}`) {
                    this.getAccountInfo();
                }
            }
        },
        props: {
            accountId: [String, Number]
        }
    }
</script>

<style scoped>
    ul {
        list-style: none;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        padding: 0px;
    }

    li {
        background-color: var(--background-color-acoes-conta);
        padding: 10px;
        margin-left: 10px;
        border-radius: 5px;
    }

    .acoes {
        margin-top: 20px;
    }

    .noInfo {
        font-style: italic;
    }

    .item {
        display: flex;
        flex-direction: row;
    }

    .item .icon {
        margin-right: 20px;
        padding-top: 20px;
        margin-left: 10px;
    }

    .item .icon.positivo svg {
        filter: invert(20%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)
    }

    .item .icon.negativo svg {
        filter: invert(15%) sepia(100%) saturate(7359%) hue-rotate(5deg) brightness(111%) contrast(116%);
    }

    .itensExtrato .item {
        padding: 10px;
    }

    .itensExtrato .item .dataAcao {
        font-weight: 600;
    }

    .itensExtrato .item.par {
        background-color: var(--background-color-extrato-par)
    }

    .itensExtrato .item.impar {
        background-color: var(--background-color-extrato-impar)
    }
</style>