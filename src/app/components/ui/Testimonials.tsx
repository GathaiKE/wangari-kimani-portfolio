import { Testimonial } from '@/app/interfaces';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Testimonials = ({data}:{data:Testimonial[]}) => {
  return (
    <section id="testimonials" className="py-20 relative bg-gradient-to-br from-surface/20 to-surface/5 dark:from-surface-dark/20 dark:to-surface-dark/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent inline-block text-transparent bg-clip-text">
            Client Testimonials
          </h2>
          <div className="block w-20 h-1 bg-gradient-to-r from-primary to-accent rounded mx-auto mt-3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-card backdrop-blur-sm border border-border rounded-xl p-6"
            >
              <div className="flex items-center mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl mr-4">
                  {testimonial.initials}
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{testimonial.position}</p>
                </div>
              </div>
              <p className="mb-4 italic">{testimonial.content}</p>
              <div className="text-accent dark:text-accent-dark flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(testimonial.stars) ? (
                      <FaStar />
                    ) : i < testimonial.stars ? (
                      <FaStarHalfAlt />
                    ) : (
                      <FaStar className="text-gray-400" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;