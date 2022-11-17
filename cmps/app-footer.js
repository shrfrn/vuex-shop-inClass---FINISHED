
export default {
    template: `
           <footer>
                <h4>
                    Cart Total: \${{totalPrice}}
                    Count: {{ countForDisplay }}
                </h4>
           </footer>
    `,
    methods:{
    },
    computed: {
        totalPrice() {
            return this.$store.getters.cartTotal
        },
        countForDisplay(){
            return this.$store.state.count
        }
    },

}