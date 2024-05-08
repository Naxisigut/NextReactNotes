import { useFormStatus } from "react-dom";
import { deleteNote } from '@/actions';

export default function DeleteButton() {
  const { pending } = useFormStatus()
  return ( 
    <button 
      className="note-editor-delete" 
      role="menuitem" 
      disabled={pending} 
      formAction={deleteNote}
    >
      <img src="/cross.svg" width="10px" height="10px" alt="" role="presentation" />
      { pending ? 'Deleting' : 'Delete' }
    </button>
  )
};
