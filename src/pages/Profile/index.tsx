import { useTranslation } from 'react-i18next'
import { ChevronRight, Languages } from 'lucide-react'
import { useOverlay } from '@toss/use-overlay'

import { useProfileQuery } from '#queries/user/useProfileQuery.ts'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '#components/_common/Drawer'
import { Skeleton } from '#components/_common/Skeleton'
import { LANGUAGES } from '#constants/languages.ts'

export default function Profile() {
  const { t, i18n } = useTranslation('profile')
  const overlay = useOverlay()

  const { data, isLoading } = useProfileQuery()

  function openDrawer() {
    return overlay.open(({ isOpen, close }) => (
      <Drawer open={isOpen} onClose={close}>
        <DrawerContent>
          <DrawerTitle className="hidden">Languages</DrawerTitle>
          <DrawerDescription className="hidden">
            Change languages setting
          </DrawerDescription>
          <div className="flex flex-col items-center w-full pt-6">
            {LANGUAGES.map((lng) => (
              <button
                key={lng.code}
                onClick={() => {
                  i18n.changeLanguageCookie(lng.code)
                  close()
                }}
                className="w-full py-3 border-t text-lg"
              >
                {lng.language}
              </button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    ))
  }

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="flex flex-col items-center gap-3 mt-20">
        {isLoading ? (
          <>
            <Skeleton className="w-24 h-5 mt-3" />
            <Skeleton className="w-40 h-4 mt-2" />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">{data?.nickname}</h2>
            <p className="text-sub">{data?.email}</p>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={openDrawer}
        className="flex justify-between items-center w-full mt-10 p-5 bg-background rounded-lg shadow-sm"
      >
        <div className="flex gap-3">
          <Languages />
          <div className="text-lg">{t('languageSetting')}</div>
        </div>
        <ChevronRight />
      </button>
    </div>
  )
}
