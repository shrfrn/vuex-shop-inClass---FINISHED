export default {
    template: `
        <section class="user-details">
            <h1>User Details</h1>
            <form @submit.prevent="deposit">
                <input v-model="amount" type="number" autofocus>
                <button>Deposit !!</button>
            </form>
            <h3 v-if="user.orders.length === 0">
                No orders yet... 
                <router-link to="/shop">
                    make one now
                </router-link>
            </h3>
            <ul>
                <li v-for="order in user.orders">
                    <details>
                        <summary>{{ order.items.length }} items</summary>
                        <pre>{{ order }}</pre>
                        <button @click="changeOrderStatus(order)">
                            {{ order.status === 'pending' ? 'approve' : 'cancel' }}
                        </button>
                    </details>
                </li>
            </ul>
        </section>
    `,
    data(){
        return {
            amount: 0,
        }
    },
    methods: {
        changeOrderStatus(order){
            const status = order.status === 'pending' ? 'approved' : 'pending'
            this.$store.commit(
                {
                    type: 'changeOrderStatus',
                    orderId: order._id,
                    status,
                }
            )
        },
        deposit(){
            this.$store.commit({ type: 'deposit', amount: this.amount })
        }
    },
    computed: {
        user(){
            return this.$store.state.user
        }
    }
}