import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/configuration-options/

      output: {
        manualChunks: {
          axios: ['axios'],
          wallet: ['@concordium/react-components/'],
          ui: ['antd'],
          icons: ['@ant-design/icons'],
        }

      },
    }
  },
  plugins: [react()],
})
