import React from 'react'
import Link from 'next/link'
import { getAllNotes } from '@/lib/redis.js';
import SideBarNoteList from './SideBarNoteList';
import EditButton from './EditButton';

export default async function SideBar() {
  const allNotesStock = await getAllNotes()
  const notes = Object.entries(allNotesStock)
  
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
          <SideBarNoteList notes={notes}></SideBarNoteList>
        </nav>
      </section>
    </>
  )
}