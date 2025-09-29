/*
 * 延迟显示加载提示信息
 * 在页面加载超过指定时间后显示提示
 */
(function() {
  // 加载超时提示
  const DELAY_TIME = 5000;
  
  // 初始化计时器
  let loadingTimer = null;
  
  /**
   * 显示提示信息
   */
  function showLoadingTip() {
    // 查询loading-tip元素
    const tipElement = document.querySelector('.loading-tip');
    
    if (tipElement) {
      // 应用显示样式
      tipElement.style.opacity = '1';
      tipElement.style.visibility = 'visible';
    }
    
    // 显示提示后清除计时器
    if (loadingTimer) {
      clearTimeout(loadingTimer);
      loadingTimer = null;
    }
  }
  
  /**
   * 清理函数 - 避免内存泄漏
   */
  function cleanup() {
    if (loadingTimer) {
      clearTimeout(loadingTimer);
      loadingTimer = null;
    }
  }
  
  // 启动计时器，延迟显示提示
  loadingTimer = setTimeout(showLoadingTip, DELAY_TIME);
  
  // 只在页面卸载时清理计时器
  window.addEventListener('beforeunload', cleanup);
})();