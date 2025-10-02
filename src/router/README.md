# 动态路由系统说明

## 概述

本系统实现了基于路由配置自动生成菜单的功能，支持模块化路由管理和动态路由构建。

## 目录结构

```text
src/router/
├── modules/           # 路由模块目录
│   ├── dashboard.js   # 仪表盘模块
│   ├── user.js        # 用户管理模块
│   ├── system.js      # 系统管理模块
│   ├── monitor.js     # 系统监控模块
│   └── analysis.js    # 数据分析模块
├── utils.js           # 路由工具函数
├── index.js           # 路由主配置文件
└── README.md          # 说明文档
```

## 核心功能

### 1. 模块化路由管理

每个业务模块的路由独立管理在 `modules` 目录下，便于维护和扩展。

### 2. 自动生成菜单

系统会根据路由配置自动生成菜单数据，无需手动维护菜单列表。

### 3. 动态路由构建

支持根据用户权限、角色等条件动态添加或过滤路由。

## 如何添加新的路由模块

### 步骤 1：创建路由模块文件

在 `src/router/modules/` 目录下创建新的路由模块文件，例如 `product.js`：

```javascript
/**
 * 商品管理模块路由
 */
export default {
  path: '/product',
  name: 'Product',
  redirect: '/product/list',
  meta: {
    title: '商品管理',
    icon: 'mdi:package-variant',
    order: 6, // 菜单排序，数字越小越靠前
    hidden: false // 是否在菜单中隐藏
  },
  children: [
    {
      path: 'list',
      name: 'ProductList',
      component: () => import('@/views/product/list.vue'),
      meta: {
        title: '商品列表',
        icon: 'mdi:format-list-bulleted',
        hidden: false
      }
    },
    {
      path: 'category',
      name: 'ProductCategory',
      component: () => import('@/views/product/category.vue'),
      meta: {
        title: '商品分类',
        icon: 'mdi:shape',
        hidden: false
      }
    }
  ]
}
```

### 步骤 2：创建对应的视图组件

在 `src/views/` 目录下创建对应的组件文件。

### 步骤 3：系统自动识别

系统会自动加载 `modules` 目录下的所有路由模块，无需手动注册。

## 路由 Meta 配置说明

路由的 `meta` 字段支持以下配置：

| 属性 | 类型 | 说明 | 默认值 |
|-----|------|------|--------|
| title | String | 菜单标题 | - |
| icon | String | 菜单图标（使用 iconify 图标） | - |
| order | Number | 菜单排序（数字越小越靠前） | 999 |
| hidden | Boolean | 是否在菜单中隐藏 | false |
| affix | Boolean | 是否固定在标签页 | false |
| permissions | Array | 所需权限列表 | - |
| roles | Array | 所需角色列表 | - |

### 示例

```javascript
meta: {
  title: '用户管理',
  icon: 'mdi:account-group',
  order: 2,
  hidden: false,
  affix: false,
  permissions: ['user:view', 'user:edit'],
  roles: ['admin', 'manager']
}
```

## 使用路由 Store

在组件中使用路由 store：

```javascript
import { useRouterStore } from '@/stores/router'

const routerStore = useRouterStore()

// 获取菜单列表
const menus = routerStore.menus

// 获取扁平化菜单（用于搜索）
const flatMenus = routerStore.flatMenus

// 根据路径查找菜单
const menu = routerStore.findMenuByPath('/user/list')

// 根据权限过滤路由
routerStore.filterRoutesByPermission(['user:view', 'system:edit'])

// 根据角色过滤路由
routerStore.filterRoutesByRole(['admin', 'manager'])

// 添加动态路由
routerStore.addDynamicRoutes([
  {
    path: '/custom',
    name: 'Custom',
    component: () => import('@/views/custom/index.vue'),
    meta: { title: '自定义页面', icon: 'mdi:star' }
  }
])

// 重置路由（清除动态路由）
routerStore.resetRoutes()
```

## 工具函数

### loadModuleRoutes()

自动加载所有模块路由。

```javascript
import { loadModuleRoutes } from '@/router/utils'

const routes = loadModuleRoutes()
```

### generateMenuFromRoutes(routes, parentPath)

从路由配置生成菜单数据。

```javascript
import { generateMenuFromRoutes } from '@/router/utils'

const menus = generateMenuFromRoutes(routes)
```

### filterRoutes(routes, filterFn)

根据条件过滤路由。

