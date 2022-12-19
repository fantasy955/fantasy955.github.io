## 在tsconfig.json中添加配置项

```
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "./",
    "paths": {
      "/@/*": [
        "src/*"
      ]
    },
  },
  "include": [
    "src"
  ],
  "references": [
    {
      "path": "./tsconfig.node.json"
    }
  ]
}
```

```
"baseUrl": "./",
    "paths": {
      "/@/*": [
        "src/*"
      ]
```

## 配置vite.config.ts文件 重写ts文件中的路径

### 前置准备

```
// __dirname
// 一些类型声明，可以不装
npm i @types/node

// resolve
npm i path
```

### 配置

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import type { UserConfig, ConfigEnv, ProxyOptions } from 'vite'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}

const viteConfig = ({ mode }: ConfigEnv): UserConfig => {

  // alias 别名
  const alias: Record<string, string> = {
      '/@': pathResolve('./src/'),
      assets: pathResolve('./src/assets'),
  }

  return {
      plugins: [react()],
      root: process.cwd(),
      resolve: { alias },
  }
}

export default viteConfig
```

