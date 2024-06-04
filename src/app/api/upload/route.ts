import { addNote } from "@/lib/redis";
import dayjs from "dayjs";
import { mkdir, stat, writeFile } from "fs/promises";
import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

const genName = (file: File) => {
  const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
  const rawFilename = file.name.replace(/\.[^/.]+$/, "")
  const name = `${rawFilename}-${uniqueSuffix}.${mime.getType(file.type)}`
  return name
}

export const POST = async (request:NextRequest)=>{
  const formData = await request.formData()
  const file = formData.get('file') as File
  if(!file){
    console.error('no file');
    return NextResponse.json(
      { error: 'File is required' }, 
      { status: 400 }
    )
  } 

  const relativeUploadDir = `/uploads/${dayjs().format('YY-MM-DD')}` // 文件按日期存放
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir) // 文件最终的存放路径
  try {
    // 查找文件存放路径是否存在
    await stat(uploadDir)
  } catch (error:any) {
    // 若不存在，创建此路径
    if(error.code === 'ENOENT'){
      await mkdir(uploadDir, {recursive: true})
    }else{
      console.error('something go wrong');
      return NextResponse.json(
        { error: 'Something go wrong' }, 
        { status: 500 }
      )
    }
  }

  
  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer())
  const filePath = `${uploadDir}/${genName(file)}`
  await writeFile(filePath, buffer)

  // // 写入数据库
  // const res = await addNote(JSON.stringify({
  //   title: file.name.replace(/\.[^/.]+$/, ""),
  //   content: buffer.toString('utf-8')
  // }))


  return NextResponse.json({success: true})
}