import React, { useEffect, useRef } from 'react'

function getFocusable(el: HTMLElement){
  return el.querySelectorAll<HTMLElement>('a[href],button,textarea,select,input,[tabindex]:not([tabindex="-1"])')
}

export default function Modal({open,onClose,title,children}:{open:boolean,onClose:()=>void,title?:string,children?:React.ReactNode}){
  const ref = useRef<HTMLDivElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(()=>{
    function onKey(e: KeyboardEvent){
      if(e.key === 'Escape') onClose()
      if(e.key === 'Tab' && ref.current){
        const focusables = Array.from(getFocusable(ref.current))
        if(focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length-1]
        if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus() }
        if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus() }
      }
    }
    if(open){
      previouslyFocused.current = document.activeElement as HTMLElement | null
      document.addEventListener('keydown', onKey)
      // move focus into modal
      setTimeout(()=>{
        const root = ref.current
        const focusables = root ? Array.from(getFocusable(root)) : []
        if(focusables.length) focusables[0].focus()
        else root?.focus()
      },0)
      document.body.style.overflow = 'hidden'
    }
    return ()=>{
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previouslyFocused.current?.focus()
    }
  },[open,onClose])

  if(!open) return null
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div ref={ref} className="modal" onClick={(e)=> e.stopPropagation()} tabIndex={-1} aria-labelledby="modal-title">
        <div className="modal-header">
          <strong id="modal-title">{title}</strong>
          <button aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
