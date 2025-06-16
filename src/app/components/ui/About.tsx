import { AboutInfo } from '@/app/interfaces';
import { FaAtom } from 'react-icons/fa';

const About = ({ data }: { data: AboutInfo }) => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent inline-block text-transparent bg-clip-text">
            Who Am I
          </h2>
          <div className="block w-20 h-1 bg-gradient-to-r from-primary to-accent rounded mx-auto mt-3"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="lg:w-1/2">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">{data.title}</h3>
            <p className="mb-4 text-text-secondary dark:text-text-secondary-dark">{data.descriptionA}</p>
            {data.descriptionB && <p className="mb-8 text-text-secondary dark:text-text-secondary-dark">{data.descriptionB}</p>}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.techStack.map((item) => (
                <div
                  key={item.id}
                  className="bg-card backdrop-blur-sm border border-border rounded-xl p-5 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="text-3xl w-fit mx-auto text-primary dark:text-primary-dark mb-3">
                    {<item.icon />}
                  </div>
                  <h4 className="font-semibold">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Responsive image container */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[4/3]">
              {data.profileImage ? (
                <div
                  className="absolute inset-0 bg-center bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url(${data.profileImage})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
                ></div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <div className="text-6xl text-white animate-pulse">
                    <FaAtom />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;