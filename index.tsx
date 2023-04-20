import { Inter } from 'next/font/google'
import Head from 'next/head'
import Header from './Header'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import ContactMe from './ContactMe'
import Link from 'next/link'
import logo from '/public/static/mainlogo.png'
import { GetServerSideProps, GetStaticProps } from 'next'
import { PageInfo, Project, Skill, Social } from '@/typings'
import { fetchPageInfo } from './api/getPageInfo'
import { fetchSkills } from './api/getSkills'
import { fetchProjects } from './api/getProjects'
import { fetchSocials } from './api/getSocials'
import { client } from '@/sanity'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  pageInfo: PageInfo;
  skills: Skill[];
  projects: Project[];
  socials: Social[];
}

 function Home({ pageInfo, skills, projects, socials,}: Props) {
  
  return (
    
    <div className='bg-[rgb(36,36,36)] text-white h-screen snap-y 
    snap-mandatory overflow-x-hidden overflow-y-scroll z-0 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#075985]/20'>
      <Head>
        <title>Kevin Portfolio</title>
      </Head>
      {/* Header */}
      <Header socials={socials} />
      {/* Hero */}
      <section id="hero" className='snap-start'>
        <Hero pageInfo = { pageInfo } />
      </section>
      
      
      {/* About */}
      <section id='about' className='snap-center'>
        <About/>
      </section>
      {/* Experience */}

      {/* Skills */}
      <section className='snap-start' id="skills">
        <Skills/>
      </section>
      {/* Projects */}
      <section className='snap-start' id='projects'>
        <Projects/>
      </section>

      {/* Contact Me*/}
      <section className='snap-start' id="contact">
        <ContactMe/>
      </section>

   
      <footer className='sticky bottom-5 w-full cursor-pointer'>
      <Link href="#hero">
        <div className="flex items-center justify-center">
          <img 
          className='h-10 w-10  filter grayscale hover:grayscale-0 cursor-pointer'
          src={logo.src} 
          alt="Kevinemile.net Logo" />
        </div>
        </Link>
      </footer>
    

    </div>
    
  )
}

export default Home



export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await client.fetch(`
    *[_type == "pageInfo"][0]
`);
  const skills: Skill[] = await client.fetch(`
    *[_type == "skill"] 
`);
  const projects: Project[] = await client.fetch(`
    *[_type == "project"]{
        ...,
        technologies[]->
    } 
`);
  const socials : Social[] = await client.fetch(   `
    *[_type == "social"] 
`
  );

  return{
    props:{
      pageInfo,
      skills,
      projects,
      socials,
    },
   
  }
}