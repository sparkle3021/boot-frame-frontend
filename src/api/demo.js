import { http } from '@/_core/config/axios'

const apiPrefix = 'http://127.0.0.1:4523/m1/7196934-6922607-default'

/**
 * 查询宠物信息
 */
export const getPetInfo = async (petId) => {
  // 模拟接口延迟
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return http.get(`${apiPrefix}/pet/${petId}`)
}

/**
 * 新增宠物
 */
export const addPet = async (params) => {
  return http.post(`${apiPrefix}/pet`, params)
}
