
import React from 'react'
import './Plans.css'
import { plansData } from '../../data/plansData.jsx'
import whiteTick from '../../assets/whiteTick.png'

const Plans = () => {
  return (
    
    <div className="plans-container">
        <div className="programs_header" style={{gap:' 2.4rem'}}>
            <span className='stroke-text'> READY TO START</span>
            <span> YOUR JOURNEY</span>
            <span className='stroke-text'> NOW WITH US </span>
        </div>

        <div className="plans">
           { plansData.map((plan) => (
            <div className="plan" key={plan.id} >
                {plan.icon}
                <span>{plan.name}</span>
                <span>Rs. {plan.price}</span>

                <div className="features">
                    {plan.features.map((feature,index) =>(
                        <div className="feature">
                            <span className='tic-img'><img src={whiteTick} alt="" /></span>
                            <span key={index} >{feature}</span>
                        </div>
                    ))}
                </div>

                {/* <div>
                    <span>See more benifits...</span>
                </div> */}
                <button className='button'>Join Now</button>
            </div>
           ))}

        </div>
    </div>
  )
}

export default Plans
