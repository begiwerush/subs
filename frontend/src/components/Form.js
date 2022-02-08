import React, {useRef, useState, useEffect} from 'react';
import ArrowNext from "../img/ic_arrow.svg";
import {SocialLinks} from "./SocialLinks";
import validator from "validator";

export const Form = ({setIsRegistered, setLoading}) => {

    const [boxBg, chnageBoxBg] = useState(false);
    const [chechboxValue, setCheckboxValue] = useState(false);
    const [email, setEmail] = useState("");
    const [isErrorMessageActive, setIsErrorMessageActive] = useState({
        isActive: false,
        message: undefined
    });


    const checkboxElement = useRef();

    // change Background of Checkbox when click event happens
    const changeBackgroundOfCheckbox = () => {
        if(!boxBg) {
            checkboxElement.current.style.backgroundColor = "var(--main-blue-color)";
            chnageBoxBg(!boxBg);
            return;
        }

        checkboxElement.current.style.backgroundColor = "#fff";
        chnageBoxBg(!boxBg);
    }


    const formErrorAndDataHandler = () => {


        // IS EMAIL EMPTY
        if(email === "") {
            setIsErrorMessageActive({ 
                isActive: true, 
                message: "Email address is required"
            });
      
            return;
        }

        // IS ENDING WITH .CO
        if(isEndingWithCo(email)) {
            setIsErrorMessageActive({ 
                isActive: true, 
                message: "We are not accepting subscriptions from Colombia emails"
            });
            return;
        }

        // emailIsInvalid
        if(!validator.isEmail(email)) {
            setIsErrorMessageActive({ 
                isActive: true, 
                message: "Please provide a valid e-mail address"
            });
            return;
        }

        // if checkbox is unchecked
        if(!chechboxValue) {
            setIsErrorMessageActive({ 
                isActive: true, 
                message: "You must accept the terms and conditions!"
            });
            return;
        }

        setIsErrorMessageActive({ 
            isActive: false, 
            message: undefined
        });

    }

    //  check if whether email ending with co
    const isEndingWithCo = (_email) => {
        const startPosition = (_email.length);
        const amount = (_email.length - 3);

        const isCo = _email.substring(startPosition, amount);

        if(isCo === ".co") {
            return true;
        }

        return false;

    }

    const formHandler = (e) => {
        e.preventDefault();
        formErrorAndDataHandler();
        saveEmailInDB();
    }


    // save email to database
    const saveEmailInDB = async () => {
        setLoading(true);
        try {
            // "https://subsribtion-backend.herokuapp.com/"
            const response = await fetch("http://localhost:5000/subscribtion/add-new-email", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, checkbox: chechboxValue})
            })

            const data = await response.json();

            // console.log(data);
            if(data.success) {
                setIsRegistered(data.success)
            }


        } catch (error) {
            alert(error.message);
        }
        setLoading(false);
    }



    useEffect(() => {


        if(email !== "") {
            formErrorAndDataHandler();
        }


    }, [email, chechboxValue])

    return (
        <section className="form-section">
            <div className="container">
                        <div className="heading">
                            <h2 className="heading-2">
                                Subscribe to newsletter
                            </h2>
                            <p className="paragraph">
                            Subscribe to our newsletter and get 10% discount on 
                            <br className="line-break" />
                            pineapple glasses.
                            </p>
                        </div>
                        <form className="form" onSubmit={formHandler}>
                            <div className="form-group">
                                {/* error class in order to show error alert */}
                                <input type="text" className={`form-control ${isErrorMessageActive.isActive ? "error"  : ""}`} value={email} onChange={e => setEmail(e.target.value)} placeholder="Type your email address here…" />
                                <small className={`error-message ${isErrorMessageActive.isActive ? ""  : "d-none"}`}>{isErrorMessageActive.message}</small>
                            </div>
                            <button className={`btn ${isErrorMessageActive.isActive ? "disabled" : ""}`} type="submit">
                                <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="arrow-submit" opacity="0.3" d="M17.7071 0.2929C17.3166 -0.0976334 16.6834 -0.0976334 16.2929 0.2929C15.9023 0.683403 15.9023 1.31658 16.2929 1.70708L20.5858 5.99999H1C0.447693 5.99999 0 6.44772 0 6.99999C0 7.55227 0.447693 7.99999 1 7.99999H20.5858L16.2929 12.2929C15.9023 12.6834 15.9023 13.3166 16.2929 13.7071C16.6834 14.0976 17.3166 14.0976 17.7071 13.7071L23.7071 7.70708C24.0977 7.31658 24.0977 6.6834 23.7071 6.2929L17.7071 0.2929Z" fill="#131821"/>
                                </svg>
                                {/* <img src={ArrowNext} alt="next arrow" /> */}
                            </button>
                            <div className="form-group check-control-container">
                                <input type="checkbox" id="check-control" value={chechboxValue} onChange={(e) => setCheckboxValue(e.target.checked)}   className="check-control" />
                                <label htmlFor="check-control" className="checkbox-btn" onClick={changeBackgroundOfCheckbox} ref={checkboxElement}>
                                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L4.70711 10.7071C4.31658 11.0976 3.68342 11.0976 3.29289 10.7071L0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289C0.683417 5.90237 1.31658 5.90237 1.70711 6.29289L4 8.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z" fill="white"/>
                                </svg>
                                </label>
                                <p  className="terms-and-conditions-wrapper">I agree to <span className="terms-and-conditions">terms of service</span></p>
                            </div>
                        </form>
                    </div>
        </section>
      
    )
}
