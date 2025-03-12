import React from 'react'
import { Link } from 'react-router-dom'

export default function FooterMenu() {
  return (
    <div>
        <div className='footer-bg-clr'>
        <div><p className='text-light text-center pt-5'>sample</p></div>
            <div className='footer-bg'>
            <div>
                <Link className='footer-text'><span>About</span></Link>
               
            </div>
            <div>
                <Link className='footer-text'><span >Contact Us</span></Link>
               
            </div>
            <div>
                <Link className='footer-text'><span>Return Policy</span></Link>
               
            </div>
            <div>
                <Link className='footer-text'><span>Privacy Policy</span></Link>
               
            </div>
        </div>
        </div>
    </div>
  )
}
