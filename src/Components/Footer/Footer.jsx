import React from 'react';
import FooterBox from '../FooterBox/FooterBox';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css';

export default function Footer() {
    return (
        <div id='footer'>
            <div id='footer-top'>
                <FooterBox img='./public/images/delivery.svg' desc='تحویل اکسپرسی' href='' />
                <FooterBox img='./public/images/pay.svg' desc='پرداخت در محل' href='' />
                <FooterBox img='./public/images/refund.svg' desc='ضمانت بازگشت کالا' href='' />
                <FooterBox img='./public/images/warranty.svg' desc='ضمانت اصالت کالا' href='' />
                <FooterBox img='./public/images/telegram.svg' desc='تلگرام' href='https://t.me/ikian_m' />
                <FooterBox img='./public/images/instagram.svg' desc='اینستاگرام' href='https://instagram.com/ikian_m?igshid=OGQ5ZDc2ODk2ZA==' />
            </div>
            <hr />
            <div id="footer-bottom">
                <p>Developed by <u>ikianm</u> <a href="https://github.com/ikianm"><GitHubIcon /></a></p>
            </div>
        </div>
    )
}
