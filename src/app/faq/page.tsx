import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircleQuestion } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "What is BioAuth?",
      a: "BioAuth is a next-generation identity verification and liveness assurance platform concept. It addresses AI-era spoofing risks (like deepfakes and replay attacks) by combining traditional visual challenge-response tests with a physiology-based liveness check (rPPG)."
    },
    {
      q: "What is rPPG?",
      a: "rPPG stands for remote Photoplethysmography. It is a technique used to detect variations in blood volume within facial tissue by analyzing subtle color changes in video frames. This provides a \"heartbeat\" or physiological signal that proves the subject is alive."
    },
    {
      q: "Does BioAuth replace face verification?",
      a: "No. BioAuth is designed to be an additional layer of security (a liveness check) that runs concurrently with standard 1:1 facial matching or 1:N facial recognition systems."
    },
    {
      q: "Can BioAuth detect every deepfake?",
      a: "While no security system is 100% foolproof, BioAuth significantly raises the bar. Generative AI models currently struggle to synthesize consistent, biologically accurate microvascular perfusion patterns across different regions of a moving face."
    },
    {
      q: "Why can lighting affect physiological liveness estimation?",
      a: "rPPG relies on the webcam sensor's ability to capture subtle reflections of ambient light off the skin. In very low light, the signal-to-noise ratio is too low (sensor noise dominates), making it difficult to extract a reliable pulse. In these cases, BioAuth requests a retry in better lighting rather than failing the user."
    },
    {
      q: "Why does the demo sometimes say \"Retry\" instead of \"Reject\"?",
      a: "A \"Reject\" is issued when the system actively detects spoofing indicators (like a lack of pulse or inconsistent signals indicative of a mask/deepfake). A \"Retry\" is issued when environmental factors (like poor lighting or excessive motion) prevent the system from making a confident assessment either way."
    },
    {
      q: "Is webcam video stored in this MVP?",
      a: "No. This capstone/research prototype operates completely statelessly. Frame data is processed locally within your browser (and in a real deployment, securely transmitted to an ephemeral processing pipeline). No video or Personally Identifiable Information (PII) is stored."
    },
    {
      q: "Is this production-ready for banks?",
      a: "This specific application is a research prototype and capstone demonstration. While the concepts and simulation demonstrate how a real system works, a production banking deployment would require an audited, compiled computer vision backend (e.g., C++/PyTorch) rather than Vercel serverless functions."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl space-y-12">
      
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <MessageCircleQuestion className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground mx-auto">
          Common queries regarding physiology-based liveness and our platform concept.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border/40">
            <AccordionTrigger className="text-left font-medium text-lg hover:text-primary transition-colors">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    </div>
  );
}
