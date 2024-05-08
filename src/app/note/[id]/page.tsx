import { getNote } from '@/lib/redis';
import Note from './components/Note';
import { sleep } from '@/utils';

export default async function page({params}:{
  params: {id: string}
}) {
  const noteId = params.id
  const note = await getNote(noteId)
  await sleep(1000)
  if(note){
    return <Note noteId={noteId} note={note}></Note>
  }else {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something!
        </span>
      </div>  
    )
  }
};
