const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    outputDir: '../public/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8888',
                secure: false,
            },
        }
    },
})
