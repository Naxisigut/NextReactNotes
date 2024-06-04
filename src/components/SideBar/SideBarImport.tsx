'use client'
import React, { BaseSyntheticEvent, Suspense } from 'react';
import { useRouter } from 'next/router';

export default function SideBarImport() {
  const onChange = (e: BaseSyntheticEvent) => {
    console.log(111, e);
    const input = e.target as HTMLInputElement
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
    }).then((res) => {
      console.log(222222, res);
      if(res.ok){
        
      }else{
        console.log(22222, res.statusText);
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
