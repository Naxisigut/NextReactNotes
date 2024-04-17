// 'use client'

import dayjs from 'dayjs';

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
          const note = JSON.parse(noteVal)
          return (
            <li key={noteId}>
              <header className="sidebar-note-header">
                <strong>{ note.title }</strong>
                <small>{ dayjs(note.updateTime).format('YYYY-MM-DD hh:mm:ss') }</small>
              </header>
            </li>
          )
        })
      }
    </ul>
  )
}