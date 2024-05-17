import { getAllNotes } from '@/lib/redis';
import { sleep } from '@/utils';
import SideBarNoteListFilter from './SideBarNoteListFilter';
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

  const allNoteItemDatas = allNotes.map(([noteId, noteVal], index) => {
    const itemData = {
      noteId,
      noteTitle: noteVal.title,
      expandedChildren: (
        <p className="sidebar-note-excerpt">
          {noteVal.content.substring(0, 20) || <i>(No content)</i>}
        </p>
      ),
      header: (
        <header className="sidebar-note-header">
          <strong>{ noteVal.title }</strong>
          <small>{ dayjs(noteVal.updateTime).format('YYYY-MM-DD hh:mm:ss') }</small>
        </header>
      )
    }
    return itemData
  })

  return (
    <SideBarNoteListFilter itemDatas={allNoteItemDatas} />
  )
}