'use client'

import SideBarNoteItem from './SideBarNoteItem';
import { useSearchParams } from 'next/navigation';

export default function SideBarNoteListFilter({notes} :{
  notes: Array<[string, { title: string, content: string, updateTime: string}]>
}) {
  const searchParams = useSearchParams()
  const searchStr = searchParams.get('q') || ''

  // 过滤标题不包含关键字的笔记
  const filterNotes = notes.filter(([noteId, noteVal]) => {
    return noteVal.title.includes(searchStr)
  })

  return (
    <ul className="notes-list">
      {
        filterNotes.map(([noteId, noteVal], index) => {
          return (
            <li key={noteId}>
              <SideBarNoteItem noteId={noteId} note={noteVal}></SideBarNoteItem>
            </li>
          )
        })
      }
    </ul>  
  )
};
