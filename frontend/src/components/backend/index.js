import React, {useState} from 'react';
import {List} from "./List";
import "./backend.css";
import {Header} from "./Header";

export const EmailList = () => {

    const apiURL = "http://localhost:5000/subscribtion";

    const [emails, setEmails] = useState([]);

    const [emailProvider, setEmailProvider] = useState("");
    const [sortEmailsByDate, setSortEmailsByDate] = useState(false);
    const [searchName, setSearchName] = useState("");

    const searchEmails = async () => {
        try {
            const response = await fetch(`${apiURL}/filter?emailprovider=${emailProvider}&search=${searchName}&sort=${sortEmailsByDate}`);
            const data = await response.json();
            console.log(data);
            setEmails(data.data);
        } catch (error) {
            alert(error.message);
        }
    }

    const resetSearch = () => {
        setEmailProvider("");
        setSortEmailsByDate(false);
        setSearchName("");
        searchEmails();
    }




    return (
        <main>
            <div className="be-container">
                <Header apiURL = {apiURL} searchEmails = {searchEmails} setEmailProvider = {setEmailProvider} setSortEmailsByDate = {setSortEmailsByDate} setSearchName = {setSearchName} emailProvider = {emailProvider} searchName = {searchName} sortEmailsByDate = {sortEmailsByDate}  resetSearch = {resetSearch}  />
                <List apiURL = {apiURL} emails = {emails} searchEmails = {searchEmails} />
            </div>
        </main>
    )
}

// 1) EMAIL LIST
// 2) SORTING, FILTERING and SEARCHING