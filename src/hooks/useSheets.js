import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '../lib/firebase'

export function useSheets() {
  const [sheets, setSheets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const r = ref(db, 'sheets')
    const unsub = onValue(
      r,
      (snap) => {
        const v = snap.val()
        const list = v
          ? Object.entries(v).map(([id, data]) => ({ id, ...data }))
          : []
        list.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0))
        setSheets(list)
        setError(null)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setSheets([])
        setLoading(false)
      },
    )
    return () => unsub()
  }, [])

  return { sheets, loading, error }
}