<template>
    <div>
        <h3>Escolha uma conta para administrar:</h3>

        <div id="contas">
            <router-link :to="`/conta/${conta.id}`" v-for="(conta,index) in contas" :key="index">
                <div class="conta" router->
                    <div id="numeroConta">
                        <span class="titulo">Conta:</span> {{conta.number}}
                    </div>
                    <div id="titular">
                        <span class="titulo">Titular:</span> {{conta.owner}}
                    </div>
                    <div id="saldo">
                        <span class="titulo">Saldo:</span> <span :class="conta.balance > 0 ? 'saldoPositivo' : ''">{{ formatMoney(conta.balance) }}</span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>

    import api from '@/services/api.js';

    export default {
        
        name: 'Home',
        data() {
            return {
                contas: []
            }
        }, 
        mounted() {
            
            let loader = this.$loading.show();

            api.get('/accounts').then(response => {
                this.contas = response.data;
                loader.hide();
            }).catch((error) => {
                this.$toast.error(error.response.data);
                loader.hide();
            })
        },
        methods: {
            formatMoney: (v) => {
                    var formato = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }
                    return parseFloat(v).toLocaleString('pt-BR', formato);
                
            },
        }
    }
</script>

<style scoped>

    #contas {
        display: flex;
        flex-wrap: wrap;
    }

    #contas .conta {
        cursor: pointer;
        min-height: 100px;
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--background-color-conta);
        margin: 5px 10px;
        border-radius: 5px;
        padding: 5px;
    }

    #contas .conta .titulo {
        font-weight: 600;
    }

    #contas .conta .saldoPositivo {
        color: var(--contas-color-saldo-positivo)
    }

    #contas .conta .saldoNegativo {
        color: var(--contas-color-saldo-negativo)
    }

</style>