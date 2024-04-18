"useClient"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState, useTransition } from "react"

export default function SidebarNoteItemContent({
  id,
  title,
  children,
  expandedChildren
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
    >

    </button>

    </div>
  )
}