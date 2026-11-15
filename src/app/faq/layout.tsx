import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { FAQS } from "@/lib/faqs";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export const metadata: Metadata = {
  title: "FAQ – How to Join (Java, Bedrock, Mobile)",
  description: "How to join BrutalMC on Java, Bedrock and mobile, plus rules and common questions.",
  alternates: { canonical: "/faq/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      {children}
    </>
  );
}
