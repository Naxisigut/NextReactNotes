import { getAllNotes } from '@/lib/redis';
import { sleep } from '@/utils';
import SideBarNoteListFilter from './SideBarNoteListFilter';

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

  return <SideBarNoteListFilter notes={allNotes}></SideBarNoteListFilter>
}