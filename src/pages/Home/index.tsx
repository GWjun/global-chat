import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'

interface TodoType {
  userId: number
  id: number
  title: string
  completed: boolean
}

export default function Home() {
  const [count, setCount] = useState(0)
  const [, setIsMount] = useState(false)

  // get ssr data
  const data: TodoType[] = useLoaderData()

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
        <a href="/about">Go About</a>
      </div>

      <ul>
        {data.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? 'O' : 'X'}
          </li>
        ))}
      </ul>
    </>
  )
}
