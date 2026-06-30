import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.skill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.portfolio.deleteMany();

  // Skills
  await prisma.skill.createMany({
    data: [
      { name: "TypeScript", icon: "SiTypescript", category: "frontend", order: 1 },
      { name: "JavaScript", icon: "FaJs", category: "frontend", order: 2 },
      { name: "React", icon: "FaReact", category: "frontend", order: 3 },
      { name: "Next.js", icon: "FaReact", category: "frontend", order: 4 },
      { name: "Tailwind CSS", icon: "SiTailwindcss", category: "frontend", order: 5 },
      { name: "Chakra UI", icon: "SiChakraui", category: "frontend", order: 6 },
      { name: "HTML5", icon: "FaHtml5", category: "frontend", order: 7 },
      { name: "CSS3", icon: "FaCss3Alt", category: "frontend", order: 8 },
      { name: "Node.js", icon: "FaNodeJs", category: "backend", order: 1 },
      { name: "Express.js", icon: "SiExpress", category: "backend", order: 2 },
      { name: "NestJS", icon: "SiNestjs", category: "backend", order: 3 },
      { name: "PostgreSQL", icon: "SiPostgresql", category: "backend", order: 4 },
      { name: "Prisma", icon: "SiPrisma", category: "backend", order: 5 },
      { name: "C#", icon: "SiDotnet", category: "backend", order: 6 },
      { name: "SQL Server", icon: "FaDatabase", category: "backend", order: 7 },
      { name: "Kotlin", icon: "SiKotlin", category: "mobile", order: 1 },
      { name: "Jetpack Compose", icon: "SiAndroid", category: "mobile", order: 2 },
      { name: "Android SDK", icon: "SiAndroid", category: "mobile", order: 3 },
      { name: "Git", icon: "FaGithub", category: "tools", order: 1 },
      { name: "Linux", icon: "FaLinux", category: "tools", order: 2 },
      { name: "Figma", icon: "FaFigma", category: "tools", order: 3 },
      { name: "Postman", icon: "SiPostman", category: "tools", order: 4 },
    ],
  });

  // Experiences
  await prisma.experience.createMany({
    data: [
      {
        company: "Vidio",
        position: "Frontend Engineer Intern",
        dateIn: "Aug 2023",
        dateOut: "Dec 2023",
        description: [
          "Worked on a client side in TV app platforms",
          "Developed storybook framework for the TV app.",
          "Helped the team to research regarding the TV navigation for improvement.",
          "Finished 120+ daily tasks",
        ],
        techStack: ["React", "TypeScript", "Storybook JS", "Jenkins", "Git"],
        imageUrl: "/images/companies/vidio.jpg",
        order: 1,
      },
      {
        company: "Bangkit 2024 Batch 1",
        position: "Mobile Development Mentor",
        dateIn: "Feb 2024",
        dateOut: "Jul 2024",
        description: [
          "Mentored 20+ students in mobile development",
          "Guided students in building mobile apps",
        ],
        techStack: ["Kotlin", "Android SDK", "Jetpack Compose", "Figma"],
        imageUrl: "/images/companies/bangkit.jpg",
        order: 2,
      },
      {
        company: "Fortius Solusi Informatika",
        position: "R&D Staff - Fullstack Developer",
        dateIn: "Mar 2025",
        dateOut: "Oct 2025",
        description: [
          "Created and Developed an AI Based Reconciliation Application",
          "Maintain and develop internal reconciliation application",
          "Create technical documentation for the reconciliation application",
        ],
        techStack: ["React", "TypeScript", "C#", "Git", "SQLServer", "PostgreSQL"],
        imageUrl: "/images/companies/fortius.jpg",
        order: 3,
      },
    ],
  });

  // Portfolios
  await prisma.portfolio.create({
    data: {
      slug: "rashio",
      title: "RashIO - Skin Disease Detection App",
      shortDescription:
        "RashIO is an Android-based skin health application that helps users identify potential skin diseases by analyzing images using a machine learning model. This project was developed as a Capstone Project for Bangkit Academy 2023 Batch 1.",
      situation:
        "Skin diseases are common but often go undiagnosed due to limited access to dermatologists, delayed consultations, or lack of early awareness. Our team aimed to build a mobile solution that could help users perform preliminary skin disease detection using smartphone cameras.",
      task: "I was responsible for designing the overall user experience and developing the Android application. My role included translating the machine learning output into a user-friendly interface and ensuring smooth integration between the UI and the image classification model.",
      action:
        "I designed the application's UI/UX using Figma, focusing on simplicity and accessibility. I built the Android application using Kotlin, Android SDK, and Jetpack Compose. I integrated the skin disease detection model using TensorFlow.js and managed local data storage with SQLite.",
      result:
        "RashIO was successfully delivered as a complete end-to-end mobile application for the Bangkit 2023 Capstone Project. The app demonstrated effective integration between machine learning and mobile development, received positive feedback for its intuitive UI.",
      techStack: ["Kotlin", "TensorFlow.js", "SQLite", "Android SDK", "Jetpack Compose", "Figma"],
      imageUrl: "/images/projects/rashio.jpg",
      links: [],
      featured: true,
      order: 1,
    },
  });

  await prisma.portfolio.create({
    data: {
      slug: "ema-realty",
      title: "Ema Realty Site - Property Consultant Digital Listing Platform",
      shortDescription:
        "Ema Realty Site is a digital property listing and company profile website designed for Ema Realty, a property consulting firm. Built with a modern fullstack architecture, supporting secure authentication, scalable data management, and a professional user interface.",
      situation:
        "Ema Realty required a centralized digital platform to strengthen its online presence and streamline how property listings were promoted and managed. Existing marketing efforts relied heavily on manual processes and third-party platforms.",
      task: "As the Project Leader and Fullstack Developer, I was responsible for designing the system architecture, leading development decisions, and implementing both the front-end and back-end of the application.",
      action:
        "I designed and developed the backend using NestJS with TypeScript, implementing a modular architecture supported by Prisma and PostgreSQL. Secure authentication was handled using JWT. On the front end, I built the application using Next.js and Chakra UI.",
      result:
        "The platform was successfully delivered as a unified digital solution for Ema Realty, improving the company's ability to promote and manage property listings independently.",
      techStack: ["Typescript", "NextJS", "NestJS", "ChakraUI", "Prisma", "PostgreSQL", "JWT"],
      imageUrl: "/images/projects/ema-realty.jpg",
      links: [],
      featured: true,
      order: 2,
    },
  });

  await prisma.portfolio.create({
    data: {
      slug: "clara-ai",
      title: "Clara AI - AI-Powered Bank Reconciliation Web Application",
      shortDescription:
        "Clara AI is an AI-assisted bank reconciliation web application designed to streamline financial data matching and validation processes. It leverages stable AI prompting to analyze and reconcile banking data.",
      situation:
        "Bank reconciliation is a critical but time-consuming process involving manual data comparison across multiple data sources. The company aimed to enhance its internal reconciliation system by introducing an AI-assisted approach.",
      task: "As a Developer in the R&D team, I was responsible for building the web application and designing the AI interaction flow. My objective was to create a reliable reconciliation assistant using prompt-based AI reasoning.",
      action:
        "I developed the application as an SPA using ReactJS and Chakra UI. I designed stable and deterministic prompting strategies that process structured reconciliation data and guide the AI to produce consistent outputs. The application was integrated with DeepSeek for AI reasoning.",
      result:
        "Clara AI successfully enhanced the internal reconciliation process by reducing manual analysis effort and improving data interpretation speed. The prompt-based AI approach proved effective, stable, and easier to maintain compared to traditional ML solutions.",
      techStack: ["ReactJS", "ChakraUI", "DeepSeek", "SQLServer", "TypeScript"],
      imageUrl: "/images/projects/clara-ai.jpg",
      links: [],
      featured: true,
      order: 3,
    },
  });

  await prisma.portfolio.create({
    data: {
      slug: "uniqgue",
      title: "Uniqgue - Fashion E-Commerce Website",
      shortDescription:
        "Uniqgue is a modern fashion e-commerce website showcasing trendy apparel across multiple categories. The platform focuses on clean UI, intuitive navigation, and a smooth shopping flow. Recognized as one of the top projects in the Web Programming course.",
      situation:
        "As part of a final assignment for a Web Programming course, students were challenged to build a fully functional e-commerce website applying modern web development practices and strong UI/UX principles.",
      task: "I took on the role of UI/UX Designer and Front-End Leader, responsible for defining the overall interface structure, designing reusable UI components, and leading front-end development.",
      action:
        "I designed the UI/UX flow to emphasize clarity and ease of navigation. The front end was built using Tailwind CSS, while CodeIgniter 4 and MySQL were used for MVC architecture. As Front-End Leader, I conducted code reviews and handled merge requests.",
      result:
        "The project was selected as one of the top projects in the class, receiving very positive feedback for its UI quality, structure, and overall usability.",
      techStack: ["CodeIgniter4", "PHP", "TailwindCSS", "MYSQL", "Figma"],
      imageUrl: "/images/projects/uniqgue.jpg",
      links: [],
      featured: false,
      order: 4,
    },
  });

  console.log("Seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
