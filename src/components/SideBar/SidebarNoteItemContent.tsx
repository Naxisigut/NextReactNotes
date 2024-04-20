'use client';

import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useRef, useState, useTransition } from "react"

export default function SidebarNoteItemContent({
  id,
  title,
  children,
  expandedChildren
}: {
  id: string,
  title: string,
  children: React.ReactNode,
  expandedChildren: React.ReactNode
}){
  const router = useRouter()
  const pathName = usePathname()
  const selectedId = pathName?.split('/')[1] || null

  const [isPending] = useTransition()
  const [isExpanded, setIsExpanded] = useState(false)
  const isActive = id === selectedId

  const itemRef = useRef(null)
  const prevTitleRef = useRef(title)

  useEffect(() => {
    if(title !== prevTitleRef.current){
      prevTitleRef.current = title
      itemRef.current.classList.add('flash')
    }
  }, [title])


  return (
    <div 
      ref={itemRef} 
      onAnimationEnd={()=>{
        itemRef.current.classList.remove('flash')
      }}
      className={[
        'sidebar-note-list-item', 
        isExpanded ? 'note-expanded' : ''
      ].join(' ')}
    >
      { children }
    <button
      className="sidebar-note-open"
      style={{
        backgroundColor: isPending 
          ? 'var(--gray-80)'
          : isActive
            ? 'var(--tertiary-blue)'
            : '',
        border: isActive
          ? '1px solid var(--primary-border)'
          : '1px solid transparent'
      }}
      onClick={() => {
        console.log(11222);
        const sidebarToggle = document.getElementById('sidebar-toggle')
        if(sidebarToggle){
          sidebarToggle.checked = true
        }
        router.push(`/note/${id}`)
      }}
    >
      open note for preview
    </button>

    <button 
      className="sidebar-note-toggle-expand"
      onClick={(e) => {
        e.stopPropagation()
        setIsExpanded(!isExpanded)
      }}
    >{
      isExpanded 
        ? <img src="/chevron-down.svg" width="10px" height="10px" alt="Collapse" />
        : <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
    }
    </button>
    { isExpanded && expandedChildren}

    </div>
  )
}