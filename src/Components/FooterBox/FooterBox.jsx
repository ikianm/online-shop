import React from 'react';
import './FooterBox.css';

export default function FooterBox({ img, desc, href }) {

    return (
        <div className='footer-box'>
            <a href={href}> <img src={img} alt="social media" /></a>
            <h4>{desc}</h4>
        </div >
    )
}
