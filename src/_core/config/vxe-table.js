import { VxeUI } from 'vxe-table'
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'

/**
 * VxeTable 全局配置
 * 官方文档: https://vxetable.cn/#/grid/api
 */
export function vxeTableInit() {
  // 设置中文语言
  VxeUI.setI18n('zh-CN', zhCN)
  VxeUI.setLanguage('zh-CN')

  // 全局配置
  VxeUI.setConfig({
    // 版本检查（0 表示不检查更新）
    version: 0,

    // z-index 起始值
    zIndex: 2999,

    // 表格配置（vxe-table 组件的默认参数）
    table: {
      // 自动监听父元素变化
      autoResize: true,
      // 表头对齐方式
      headerAlign: 'center',
      // 表头溢出时显示为省略号
      showHeaderOverflow: 'tooltip',
      // 空数据时显示的文本
      emptyText: '暂无数据',
      // 行配置
      rowConfig: {
        // 行悬停高亮
        isHover: true,
        // 使用主键作为行的唯一标识
        useKey: true,
        // 主键字段名
        keyField: 'id',
      },
      // 列配置
      columnConfig: {
        // 列宽可调整
        resizable: true,
      },
      // 虚拟滚动配置（横向）- 使用官方推荐的属性名
      scrollX: {
        enabled: true,
        gt: 24,
      },
      // 虚拟滚动配置（纵向）- 使用官方推荐的属性名
      scrollY: {
        enabled: true,
        gt: 100,
      },
    },

    // Grid 配置（vxe-grid 组件的默认参数）
    grid: {
      // 继承 table 配置
      autoResize: true,
      headerAlign: 'center',
      showHeaderOverflow: 'tooltip',
      emptyText: '暂无数据',
      rowConfig: {
        isHover: true,
        useKey: true,
        keyField: 'id',
      },
      columnConfig: {
        resizable: true,
      },
      scrollX: {
        enabled: true,
        gt: 24,
      },
      scrollY: {
        enabled: true,
        gt: 100,
      },
    },

    // 工具栏配置（vxe-toolbar 组件的默认参数）
    toolbar: {
      // 显示缩放按钮（全屏/还原）
      zoom: true,
      // 显示自定义列按钮（显示/隐藏列）
      custom: true,
      // 自定义插槽（用于左侧自定义按钮）
      slots: {
        buttons: 'tool',
      },
    },

    // 分页器配置（vxe-pager 组件的默认参数）
    pager: {
      // 每页大小选择器的选项列表
      pageSizes: [10, 20, 50, 100],
      // 分页布局
      layouts: ['Sizes', 'PrevPage', 'Number', 'NextPage', 'Total'],
      // 分页器对齐方式
      align: 'left',
      border: true,
    },

    // 加载中配置
    loading: {
      icon: 'vxe-icon-spinner roll',
      text: '加载中...',
    },
  })
}
