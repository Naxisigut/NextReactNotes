'use client'

import { usePathname, useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { sleep } from '@/utils';

function Spinner({ active }: {
  active: boolean
}){
  return (
    <div 
      className={['spinner', active ? 'spinner--active' : null].join(' ')}
      role="progressbar"
      aria-busy={active ? 'true' : 'false'}
    ></div>
  )
}

export default function SideBarSearchField() {
  const { replace } = useRouter()
  const pathname = usePathname()
  const [ isPending, startTransition ] = useTransition()
  const params = new URLSearchParams(window.location.search)
  const initialSearchStr = params.get('q') || ''
  const [ searchStr, setSearchStr ] = useState(initialSearchStr)
  console.log(121221);

  // 输入搜索框，改变Url
  function handleSearch(val: string){
    setSearchStr(val)
    
    const params = new URLSearchParams(window.location.search)
    val ? params.set('q', val) : params.delete('q')
    const newPathname = `${pathname}?${params.toString()}`
    startTransition(async () => {
      // 搜索笔记 改变url等操作耗时较久，需要延迟更新
      replace(newPathname)
      await sleep(500) // 使搜索loading效果更明显 
    })
  }


  return (
    <div className="search" role='search'>
      <label htmlFor="sidebar-search-input" className="offscreen">
        Search Notes By Title
      </label>
      <input 
        type="text"  
        id="sidebar-search-input"
        placeholder="search"
        value={searchStr}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isPending}></Spinner>
    </div>
  )
};
