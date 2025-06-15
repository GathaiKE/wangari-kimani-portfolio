import { JSX } from 'react'
import Header from './components/ui/Header'
import Hero from './components/ui/Hero'
import About from './components/ui/About'
import Awards from './components/ui/Awards'
import Contact from './components/ui/Contact'
import Footer from './components/ui/Footer'
import Projects from './components/ui/Projects'
import Skills from './components/ui/Skills'
import Testimonials from './components/ui/Testimonials'
import { AboutInfo, Award, HeroText, Project, Route, SkillSet, Testimonial } from './interfaces'
import { fetchAboutSectionData, fetchAwards, fetchHeroData, fetchProjects, fetchRoutes, fetchSkills, fetchTestimonials } from './actions/fetchData'


const Home = async (): Promise<JSX.Element> => {
  const routes: Route[] = fetchRoutes()
  const heroData: HeroText = fetchHeroData()
  const profileData: AboutInfo = fetchAboutSectionData()
  const skills: SkillSet[] = fetchSkills()
  const testimonials: Testimonial[] = fetchTestimonials()
  const projects: Project[] = fetchProjects()
  const awards: Award[] = fetchAwards()

  return (
    <>
      <Header data={routes}/>
      <Hero data={heroData} />
      <About data={profileData} />
      <Skills data={skills} />
      {testimonials.length > 0 && <Testimonials data={testimonials} />}
      <Projects data={projects} />
      {awards.length > 0 && <Awards data={awards} />}
      <Contact data={profileData} />
      <Footer profileData= {profileData} skills={skills} routes={routes}/>
    </>
  )
}

export default Home
