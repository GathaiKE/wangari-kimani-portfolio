import { Award } from "@/app/interfaces";

const Awards = ({data}:{data:Award[]}) => {
  return (
    <section id="partners" className="py-20 bg-surface dark:bg-surface-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent inline-block text-transparent bg-clip-text">
            Awards & Certificates
          </h2>
          <div className="block w-20 h-1 bg-gradient-to-r from-primary to-accent rounded mx-auto mt-3"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {data.map((award) => (
            <div 
              key={award.id}
              className="p-2 w-36 h-20 flex items-center justify-center font-bold text-text-secondary dark:text-text-secondary-dark bg-card backdrop-blur-sm border border-border rounded-xl transition-all duration-300 hover:scale-110 hover:text-primary dark:hover:text-primary-dark"
            >
              {award.title}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;