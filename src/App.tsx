import type { SVGProps } from "react";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  ArrowRight,
  Clock3,
  House,
  Mail,
  MapPin,
  Menu,
  MoveHorizontal,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  benefits,
  navigation,
  photoUrl,
  projects,
  services,
  statistics,
} from "@/data/content";
import { cn } from "@/lib/utils";
import heroAfter from "@/assets/hero/kitchen-after.webp";
import heroBefore from "@/assets/hero/kitchen-before.webp";

const heading =
  "text-balance text-[clamp(1.85rem,3vw,2.6rem)] font-bold leading-[1.18] tracking-[-0.035em]";
const goldButton = "rounded-full bg-gold px-6 text-primary hover:bg-[#ebce9a]";
const whatsappUrl =
  "https://wa.me/62215550184?text=Halo%20Atrium%2C%20saya%20ingin%20konsultasi%20gratis%20mengenai%20proyek%20interior.";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.7 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V3.6c-.8-.1-1.6-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v2.3H7.8V13h2.7v8h3.2Z" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.5 8.1H3.3V21h3.2V8.1ZM4.9 3A1.9 1.9 0 1 0 5 6.8 1.9 1.9 0 0 0 4.9 3ZM21 13.6c0-3.9-2.1-5.8-4.9-5.8-2.2 0-3.3 1.3-3.8 2.1V8.1H9.1V21h3.2v-6.4c0-1.7.3-3.4 2.5-3.4s2.2 2 2.2 3.5V21h3.2l.8-7.4Z" />
    </svg>
  );
}

