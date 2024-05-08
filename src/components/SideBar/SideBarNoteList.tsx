import { getAllNotes } from '@/lib/redis';
import SideBarNoteItem from './SideBarNoteItem';
import { sleep } from '@/utils';


export default async function SideBarNoteList(){
  await sleep(1000)
  const allNotesStock = await getAllNotes()
  const notes = Object.entries(allNotesStock)

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