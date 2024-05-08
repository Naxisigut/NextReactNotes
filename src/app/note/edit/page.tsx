import NoteEditor from '@/components/NoteEditor/NoteEditor';

export default function page() {
  return (
    <NoteEditor noteId={null} initialBody='' initialTitle='Untitled'></NoteEditor>    
  )
};
