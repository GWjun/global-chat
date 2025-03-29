import { useAuthStore } from '#stores/authStore.ts'

export default function Chat() {
  const { logout } = useAuthStore()

  return (
    <div>
      Chat
      <button
        onClick={async () => {
          await logout()
          window.location.reload()
        }}
      >
        로그아웃
      </button>
    </div>
  )
}
