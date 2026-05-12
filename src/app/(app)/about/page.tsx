import Image from "next/image";
import Link from "next/link";
import { Leaf, Truck, ShieldCheck, Sprout, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const coreValues = [
    {
      icon: <Leaf className="w-6 h-6 text-[#0c831f]" />,
      title: "Farm to Fork",
      desc: "We eliminate middlemen to bring you fresh produce directly from trusted local farmers.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#0c831f]" />,
      title: "100% Quality Checked",
      desc: "Every fruit and vegetable undergoes a strict quality check before it gets packed for you.",
    },
    {
      icon: <Truck className="w-6 h-6 text-[#0c831f]" />,
      title: "Lightning Fast",
      desc: "Our optimized delivery network ensures your groceries arrive fresh and on time, every time.",
    },
    {
      icon: <Sprout className="w-6 h-6 text-[#0c831f]" />,
      title: "Sustainable Practices",
      desc: "We prioritize eco-friendly packaging and sustainable farming methods to protect our planet.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gray-50/50 py-8 sm:py-10 overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-[#0c831f]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1.5 px-3 rounded-full bg-[#0c831f]/10 text-[#0c831f] font-dmsans_semibold text-[13px] tracking-wider uppercase mb-5">
            About Greenova
          </span>
          <h1 className="text-3xl sm:text-5xl font-monasans_bold text-gray-900 tracking-tight max-w-3xl mx-auto leading-[1.15]">
            Redefining freshness, <br className="hidden sm:block" />
            delivered right to your door.
          </h1>
          <p className="mt-6 text-[15px] sm:text-[17px] text-gray-500 font-dmsans_light max-w-2xl mx-auto leading-relaxed">
            We believe that everyone deserves access to fresh, healthy, and organic food. Greenova bridges the gap between local farms and your kitchen, making daily grocery shopping effortless and pure.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY (Split Layout) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Block */}
       <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
  <Image
    src="/aboutImages/about1.jpg"
    alt="Fresh vegetables and fruits"
    fill
    className="object-cover"
  />
</div>

          {/* Text Block */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-monasans_semibold text-gray-900 mb-5">
              How it all started
            </h2>
            <div className="space-y-4 text-[15px] sm:text-[16px] text-gray-600 font-dmsans_light leading-relaxed">
              <p>
                A few years ago, we noticed a major problem: the produce sitting on supermarket shelves was often days, sometimes weeks, old. The journey from the farm to the store was too long, stripping fruits and vegetables of their natural nutrients and taste.
              </p>
              <p>
                That&apos;s why we created <strong>Greenova</strong>. We wanted to build a system where fresh food doesn&apos;t wait in warehouses. 
              </p>
              <p>
                Today, we partner directly with sustainable farmers, ensuring that when you bite into an apple or cook with our greens, you are tasting nature exactly as it was intended—fresh, crisp, and full of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES GRID */}
      <section className="bg-[#fafcfb] py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-monasans_semibold text-gray-900 mb-4">
              The Greenova Promise
            </h2>
            <p className="text-[15px] text-gray-500 font-dmsans_light max-w-xl mx-auto">
              We don&apos;t just deliver groceries; we deliver peace of mind. Here is what you can always expect from us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {coreValues.map((value, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-[#0c831f]/10 rounded-xl flex items-center justify-center mb-5">
                  {value.icon}
                </div>
                <h3 className="font-dmsans_semibold text-[17px] text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="font-dmsans_light text-[14px] text-gray-500 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-monasans_bold text-gray-900 mb-5">
          Ready to eat fresh?
        </h2>
        <p className="text-[15px] sm:text-[16px] text-gray-500 font-dmsans_light mb-8 max-w-xl mx-auto">
          Join thousands of happy families who have made the switch to healthier, fresher groceries.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0c831f] text-white rounded-full hover:bg-[#0a6c19] hover:shadow-lg hover:-translate-y-0.5 transition-all font-dmsans_semibold text-[15px]"
        >
          Start Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}