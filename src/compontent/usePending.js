import {useState, useEffect} from 'react'
import usGlobal from './usGlobal'

export default function usePending(id) {
  const { pending } = usGlobal()
  // type approve, swaping
  const [pending, setPending] = useState([])
  const [currentPending, setCurrentPending] = useState({})

  const stopPending = active => {
    setPending(pending.filter(i=>i.id !== active))
  }

  const createPending = (item) => {
    setPending([...pending,item])
  }

  useEffect(() => {
    let current = pending.map(i=>i.id === id)
    setCurrentPending(current.length ? current[0] : undefined)
  }, [id])
  
  return {pending,createPending,stopPending,currentPending}
}
