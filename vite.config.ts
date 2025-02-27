import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import reactScan from '@react-scan/vite-plugin-react-scan';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react(), tailwindcss(), reactScan({ enable: true })],
        define: {
            'import.meta.env.npm_package_version': JSON.stringify(
                env.npm_package_version
            ),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            watch: {
                usePolling: env.USE_POLLING === 'true',
            },
        },
    };
});
