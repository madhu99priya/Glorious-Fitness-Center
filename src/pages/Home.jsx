import React from 'react'
import Branding from  '../Components/Branding/branding'
import Programs from '../Components/Programs/Programs'
import Plans from '../Components/Plans/Plans'
import Footer from '../Components/Footer/Footer'
import ImageGallery from '../Components/Gallery/Gallery.jsx'


const Home = () => {
  return (
    <div>

      <section id='home'>
        < Branding />
      </section>
      
      <section id='programs'>
        < Programs />
        < Plans />
      </section>

{/* followings should be changed- not proper way */}
      <section id='gallery'> 
      <ImageGallery />
      </section>

      <section id='about'>
    

        <Footer />

      </section>
      
      
    </div>
  )
}

export default Home
