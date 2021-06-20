import { createWebHistory, createRouter } from "vue-router";
import Home from '@/components/Home';
import Conta from '@/components/Conta';
import AcaoConta from '@/components/AcaoConta';

const routes = [
    {
        path:'',
        component: Home
    },
    {
        path:'/conta/:accountId',
        component: Conta,
        props: true,
        children: [
            {
                name: 'AcaoConta',
                component: AcaoConta,
                path: 'movimentar/:acao',
                props: true
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;