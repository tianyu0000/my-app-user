import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Button, ImageUploader, Modal, Toast } from 'antd-mobile';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import { v4 as uuidv4 } from 'uuid';
import { upload } from '@/utils/ali-oss';
import { getUserInfo, saveUserInfo } from '@/utils/storageUtils';
import { UserInfo } from '@/services/entities';

const cx = classNames.bind(styles);
interface childProps {
  handleSetInfo: Function;
}
const ChangeAvatar: React.FC<childProps> = (props) => {
  const avatarRef = useRef<string>("");
  const [fileList, setFileList] = useState<ImageUploadItem[]>();
  //上传图片
  const uploadImg = async (file: File) => {
    let objName = uuidv4();
    let res = await upload(`${objName}`, file)
    avatarRef.current = res!;
    return { url: res! }
  }
  //修改头像
  const doAvatarChange = () => {
    if (avatarRef.current.length == 0) {
      Toast.show({ icon: 'fail', content: '您尚未选择头像!' })
    } else {
      props.handleSetInfo(avatarRef.current)
      Modal.clear();
      Toast.show({ icon: 'success', content: '修改头像成功!' })
    }
  }

  useEffect(() => {
    getUserInfo();
  }, [])
  return <><div className={cx('avatar')}>
    <ImageUploader
      value={fileList}
      onChange={setFileList}
      upload={uploadImg}
      maxCount={1}
    />
  </div>
    <div className={cx('btn-group')}>
      <Button color='primary' onClick={doAvatarChange}>确认</Button>
      <Button color='danger' onClick={() => { Modal.clear() }}>取消</Button>
    </div>
  </>;
};

export default ChangeAvatar;
