import { SkillSet } from '@/app/interfaces';

const Skills = ({data}:{data: SkillSet[]}) => {
  return (
    <section id="services" className="py-20 bg-surface dark:bg-surface-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent inline-block text-transparent bg-clip-text">
            My Skills
          </h2>
          <div className="block w-20 h-1 bg-gradient-to-r from-primary to-accent rounded mx-auto mt-3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((skill) => (
            <div 
              key={skill.id}
              className="bg-card backdrop-blur-sm  border border-border rounded-xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="text-4xl mx-auto w-fit text-primary dark:text-primary-dark mb-5">
                {<skill.icon />}
              </div>
              <h3 className="text-xl font-bold mb-3">{skill.title}</h3>
              <p className="text-text-secondary dark:text-text-secondary-dark">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;