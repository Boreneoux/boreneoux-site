import { AnimatedText } from "@/components/ui/AnimatedText";

const sentences = [
  { text: "hello there!", large: true },
  {
    text: "I'm a full-stack engineer with experience across the delivery cycle — from database modeling and API design to frontend work with React and Next.js.",
  },
  {
    text: "Recently I integrated DeepSeek AI into a fintech reconciliation system, turning a two-week manual process into something that runs in a day.",
  },
  {
    text: "My backend stack is TypeScript, Express/NestJS, Bun/NodeJS, and PostgreSQL — with an Android development background in Kotlin and Jetpack Compose.",
  },
  {
    text: "Still growing, but the kind of person who takes that seriously — learning deliberately and applying it to real things.",
  },
];

export function About() {
  return (
    <section id="about">
      <AnimatedText sentences={sentences} />
    </section>
  );
}
