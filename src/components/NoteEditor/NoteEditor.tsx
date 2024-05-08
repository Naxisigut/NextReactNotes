'use client'
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import NotePreview from '@/components/NotePreview';
import DeleteButton from './DeleteButton';
import SaveButton from './SaveButton';

export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody
}: {
  noteId: string | null,
  initialTitle: string,
  initialBody: string
}) {
  const [title, setTitle]  = useState(initialTitle)
  const [body, setBody]  = useState(initialBody)
  const isDraft = !noteId


  return (
    <div className="note-editor">
      
      <form className="note-editor-form" autoComplete='off'>
        <div className="note-editor-menu" role='menubar'>
          <SaveButton />
          { !isDraft && <DeleteButton /> }
        </div>

        {/* noteId输入框（隐藏） */}
        <input type="hidden" name='noteId' value={noteId}   />

        {/* 标题 */}
        <label className="offscreen" htmlFor="note-title-input">
          Enter A Title For Note
        </label>
        <input 
          type="text" 
          name='title'
          id="note-title-input" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />

        {/* 内容 */}
        <label className="offscreen" htmlFor="note-body-input">
          Enter A Body For Note
        </label>
        <textarea 
          name='body'
          id="note-body-input" 
          value={body} 
          onChange={(e) => setBody(e.target.value)}
        />
      </form>


      <div className="note-editor-preview">
        <div className="label label--preview" role="status">Preview</div>
        <h1 className='note-title'>{title}</h1>
        <NotePreview>{ body }</NotePreview>
      </div>


    </div>
  )
};
