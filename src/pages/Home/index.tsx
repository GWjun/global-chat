import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const [count, setCount] = useState(0)
  const [, setIsMount] = useState(false)
  const { t } = useTranslation()

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

      <h1>{t('home.title')}</h1>
    </>
  )
}
