import { HeroText } from '@/app/interfaces';
import Globe from './Globe';
import { FaArrowRight } from 'react-icons/fa';

const Hero = ({data}:{data: HeroText}) => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <Globe />
      <div className="w-fit mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent md:text-5xl lg:text-6xl font-bold mb-6">
            <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-float'>{data.title} </span><span className="animate-float text-glow-primary">{data.floatingText}</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-text-secondary dark:text-text-secondary-dark">{data.description}</p>
          <a
            href="#projects"
            className="relative inline-block px-8 py-3 text-white font-semibold bg-gradient-to-r from-primary to-primary rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
          >

            <span className="relative z-10">
              Explore <FaArrowRight className="inline ml-2" />
            </span>
          </a>

        </div>
      </div>
    </section>
  );
};

export default Hero;