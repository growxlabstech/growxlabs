"use client";

const VALUES = [
  {
    title: "AI-native digital systems",
    subtitle: "for modern businesses.",
  },
  {
    title: "AI systems designed",
    subtitle: "for real-world growth.",
  },
  {
    title: "Young engineers",
    subtitle: "building AI-native systems.",
  },
  {
    title: "More than an agency.",
    subtitle: "A technical growth partner.",
  },
];

export function ValuePropositions() {
  return (
    <section className="w-full py-20 px-6 md:px-10 xl:px-16 2xl:px-24 border-y border-[#E8E6E1]">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {VALUES.map((val, i) => (
          <div
            key={i}
            className="group cursor-default"
          >
            <div className="relative">
              <p className="text-[17px] sm:text-[18px] font-medium text-[#1A1A1A] leading-[1.5]">
                {val.title}
              </p>
              <p className="text-[17px] sm:text-[18px] font-medium text-[#6B7280] leading-[1.5]">
                {val.subtitle}
              </p>
              <div className="h-[2px] bg-[#355CFF] mt-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

