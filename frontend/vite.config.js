import react from '@vitejs/plugin-react-swc';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
// export default defineConfig(({
//   plugins: [react() ],
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, './src'),
//     },
//   },
//   server: {
//     proxy: {
//       '/api/v1': {
//         target: 'http://localhost:3000',
//         changeOrigin: true
//       },
//     },
//   },
// }));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api/v1': {
          target: 'https://pasiar-travel-logs-api.vercel.app',
          changeOrigin: true
        },
      },
    },
  }
})