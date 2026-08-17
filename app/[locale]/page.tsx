import Image from "next/image";
import type { CSSProperties } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isLocale, type Locale } from "../../i18n/config";
import LocaleSwitcher from "../LocaleSwitcher";
import PortfolioMotion from "../PortfolioMotion";

const skills = ["TypeScript", "JavaScript", "Java", "C#", "C++", "Python", "React", "Next.js", "NestJS", "Spring Boot", ".NET", "Angular", "PostgreSQL", "Kubernetes"];

const experience = [
  { id: "calenco", company: "Calenco", logo: "/calenco-logo.webp", logoClass: "calenco", tags: ["React", "Redux Toolkit", "Java", "Neo4j"] },
  { id: "gojob", company: "Gojob", logo: "/gojob-logo.webp", logoClass: "gojob", tags: ["React", "NestJS", "Kubernetes", "PostgreSQL", "TDD"] },
  { id: "magicChess", company: "Magic Chess Online", logo: "/magic-chess-online-logo.webp", logoClass: "magic-chess", tags: ["C#", ".NET", "CRM", "Automation"] },
] as const;

const projects = [
  { id: "ads", number: "01", href: "https://github.com/bassemms/ads/", tags: ["Java", "Spring Boot", "React", "Docker"] },
  { id: "dungeon", number: "02", href: "https://github.com/bassemms/dungeon/", tags: ["Java", "JavaFX", "SOLID"] },
  { id: "yams", number: "03", href: "https://github.com/bassemms/yams/", tags: ["Java", "Client / Server", "Architecture"] },
  { id: "fireclock", number: "04", href: "https://github.com/bassemms/FireClockFlutter/", tags: ["Flutter", "Dart", "TypeScript", "NestJS"] },
] as const;

const driftingShapes = [
  { type: "circle", x: 3, y: 14, rotation: -12, scale: 1.08, duration: 79, direction: "reverse", blur: 0 },
  { type: "triangle", x: 11, y: 68, rotation: 24, scale: 0.78, duration: 64, direction: "normal", blur: 3.9 },
  { type: "square", x: 19, y: 38, rotation: -17, scale: 0.86, duration: 88, direction: "reverse", blur: 2.4 },
  { type: "hexagon", x: 27, y: 84, rotation: 13, scale: 0.7, duration: 71, direction: "normal", blur: 4.8 },
  { type: "diamond", x: 35, y: 19, rotation: 41, scale: 0.92, duration: 94, direction: "reverse", blur: 0 },
  { type: "circle", x: 43, y: 57, rotation: 19, scale: 0.66, duration: 61, direction: "normal", blur: 3.2 },
  { type: "triangle", x: 51, y: 9, rotation: -21, scale: 0.88, duration: 83, direction: "reverse", blur: 4.4 },
  { type: "square", x: 59, y: 78, rotation: 27, scale: 1.04, duration: 69, direction: "normal", blur: 2.7 },
  { type: "hexagon", x: 67, y: 31, rotation: -16, scale: 0.82, duration: 91, direction: "normal", blur: 0 },
  { type: "diamond", x: 75, y: 63, rotation: 57, scale: 0.72, duration: 76, direction: "reverse", blur: 4.1 },
  { type: "circle", x: 83, y: 89, rotation: -8, scale: 0.94, duration: 86, direction: "normal", blur: 0 },
  { type: "triangle", x: 91, y: 43, rotation: 16, scale: 0.68, duration: 66, direction: "reverse", blur: 3.5 },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24">{diagonal ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M5 12h14m-5-5 5 5-5 5" />}</svg>;
}

function SocialIcon({ platform, size = 20 }: { platform: "github" | "linkedin"; size?: number }) {
  return <Image className="social-icon" src={`/${platform}.png`} alt="" width={size} height={size} aria-hidden="true" />;
}

