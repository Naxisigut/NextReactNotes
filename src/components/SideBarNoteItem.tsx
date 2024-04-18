import dayjs from 'dayjs';
import SidebarNoteItemContent from './SidebarNoteItemContent';

export default async function SideBarNoteItem({ noteId, note }:{
  noteId: string,
  note:{
    title: string,
    content: string,
    updateTime: string
  }
}) {
  return (
    <SidebarNoteItemContent 
      id={noteId}
      title={note.title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {note.content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      <header className="sidebar-note-header">
        <strong>{ note.title }</strong>
        <small>{ dayjs(note.updateTime).format('YYYY-MM-DD hh:mm:ss') }</small>
      </header>
    </SidebarNoteItemContent>
  )
};
