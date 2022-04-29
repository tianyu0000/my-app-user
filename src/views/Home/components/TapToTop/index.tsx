import React from "react";
import classNames from "classnames/bind";
import styles from './styles.module.scss'
import { FloatingBubble } from "antd-mobile";
import { UpOutline } from 'antd-mobile-icons'

const cx = classNames.bind(styles);
const TapToTop: React.FC = () => {
  const scrollToAnchor = (id: string) => {
    if (id) {
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  }
  return <FloatingBubble
    style={{
      '--initial-position-bottom': '4rem',
      '--initial-position-right': '24px',
      '--edge-distance': '24px',
    }}
    onClick={() => scrollToAnchor('main')}
  ><div className={cx('upToTop')}>
      <UpOutline fontSize={22} />
      <div style={{ 'fontSize': '10px' }}>顶部</div>
    </div>
  </FloatingBubble>
}

export default TapToTop;