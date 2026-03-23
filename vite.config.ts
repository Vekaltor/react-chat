import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    root: 'public',
    resolve: {
        alias: {
            '/src': path.resolve(__dirname, 'src')
        }
    },
    build: {
        outDir: '../dist'
    },
    server: {
        port: 3000
    }
})
