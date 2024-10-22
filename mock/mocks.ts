import Mock from 'mockjs'

const users = [
  { id: 1, username: 'admin', password: '123456' },
  //   { id: 2, username: 'admin', password: '123456', role: 'Admin' },
  //   { id: 3, username: 'super', password: '123456', role: 'Super' },
]

//模拟登录接口
Mock.mock('/api/login', 'post', (req: any) => {
  const { username, password, authority } = JSON.parse(req.body)

  const user = users.find(
    (item) => item.username === username && item.password === password,
  )
  if (user) {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: `token-${authority}`,
        role: authority,
      },
    }
  } else {
    return {
      code: 401,
      message: '用户名或密码错误',
    }
  }
})

export default Mock
