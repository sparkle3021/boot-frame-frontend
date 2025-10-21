import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  // 配置压缩插件
  const compressionPlugins = []
  const compressType = env.VITE_BUILD_COMPRESS || 'none'

  if (compressType === 'gzip' || compressType === 'both') {
    compressionPlugins.push(
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240, // 大于10kb的文件才压缩
        algorithm: 'gzip',
        ext: '.gz',
      })
    )
  }

  if (compressType === 'brotli' || compressType === 'both') {
    compressionPlugins.push(
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'brotliCompress',
        ext: '.br',
      })
    )
  }

  return {
    plugins: [vue(), vueDevTools(), UnoCSS(), ...compressionPlugins],

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/_core/assets/styles/variables.scss" as *;`,
        },
      },
    },

    server: {
      port: Number(env.VITE_PORT) || 8818,
      host: '0.0.0.0',
      // 仅开发环境配置代理（生产环境由 nginx 等服务器处理）
      proxy: {
        [env.VITE_API_PREFIX]: {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_API_PREFIX}`), ''),
        },
      },
    },

    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'pinia'],
            'element-plus': ['element-plus'],
            utils: ['axios', 'qs'],
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        },
      },
      // 生产环境移除console
      esbuildOptions: {
        drop: env.VITE_DROP_CONSOLE === 'true' ? ['console', 'debugger'] : [],
      },
    },

    // 依赖预构建
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'axios', 'element-plus'],
    },
  }
})
