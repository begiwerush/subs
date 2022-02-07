import React from 'react'

export const SocialLinks = () => {
    return (
        <div className="container">
            <div className="social-links">
                <ul className="item-list">
                    <li className="item">
                        <a href="#" target="_blank" className="social-link facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </li>
                    <li className="item">
                        <a href="#" target="_blank" className="social-link instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </li>
                    <li className="item">
                        <a href="#" target="_blank" className="social-link twitter">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </li>
                    <li className="item">
                        <a href="#" target="_blank" className="social-link youtube">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
