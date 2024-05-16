'use client'

import SideBarNoteItem from './SideBarNoteItem';
import { useSearchParams } from 'next/navigation';
import { Children } from 'react';

export default function SideBarNoteListFilter({itemHeaders}) {
  const searchParams = useSearchParams()
  const searchStr = searchParams.get('q') || ''

  // const filteredNotes = Children.map(children, (child, index) => {
  //   // console.log(111, child);
  //   const title = child.props.title as string
  //   if(title.includes(searchStr)){
  //     return (
  //       <li key={child.props.noteId}>
  //         { child }
  //       </li>
  //     )
  //   }else{
  //     return null
  //   }
  // })

  const filteredNotes = itemHeaders.map((header, index) => {
    <SideBarNoteItem ></SideBarNoteItem>
  })
  

  return (
    <ul className="notes-list">
      { filteredNotes }
    </ul>  
  )
};
