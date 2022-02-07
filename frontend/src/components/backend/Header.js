import React, {useEffect, useState} from 'react'



export const Header = ({apiURL, searchEmails, setEmailProvider, setSortEmailsByDate, setSearchName, emailProvider, searchName, sortEmailsByDate, resetSearch}) => {

    const [sortedEmailProviders, setSortedEmailProviders] = useState([]);

    const getAllProviders = async() => {
        try {
            
            const response = await fetch(`${apiURL}/sort-email-providers`);
            const data = await response.json();
            console.log(data)
            setSortedEmailProviders(data.data);
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getAllProviders();
    }, [])

    return (
        <div>
            <div className="form-group">
                <input type="text" className="form-control" value = {searchName} onChange={e => setSearchName(e.target.value)} placeholder="type something to search" />
            </div>
            <div>
                <h2 className="heading-2">
                    Email Providers
                </h2>
                {sortedEmailProviders.length > 0 && sortedEmailProviders.map((provider, index) => {
                    return <button onClick={e => setEmailProvider(e.target.textContent.toLowerCase())} className="be-btn" key={index}>
                        {provider}
                    </button>
                })}
            </div>
            <div>
                <h2 className="heading-2">
                    Sort By Date
                </h2>
                <button onClick={() => setSortEmailsByDate(!sortEmailsByDate) } className="be-btn">
                    {sortEmailsByDate ? "Active" : "Deactive"}
                </button>
            </div>
            <div>
                <button onClick={searchEmails}  className="search-btn">
                    SEARCH
                </button>

                <button onClick={resetSearch}  className="be-btn reset-btn">
                    Reset Searching
                </button>
            </div>
        </div>
    )
}
