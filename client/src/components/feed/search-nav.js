'use client'
import { Input } from "../ui/input"
import { useContext } from "react"
import { SearchBarContext } from "@/context/searchBar"
import { Button } from "../ui/button"
import { SearchIcon } from "lucide-react"
const SearchNav = ({onClickSearch}) => {
  const { search, setSearch } = useContext(SearchBarContext)
  return (
    <div className="flex justify-center items-center-safe relative">
      <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="w-1/2 mt-2 pr-10" type={'search'} />
      <Button onClick={() => onClickSearch(search)} className={'absolute right-1/4 border-l-1 rounded-l-none border-black  transition-all mt-2 flex justify-center-safe items-center-safe hover:bg-gray-100'} variant={'ghost'}>
        <SearchIcon />
      </Button>
    </div>
  )
}
export default SearchNav