'use client'

import SideBarNoteItem from './SideBarNoteItem';
import { useSearchParams } from 'next/navigation';

export default function SideBarNoteListFilter({itemDatas}:{
  itemDatas: Array<{
    noteId: string,
    noteTitle: string,
    expandedChildren: React.ReactNode,
    header: React.ReactNode
  }>
}) {
  const searchParams = useSearchParams()
  const searchStr = searchParams.get('q') || ''

  const filteredNotes = itemDatas.map((itemData, index) => {
    const title = itemData.noteTitle
    if(!title.includes(searchStr))return null

    return (
      <li key={itemData.noteId}>
        <SideBarNoteItem itemData={itemData}></SideBarNoteItem>
      </li>
    ) 
  })
  

  return (
    <ul className="notes-list">
      { filteredNotes }
    </ul>  
  )
};
