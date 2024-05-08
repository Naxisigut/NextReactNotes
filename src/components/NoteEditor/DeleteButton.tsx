import { useFormStatus } from "react-dom";

export default function DeleteButton({ formAction }: { 
  formAction: any 
}) {
  const { pending } = useFormStatus()
  return ( 
    <button 
      className="note-editor-delete" 
      role="menuitem" 
      disabled={pending} 
      formAction={formAction}
    >
      <img src="/cross.svg" width="10px" height="10px" alt="" role="presentation" />
      { pending ? 'Deleting' : 'Delete' }
    </button>
  )
};
