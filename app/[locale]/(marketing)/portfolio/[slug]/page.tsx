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
      <div className="pt-28 pb-32 w-full">
        {/* Back Button */}
        <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-10 xl:px-16 mb-8">
          <Link href="/portfolio">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground h-auto py-1 pl-0 font-bold tracking-tight text-xs uppercase">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-10 xl:px-16 mb-16">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-10 border border-border">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
              <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground mb-4 inline-block">
                {project.category}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
                {project.title}
              </h1>
            </div>
          </div>

          {/* Results Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.results.map((result, i) => (
              <div key={i} className="bg-card border border-border rounded-xl flex flex-col items-center justify-center p-8 md:p-10 text-center shadow-sm">
                <span className="text-4xl md:text-5xl font-black text-primary mb-2 tracking-tighter">{result.value}</span>
                <span className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest">{result.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-10 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center tracking-tight">
                  <Target className="mr-3 text-primary h-5 w-5" /> The Problem
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                  {project.problem}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center tracking-tight">
                  <Cpu className="mr-3 text-primary h-5 w-5" /> The Solution
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                  {project.solution}
                </p>
              </div>

              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6 tracking-tight">System Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-border">
                        <Image src={img} alt={`${project.title} system view ${i}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (Sidebar) */}
            <div className="lg:col-span-4">
              <div className="bg-card border border-border rounded-2xl p-8 space-y-8 sticky top-28 shadow-sm">
                <div>
                  <h3 className="text-foreground font-bold mb-3 uppercase text-[10px] tracking-wider opacity-60">Tech Stack</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 bg-muted rounded-md text-[10px] font-bold text-muted-foreground border border-border uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-foreground font-bold mb-3 uppercase text-[10px] tracking-wider opacity-60">Engineering Scope</h3>
                  <ul className="space-y-2.5">
                    {["System Architecture", "Custom Engineering", "UI/UX Strategy", "Performance Audit"].map((s, i) => (
                      <li key={i} className="flex items-center text-muted-foreground text-xs font-semibold">
                        <CheckCircle2 size={14} className="text-primary mr-3 shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-border">
                  <Link href="/contact" className="w-full block">
                    <Button variant="primary" className="w-full h-12 font-bold uppercase tracking-wider text-xs">Book Strategy Call</Button>
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