```javascript
import { filterRoutes } from '@/router/utils'

const filteredRoutes = filterRoutes(routes, (route) => {
  return !route.meta?.hidden
})
```

### findRoute(routes, name)

根据名称查找路由。

```javascript
import { findRoute } from '@/router/utils'

const route = findRoute(routes, 'UserList')
```

### getBreadcrumbs(routes, currentPath)

获取面包屑导航。

```javascript
import { getBreadcrumbs } from '@/router/utils'

const breadcrumbs = getBreadcrumbs(routes, '/user/list')
```

## 权限控制示例

### 基于权限过滤路由

```javascript
import { useRouterStore } from '@/stores/router'
import { useUserStore } from '@/stores/user'

const routerStore = useRouterStore()
const userStore = useUserStore()

// 获取用户权限
const permissions = userStore.permissions

// 过滤路由
routerStore.filterRoutesByPermission(permissions)
```

### 基于角色过滤路由

```javascript
import { useRouterStore } from '@/stores/router'
import { useUserStore } from '@/stores/user'

const routerStore = useRouterStore()
const userStore = useUserStore()

// 获取用户角色
const roles = userStore.roles

// 过滤路由
routerStore.filterRoutesByRole(roles)
```

## 注意事项

1. **路由路径规范**：
   - 顶级路由路径必须以 `/` 开头
   - 子路由路径不要以 `/` 开头
   - 路由名称（name）必须唯一

2. **菜单图标**：
   - 使用 [Iconify](https://iconify.design/) 图标库
   - 图标格式：`mdi:icon-name`

3. **模块加载**：
   - 所有放在 `modules` 目录下的 `.js` 文件都会被自动加载
   - 模块文件必须使用 `export default` 导出路由配置

4. **性能优化**：
   - 使用路由懒加载（`() => import()`）
   - 避免循环依赖

## 扩展功能

### 动态添加路由

可以在运行时动态添加路由（例如根据后端返回的菜单数据）：

```javascript
import { useRouterStore } from '@/stores/router'
import router from '@/router'

const routerStore = useRouterStore()

// 后端返回的路由数据
const dynamicRoutes = [
  {
    path: '/custom',
    name: 'Custom',
    component: () => import('@/views/custom/index.vue'),
    meta: {
      title: '自定义模块',
      icon: 'mdi:star'
    }
  }
]

// 添加到 store
routerStore.addDynamicRoutes(dynamicRoutes)

// 注册到 vue-router
dynamicRoutes.forEach(route => {
  router.addRoute(route)
})
```

### 自定义菜单渲染

如果需要自定义菜单渲染逻辑，可以直接使用 `routerStore.menus` 数据：

```vue
<template>
  <div class="custom-menu">
    <div v-for="menu in menus" :key="menu.path">
      <h3>{{ menu.title }}</h3>
      <ul v-if="menu.children">
        <li v-for="child in menu.children" :key="child.path">
          {{ child.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRouterStore } from '@/stores/router'

const routerStore = useRouterStore()
const menus = routerStore.menus
</script>
```

## 常见问题

### Q: 如何隐藏某个路由不在菜单中显示？

A: 在路由的 `meta` 中设置 `hidden: true`：

```javascript
meta: {
  title: '详情页',
  hidden: true
}
```

### Q: 如何设置菜单的排序？

A: 在路由的 `meta` 中设置 `order` 字段，数字越小越靠前：

```javascript
meta: {
  title: '仪表盘',
  order: 1
}
```

### Q: 如何实现权限控制？

A: 在路由的 `meta` 中设置 `permissions` 或 `roles`，然后使用 `filterRoutesByPermission` 或 `filterRoutesByRole` 方法过滤：

```javascript
// 路由配置
meta: {
  title: '用户管理',
  permissions: ['user:view']
}

// 过滤路由
routerStore.filterRoutesByPermission(['user:view'])
```

### Q: 如何实现面包屑导航？

A: 使用 `getBreadcrumbs` 工具函数：

```javascript
import { getBreadcrumbs } from '@/router/utils'
import { useRouterStore } from '@/stores/router'

const routerStore = useRouterStore()
const route = useRoute()

const breadcrumbs = getBreadcrumbs(routerStore.routes, route.path)
```

## 更新日志

- **v1.0.0** (2024-10-02)
  - 初始版本
  - 实现模块化路由管理
  - 实现自动菜单生成
  - 实现动态路由构建
  - 实现权限和角色过滤
