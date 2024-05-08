import { useFormStatus } from "react-dom";
import { saveNote } from '@/actions';

export default function SaveButton() {
  const { pending } = useFormStatus()
  return (
  <button 
    className="note-editor-done" 
    type='submit' 
    role="menuitem" 
    disabled={pending} 
    formAction={saveNote}
  >
    <img src="/checkmark.svg" width="14px" height="10px" alt="" role="presentation" />
    { pending ? 'Saving' : 'Done' }
  </button>
  )
};
