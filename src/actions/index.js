'use server'
import { addNote, updateNote, delNote } from '@/lib/redis';
import { redirect } from 'next/navigation';

// 保存笔记
export async function saveNote(noteId, title, body){
  const data = JSON.stringify({
    title,
    content: body,
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
export async function deleteNote(noteId){
  delNote(noteId)
  redirect('/')
}