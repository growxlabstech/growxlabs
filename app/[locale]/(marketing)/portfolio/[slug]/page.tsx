import { notFound } from "next/navigation";
import { projects } from "@/lib/data/projects";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, Cpu } from "lucide-react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/Button";
import { DynamicSchema } from "@/components/marketing/DynamicSchema";

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} | Software Product Studio | GrowXLabs`,
    description: project.description,
    alternates: {
      canonical: `https://growxlabs.tech/portfolio/${params.slug}`,
    },
    openGraph: {
      title: `${project.title} - GrowXLabs`,
      description: project.description,
      images: [{ url: project.image }],
    }
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <DynamicSchema
        graph={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": `https://growxlabs.tech/portfolio/${project.slug}#product`,
            "name": project.title,
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All",
            "description": project.description,
            "offers": {
              "@type": "Offer",
              "price": "0"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "@id": `https://growxlabs.tech/portfolio/${project.slug}#case-study`,
            "name": `${project.title} Case Study`,
            "headline": `${project.title}: A Case Study by GrowXLabs Product Studio`,
            "description": project.description,
            "author": {
              "@type": "Organization",
              "name": "GrowXLabs",
              "url": "https://growxlabs.tech"
            }
          }
        ]}
      />
      <div className="pt-24 pb-32">
        {/* Back Button */}
        <div className="container mx-auto px-4 mb-12">
          <Link href="/portfolio">
            <Button variant="ghost" className="text-white/60 hover:text-white pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-24">
          <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden mb-12 border border-white/5">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-12 left-12 right-12">
              <div className="transition-all duration-500 ease-out transform translate-y-0 opacity-100">
                <span className="px-4 py-1.5 rounded-full glass text-xs font-bold uppercase tracking-widest text-primary mb-4 inline-block">
                  {project.category}
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
                  {project.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Results Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.results.map((result, i) => (
              <div key={i} className="glass-card flex flex-col items-center justify-center p-12 text-center">
                <span className="text-5xl font-black text-primary mb-2 tracking-tighter">{result.value}</span>
                <span className="text-white/40 uppercase text-xs font-bold tracking-widest">{result.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-16">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <Target className="mr-3 text-primary" /> The Problem
                </h2>
                <p className="text-xl text-white/50 leading-relaxed font-light">
                  {project.problem}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <Cpu className="mr-3 text-primary" /> The Solution
                </h2>
                <p className="text-xl text-white/50 leading-relaxed font-light">
                  {project.solution}
                </p>
              </div>

              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-white/5">
                        <Image src={img} alt={`${project.title} gallery ${i}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              <div className="glass-card sticky top-32 p-10 space-y-8">
                <div>
                  <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest opacity-40">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-card/5 rounded-md text-sm text-white/80 border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest opacity-40">Services Provided</h3>
                  <ul className="space-y-3">
                    {["System Architecture", "Custom Engineering", "UI/UX Strategy", "Performance Audit"].map((s, i) => (
                      <li key={i} className="flex items-center text-white/60 text-sm">
                        <CheckCircle2 size={16} className="text-primary mr-3" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <Link href="/contact" className="w-full">
                    <Button className="w-full h-14 font-black">Book Your Strategy Call</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function Target(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
