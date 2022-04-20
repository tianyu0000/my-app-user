// 引入ali-oss
import OSS from 'ali-oss'

/**
 *  [accessKeyId] {String}：通过阿里云控制台创建的AccessKey。
 *  [accessKeySecret] {String}：通过阿里云控制台创建的AccessSecret。
 *  [bucket] {String}：通过控制台或PutBucket创建的bucket。
 *  [region] {String}：bucket所在的区域， 默认oss-cn-hangzhou。
 */
const client = new OSS({
  region: 'oss-cn-chengdu',
  accessKeyId: 'LTAI5tEAaY5c4u5N7nSZJKKP',
  accessKeySecret: 'vO8nyLUrP3UyOKRCqSjThRfYIlbeBn',
  bucket: 'hotelsystem-ty',
})



/**
 *  上传文件，大小不能超过5GB
 * @param {string} ObjName OSS的储存路径和文件名字
 * @param {string} fileUrl 本地文件
 *
 * @retruns Promise
 */
export const upload = async (ObjName: String, fileUrl: String) => {
  try {
    let result = await client.put(`hotelSystem/${ObjName}`, fileUrl)
    // hotelSystem为文件夹， ObjName为文件名字,可以只写名字，就直接储存在 bucket 的根路径
    return result.url;
  } catch (e) {
    console.log(e)
  }
}