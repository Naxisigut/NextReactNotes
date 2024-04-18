import dayjs from 'dayjs';

export default async function SideBarNoteItem({ noteId, note }:{
  noteId: string,
  note:{
    title: string,
    content: string,
    updateTime: string
  }
}) {
  return (
    <header className="sidebar-note-header">
      <strong>{ note.title }</strong>
      <small>{ dayjs(note.updateTime).format('YYYY-MM-DD hh:mm:ss') }</small>
    </header>
  )
};
