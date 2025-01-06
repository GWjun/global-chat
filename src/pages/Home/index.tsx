import { useEffect, useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)
  const [, setIsMount] = useState(false)

  useEffect(() => {
    setIsMount(true)
    console.log('Home Page Mounted!')
  }, [])

  return (
    <>
      <h1>Home Page</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}
