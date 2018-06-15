const request = require('./request')
const baseUrl = 'https://www.holyzheng.top'

/** 
 * 小程序mina框架解耦做的不好
 * 为了不出现请求分散夹杂在各个文件中难以维护
 * 封装 wx.request 函数, 并在此对所有请求统一
 * 管理，并将异步处理方式由 回调 改为 链式 的方式处理
*/
const login = params => {
  return request('POST', `${baseUrl}/auth/login`, params)
}

const getAllExperiments = params => {
  return request('GET', `${baseUrl}/public/getAllExperiments`, params)
}

const getExpriment = params => {
  return request('GET', `${baseUrl}/public/getExperiment`, params)
}

const getExperimentsByType = params => {
  return request('GET', `${baseUrl}/public/getExperimentsByType`, params)
}

const getMyExperiments = params => {
  return request('GET', `${baseUrl}/examiner/getMyExperiments`, params)
}

const getMySubsciption = params => {
  return request('GET', `${baseUrl}/subject/getMySubsciption`, params)
}

const addExperiment = params => {
  return request('POST', `${baseUrl}/examiner/addExperiment`, params)
}

const deleteMyExperiment = params => {
  return request('POST', `${baseUrl}/examiner/deleteMyExperiment`, params)
}

module.exports = {
  login,
  getAllExperiments,
  getExpriment,
  getExperimentsByType,
  getMyExperiments,
  getMySubsciption,
  addExperiment,
  deleteMyExperiment
}
