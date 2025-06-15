import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLinkedin, FaGithub, FaKaggle, FaDiscord } from 'react-icons/fa';
import ContactForm from '../forms/ContactForm';
import { AboutInfo } from '@/app/interfaces';
import clsx from 'clsx';
import Link from 'next/link';
import { FaX } from 'react-icons/fa6';
import { SiGooglecolab } from 'react-icons/si';

const Contact = ({ data }: { data: AboutInfo }) => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent inline-block text-transparent bg-clip-text">
            Contact Me
          </h2>
          <div className="block w-20 h-1 bg-gradient-to-r from-primary to-accent rounded mx-auto mt-3"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
            <p className="mb-8 text-text-secondary dark:text-text-secondary-dark">
              Ready to transform your business with cutting-edge technology? Reach out.
            </p>

            <div className="space-y-6">
              {[
                { icon: <FaMapMarkerAlt />, title: 'Location', content: 'Nairobi Kenya' },
                { icon: <FaPhoneAlt />, title: 'Phone', content: data.phone },
                { icon: <FaEnvelope />, title: 'Email', content: data.email },
                { icon: <FaLinkedin />, title: 'LinkedIn', content: "", link: data.socials.linkedIn },
                { icon: <FaGithub />, title: 'GitHub', content: "", link: data.socials.github },
                { icon: <FaKaggle />, title: 'Kaggle', content: "", link: data.socials.kaggle },
                { icon: <SiGooglecolab />, title: 'Google Colab', content: "", link: data.socials.colab },
                { icon: <FaDiscord />, title: 'Discord', content: "", link: data.socials.discord },
                { icon: <FaX />, title: 'X', content: "", link: data.socials.twitter },

              ].filter(item=> ((item.link && item.link.length > 0) || (item.content && item.content.length >0))).map((item, index) => (
                (item.link) ?
                  <Link key={index} href={item.link} target='_blank' className={clsx("flex items-start", { 'cursor-pointer hover:text-gray-300': item.link })}>
                    <div className="text-xl text-primary dark:text-primary-dark mt-1 mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-text-secondary dark:text-text-secondary-dark">{item.content}</p>
                    </div>
                  </Link> :
                  <div key={index} className={clsx("flex items-start", { 'cursor-pointer hover:text-gray-300': item.link })}>
                    <div className="text-xl text-primary dark:text-primary-dark mt-1 mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-text-secondary dark:text-text-secondary-dark">{item.content}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;