import { ContainerButtonsHeader } from "./ContainerButtonsHeader"
import InputSearchPost from "./InputSearchPost"
import { ToggleTheme } from "./ToggleTheme"

export function Header() {
  return (
    <header className="w-full p-2 border-b shadow-xs grid grid-cols-3 items-center px-6">
      <div className="flex justify-start col-span-1">
        <span className="text-xl text-primary font-semibold">Mini Twitter</span>
      </div>

      <InputSearchPost />

      <div className="flex flex-row justify-end gap-3">
        <ToggleTheme />

        <ContainerButtonsHeader />
      </div>
    </header>
  )
}
