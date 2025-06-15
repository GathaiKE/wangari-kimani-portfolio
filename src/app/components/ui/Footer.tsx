import { AboutInfo, Route, SkillSet } from '@/app/interfaces';
import { FaInfinity, FaKaggle, FaHeart, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { SiGooglecolab } from 'react-icons/si';


interface FooterProps {
  routes: Route[];
  profileData: AboutInfo;
  skills: SkillSet[]; 
}

const Footer = (data: FooterProps) => {
  const links = {
    skills: data.skills,
    quickLinks: data.routes,
    resources: ['Documentation', 'Case Studies', 'White Papers']
  };

  return (
    <footer className="py-16 bg-surface dark:bg-surface-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center text-xl font-bold text-primary dark:text-primary-dark mb-5">
              <FaInfinity className="mr-2" />
              <span>Wangari Kimani</span>
            </div>
            <p className="mb-6 text-text-secondary dark:text-text-secondary-dark">
              Pioneering the technologies of tomorrow to solve the challenges of today.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaLinkedin />, link: data.profileData.socials.linkedIn },
                { icon: <FaGithub />, link: data.profileData.socials.github },
                { icon: <FaKaggle />, link: data.profileData.socials.kaggle },
                { icon: <SiGooglecolab />, link: data.profileData.socials.colab },
                { icon: <FaDiscord />, link: data.profileData.socials.discord },
                { icon: <FaX />, link: data.profileData.socials.twitter }
              ].filter(item=> ((item.link && item.link.length > 0))).map((social, index) => (
                <a 
                  key={index}
                  href={social.link}
                  target='_blank'
                  className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-primary dark:hover:bg-primary-dark hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-5 text-primary dark:text-primary-dark">Quick Links</h3>
            <ul className="space-y-3">
              {links.quickLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.path.toLowerCase()}`} className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-dark transition-all hover:-translate-x-2 duration-300">
                    {link.path}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-5 text-primary dark:text-primary-dark">My Skills</h3>
            <ul className="space-y-3">
              {links.skills.map((item) => (
                <li key={item.id}>
                  <a href="#" className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-dark transition-colors duration-300">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-5 text-primary dark:text-primary-dark">Resources</h3>
            <ul className="space-y-3">
              {links.resources.map((resource, index) => (
                <li key={index}>
                  <a href="#" className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-dark transition-colors duration-300">
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 dark:border-black/10 text-center text-text-secondary dark:text-text-secondary-dark">
          <p>
            &copy; 2025 All rights reserved. | Designed with 
            <FaHeart className="inline mx-1 text-primary dark:text-primary-dark" /> 
            for the future
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;