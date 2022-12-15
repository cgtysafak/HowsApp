import React from 'react'

const SearchBar = ({rooms, setSearchResults}) => {
    const handleSubmit = (e) => e.preventDefault();

    const handleSearchChange = (e) => {
        if(!e.target.value || e.target.value === " ")
            return setSearchResults(rooms);

        const results = rooms.filter(room => room.data.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setSearchResults(results);
    }
  return (
    <header>
        <form className='search' onSubmit={handleSubmit}>
            <input
              placeholder='Search for a chat!'
              type='text'
              className='search-input border-none outline-none bg-transparent ml-2.5 w-full'
              id='search'
              onChange={handleSearchChange}
            >
            </input>
        </form>
    </header>
  )
}

export default SearchBar