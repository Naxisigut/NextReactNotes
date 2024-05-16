import dayjs from 'dayjs';
import SidebarNoteItemContent from './SidebarNoteItemContent';

export default function SideBarNoteItem({ noteId, note, header }:{
  noteId: string,
  note:{
    title: string,
    content: string,
    updateTime: string
  },
  header: React.ReactNode
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
      { header }
      {/* <header className="sidebar-note-header">
        <strong>{ note.title }</strong>
        <small>{ dayjs(note.updateTime).format('YYYY-MM-DD hh:mm:ss') }</small>
      </header> */}
    </SidebarNoteItemContent>
  )
};
