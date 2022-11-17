
import { productService } from '../services/product.service.js'


export default {
    template: `
        <section class="shop-app">
            <h1>The Shop</h1>   
            <ul>
                <li v-for="product in products">
                    {{product}}
                    <button @click="addToCart(product)">Add to Cart</button>
                </li>
            </ul>
            <hr />
            <h3>Add Product</h3>
            <form @submit.prevent="addProduct">
                <input type="text" placeholder="Name" v-model="productToEdit.name" />
                <input type="number" placeholder="Price" v-model.number="productToEdit.price" />
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            productToEdit : productService.getEmptyProduct(),
        }
    },
    computed: {
        products(){
            return this.$store.state.products
        }
    },
    methods: {
        addToCart(product) {
            this.$store.commit({ type: 'addToCart', product })
        },
        addProduct() {
            console.log('Adding...', this.productToEdit)
            this.$store.commit({ type: 'addProduct', product: this.productToEdit })
            this.productToEdit  = productService.getEmptyProduct()
        }
    },
}
