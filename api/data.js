const request = require('./request')
const baseUrl = 'https://www.holyzheng.top/api'

/** 
 * 小程序mina框架解耦做的不好
 * 为了不出现请求分散夹杂在各个文件中难以维护
 * 封装 wx.request 函数, 并在此对所有请求统一
 * 管理，并将异步处理方式由 回调 改为 链式 的方式处理
*/

// RESTful api

const login = params => {
  return request('POST', `${baseUrl}/auth/login`, params)
}

const getAllExperiments = params => {
  return request('GET', `${baseUrl}/public/experiments`, params)
}

const getExpriment = params => {
  return request('GET', `${baseUrl}/public/experiments/${params.experiment_id}`)
}

const getExperimentsByType = params => {
  return request('GET', `${baseUrl}/public/experiment_types/${params.type}`, {limit: params.limit, offset: params.offset})
}

const getMyExperiments = params => {
  return request('GET', `${baseUrl}/examiner/my_experiments/${params.user_id}`)
}

const getMySubsciption = params => {
  return request('GET', `${baseUrl}/subject/my_subscriptions/${params.user_id}`)
}

const addSubExperiment = params => {
  return request('POST', `${baseUrl}/subject/subscriptions`, params)
}

const addExperiment = params => {
  return request('POST', `${baseUrl}/examiner/experiments`, params)
}

const deleteMyExperiment = params => {
  return request('DELETE', `${baseUrl}/examiner/experiments`, params)
}

const getMySubsciptionId = params => {
  return request('GET', `${baseUrl}/subject/my_subscription_ids/${params.user_id}`)
}

const deleteSubscription = params => {
  return request('DELETE', `${baseUrl}/subject/subscriptions`, params)
}

module.exports = {
  login,
  getAllExperiments,
  getExpriment,
  getExperimentsByType,
  getMyExperiments,
  getMySubsciption,
  addExperiment,
  deleteMyExperiment,
  addSubExperiment,
  getMySubsciptionId,
  deleteSubscription
}
