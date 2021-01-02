// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url

  // 为所有 需要token 验证的 请求 添加 headers请求头的 token验证
  // indexOf() 查询字符串中是否有 对应 字符 如果没有 会返回 -1
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
    // 为所有 需要token 验证的 请求 添加 complete 回调函数
    // 无论请求是成功还是失败都会执行的回调，常用全局成员的释放，或者页面状态的重置
    // 当 token值无效时 强制跳转到登陆页
    options.complete = function (res) {
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        localStorage.removeItem('token')
        location.href = '/login.html'
      }
    }
  }
})
