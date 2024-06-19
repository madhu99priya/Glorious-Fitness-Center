import React from 'react'
import Branding from  '../Components/Branding/branding'
import Programs from '../Components/Programs/Programs'
import Plans from '../Components/Plans/Plans'
import Footer from '../Components/Footer/Footer'
import ImageGallery from '../Components/Gallery/Gallery.jsx'
import Trainees from '../Components/Trainees/Trainees.jsx'
import MarqueeNotice from '../Components/MarqueeNotice.jsx'


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

      <section id='trainers'>
    

        < Trainees />

      </section>

{/* followings should be changed- not proper way */}
      <section id='gallery'> 
      <ImageGallery />
       <MarqueeNotice />
      <Footer />
      </section>

    
      
    </div>
  )
}

export default Home
