import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import CircularProgress from '@mui/material/CircularProgress';
import './Index.css';

export default function Index() {

    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 3000)
    }, [show])


    return (
        <>
            {
                show ? (<div id='index-main-page'>
                    <div id='index-header'><h1>
                        <Typewriter
                            words={['فروشگاه اینترنتی موبایل و لپتاپ کیان']}
                            loop={1}
                            typeSpeed={110}
                        />
                    </h1></div>
                    <div id='index-button-wrapper'>
                        <button><Link to='/login' id='index-register'>ورود/ثبت نام</Link></button>
                        <button><Link to='/home' id='index-continue'>صفحه اصلی</Link></button>
                    </div>
                </div>) :
                    (<div id='loader'>
                        <CircularProgress size={150} />
                    </div>)
            }
        </>

    )
}
