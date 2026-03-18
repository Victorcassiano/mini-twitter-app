"use client"
import { SearchCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import debounce from "lodash-es/debounce"
import { parseAsString, useQueryState } from "nuqs"
import { Input } from "@/components/ui/input"

export default function InputSearchPost() {
  const [, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  )

  const searchDebouced = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value)
    },
    1000,
  )

  return (
    <div className="col-span-1 flex justify-center">
      <Input
        containerClassName="w-full"
        leftIcon={<HugeiconsIcon icon={SearchCircleIcon} />}
        placeholder="Buscar por post..."
        onChange={searchDebouced}
      />
    </div>
  )
}
