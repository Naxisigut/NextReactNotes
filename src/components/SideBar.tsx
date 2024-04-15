import React from 'react'
import Link from 'next/link'

export default async function SideBar() {
  return (
    <>
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <img className="logo" width="22px" height="20px" src="/favicon.ico" alt="" role="presentation"/>
            <strong>Next React Notes</strong>
          </section>
        </Link>
        
        <section className="sidebar-menu" role="menubar">
          {/* sidesearch field */}
        </section>
        <nav>
          {/* sidebar note list */}
        </nav>
      </section>
    </>
  )
}