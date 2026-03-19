import { TwitterIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ContainerButtonsHeader } from "./ContainerButtonsHeader"
import InputSearchPost from "./InputSearchPost"
import { ToggleTheme } from "./ToggleTheme"

export function Header() {
  return (
    <header
      className="w-full p-2 border-b shadow-xs 
  grid grid-cols-2 lg:grid-cols-3 items-center px-4 lg:px-6"
    >
      <div className="flex justify-start">
        <span className="hidden text-base lg:block lg:text-xl text-primary font-semibold">
          Mini Twitter
        </span>
        <HugeiconsIcon
          icon={TwitterIcon}
          className="block lg:hidden text-primary size-8"
        />
      </div>

      <div className="hidden lg:flex justify-center">
        <InputSearchPost />
      </div>

      <div className="flex justify-end gap-2 lg:gap-3">
        <ToggleTheme />
        <ContainerButtonsHeader />
      </div>

      <div className="lg:hidden col-span-2 flex-1 w-full mt-3">
        <InputSearchPost />
      </div>
    </header>
  )
}
