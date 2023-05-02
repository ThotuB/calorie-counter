import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import Router from 'next/router'

const SearchBar = () => {
    const [searchResult, setSearchResult] = useState('')

    const handleChange = (searchTerm: string) => {
        setSearchResult(searchTerm)
        Router.push({
            pathname: '/food',
            query: {
                search: searchTerm
            }
        })
    }

    return (
        <div className="w-64 flex items-center">
            <div className="absolute pl-3 z-10">
                <MagnifyingGlassIcon className="text-red-600" />
            </div>

            <input
                type="text"
                title="Search"
                className="w-full border-2 bg-dark border-primary text-center rounded-xl focus:ring-primary focus:outline-none focus:ring"
                value={searchResult}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;