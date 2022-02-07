import React, {useEffect, useState} from 'react';
import {Pagination} from "./Pagination";


export const List = ({apiURL, emails, searchEmails}) => {

    const deleteEmail = async (_id) => {
        // console.log(_id);
        try {
            
            const response = await fetch(`${apiURL}/delete-email-address/${_id}`, {
                method: "DELETE"
            })
            const data = await response.json();


            console.log(data);

            
            if(data.success) {
                alert(data.message);
                searchEmails();
            } else {
                alert("Someting went wrong!")
            }

        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        searchEmails();
    }, [])

    return (
        <section>
            <table className="table" id="customers">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    
                <tbody>
                    {emails.length > 0 && emails.map(_email => {
                        const {_id, email, createdAt} = _email;

                        const new_date = new Date(createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, '');

                        return <tr key={_id}>
                            <td>{email}</td>
                            <td>{new_date}</td>
                            <td>
                                <button className="be-btn be-btn-delete" onClick={() => deleteEmail(_id)}>
                                    Delete
                                </button>
                            </td>
                    </tr>
                    })}
                    
                </tbody>
            </table>
                {/* <Pagination apiURL = {apiURL} /> */}
        </section>
    )
}
