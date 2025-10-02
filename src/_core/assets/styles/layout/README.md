# 布局样式文件说明

## 概述

`index.scss` 是整个布局系统的统一样式文件，包含了所有布局相关组件的样式定义。

## 文件结构

```
src/_core/assets/styles/layout/
├── index.scss    # 布局样式主文件
└── README.md     # 说明文档（本文件）
```

## 样式分区

### 1. 布局容器
- `.app-layout` - 整体布局容器
- `.layout-header` - 头部容器
- `.layout-body` - 主体容器
- `.layout-sidebar` - 侧边栏容器
- `.layout-main` - 主内容容器
- `.layout-footer` - 底部容器

### 2. 头部样式 (Header)
- `.app-header` - 头部主容器
- `.header-content` - 头部内容区
- `.header-logo` - Logo区域
- `.header-actions` - 操作按钮区
- `.icon-btn` - 图标按钮
- `.user-dropdown` - 用户下拉菜单

### 3. 侧边栏样式 (Sidebar)
- `.app-sidebar` - 侧边栏主容器
- `.sidebar-scrollbar` - 菜单滚动区
- `.menu-icon` - 菜单图标
- `.sidebar-toggle` - 收缩按钮

### 4. 主内容区样式 (Main)
- `.app-main` - 主内容区容器
- `.main-content` - 内容包裹容器
- `.fade-transform-*` - 页面切换动画

### 5. 底部样式 (Footer)
- `.app-footer` - 底部主容器

### 6. 响应式设计
- 针对小屏幕（≤768px）的响应式样式

## 使用方式

### 在布局主文件中引入

```vue
<script setup>
import '@/_core/assets/styles/layout/index.scss'
</script>
```

### 组件中使用类名

```vue
<template>
  <div class="app-header">
    <div class="header-content">
      <!-- 内容 -->
    </div>
  </div>
</template>
```

## 样式变量

所有样式使用 Element Plus 的 CSS 变量，支持主题切换：

- `--el-bg-color` - 背景色
- `--el-text-color-primary` - 主要文字色
- `--el-text-color-secondary` - 次要文字色
- `--el-color-primary` - 主题色
- `--el-border-color-light` - 边框色
- `--el-box-shadow-light` - 阴影

## 修改建议

1. **不要在组件中添加 scoped 样式**
   - 所有布局样式统一在此文件管理

2. **修改样式时注意**
   - 修改前先了解该样式的影响范围
   - 保持样式命名的一致性
   - 添加清晰的注释

3. **新增样式时**
   - 按照现有分区添加
   - 保持注释格式统一
   - 考虑响应式影响

## 维护记录

- **v1.0.0** (2024) - 初始版本，整合所有布局样式

