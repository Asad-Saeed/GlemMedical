import React from 'react'
import Banner from './Banner/Banner';
import Courses from '../Courses/Courses';
import Categories from './Categories/Categories';
import OurTeam from '../Common/OurTeam/OurTeam';
import NewsEvents from '../Common/NewsEvents/NewsEvents';
import Testimonial from '../Common/Testimonial/Testimonial';

function Home() {
  return (
    <div>
      <Banner/>
      <Categories/>
      <Courses/>
      <OurTeam/>
      <NewsEvents/>
      <Testimonial/>
    </div>
  )
}

export default Home
