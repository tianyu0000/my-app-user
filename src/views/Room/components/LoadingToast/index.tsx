import React, { useEffect, useState } from "react"
import styles from './styles.module.scss'
import classNames from "classnames/bind"
const cx = classNames.bind(styles);
const CountDownText: React.FC = () => {
  const [count, setCount] = useState(3)
  useEffect(() => {
    const interval = window.setInterval(() => {
      setCount(x => {
        if (x > 1) {
          return x - 1
        } else {
          return x
        }
      })
    }, 1000)
    return () => {
      window.clearInterval(interval)
    }
  }, [])
  return (<div className={cx('main')}>
    <div>预订成功!</div>
    <div>{count}秒之后跳转到订单界面···</div>
  </div>)
}
export default CountDownText;