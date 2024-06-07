'use client'
import React, { BaseSyntheticEvent, Suspense } from 'react';
import { useRouter } from 'next/navigation';

export default function SideBarImport() {
  const router = useRouter()

  const onChange = (e: BaseSyntheticEvent) => {
    const input = e.target as HTMLInputElement
    console.log(0, e);
    if(!input.files || !input.files.length){
      console.warn('请选择文件')
      return
    }

    const file = input.files[0]
    const formData = new FormData()
    formData.append('file', file)

    fetch('/api/upload', {
      method: "POST",
      body: formData
    }).then(async (res) => {
      if(res.ok){
        const data = await res.json()
        router.push('/note/' + data.uuid)
        router.refresh()

        e.target.type = 'text'
        e.target.type = 'file'
      }else{
        console.error('something go wrong');
      }
    }).catch((err) => {
      console.log(3333, err);
    })
  }

  return (
    <form method="post" encType="multipart/form-data">
      <div style={{textAlign: 'center', cursor: 'pointer'}}>
        <label htmlFor="file">Import .md File</label>
        <input id="file" type="file" name="file" hidden onChange={onChange} accept=".md" />
      </div>
    </form>
  )
};
