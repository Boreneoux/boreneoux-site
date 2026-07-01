# boreneoux-site

Personal portfolio site for Ichlasul Fikri (Boreneoux).

Built with Next.js 16, Tailwind CSS v4, Prisma 7, and PostgreSQL on Neon.tech. Admin dashboard protected by Google OAuth.

## Stack

- **Framework** - Next.js 16 (App Router, Turbopack)
- **Styling** - Tailwind CSS v4
- **Database** - PostgreSQL via Neon.tech
- **ORM** - Prisma 7 with `@prisma/adapter-pg`
- **Auth** - NextAuth v5 (Google OAuth, single-admin guard)
- **Storage** - Vercel Blob (project images)
- **Runtime** - Bun

## Getting Started

```bash
bun install
bun run dev
```

Requires a `.env.local` file with:

```
DATABASE_URL=
DIRECT_URL=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
BLOB_READ_WRITE_TOKEN=
ADMIN_EMAIL=
```

## Database

```bash
bun run db:migrate   # run migrations
bun run db:seed      # seed initial data
bun run db:studio    # open Prisma Studio
```

## Dashboard

Visit `/dashboard` - requires sign in with the configured `ADMIN_EMAIL` Google account.

## Supported Icons

Icons are powered by [react-icons](https://react-icons.github.io/react-icons). Two contexts:

- **Skills** — use the visual icon picker in the dashboard (click the icon field to browse).
- **Tech Stack** (experiences & portfolios) — type the tech name naturally; icons resolve automatically.

### Skills — icon keys (enter exactly as shown)

| Key | Icon |
|-----|------|
| `FaHtml5` | HTML5 |
| `FaCss3Alt` | CSS3 |
| `FaJs` | JavaScript |
| `FaReact` | React |
| `SiNextdotjs` | Next.js |
| `SiVuedotjs` | Vue.js |
| `SiNuxt` | Nuxt.js |
| `SiAngular` | Angular |
| `SiSvelte` | Svelte |
| `SiAstro` | Astro |
| `SiGatsby` | Gatsby |
| `SiSolid` | SolidJS |
| `SiRemix` | Remix |
| `SiTypescript` | TypeScript |
| `SiTailwindcss` | Tailwind CSS |
| `SiSass` | Sass / SCSS |
| `SiChakraui` | Chakra UI |
| `SiStyledcomponents` | Styled Components |
| `SiRedux` | Redux |
| `SiReactquery` | TanStack / React Query |
| `SiStorybook` | Storybook |
| `SiThreedotjs` | Three.js |
| `SiD3` | D3.js |
| `SiChartdotjs` | Chart.js |
| `FaNodeJs` | Node.js |
| `SiExpress` | Express.js |
| `SiNestjs` | NestJS |
| `SiFastapi` | FastAPI |
| `SiDjango` | Django |
| `SiFlask` | Flask |
| `SiLaravel` | Laravel |
| `SiSpring` | Spring Boot |
| `SiDotnet` | .NET / ASP.NET |
| `SiPrisma` | Prisma |
| `FaPython` | Python |
| `FaJava` | Java |
| `SiKotlin` | Kotlin |
| `SiGo` | Go |
| `SiRust` | Rust |
| `SiCplusplus` | C++ |
| `SiPhp` | PHP |
| `FaSwift` | Swift |
| `SiDart` | Dart |
| `SiSolidity` | Solidity |
| `SiPostgresql` | PostgreSQL |
| `SiMysql` | MySQL |
| `SiMongodb` | MongoDB |
| `SiSqlite` | SQLite |
| `SiRedis` | Redis |
| `SiFirebase` | Firebase |
| `SiSupabase` | Supabase |
| `FaDatabase` | Generic DB |
| `SiElastic` | Elasticsearch |
| `SiAndroid` | Android |
| `SiFlutter` | Flutter |
| `SiIonic` | Ionic |
| `SiExpo` | Expo |
| `SiCapacitor` | Capacitor |
| `SiElectron` | Electron |
| `SiDocker` | Docker |
| `SiKubernetes` | Kubernetes |
| `SiTerraform` | Terraform |
| `SiJenkins` | Jenkins |
| `FaAws` | AWS |
| `SiGooglecloud` | Google Cloud |
| `SiDigitalocean` | DigitalOcean |
| `SiCloudflare` | Cloudflare |
| `SiNetlify` | Netlify |
| `SiVercel` | Vercel |
| `SiNginx` | NGINX |
| `SiGit` | Git |
| `FaGithub` | GitHub |
| `SiGitlab` | GitLab |
| `SiBitbucket` | Bitbucket |
| `SiNpm` | npm |
| `SiYarn` | Yarn |
| `SiPnpm` | pnpm |
| `SiWebpack` | Webpack |
| `SiVite` | Vite |
| `SiGradle` | Gradle |
| `SiEslint` | ESLint |
| `SiPrettier` | Prettier |
| `SiPostman` | Postman |
| `SiJest` | Jest |
| `SiCypress` | Cypress |
| `SiTensorflow` | TensorFlow |
| `SiPytorch` | PyTorch |
| `SiHuggingface` | Hugging Face |
| `SiJupyter` | Jupyter |
| `SiMeta` | Meta |
| `SiClaude` | Claude |
| `SiGraphql` | GraphQL |
| `SiApollographql` | Apollo GraphQL |
| `SiRabbitmq` | RabbitMQ |
| `SiApachekafka` | Apache Kafka |
| `SiStripe` | Stripe |
| `SiJira` | Jira |
| `SiConfluence` | Confluence |
| `FaSlack` | Slack |
| `SiNotion` | Notion |
| `SiTrello` | Trello |
| `SiLinear` | Linear |
| `SiWordpress` | WordPress |
| `SiStrapi` | Strapi |
| `SiContentful` | Contentful |
| `SiShopify` | Shopify |
| `SiIntellijidea` | IntelliJ IDEA |
| `SiAndroidstudio` | Android Studio |
| `SiVim` | Vim |
| `SiXcode` | Xcode |
| `SiFigma` | Figma |
| `SiFramer` | Framer |
| `SiSketch` | Sketch |
| `SiUnity` | Unity |
| `SiEthereum` | Ethereum |
| `SiWeb3Dotjs` | Web3.js |
| `FaLinux` | Linux |
| `SiCodeigniter` | CodeIgniter |

### Tech Stack — type names (auto-matched, case-insensitive)

Common aliases (more are supported, see `components/ui/TechTag.tsx`):

`React` · `Next.js` · `Vue` · `Nuxt` · `Angular` · `Svelte` · `Astro` · `Gatsby` · `Solid` · `Remix`  
`TypeScript` · `Tailwind` · `Sass` · `Chakra UI` · `Redux` · `React Query` · `Storybook`  
`Node.js` · `Express` · `NestJS` · `FastAPI` · `Django` · `Flask` · `Laravel` · `Spring` · `.NET` · `Prisma`  
`Python` · `Java` · `Kotlin` · `Go` · `Rust` · `C++` · `PHP` · `Swift` · `Dart`  
`PostgreSQL` · `MySQL` · `MongoDB` · `SQLite` · `Redis` · `Firebase` · `Supabase` · `Elasticsearch`  
`Android` · `Flutter` · `Ionic` · `Expo` · `Electron`  
`Docker` · `Kubernetes` · `Terraform` · `Jenkins` · `AWS` · `Google Cloud` · `DigitalOcean` · `Vercel` · `Netlify`  
`Git` · `GitHub` · `GitLab` · `Bitbucket` · `npm` · `Yarn` · `pnpm` · `Webpack` · `Vite`  
`Jest` · `Cypress` · `TensorFlow` · `PyTorch` · `Hugging Face` · `Jupyter`  
`GraphQL` · `Apollo` · `RabbitMQ` · `Kafka` · `Stripe`  
`Jira` · `Confluence` · `Slack` · `Notion` · `Trello` · `Linear`  
`Figma` · `Framer` · `Sketch` · `Unity` · `Linux`
