// NOTE: this is a synchronous service on purpose
// meant to simplify first intro to Vuex


import { utilService } from './util.service.js'

const KEY = 'productsDB'

export const productService = {
    query,
    getById,
    remove,
    save,
    getEmptyProduct
}

var gProducts = _createProducts()

// TODO: support paging and filtering and sorting
function query() {
    const products = JSON.parse(JSON.stringify(gProducts))
    return products
}

function getById(id) {
    return gProducts.find(product => product._id === id)
}

function remove(id) {
    const idx = gProducts.findIndex(product => product._id === id)
    gProducts.splice(idx, 1)
    utilService.saveToStorage(KEY, gProducts)
}

function save(product) {
    const productToSave = JSON.parse(JSON.stringify(product))
    const savedProduct = (productToSave._id) ? _update(productToSave) : _add(productToSave)

    utilService.saveToStorage(KEY, gProducts)
    return savedProduct
}


function _add(product) {
    product._id = utilService.makeId()
    gProducts.push(product)
    return product
}

function _update(product) {
    const idx = gProducts.findIndex(currProduct => currProduct._id === product._id)
    gProducts.splice(idx, 1, product)
    return product
}

function getEmptyProduct() {
    return {
        _id: '',
        name: '',
        price: 100
    }
}

function _createProducts() {
    var products = utilService.loadFromStorage(KEY)
    if (!products || !products.length) {
        products = [_createProduct('Television 55 inch'), _createProduct('Tape Double Cassette')]
        utilService.saveToStorage(KEY, products)
    }
    return products
}

function _createProduct(name) {
    return {
        _id: utilService.makeId(),
        name,
        price : utilService.getRandomIntInclusive(10, 100)
    }
}

