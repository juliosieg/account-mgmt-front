module.exports = {
    transpileDependencies: ['vue-currency-input'],
    devServer: {
        proxy: 'http://localhost:8001',
    }
}