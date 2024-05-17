import NoteEditor from '@/components/NoteEditor/NoteEditor';
import { getNote } from '@/lib/redis';
import { sleep } from '@/utils';

export default async function page({ params }: {
  params: { id: string }
}) {
  const noteId = params.id
  const note = await getNote(noteId)
  await sleep(1000)

  // 没有在数据库中获取到数据
  if(note === null){
    return (
      <div className="note--empty-state">
        <div className="note-text--empty-state">
          Click Edit Button TO Edit
        </div>
      </div>
    )
  }

  return(
    <NoteEditor noteId={noteId} initialTitle={note.title} initialBody={note.content} />
  )
};
