
import React from 'react'
import './branding.css'
import Header from '../Header/Header'
import '../../App.css'
import Hero from '../../assets/FirstImage.png'
import Hero_Back from '../../assets/hero_image_back.png'
import { Link } from 'react-router-dom';


const Branding = () => {
  return (
    <div className='Brand'>
      <div className='backdrop-blur'></div>
      <div className="left">
        <Header />
        
        <div className="the-add">
            <div></div>
            <span>The best fitness center in kandy</span>
        </div>

        <div className="brand-text">
            <div>
                <span className='stroke-text'>shape </span>
                <span>Your</span>
            </div>

            <div>
                <span>Ideal Body</span>
            </div>

            <div >
              <span>
              In here we will help you to shape and build your ideal body and level up your life.
              </span>
            </div>
        </div>

        <div className="figures">
          
          {/* <div>
            <span>1000+</span>
            <span>Members Joined</span>
          </div> */}

          {/* <div >
            <button className='button'>Get Started</button>
          </div> */}
         
        </div>



      </div>
        
      <div className="right">
        <Link to = '/registrationform' className='button'> Join Now</Link>
      </div>

      {/* <div className="heart-rate">

      </div> */}

      <div>
        <img src={Hero} alt="" className='hero-image' />
        <img src={ Hero_Back} className='hero_back_image' />
      </div>

    </div>
  )
}

export default Branding
