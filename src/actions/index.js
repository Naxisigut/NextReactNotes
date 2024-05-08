'use server'
import { addNote, updateNote, delNote } from '@/lib/redis';
import { redirect } from 'next/navigation';

// 保存笔记
export async function saveNote(formData){
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
    redirect(`/note/${noteId}`)
  }else{
    // 新增
    const newNoteId = await addNote(data)
    redirect(`/note/${newNoteId}`)
  }
}

// 删除笔记
export async function deleteNote(formData){
  const noteId = formData.get('noteId')
  delNote(noteId)
  redirect('/')
}