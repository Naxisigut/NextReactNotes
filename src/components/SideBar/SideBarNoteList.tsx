import { getAllNotes } from '@/lib/redis';
import { sleep } from '@/utils';
import SideBarNoteListFilter from './SideBarNoteListFilter';
import SideBarNoteItem from './SideBarNoteItem';
import dayjs from 'dayjs';


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

  const allNoteItemHeaders = allNotes.map(([noteId, noteVal], index) => {

  })

  return (
    <SideBarNoteListFilter itemHeaders={allNoteItemHeaders}>
      { allNoteItems }
    </SideBarNoteListFilter>
  )
}