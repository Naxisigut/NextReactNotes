import dayjs from 'dayjs';
import EditButton from '@/components/EditButton';

export default function Note({ noteId, note }: {
  noteId: string,
  note: {
    title: string,
    content: string,
    updateTime: string
  }
}) {
  const { title, content, updateTime } = note
  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{ title }</h1>
        <div className="note-menu" role="menubar">
          <small className='note-updated-at' role='status'>
            Last Updated on { dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}
          </small>
          <EditButton noteId={noteId}>Edit</EditButton>
        </div>
      </div>
    </div>
  )
};
