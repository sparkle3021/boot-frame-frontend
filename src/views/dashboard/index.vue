<script setup>
import { Icon } from '@iconify/vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 统计数据
const stats = ref([
  {
    title: '总用户数',
    value: '1,234',
    icon: 'mdi:account-group',
    color: '#409eff'
  },
  {
    title: '今日访问',
    value: '856',
    icon: 'mdi:chart-line',
    color: '#67c23a'
  },
  {
    title: '系统消息',
    value: '42',
    icon: 'mdi:message-text',
    color: '#e6a23c'
  },
  {
    title: '服务状态',
    value: '正常',
    icon: 'mdi:server',
    color: '#f56c6c'
  }
])

// 快捷操作
const quickActions = ref([
  {
    title: '新增用户',
    icon: 'mdi:account-plus',
    color: '#409eff',
    action: 'add-user'
  },
  {
    title: '系统设置',
    icon: 'mdi:cog',
    color: '#909399',
    action: 'system-setting'
  },
  {
    title: '文件管理',
    icon: 'mdi:folder-multiple',
    color: '#67c23a',
    action: 'file-manage'
  },
  {
    title: '消息中心',
    icon: 'mdi:chat',
    color: '#e6a23c',
    action: 'message-center'
  }
])

// 处理快捷操作
const handleQuickAction = (action) => {
  switch (action.action) {
    case 'add-user':
      router.push('/user/list')
      break
    case 'system-setting':
      router.push('/system/config')
      break
    case 'file-manage':
      ElMessage.info('文件管理功能开发中...')
      break
    case 'message-center':
      ElMessage.info('消息中心功能开发中...')
      break
    default:
      ElMessage.info('功能开发中...')
  }
}
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h2>仪表盘</h2>
      <p>欢迎使用中后台管理系统</p>
    </div>
    
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stats-cards">
      <el-col :xs="24" :sm="12" :md="6" v-for="stat in stats" :key="stat.title">
        <el-card class="stat-card" :body-style="{ padding: '20px' }">
           <div class="stat-content">
             <div class="stat-icon" :style="{ backgroundColor: stat.color }">
               <Icon :icon="stat.icon" width="24" color="white" />
             </div>
            <div class="stat-info">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-title">{{ stat.title }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 图表区域 -->
    <el-row :gutter="20" class="charts-section">
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <span>访问量趋势</span>
          </template>
           <div class="chart-placeholder">
             <Icon icon="mdi:chart-line-variant" width="48" color="#ccc" />
             <p>图表区域 - 可集成 ECharts</p>
           </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <span>用户分布</span>
          </template>
           <div class="chart-placeholder">
             <Icon icon="mdi:chart-pie" width="48" color="#ccc" />
             <p>图表区域 - 可集成 ECharts</p>
           </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 快捷操作 -->
    <el-card class="quick-actions">
      <template #header>
        <span>快捷操作</span>
      </template>
      <el-row :gutter="16">
         <el-col :xs="12" :sm="8" :md="6" v-for="action in quickActions" :key="action.title">
           <div class="action-item" @click="handleQuickAction(action)">
             <Icon :icon="action.icon" width="32" :color="action.color" />
             <span>{{ action.title }}</span>
           </div>
         </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;
  
  .dashboard-header {
    margin-bottom: 24px;
    
    h2 {
      margin: 0 0 8px 0;
      color: var(--el-text-color-primary);
      font-size: 24px;
      font-weight: 600;
    }
    
    p {
      margin: 0;
      color: var(--el-text-color-regular);
      font-size: 14px;
    }
  }
  
  .stats-cards {
    margin-bottom: 24px;
    
    .stat-card {
      .stat-content {
        display: flex;
        align-items: center;
        gap: 16px;
        
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        
        .stat-info {
          flex: 1;
          
          .stat-value {
            font-size: 24px;
            font-weight: 600;
            color: var(--el-text-color-primary);
            margin-bottom: 4px;
          }
          
          .stat-title {
            font-size: 14px;
            color: var(--el-text-color-regular);
          }
        }
      }
    }
  }
  
  .charts-section {
    margin-bottom: 24px;
    
    .chart-placeholder {
      height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--el-text-color-placeholder);
      
      p {
        margin: 16px 0 0 0;
        font-size: 14px;
      }
    }
  }
  
  .quick-actions {
    .action-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 20px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: var(--el-fill-color-light);
        transform: translateY(-2px);
      }
      
      span {
        font-size: 14px;
        color: var(--el-text-color-regular);
      }
    }
  }
}
</style>