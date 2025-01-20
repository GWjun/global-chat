import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { useDebouncedInputValue } from '@modern-kit/react/hooks/useDebouncedInputValue'

import UserCard from '#components/UserCard'
import UserCardSkeleton from '#components/UserCard/UserCard.skeleton.tsx'
import { Input } from '#components/_common/Input'
import { Button } from '#components/_common/Button'

interface userInfo {
  id: string
  nickname: string
  language: string
  statusMessage: string
}

const FriendFind = () => {
  const { t } = useTranslation('friend')
  const { value, debouncedValue, onChange } = useDebouncedInputValue(500)

  // const { data: searchResults = [], isLoading } =
  //   useSearchFriends(debouncedValue)

  const isLoading = false
  const searchResults: userInfo[] = [
    {
      id: 'user1',
      nickname: 'dev_jay',
      language: 'ko',
      statusMessage: '열심히 개발 중!',
    },
  ]

  return (
    <div className="flex flex-col justify-center p-4">
      <Input
        placeholder={t('find.search')}
        autoFocus
        className="h-12"
        value={value}
        onChange={onChange}
      />

      {isLoading && <UserCardSkeleton count={3} className="space-y-3 mt-6" />}

      {searchResults.length > 0 ? (
        <ul className="space-y-3 mt-6">
          {searchResults.map((user) => (
            <UserCard name={user.nickname} message={user.statusMessage} asChild>
              <li>
                <Button type="button" size="icon" className="[&_svg]:size-5">
                  <Plus className="w-full h-full" />
                </Button>
              </li>
            </UserCard>
          ))}
        </ul>
      ) : (
        !isLoading &&
        debouncedValue && (
          <p className="mt-6 text-center text-sub">{t('find.noResult')}</p>
        )
      )}
    </div>
  )
}

export default FriendFind
