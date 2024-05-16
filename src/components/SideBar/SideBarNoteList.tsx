import { getAllNotes } from '@/lib/redis';
import { sleep } from '@/utils';
import SideBarNoteListFilter from './SideBarNoteListFilter';
import SideBarNoteItem from './SideBarNoteItem';

export default async function SideBarNoteList(){
  await sleep(1000)
  const allNotes = await getAllNotes()

  if(!allNotes.length){
    return (
      <div className="notes-empty">
        { 'No Notes Yet'}
      </div>
    )
  }

  const allNoteItems = allNotes.map(([noteId, noteVal], index) => {
    return (
      <SideBarNoteItem noteId={noteId} note={noteVal}></SideBarNoteItem>
    )
  })

  return (
    <SideBarNoteListFilter>
      { allNoteItems }
    </SideBarNoteListFilter>
  )
}