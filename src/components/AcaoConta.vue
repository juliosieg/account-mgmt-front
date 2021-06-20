<template>
    <div>
        <h3>Realizar <b>{{ acaoConta }}</b></h3>

        <form id="movimentacaoConta" v-on:submit.prevent="onSubmit">
            <label for="descricao">Descrição: </label>
            <input type="text" name="descricao" v-model="form.descricao" />

            <label for="valor">Valor: </label>
            <currency-input v-model="form.valor" :options="{ currency: 'BRL' }" />

            <input type="submit" class="movimentar" value="Movimentar">
        </form>
        
    </div>
</template>

<script>
    import CurrencyInput from './CurrencyInput.vue'
    import api from '@/services/api.js';

    export default {
        components: { CurrencyInput },
        name: 'AcaoConta',
        data() {
            return {
                acaoConta: '',
                tipoAcao: '',
                form: {
                    descricao: '',
                    valor: 0
                }
            }
        },
        props: {
            accountId: [String],
            acao: [String]
        },
        created() {
            this.verificaAcao(this.acao)
        },
        watch: {
            acao: function(val) {
                this.verificaAcao(val)
            }
        },
        methods: {
            onSubmit: function() {

                if(this.form.descricao == '' || this.form.valor == '') {
                    this.$toast.error(`Dados obrigatórios não inseridos.`);
                } else{

                    api.post(`/account/${this.accountId}/actions`, {
                        'description' : this.form.descricao,
                        'value': this.form.valor,
                        'type': this.tipoAcao
                    }).then(() => {
                        this.$toast.success(this.acaoConta + ` executado com sucesso.`);
                        this.$router.replace('/conta/'+this.accountId)
                    }).catch((error) => {
                        this.$toast.error(error.response.data);
                    })
                }
            },
            verificaAcao: function(val) {
                let self = this;
                switch(val) {
                    case 'saque':
                        self.acaoConta = "Saque";
                        self.tipoAcao = 2;
                        break;
                    case 'deposito':
                        self.acaoConta = "Depósito";
                        self.tipoAcao = 3;
                        break;
                    case 'pagamento':
                        self.acaoConta = "Pagamento";
                        self.tipoAcao = 1;
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    label {
        margin-left: 10px;
    }

    input {
        height: 20px;
    }

    input.movimentar {
        height: 30px;
        width: 100px;
        margin-left: 10px;
    }
</style>