import { mkdir, stat, writeFile } from "fs/promises";

export const genFile = async (path: string, name: string, file: File) => {
  try {
    // 查找文件存放路径是否存在
    await stat(path)
  } catch (error:any) {
    // 若不存在，创建此路径
    if(error.code === 'ENOENT'){
      await mkdir(path, {recursive: true})
    }else{
      throw error
    }
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(`${path}/${name}`, buffer)
}