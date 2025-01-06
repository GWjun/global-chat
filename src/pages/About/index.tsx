import { useEffect, useState } from 'react'

export default function About() {
  const [count, setCount] = useState(0)
  const [, setIsMount] = useState(false)

  useEffect(() => {
    setIsMount(true)
    console.log('About Page Mounted!')
  }, [])

  return (
    <>
      <h1>About Page</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <a href="/">Go Home</a>
      </div>
    </>
  )
}
