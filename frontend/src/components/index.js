import React, {useState} from 'react'

// COMPONENTS START
import {Header} from "./Header";
import {Form} from "./Form";
import {SocialLinks} from "./SocialLinks";
import {SuccessMessage} from "./SuccessMessage";
// COMPONENTS END


const SubscribeWrapper = () => {

    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(false);


    if(loading) {
        return <main id="main">
           <div className="loader"></div>
        </main>
    }

    return (
        <main id="main">
     
                <div className="main-flex">
                    <div className="content-section">
                        <Header />
                        {isRegistered ? <SuccessMessage /> : <Form setIsRegistered = {setIsRegistered} setLoading = {setLoading} />}
                        <div className={`container divider-container ${!isRegistered ? "m-top-250px" : ""}`}>
                            <div className="divider"></div>
                        </div>
                        <SocialLinks />
                    </div>
                    <div className="img-section">
                        {/* <img src={SummerImage} alt="summer image" /> */}
                    </div>
                </div>
      
        </main>
    )
}

export default SubscribeWrapper