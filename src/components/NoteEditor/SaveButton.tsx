import { useFormStatus } from "react-dom";
import { saveNote } from '@/actions';

export default function SaveButton({ formAction }: { 
  formAction: any 
}) {
  const { pending } = useFormStatus()
  return (
  <button 
    className="note-editor-done" 
    type='submit' 
    role="menuitem" 
    disabled={pending} 
    formAction={formAction}
  >
    <img src="/checkmark.svg" width="14px" height="10px" alt="" role="presentation" />
    { pending ? 'Saving' : 'Done' }
  </button>
  )
};
