import { marked } from 'marked';
import React from 'react';
import sanitizeHtml from 'sanitize-html';

// const allowedTags = sanitizeHtm

export default function NotePreview({ children }: {
  children: React.ReactNode
}) {
  <div className="note-preview">
    <div 
      className="text-with-markdown" 
      // dangerouslySetInnerHTML={{
      //   __html: sanitizeHtml(marked(children) || ''),
      //   {

      //   }
      // }}
    ></div>
  </div>
};