function HeroGeometry() {
  return (
    <div className="hero-geometry" aria-hidden="true">
      <div className="geometry-field">
        {[0, 1].flatMap((cycle) => driftingShapes.map((shape, index) => (
          <span className={`drifting-shape drifting-${shape.type}`} key={`${cycle}-${index}`} style={{
            left: `${shape.x + cycle * 100}vw`, top: `${shape.y}%`, "--shape-rotation": `${shape.rotation}deg`,
            "--shape-scale": shape.scale, "--shape-duration": `${shape.duration}s`, "--shape-direction": shape.direction,
            "--shape-blur": `${shape.blur}px`,
          } as CSSProperties} />
        )))}
      </div>
    </div>
  );
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return null;
  const locale: Locale = localeParam;
  setRequestLocale(locale);
  const t = await getTranslations("Portfolio");

  return (
    <main>
      <PortfolioMotion />
      <nav className="site-nav" aria-label={t("accessibility.primaryNavigation")}>
        <a className="wordmark" href="#top" aria-label={t("accessibility.home")}>BM<span>.</span></a>
        <div className="nav-links"><a href="#about">{t("nav.about")}</a><a href="#experience">{t("nav.experience")}</a><a href="#work">{t("nav.work")}</a><a href="#contact">{t("nav.contact")}</a></div>
        <div className="nav-actions">
          <LocaleSwitcher locale={locale} label={t("accessibility.language")} />
          <a className="nav-cta" href="https://www.linkedin.com/in/bassemms/" target="_blank" rel="noreferrer"><Image className="nav-linkedin-icon" src="/linkedin-white.svg" alt="" width={17} height={17} aria-hidden="true" /><span className="nav-cta-label">{t("nav.connect")}</span><Arrow diagonal /></a>
        </div>
      </nav>

      <section className="hero" id="top">
        <HeroGeometry />
        <div className="hero-copy">
          <p className="eyebrow"><span /> {t("hero.eyebrow")}</p>
          <h1>{t("hero.title1")}<br />{t("hero.title2")} <em>{t("hero.titleEm")}</em></h1>
          <p className="hero-intro">{t("hero.intro")}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#experience"><span className="button-label">{t("hero.explore")}</span><Arrow /></a>
            <a className="text-link" href="#about">{t("hero.about")} <span>↓</span></a>
          </div>
        </div>
        <div className="hero-visual" aria-label={t("accessibility.portrait")}>
          <div className="portrait-frame" data-cursor-parallax data-parallax-depth="0.55"><Image src="/bassem-msayif.webp" alt="Bassem Msayif" fill priority sizes="(max-width: 700px) 70vw, 300px" className="portrait" /></div>
          <div className="status-card"><span className="status-dot" /><p><small>{t("hero.currently")}</small>{t("hero.currentRole")}</p></div>
          <span className="orbit orbit-one" />
          <a className="music-easter-egg" href="https://soundcloud.com/neoslyde" target="_blank" rel="noreferrer" aria-label={t("accessibility.musicEasterEgg")}><svg aria-hidden="true" viewBox="0 0 32 32"><path d="M12 22.5V8.7l12-2.8v13.7M12 10.8l12-2.9M12 22.5c0 2-2.1 3.6-4.6 3.6S3 24.9 3 23s2-3.5 4.5-3.5c1.8 0 3.4.6 4.1 1.6M24 19.6c0 2-2.1 3.6-4.6 3.6S15 22 15 20.1s2-3.5 4.5-3.5c1.8 0 3.4.6 4.1 1.6" /></svg></a>
          <span className="hero-shape shape-diamond" data-cursor-parallax data-parallax-depth="-0.25" />
          <span className="hero-shape shape-pill" data-cursor-parallax data-parallax-depth="0.3" />
          <span className="hero-shape shape-spark" data-cursor-parallax data-parallax-depth="-0.4">✦</span>
          <a className="portrait-connect" href="https://www.linkedin.com/in/bassemms/" target="_blank" rel="noreferrer"><SocialIcon platform="linkedin" size={20} /><span className="portrait-connect-label">{t("hero.linkedin")}</span><Arrow diagonal /></a>
        </div>
        <div className="hero-foot"><span>{t("hero.scroll")}</span><div className="scroll-line" /></div>
      </section>

      <section className="about section-shell" id="about">
        <div className="section-label"><span>01</span><strong>{t("about.label")}</strong></div>
        <div className="about-grid">
          <h2>{t("about.title")}<br /><em>{t("about.titleEm")}</em></h2>
          <div className="about-copy"><p className="lead">{t("about.lead")}</p><p>{t("about.body1")}</p><p>{t("about.body2")}</p><div className="principles">{(t.raw("about.principles") as string[]).map((principle) => <span key={principle}>{principle}</span>)}</div></div>
        </div>
      </section>

      <section className="experience section-shell" id="experience">
        <div className="section-label light"><span>02</span><strong>{t("experience.label")}</strong></div>
        <div className="section-heading light-heading"><h2>{t("experience.title")}<br /><em>{t("experience.titleEm")}</em></h2><p>{t("experience.intro")}</p></div>
        <div className="timeline">
          {experience.map((job) => {
            const key = `experience.items.${job.id}`;
            const highlights = t.raw(`${key}.highlights`) as string[];
            return <article className="job" key={job.company}>
              <div className={`company-mark ${job.logoClass}`}><Image className="company-logo" src={job.logo} alt={t("accessibility.companyLogo", { company: job.company })} width={58} height={58} /></div>
              <div className="job-meta"><p className="job-period">{t(`${key}.period`)}</p><p>{t(`${key}.place`)}</p></div>
              <div className="job-body"><div className="job-title"><div><h3>{t(`${key}.role`)}</h3><p>{job.company} · {t(`${key}.type`)}</p></div><span className="job-arrow">↗</span></div><p className="job-summary">{t(`${key}.summary`)}</p><ul>{highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><div className="tag-list">{job.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            </article>;
          })}
        </div>
      </section>

      <section className="work section-shell" id="work">
        <div className="section-label"><span>03</span><strong>{t("work.label")}</strong></div>
        <div className="section-heading"><h2>{t("work.title")}<br /><em>{t("work.titleEm")}</em></h2><a className="text-link social-text-link" href="https://github.com/bassemms" target="_blank" rel="noreferrer"><SocialIcon platform="github" /> {t("work.github")} <span>↗</span></a></div>
        <div className="project-grid">{projects.map((project) => <a className="project-card" href={project.href} target="_blank" rel="noreferrer" key={project.id}><div className="project-top"><span>{project.number}</span><span className="project-link-mark"><SocialIcon platform="github" size={22} /><Arrow diagonal /></span></div><div><h3>{t(`work.items.${project.id}.title`)}</h3><p>{t(`work.items.${project.id}.text`)}</p></div><div className="tag-list dark-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></a>)}</div>
      </section>

      <section className="skills-education section-shell">
        <div className="skills-block"><div className="section-label"><span>04</span><strong>{t("toolkit.label")}</strong></div><h2>{t("toolkit.title")}<br /><em>{t("toolkit.titleEm")}</em></h2><div className="skill-cloud">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
        <div className="education-block"><div className="section-label"><span>05</span><strong>{t("education.label")}</strong></div><h2>{t("education.title")}<br /><em>{t("education.titleEm")}</em></h2><div className="degree-list"><article><span className="degree-year">2022 - 2024</span><div><h3>{t("education.master")}</h3><p>{t("education.masterField")}</p><strong>{t("education.university")}</strong></div></article><article><span className="degree-year">2019 - 2022</span><div><h3>{t("education.bachelor")}</h3><p>{t("education.bachelorField")}</p><strong>{t("education.university")}</strong></div></article></div></div>
      </section>

      <section className="contact" id="contact">
        <p className="eyebrow"><span /> {t("contact.eyebrow")}</p>
        <div className="contact-layout"><div className="contact-copy"><h2>{t("contact.title")}<br /><em>{t("contact.titleEm")}</em></h2><p>{t("contact.text")}</p><a className="email-link" href="mailto:bassemms.pro@gmail.com"><span><small>{t("contact.preferEmail")}</small>bassemms.pro@gmail.com</span><Arrow diagonal /></a></div><a className="linkedin-cta" href="https://www.linkedin.com/in/bassemms/" target="_blank" rel="noreferrer"><span className="linkedin-cta-icon"><SocialIcon platform="linkedin" size={48} /></span><span className="linkedin-cta-copy"><small>{t("contact.linkedinEyebrow")}</small><strong>{t("contact.linkedin")}</strong></span><span className="linkedin-cta-arrow" aria-hidden="true">↗</span></a></div>
        <footer><p>© {new Date().getFullYear()} Bassem Msayif</p><div><a href="https://github.com/bassemms" target="_blank" rel="noreferrer"><SocialIcon platform="github" size={18} /> GitHub ↗</a><a href="https://www.linkedin.com/in/bassemms/" target="_blank" rel="noreferrer"><SocialIcon platform="linkedin" size={18} /> LinkedIn ↗</a><a href="mailto:bassemms.pro@gmail.com">Email ↗</a><a href="#top">{t("contact.backToTop")} ↑</a></div></footer>
      </section>
    </main>
  );
}
