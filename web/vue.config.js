const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    outputDir: '../public/',
    devServer: {
        proxy: {
            '/api': {
                target: 'https://multidisk.api/',
                secure: false,
            },
        }
    },
})
