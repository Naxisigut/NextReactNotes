import { addNote } from "@/lib/redis";
import dayjs from "dayjs";
import { mkdir, stat, writeFile } from "fs/promises";
import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { genFile } from '@/utils/server.ts';


const genName = (file: File) => {
  const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
  const rawFilename = file.name.replace(/\.[^/.]+$/, "")
  let ext = file.name.split('.').at(-1) || mime.getExtension(file.type)
  const name = ext ? `${rawFilename}-${uniqueSuffix}.${ext}` : `${rawFilename}-${uniqueSuffix}` 
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

  /* 将接收到的数据生成文件并存放至指定目录 */
  if(false){
    const relativeUploadDir = `/uploads/${dayjs().format('YY-MM-DD')}` // 文件按日期存放
    const uploadDir = join(process.cwd(), 'public', relativeUploadDir) // 文件最终的存放路径
    await genFile(uploadDir, genName(file), file)
  }


  // // 写入数据库
  const buffer = Buffer.from(await file.arrayBuffer())
  const res = await addNote('111')


  return NextResponse.json({success: true})
}