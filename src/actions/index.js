'use server'
import { addNote, updateNote, delNote } from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, '请填写标题'),
  content: z.string().min(1, '请填写内容'),
})

// 保存笔记
export async function saveNote(prevFormState, formData){
  const noteId = formData.get('noteId')
  const title = formData.get('title')
  const content = formData.get('body')
  const data = {
    title,
    content,
    updateTime: Date.now()
  }

  // 校验 
  const valiRes = schema.safeParse(data)
  if(!valiRes.success){
    console.log(111, valiRes.error.issues);
    return {
      errors: valiRes.error.issues
    }
  }

  if(noteId){
    // 编辑
    updateNote(noteId, JSON.stringify(data))
    revalidatePath('/', 'layout') // 否则会导致左侧列表不更新最新修改的数据
    return {msg: 'Update Success!'}
  }else{
    // 新增
    const newNoteId = await addNote(JSON.stringify(data))
    revalidatePath('/', 'layout') // 否则会导致左侧列表不出现新添加的笔记
    return {msg: 'Add Success!'}
  }
}

// 删除笔记
export async function deleteNote(formData){
  const noteId = formData.get('noteId')
  delNote(noteId)
  redirect('/')
}