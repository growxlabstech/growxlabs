import { locales, Link } from "@/navigation";
import { AccordionFAQ } from "@/components/marketing/AccordionFAQ";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Script from "next/script";

const faqData = [
  {
    question: "How do your digital systems improve revenue?",
    answer: "Our systems capture high-intent traffic, qualify leads quickly, and automate the conversion path so fewer opportunities are lost."
  },
  {
    question: "Do I need to manage the automation myself?",
    answer: "No. We build, deploy, document, and maintain the workflows so your team can focus on sales and delivery."
  },
  {
    question: "What is Technical SEO?",
    answer: "It is engineering your site structure, content model, speed, and schema so search engines and AI assistants can understand and recommend your business."
  },
  {
    question: "Can your systems scale with my business?",
    answer: "Yes. We use modern cloud infrastructure and modular workflows so your site, CRM, and automations can grow with demand."
  },
  {
    question: "What is the typical ROI timeline?",
    answer: "Most clients see operational savings immediately, while revenue improvements typically appear after the system has collected and converted traffic for several weeks."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. Cancel with 15 days notice. No lock-in."
  },
  {
    question: "What if I need a website first?",
    answer: "We build your website first (one-time), then you move to subscription."
  },
  {
    question: "Do you serve outside India?",
    answer: "Yes. USD pricing available."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const languages: Record<string, string> = {
    "x-default": "https://growxlabs.tech/en-IN/faq",
  };
  locales.forEach((l) => {
    languages[l] = `https://growxlabs.tech/${l}/faq`;
  });

  return {
    title: "FAQ | GrowXLabsTech",
    description: "Frequently Asked Questions about our web development, automation systems, and operations.",
    alternates: {
      canonical: `https://growxlabs.tech/${locale}/faq`,
      languages
    }
  };
}

export default function FAQPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title="FAQ"
        viewingText="FAQ"
        exploreText="HELP & ANSWERS"
        tagline="QUESTIONS"
      />

      <div className="pb-24 px-6 md:px-10 xl:px-16 2xl:px-24 w-full border-t border-border/20 pt-16">
        <div className="max-w-4xl mx-auto">
          <section className="max-w-4xl mx-auto mb-24">
            <AccordionFAQ items={faqData} />
          </section>

          <div className="text-center rounded-lg bg-[#1A1A1A] p-8 md:p-12">
            <h2 className="text-[clamp(28px,5vw,46px)] font-black text-white tracking-tight mb-4">
              Need a complete digital system?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Tell us what you sell, how leads currently arrive, and where your team loses time. We will map the system that fits.
            </p>
            <Link href="/contact">
              <Button className="h-14 px-8 rounded-md font-semibold inline-flex items-center gap-2">
                Start a project <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
