import React, { Suspense} from 'react'
import Link from 'next/link'
import SideBarNoteList from './SideBarNoteList';
import EditButton from './EditButton';
import NoteListSkeleton from './NoteListSkeleton';

export default function SideBar() {
  
  return (
    <>
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <img className="logo" width="22px" height="20px" src="/favicon.ico" alt="" role="presentation"/>
            <strong>Next React Notes</strong>
          </section>
        </Link>
        
        {/* sidesearch field */}
        <section className="sidebar-menu" role="menubar">
          <EditButton noteId={null}>New</EditButton>
        </section>

        {/* sidebar note list */}
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SideBarNoteList></SideBarNoteList>
          </Suspense>
        </nav>
      </section>
    </>
  )
}