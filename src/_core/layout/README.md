# 布局系统说明

## 概述

本项目采用固定的混合布局（Mix Layout），布局参数通过静态配置文件管理，不支持运行时动态修改。

## 布局结构

混合布局包含以下部分：
- **顶部头部**：固定在页面顶部，包含Logo、操作按钮和用户菜单
- **侧边栏**：位于左侧，包含导航菜单，支持折叠/展开
- **主内容区**：显示页面内容和标签页
- **页脚**：可选的页脚区域

## 配置文件

配置文件位置：`src/_core/layout/config.json`

### 配置项说明

```json
{
  "layout": {
    "sidebarWidth": 240,      // 侧边栏宽度（px）
    "collapsedWidth": 64,     // 侧边栏折叠后宽度（px）
    "headerHeight": 60,       // 头部高度（px）
    "fixedHeader": true,      // 是否固定头部
    "showFooter": true,       // 是否显示页脚
    "showLogo": true          // 是否显示Logo
  }
}
```

### 修改配置

1. 编辑 `config.json` 文件
2. 修改相应的配置项
3. 重启开发服务器或重新构建应用

**注意**：配置修改后需要重启应用才能生效。

## 动态功能

虽然布局配置是静态的，但以下功能仍支持运行时调整：

- **侧边栏折叠/展开**：通过头部的菜单按钮控制
- **主题模式**：在系统设置中切换亮色/暗色主题

## 主题色

系统使用 Element Plus 默认主题色（`#409eff`），不支持自定义修改。如需修改主题色，请参考 Element Plus 官方文档进行主题定制。

## 文件结构

```
src/_core/layout/
├── config.json           # 布局配置文件
├── index.vue            # 布局主文件
├── components/          # 布局组件
│   ├── app-header.vue   # 头部组件
│   ├── app-sidebar.vue  # 侧边栏组件
│   ├── app-main.vue     # 主内容组件
│   └── app-footer.vue   # 页脚组件
└── README.md           # 本文档
```

## Store

布局状态由 `useLayoutStore` 管理（`src/stores/layout.js`）：

- **状态**：从 `config.json` 加载静态配置
- **方法**：
  - `toggleSidebar()` - 切换侧边栏折叠状态
  - `setSidebarCollapsed(collapsed)` - 设置侧边栏折叠状态
  - `getCurrentSidebarWidth()` - 获取当前侧边栏宽度

