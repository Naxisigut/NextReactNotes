// 'use client'

import SideBarNoteItem from './SideBarNoteItem';

export default async function SideBarNoteList({ notes }: {
  notes: Array<any>
}){
  if(!notes.length){
    return (
      <div className="notes-empty">
        { 'No Notes Yet'}
      </div>
    )
  }

  return (
    <ul className="notes-list">
      {
        notes.map(([noteId, noteVal], index) => {
          return (
            <li key={noteId}>
              <SideBarNoteItem noteId={noteId} note={JSON.parse(noteVal)}></SideBarNoteItem>
            </li>
          )
        })
      }
    </ul>
  )
}