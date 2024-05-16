'use client'

import { useSearchParams } from 'next/navigation';
import { Children } from 'react';

export default function SideBarNoteListFilter({children}) {
  const searchParams = useSearchParams()
  const searchStr = searchParams.get('q') || ''

  const filteredNotes = Children.map(children, (child, index) => {
    // console.log(111, child);
    const title = child.props.title as string
    if(title.includes(searchStr)){
      return (
        <li key={child.props.noteId}>
          { child }
        </li>
      )
    }else{
      return null
    }
    // return child
  })
  

  return (
    <ul className="notes-list">
      { filteredNotes }
    </ul>  
  )
};
