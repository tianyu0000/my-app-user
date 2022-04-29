import React, { useEffect } from 'react'
import { Button, ErrorBlock } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import routerPath from '@/router/router-path'

export default () => {
  const history = useHistory()
  useEffect(() => {
    document.body.style.background = '#ffffff'
  }, [])
  return (<>
    <ErrorBlock fullPage={true} description={<><Button color='primary' onClick={() => { history.replace(routerPath.Home) }}>返回首页</Button></>} />

  </>)
}