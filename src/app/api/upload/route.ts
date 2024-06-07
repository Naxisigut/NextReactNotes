import { addNote } from "@/lib/redis";
import dayjs from "dayjs";
import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { genFile } from '@/utils/server';

// 根据文件生成完整的文件名，包括独一化和扩展名
const genFullName = (file: File) => {
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
  if(true){
    const relativeUploadDir = `/uploads/${dayjs().format('YY-MM-DD')}` // 文件按日期存放
    const uploadDir = join(process.cwd(), 'public', relativeUploadDir) // 文件最终的存放路径
    const filePath = await genFile(uploadDir, genFullName(file), file)
  }


  /* 写入数据库 */
  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const uuid = await addNote(JSON.stringify({
      title: file.name.replace(/\.[^/.]+$/, ""),
      content: buffer.toString('utf-8')
    }))
    return NextResponse.json({
      success: true,
      fileUrl: '', // 文件路径
      uuid
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: '写入数据库错误'
    })
  }

}