import { showErrorMsg } from "../services/event-bus.service.js"
import { productService } from "../services/product.service.js"
import { userService } from "../services/user.service.js"
import { utilService } from "../services/util.service.js"

const { createStore } = Vuex

const storeOptions = {
    strict: true,
    state(){
        return {
            count: 8,
            user: userService.getLoggedinUser(),
            products: productService.query(),
            cart: [],
        }
    },
    mutations: {
        changeCount(state, { val }){
            state.count += val
        },
        addToCart(state, payload){
            state.cart.push(payload.product)
        },
        removeFromCart(state, { productId }){
            const idx = state.cart.findIndex(product => product._id === productId)
            state.cart.splice(idx, 1)
        },
        addProduct({ products }, { product }){
            const newProduct = productService.save(product)
            products.push(newProduct)
        },
        checkout(state){
            const cartTotal = state.cart.reduce((acc, prd) => acc + prd.price, 0)
            if(cartTotal > state.user.balance){
                showErrorMsg('Not enough money...')
                return
            }
            const order = {
                _id: utilService.makeId(),
                createdAt: Date.now(),
                items: state.cart,
                total: cartTotal,
                status: 'pending',
            }
            userService.addOrder(order)

            state.user.orders.unshift(order)
            state.user.balance -= cartTotal
            state.cart = []
        },
        changeOrderStatus(state,{ orderId, status }){
            userService.changeOrderStatus(orderId, status)
            const order = state.user.orders.find(order => order._id === orderId)
            order.status = status
        },
        deposit(state, { amount }){
            userService.updateBalance(amount)
            state.user.balance += amount 
        }
    },
    getters: {
        cartTotal({ cart }){
            return cart.reduce((acc, prd) => acc + prd.price, 0)
        }
    }
}

export const store = createStore(storeOptions)