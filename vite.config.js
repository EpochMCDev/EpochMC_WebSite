import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

async function getCommitCountFromGitHub(retries = 10) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`[GitHub API] 尝试 ${i + 1}/${retries}...`)

      const response = await fetch(
          'https://api.github.com/repos/EpochMCDev/EpochMC_WebSite/commits?per_page=1',
          {
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'EpochEarth-Website'
            }
          }
      )

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const linkHeader = response.headers.get('Link')
      if (linkHeader) {
        const match = linkHeader.match(/page=(\d+)>; rel="last"/)
        if (match) {
          const count = match[1]
          console.log(`[GitHub API] 成功获取 commit 数量: ${count}`)
          return count
        }
      }

      return '0'
    } catch (error) {
      console.warn(`[GitHub API] 第 ${i + 1} 次失败:`, error.message)
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
      }
    }
  }

  console.warn('[GitHub API] 所有重试失败')
  return null
}

export default defineConfig(async ({ mode, command }) => {
  const isUserDebug = mode === 'userdebug'

  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const buildDate = `${year}.${month}.${day}`

  let commitCount = '0'
  let versionSource = ''

  if (command === 'build') {
    console.log('[版本号] 生产构建，从 GitHub API 获取...')
    const githubCount = await getCommitCountFromGitHub(10)

    if (githubCount !== null) {
      commitCount = githubCount
      versionSource = 'GitHub API'
      console.log(`[版本号] 从 ${versionSource} 获取成功: ${commitCount}`)
    } else if (process.env.VITE_COMMIT_COUNT) {
      commitCount = process.env.VITE_COMMIT_COUNT
      versionSource = '环境变量'
      console.log(`[版本号] GitHub 失败，使用 ${versionSource}: ${commitCount}`)
    } else {
      commitCount = '0'
      versionSource = '默认值'
      console.warn(`[版本号] 所有方式失败，使用 ${versionSource}: ${commitCount}`)
    }
  } else {
    console.log('[版本号] 开发模式，从本地 Git 获取...')
    try {
      const { execSync } = await import('child_process')
      const count = execSync('git rev-list --count HEAD', {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'ignore']
      }).trim()
      commitCount = count || '0'
      versionSource = '本地 Git'
      console.log(`[版本号] 从 ${versionSource} 获取成功: ${commitCount}`)
    } catch {
      commitCount = '0'
      versionSource = '默认值'
      console.warn(`[版本号] Git 命令失败，使用 ${versionSource}: ${commitCount}`)
    }
  }

  const version = process.env.VERSION || `${buildDate}.${commitCount}`

  const builder = process.env.BUILDER || 'Unknown'
  const buildEnv = process.env.BUILD_ENV || 'production'

  const buildTime = new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  console.log(`\n最终版本: ${version} (来源: ${versionSource})\n`)

  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    define: {
      __USER_DEBUG__: isUserDebug,
      __VERSION__: JSON.stringify(version),
      __BUILD_DATE__: JSON.stringify(buildDate),
      __BUILDER__: JSON.stringify(builder),
      __BUILD_ENV__: JSON.stringify(buildEnv),
      __BUILD_TIME__: JSON.stringify(buildTime),
      __COMMIT_COUNT__: JSON.stringify(commitCount),
      __VERSION_SOURCE__: JSON.stringify(versionSource),
    },
    build: {
      cssCodeSplit: false,
      sourcemap: false,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'phosphor-icons': ['@phosphor-icons/react'],
          },
          entryFileNames: 'js/[name]-[hash].js',
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (/\.(css)$/.test(assetInfo.name)) {
              return 'css/[name]-[hash].[ext]'
            }
            return 'assets/[name]-[hash].[ext]'
          },
          experimentalMinChunkSize: 20000,
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    server: {
      port: 5173,
    },
  }
})