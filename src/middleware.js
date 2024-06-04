/* 所有SRC目录下的请求都先经过 middleware 执行*/

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { locales, defaultLocale } from '@/config/index.js';
import { NextResponse } from 'next/server';

function getLocale(request){
  const headers = {
    "accept-language": request.headers.get('accept-language') || ''
  }

  // locales: 项目已本地化的语言
  // defaultLocale: 项目设置的默认语言
  // languages: 浏览器设置的语言
  const languages = new Negotiator({ headers }).languages()
  return match(languages, locales, defaultLocale)
}

const publicFileReg = /\.(.*)$/
export function middleware(request){
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(i => {
    return pathname.startsWith(`/${i}/`) || pathname === `/${i}`
  })
  if(pathnameHasLocale)return
  if(publicFileReg.test(pathname))return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  if(locale === defaultLocale){
    // 若最终本地语言为项目默认语言，又不想要地址栏出现相关的动态参数
    // 这里使用rewrite，作用是页面实际渲染的是request.nextUrl，但地址栏还是显示原来的url
    NextResponse.rewrite(request.nextUrl)
  }
  return Response.redirect(request.nextUrl)
}

export const config = {
  /* 
    - '/': 正则表达式的起始和结束分隔符
    - ((?!...)): 负向前瞻，用于断言在当前位置后面的内容不是括号内的模式
    - api|_next/static|_next/image|favicon.ico: 这是被负向前瞻排除的模式，表示以下几个路径：
      - api: 表示以 api 开头的路径。
      - _next/static: 表示以 _next/static 开头的路径。next静态编译后的文件
      - _next/image: 表示以 _next/image 开头的路径
      - favicon.ico: 表示路径为 favicon.ico
    - .*: 匹配除换行符外的任何字符，0 次或多次

    结合起来，((?!api|_next/static|_next/image|favicon.ico).*) 的作用是匹配任意字符串，但前提是这个字符串不以 api、_next/static、_next/image 开头，也不是 favicon.ico。
  */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}