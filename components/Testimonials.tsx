import Image from "next/image";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "DataSync entirely replaced our engineering team's manual ETL scripts. The real-time mapping saved us roughly 40 hours a week.",
    author: "Sarah Chen",
    role: "VP of Engineering, InnovateAI",
    avatar: "/svg/cube-16-solid.svg",
    rating: 5,
  },
  {
    id: 2,
    quote: "The pricing is incredibly transparent. The fact that I could toggle my region and instantly see accurate localized costs was a breath of fresh air.",
    author: "Marcus Aurelius",
    role: "Founder, Rome Analytics",
    avatar: "/svg/cube-16-solid.svg",
    rating: 5,
  },
  {
    id: 3,
    quote: "We scaled from 10M to 1B rows within three months, and DataSync didn't drop a single packet. Their enterprise SLA is actually reliable.",
    author: "Elena Rodriguez",
    role: "Head of Data, ScaleUp Inc",
    avatar: "/svg/cube-16-solid.svg",
    rating: 5,
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[var(--color-oceanic)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-arctic)]">
            Don't just take our word for it
          </h2>
          <p className="mt-4 text-lg text-[var(--color-mint)] max-w-2xl mx-auto">
            See how the fastest growing companies use DataSync to automate their pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-[var(--color-nocturnal)] p-8 rounded-3xl border border-[var(--color-mint)]/10 hover:border-[var(--color-saffron)]/30 animate-elevate flex flex-col"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Image 
                    key={i} 
                    src="/svg/chart-pie.svg" 
                    alt="Star" 
                    width={20} 
                    height={20} 
                    className="filter invert sepia saturate-200 hue-rotate-[10deg]" // Trying to make it yellowish
                  />
                ))}
              </div>

              <blockquote className="text-[var(--color-arctic)] font-medium text-lg mb-8 flex-grow">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-[var(--color-oceanic)] flex items-center justify-center p-2 border border-[var(--color-mint)]/20">
                  <Image src={testimonial.avatar} alt={testimonial.author} width={24} height={24} className="filter invert opacity-70" />
                </div>
                <div>
                  <div className="font-bold text-[var(--color-arctic)]">{testimonial.author}</div>
                  <div className="text-[var(--color-mint)] text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
