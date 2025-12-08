import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  project?: string;
  result?: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
  showAll?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, showAll = false }) => {
  const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Peter Hellman",
      role: "Founder and Senior Advisor",
      company: "Hellman & Partners",
      content: "Carl was instrumental in developing the concept behind Fastnabb. He helped define the overall strategy, structure the product idea, and create the first design prototypes that laid the groundwork for the MVP. His analytical mindset and creative approach made it easier for us to shape a clear direction for the project.",
      rating: 5,
      project: "PropTech Platform",
      result: "Pitch deck"
    },
    {
      id: 2,
      name: "Peter Hellman",
      role: "Senior Advisor",
      company: "Style Scandinavia",
      content: "Carl has made a real difference for Style Scandinavia. He modernized our website, improved how we communicate online, and helped us reach more of the right customers. Thanks to his structured way of working and sense for design and detail, our digital presence now feels both professional and easy to manage. We’re very happy with the result.",
      rating: 5,
      project: "E-commerce",
      result: "Digital Transformation"
    },
  
  ];

  const displayTestimonials = showAll ? defaultTestimonials : defaultTestimonials.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
              What Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from companies that have transformed their products with our strategic approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="card p-6 relative">
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-gray-700 leading-relaxed mb-6">
                  "{testimonial.content}"
                </blockquote>

                {/* Project Result */}
                {testimonial.result && (
                  <div className="mb-4 p-3 bg-lux-green-50 rounded-lg">
                    <p className="text-sm font-medium text-lux-green-800">
                      <span className="font-semibold">Result:</span> {testimonial.result}
                    </p>
                  </div>
                )}

                {/* Client Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-lux-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-lux-green-600 text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-lux-green-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>

                {/* Project Badge */}
                {testimonial.project && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {testimonial.project}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Social Proof Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl text-lux-green-600 mb-2">50+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl text-lux-green-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl text-lux-green-600 mb-2">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl text-lux-green-600 mb-2">100%</div>
              <div className="text-gray-600">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