function Brand() {
  return (
    <a
      href="#home"
      aria-label="Atrium, beranda"
      className="inline-flex shrink-0 items-center gap-2.5"
    >
      <House
        className="size-9 sm:size-10"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <span className="text-xl font-bold leading-none tracking-tight sm:text-2xl">
        Atrium
        <span className="mt-1.5 block text-[9px] font-medium uppercase tracking-[0.15em]">
          Interior Contracting
        </span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [indicator, setIndicator] = useState<{ left: number; width: number }>();
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const scrollLockUntilRef = useRef(0);

  const selectNavigation = (id: string) => {
    scrollLockUntilRef.current = Date.now() + 900;
    setActive(id);
  };

  useEffect(() => {
    const update = () => {
      if (Date.now() < scrollLockUntilRef.current) return;
      const current = navigation
        .map((item) => ({
          id: item.id,
          top:
            document.getElementById(item.id)?.getBoundingClientRect().top ??
            Infinity,
        }))
        .filter((item) => item.top <= 160)
        .sort((a, b) => b.top - a.top)[0];
      setActive(current?.id ?? "home");
    };
    const query = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (query.matches) setOpen(false);
    };
    window.addEventListener("scroll", update, { passive: true });
    query.addEventListener("change", closeOnDesktop);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      query.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const nav = navRef.current;
      const link = linkRefs.current[active];
      if (!nav || !link) return;
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setIndicator({ left: linkRect.left - navRect.left, width: linkRect.width });
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [active]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <div className="page-container flex h-18 items-center justify-between gap-6 lg:h-20">
        <Brand />
        <nav
          ref={navRef}
          aria-label="Navigasi utama"
          className="relative hidden items-center gap-5 lg:flex xl:gap-7"
        >
          {indicator && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 h-0.5 bg-gold transition-[left,width] duration-300 ease-out motion-reduce:transition-none"
              style={{ left: indicator.left, width: indicator.width }}
            />
          )}
          {navigation.map((item) => (
            <a
              key={item.id}
              ref={(node) => {
                linkRefs.current[item.id] = node;
              }}
              href={`#${item.id}`}
              onClick={() => selectNavigation(item.id)}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "relative flex min-h-11 items-center text-[13px] font-medium transition-colors duration-200 hover:text-gold-ink",
                active === item.id && "font-semibold text-gold-ink",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button asChild className={goldButton}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              Konsultasi gratis <FaWhatsapp className="size-4" />
            </a>
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-11 lg:hidden"
              aria-label="Buka menu navigasi"
            >
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[min(88vw,360px)] overflow-y-auto">
            <SheetHeader className="px-6 pt-8">
              <SheetTitle>Jelajahi Atrium</SheetTitle>
              <SheetDescription>
                Interior yang dirancang untuk Anda.
              </SheetDescription>
            </SheetHeader>
            <nav aria-label="Navigasi mobile" className="grid gap-1 px-6">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => {
                    selectNavigation(item.id);
                    setOpen(false);
                  }}
                  aria-current={active === item.id ? "location" : undefined}
                  className={cn(
                    "rounded-md px-3 py-3.5 text-base hover:bg-secondary",
                    active === item.id && "bg-secondary font-semibold",
                  )}
                >
                  {item.label}
                </a>
              ))}
              <Button asChild className={cn(goldButton, "mt-5")}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                >
                  Konsultasi gratis <FaWhatsapp className="size-4" />
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function Hero() {
  const [reveal, setReveal] = useState(42);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const revealRef = useRef(42);
  const directionRef = useRef<"left" | "right">("right");
  const resumeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setIsAutoPlaying(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const move = () => {
      const nextReveal = directionRef.current === "right" ? 72 : 28;
      revealRef.current = nextReveal;
      setReveal(nextReveal);
      directionRef.current = directionRef.current === "right" ? "left" : "right";
    };

    move();
    const loop = window.setInterval(move, 5000);

    return () => window.clearInterval(loop);
  }, [isAutoPlaying]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      directionRef.current = revealRef.current >= 50 ? "left" : "right";
      setIsAutoPlaying(true);
    }, 4000);
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="hero-compare relative isolate overflow-hidden bg-primary text-white"
    >
      <img
        src={heroAfter}
        alt="Dapur setelah direnovasi dengan kabinet kayu dan island batu"
        fetchPriority="high"
        width={1680}
        height={945}
        className="absolute inset-0 -z-30 size-full object-cover object-center"
      />
      <div
        className={cn(
          "absolute inset-0 -z-20 overflow-hidden",
          isAutoPlaying &&
            "transition-[clip-path] duration-[5000ms] ease-in-out",
        )}
        style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}
        aria-hidden="true"
      >
        <img
          src={heroBefore}
          alt=""
          width={1680}
          height={945}
          className="size-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#0c211e]/95 via-[#0c211e]/58 to-[#0c211e]/10" />

      <div
        aria-hidden="true"
        className={cn(
          "hero-reveal-handle pointer-events-none absolute inset-y-0 z-2 w-px bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,.12)]",
          isAutoPlaying && "transition-[left] duration-[5000ms] ease-in-out",
        )}
        style={{ left: `${reveal}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-lg">
          <MoveHorizontal className="size-5" />
        </span>
      </div>

      <input
        type="range"
        min="8"
        max="92"
        value={reveal}
        onChange={(event) => {
          pauseAutoPlay();
          const nextReveal = Number(event.target.value);
          revealRef.current = nextReveal;
          setReveal(nextReveal);
        }}
        onPointerDown={pauseAutoPlay}
        onKeyDown={pauseAutoPlay}
        aria-label="Bandingkan dapur sebelum dan sesudah renovasi"
        aria-valuetext={`${reveal} persen gambar sebelum renovasi`}
        className="hero-reveal-range absolute inset-x-0 top-1/2 z-1 h-14 -translate-y-1/2 cursor-ew-resize opacity-0"
      />

      <span className="pointer-events-none absolute left-4 top-4 z-3 rounded-sm bg-primary/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.12em] sm:left-6 lg:left-10">
        Sebelum
      </span>
      <span className="pointer-events-none absolute right-4 top-4 z-3 rounded-sm bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.12em] text-primary sm:right-6 lg:right-10">
        Sesudah
      </span>

      <div className="page-container relative z-10 grid gap-8 py-12 sm:py-14 md:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] md:items-end md:gap-6 md:py-16 lg:min-h-[520px] lg:py-18 xl:min-h-[550px]">
        <div className="min-w-0 max-w-[590px]">
          <h1
            id="hero-title"
            className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.035em]"
          >
            Wujudkan ruang
            <br />
            menjadi lebih
            <br />
            <span className="text-gold">indah.</span>
          </h1>
          <p className="mt-5 max-w-[42ch] text-sm leading-7 text-white/90 sm:text-base">
            Kami merancang dan membangun dapur serta kamar mandi yang menambah
            kenyamanan, gaya, dan nilai untuk rumah Anda.
          </p>
          <Button asChild size="lg" className={cn(goldButton, "mt-6")}>
            <a href="#contact">
              Mulai proyek <ArrowRight />
            </a>
          </Button>
        </div>
        <aside
          aria-label="Mengapa memilih Atrium"
          className="w-full max-w-[410px] rounded-lg bg-white p-5 text-primary shadow-lg md:justify-self-end lg:p-6"
        >
          <h2 className="text-sm font-semibold">Mengapa memilih kami?</h2>
          <dl className="mt-5 grid grid-cols-3 divide-x divide-border">
            {statistics.map(({ value, label, icon: Icon }, i) => (
              <div
                key={label}
                className={cn(
                  "flex min-w-0 flex-col",
                  i ? "pl-3 sm:pl-4" : "pr-2",
                )}
              >
                <Icon
                  className="mb-2 size-5"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <dt className="order-2 mt-1 text-[11px] leading-4">{label}</dt>
                <dd className="text-xl font-bold tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="bg-secondary py-12 sm:py-16 lg:py-18"
    >
      <div className="page-container grid items-center gap-8 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.45fr)] lg:gap-10">
        <div className="max-w-lg">
          <h2 id="services-title" className={heading}>
            Temukan solusi <span className="text-gold-ink">renovasi</span> yang
            tepat.
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            Dari dapur modern hingga kamar mandi bergaya spa, kami menghadirkan
            solusi renovasi yang sesuai dengan gaya, kebutuhan, dan anggaran
            Anda.
          </p>
          <Button asChild size="lg" className="mt-6 rounded-full">
            <a href="#gallery">
              Lihat semua layanan <ArrowRight />
            </a>
          </Button>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:grid-cols-4 sm:grid-rows-[190px_190px] lg:grid-rows-[180px_180px] xl:grid-rows-[200px_200px]">
          {services.map(
            ({ title, description, photo, icon: Icon, layout }, index) => (
              <a
                key={title}
                href="#gallery"
                className={cn(
                  "group relative isolate min-h-52 min-w-0 overflow-hidden rounded-md bg-primary text-white sm:min-h-0",
                  layout,
                )}
              >
                <img
                  src={photoUrl(photo, index === 0 ? 900 : 600)}
                  alt={title}
                  width={900}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#091d1b]/95 via-[#091d1b]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end gap-2 p-3 xl:p-4">
                  {index < 2 && (
                    <span className="hidden size-8 shrink-0 items-center justify-center rounded-full bg-white text-primary xl:flex">
                      <Icon className="size-4" />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[13px] font-semibold leading-5">
                      {title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-4 text-white/90">
                      {description}
                    </p>
                  </div>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-primary transition-colors group-hover:bg-gold">
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </a>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about-us"
      aria-labelledby="about-title"
      className="py-12 sm:py-16"
    >
      <div className="page-container grid gap-4 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_.75fr]">
        <div className="relative min-h-64 overflow-hidden rounded-md md:min-h-80">
          <img
            src={photoUrl(projects[1].photo)}
            alt="Kamar mandi hasil renovasi Atrium"
            width={900}
            height={800}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="rounded-md bg-primary p-6 text-white sm:p-8 lg:p-6 xl:p-8">
          <h2
            id="about-title"
            className="text-2xl font-bold leading-tight tracking-tight"
          >
            Mitra <span className="text-gold">renovasi</span>
            <br />
            terpercaya Anda.
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/85">
            Kami adalah tim desainer dan pembangun berpengalaman yang
            menghadirkan ruang indah dan fungsional. Kami berkomitmen memberikan
            pengerjaan berkualitas, komunikasi yang jelas, dan pelayanan
            terbaik.
          </p>
          <Button asChild className={cn(goldButton, "mt-6")}>
            <a href="#contact">
              Kenali kami <ArrowRight />
            </a>
          </Button>
        </div>
        <div className="grid content-center gap-6 rounded-md bg-secondary p-6 sm:grid-cols-2 md:col-span-2 lg:col-span-1 lg:grid-cols-1 xl:p-7">
          {benefits.map(({ title, description, icon: Icon }) => (
            <div className="flex items-start gap-3" key={title}>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <Icon className="size-4" strokeWidth={1.6} />
              </span>
              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold leading-5">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("Semua");
  const filtered = projects.filter(
    (project) => filter === "Semua" || project.type === filter,
  );
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="pb-14 pt-2 sm:pb-20"
    >
      <div className="page-container">
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="gallery-title" className={heading}>
            Koleksi <span className="text-gold-ink">proyek.</span>
          </h2>
          <div
            role="group"
            aria-label="Filter proyek"
            className="flex flex-wrap gap-2"
          >
            {["Semua", "Dapur", "Kamar Mandi", "Kabinet", "Komersial"].map(
              (item) => (
                <Button
                  key={item}
                  variant={filter === item ? "default" : "outline"}
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                  className="min-h-11 rounded-full px-4 text-xs"
                >
                  {item}
                </Button>
              ),
            )}
          </div>
        </div>
        <p className="sr-only" role="status">
          {filtered.length} proyek ditampilkan
        </p>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {filtered.map((project) => (
            <a
              key={project.title}
              href="#contact"
              className="group min-w-0 overflow-hidden rounded-md border border-border bg-secondary transition-shadow hover:shadow-md"
            >
              <div className="aspect-[1.35] overflow-hidden">
                <img
                  src={photoUrl(project.photo, 700)}
                  alt={`Proyek ${project.title}`}
                  width={700}
                  height={520}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-5">
                    {project.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3 text-gold-ink" />
                    {project.location}
                  </p>
                </div>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white transition-colors group-hover:bg-gold">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
    { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
    { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
    {
      label: "WhatsApp",
      href: whatsappUrl,
      icon: FaWhatsapp,
    },
  ];

  return (
    <footer id="contact" className="bg-primary text-white">
      <div className="page-container py-12 sm:py-16">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/20 pb-10 md:flex-row md:items-center">
          <div>
            <h2 className={heading}>
              Siap mengubah <span className="text-gold">ruang Anda?</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Ceritakan proyek Anda. Tim Atrium akan membantu menentukan langkah
              berikutnya.
            </p>
          </div>
          <Button asChild size="lg" className={cn(goldButton, "shrink-0")}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              Chat WA <FaWhatsapp className="size-4" />
            </a>
          </Button>
        </div>
        <div className="grid gap-x-8 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_.65fr_.8fr_1.1fr] lg:gap-x-10 lg:py-12">
          <div>
            <Brand />
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/75">
              Renovasi yang dirancang dengan teliti untuk ruang yang nyaman,
              fungsional, dan berkarakter.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-gold hover:bg-gold hover:text-primary"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gold">Jelajahi</h3>
            <nav
              aria-label="Navigasi footer"
              className="mt-3 grid justify-items-start"
            >
              {navigation.slice(1).map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="py-2 text-sm text-white/80 hover:text-gold"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-gold">Layanan</h3>
            <ul className="mt-3 grid text-sm text-white/80">
              {services.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="inline-flex py-2 hover:text-gold"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-gold">Hubungi kami</h3>
            <address className="mt-5 space-y-4 text-sm not-italic leading-6 text-white/80">
              <p className="flex gap-3">
                <MapPin className="mt-1 size-4 shrink-0" />
                <span>
                  Jl. Arsitektur No. 18
                  <br />
                  Jakarta Selatan
                </span>
              </p>
              <a
                href="mailto:halo@atriumcontracting.com"
                className="flex items-start gap-3 hover:text-gold"
              >
                <Mail className="mt-1 size-4 shrink-0" />
                <span className="break-all">halo@atriumcontracting.com</span>
              </a>
              <a
                href="tel:+62215550184"
                className="flex items-center gap-3 hover:text-gold"
              >
                <Phone className="size-4 shrink-0" />
                +62 21 555 0184
              </a>
              <p className="flex gap-3">
                <Clock3 className="mt-1 size-4 shrink-0" />
                <span>
                  Senin–Jumat, 08.00–17.00
                  <br />
                  Sabtu, sesuai janji temu
                </span>
              </p>
            </address>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/20 pt-6 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Atrium Interior Contracting. Seluruh hak dilindungi.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#contact" className="hover:text-gold">
              Kebijakan privasi
            </a>
            <a href="#contact" className="hover:text-gold">
              Syarat layanan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-50 rounded-md bg-white p-3 text-primary focus:not-sr-only"
      >
        Langsung ke konten
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <About />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
