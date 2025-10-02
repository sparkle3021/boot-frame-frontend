/**
 * 数据分析模块路由
 */
export default {
  path: '/analysis',
  name: 'Analysis',
  redirect: '/analysis/report',
  meta: {
    title: '数据分析',
    icon: 'mdi:chart-line',
    order: 5,
    hidden: false
  },
  children: [
    {
      path: 'report',
      name: 'AnalysisReport',
      component: () => import('@/views/_core/error/404.vue'),
      meta: {
        title: '数据报表',
        icon: 'mdi:file-chart',
        hidden: false
      }
    },
    {
      path: 'chart',
      name: 'AnalysisChart',
      component: () => import('@/views/_core/error/404.vue'),
      meta: {
        title: '图表展示',
        icon: 'mdi:chart-pie',
        hidden: false
      }
    }
  ]
}

