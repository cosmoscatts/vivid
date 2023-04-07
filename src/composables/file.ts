export function getFileBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let imageAsDateURL = ''
    reader.readAsDataURL(file)
    reader.onload = (data) => {
      const res: any = data.target || data.srcElement
      imageAsDateURL = res.result
    }
    reader.onerror = (err) => {
      reject(err)
    }
    reader.onloadend = () => {
      resolve(imageAsDateURL)
    }
  })
}

/**
 * 检查上传的是否为图片
 */
export function checkImageBeforeUpload(file: File): Promise<boolean | File> {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image')) {
      Message.error('请上传图片')
      return resolve(false)
    }
    resolve(true)
  })
}
