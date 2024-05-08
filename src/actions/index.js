'use server'
import { addNote, updateNote, delNote } from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// 保存笔记
export async function saveNote(prevFormState, formData){
  const noteId = formData.get('noteId')
  const title = formData.get('title')
  const content = formData.get('body')
  const data = JSON.stringify({
    title,
    content,
    updateTime: Date.now()
  })
  if(noteId){
    // 编辑
    updateNote(noteId, data)
    revalidatePath('/', 'layout') // 否则会导致左侧列表不更新最新修改的数据
    return {msg: 'Update Success!'}
  }else{
    // 新增
    const newNoteId = await addNote(data)
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