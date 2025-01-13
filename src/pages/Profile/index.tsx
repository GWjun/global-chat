import { useTranslation } from 'react-i18next'
import { ChevronRight, Languages } from 'lucide-react'
import { useOverlay } from '@toss/use-overlay'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '#components/_common/Drawer'
import { LANGUAGES } from '#constants/languages.ts'

export default function Profile() {
  const { t, i18n } = useTranslation('profile')
  const overlay = useOverlay()

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
        <h2 className="text-2xl font-bold">홍길동</h2>
        <p className="text-sub">test@exmaple.com</p>
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
