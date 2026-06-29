"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MotionButton } from "@/components/motion-button";

// ── Data ──────────────────────────────────────────────────────────────────────

const amenities = [
  {
    title: "Free Weights",
    desc: "Dumbbells 5–150 lbs, barbells, and 6 Olympic lifting platforms with bumper plates.",
    image: "/images/g8.webp",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4M6 12h12" /></svg>),
  },
  {
    title: "Cardio Floor",
    desc: "60+ machines including treadmills, rowers, bikes, and stair climbers with personal screens.",
    image: "/images/g11.webp",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
  },
  {
    title: "Sauna & Steam",
    desc: "Dedicated dry sauna and steam room for recovery. Available 7 days a week.",
    image: "/images/amenity-sauna.jpg",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12h20M12 2a10 10 0 0 1 10 10M12 2a10 10 0 0 0-10 10" /><path d="M12 22a10 10 0 0 0 10-10M12 22a10 10 0 0 1-10-10" /></svg>),
  },
  {
    title: "Locker Rooms",
    desc: "Spacious change rooms with private showers, complimentary towel service, and secure lockers.",
    image: "/images/amenity-locker-room.jpg",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" /></svg>),
  },
  {
    title: "Free Parking",
    desc: "150-spot private lot with direct access to the facility. No validation required.",
    image: "/images/amenity-parking.jpg",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h6l2 5v3h-8V8zM5 19a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM17 19a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" /></svg>),
  },
];

const galleryImages = [
  { src: "/images/g1.webp",  alt: "Main gym floor",         large: true },
  { src: "/images/g2.webp",  alt: "Cable machines" },
  { src: "/images/g3.webp",  alt: "Free weight area" },
  { src: "/images/g4.webp",  alt: "Bench press stations" },
  { src: "/images/g5.webp",  alt: "Cardio and weight floor" },
  { src: "/images/g6.webp",  alt: "Treadmill row",          large: true },
  { src: "/images/g7.webp",  alt: "Full gym floor view" },
  { src: "/images/g8.webp",  alt: "Leg press" },
  { src: "/images/g9.webp",  alt: "Machine section" },
  { src: "/images/g10.webp", alt: "Squat racks" },
  { src: "/images/g11.webp", alt: "Cardio equipment",       large: true },
  { src: "/images/g12.webp", alt: "Dumbbell racks" },
  { src: "/images/g13.webp", alt: "Cable area" },
  { src: "/images/g14.webp", alt: "Bikes and cardio" },
  { src: "/images/g15.webp", alt: "Weight floor" },
];

const planDetails: Record<string, { title: string; paragraphs: string[] }> = {
  couples6month: {
    title: "Couples Membership — 6 Months ($399 Each Person)",
    paragraphs: [
      "Train together, stay motivated, and reach your fitness goals as a couple.",
      "Join with your partner and enjoy 6 months of unlimited gym access for $399 each when purchased together. This membership is available for romantic couples registering together. Both members must join at the same time.",
      "No contracts. No sign-up fees. Cancel anytime.",
      "Unlimited access to the entire facility. Train anytime during operating hours. No contracts, no deposits, no sign-up fees, no hidden charges. Cancel anytime with $0 cancellation fee.",
      "Working out as a couple helps you stay consistent, accountable, and motivated. Your membership renews automatically every 6 months.",
      "You can manage or cancel your membership anytime through the secure link provided in your email receipt. Your renewal price is guaranteed for as long as your subscription remains active.",
      "After purchase, please call 416-679-0990 to schedule a quick appointment to pick up your membership cards. Train together. Stay motivated.",
    ],
  },
  couples1year: {
    title: "Couples Membership — 1 Year ($599 Each Person)",
    paragraphs: [
      "Train together, stay motivated, and reach your fitness goals as a couple.",
      "Join with your partner and enjoy 12 months of unlimited gym access for $599 each when purchased together. This membership is available for romantic couples registering together. Both members must join at the same time.",
      "No contracts. No sign-up fees. Cancel anytime.",
      "Unlimited access to the entire facility. Train anytime during operating hours. No contracts, no deposits, no sign-up fees, no hidden charges. Cancel anytime with $0 cancellation fee.",
      "Working out as a couple helps you stay consistent, accountable, and motivated. Your membership renews automatically every 12 months.",
      "You can manage or cancel your membership anytime through the secure link provided in your email receipt. Your renewal price is guaranteed for as long as your subscription remains active.",
      "After purchase, please call 416-679-0990 to schedule a quick appointment to pick up your membership cards. Train together. Stay motivated.",
    ],
  },
  "1year": {
    title: "1 Year Membership",
    paragraphs: [
      "1 year gym membership automatically renewed once every 12 months from date of purchase. Membership includes full access to our facility and all amenities. Online subscription purchase includes cost of membership card. However, if subscription is cancelled, this membership card will no longer be valid.",
      "You may manage your membership through a link received in email receipt. You may cancel your membership at any time without any cancellation fees or other penalties. National Gym promises you $0 cancellation fees, $0 deposits, $0 sign-up fees, $0 extra fees.",
      "For as long as your subscription is active, National Gym guarantees you the same renewal price.",
      "After purchase, please call 416-679-0990 to schedule an appointment to pick up your membership card.",
      "Scan, enter, and workout!",
    ],
  },
  "6month": {
    title: "6 Month Membership",
    paragraphs: [
      "6 months gym membership automatically renewed once every six months from date of purchase. Membership includes full access to our facility and all amenities. Online subscription purchase includes cost of membership card. However, if subscription is cancelled, this membership card will no longer be valid.",
      "You may manage your membership through a link received in email receipt. You may cancel your membership at any time without any cancellation fees or other penalties. National Gym promises you $0 cancellation fees, $0 deposits, $0 sign-up fees, $0 extra fees.",
      "For as long as your subscription is active, National Gym guarantees you the same renewal price.",
      "After purchase, please call 416-679-0990 to schedule an appointment to pick up your membership card.",
      "Scan, enter, and workout!",
    ],
  },
  "3month": {
    title: "3 Month Membership",
    paragraphs: [
      "3 months gym membership automatically renewed once every three months from date of purchase. Membership includes full access to our facility and all amenities. Online subscription purchase includes cost of membership card. However, if membership is cancelled, this membership card will no longer be valid.",
      "You may manage your membership through a link received in email receipt. You may cancel your membership at any time without any cancellation fees or other penalties. National Gym promises you $0 cancellation fee, $0 deposits, $0 sign-up fees, $0 extra fees.",
      "For as long as your subscription is active, National Gym guarantees you the same renewal price.",
      "After purchase, please call 416-679-0990 to schedule an appointment to pick up your membership card.",
      "Scan, enter, and workout!",
    ],
  },
  "1month": {
    title: "1 Month Membership",
    paragraphs: [
      "1 month gym membership automatically renewed once every month from date of purchase. Membership includes full access to our facility and all amenities. Online subscription purchase includes cost of membership card. However, if subscription is cancelled, this membership card will no longer be valid.",
      "You may manage your membership through a link received in email receipt. You may cancel your membership at any time without any cancellation fees or other penalties. National Gym promises you $0 cancellation fee, $0 deposits, $0 sign-up fees, $0 extra fees.",
      "For as long as your subscription is active, National Gym guarantees you the same renewal price.",
      "After purchase, please call 416-679-0990 to schedule an appointment to pick up your membership card.",
      "Scan, enter, and workout!",
    ],
  },
  student: {
    title: "Student Membership — $59/Month",
    paragraphs: [
      "Spring Special — 1-Month Unlimited Student Gym Membership. No contracts. No sign-up fees.",
      "Offer valid only for students age 22 and under who present a physical valid student photo ID card upon pickup of membership card. Without it, a membership card will not be issued.",
      "Start training today with full access to National Gym & Fitness Centre and all equipment and amenities. Serving members from Etobicoke, Rexdale, Malton, and Brampton.",
      "Unlimited access to the entire facility. Train anytime during operating hours. No deposits, no sign-up fees, no hidden charges.",
      "Your membership renews automatically every month. You can manage or cancel anytime through the secure link in your email receipt. Your renewal price is guaranteed for as long as your subscription remains active.",
      "A cancellation fee of $100 applies only if cancelled within the first 90 days.",
      "After purchase, please call 416-679-0990 to schedule a quick appointment to pick up your membership card. Scan. Enter. Train.",
    ],
  },
  quickstart: {
    title: "Quick Start Plan — $33.99 Every Two Weeks",
    paragraphs: [
      "Spring Special — Less than $2.50 per day to train at National Gym. Join Today.",
      "Start training today with the National Gym Quick Start Plan — the easiest and most affordable way to begin your fitness journey. For just $33.99 every two weeks, you receive full unlimited access to National Gym & Fitness Centre.",
      "Your membership includes: unlimited gym access, full use of all cardio equipment, plate-loaded strength machines, selectorized strength equipment, free weights and dumbbells, clean facility with showers and sauna access.",
      "This membership renews automatically every two weeks at $33.99. Your online purchase includes your membership access card (a value of $20).",
      "For as long as your subscription remains active, National Gym guarantees your renewal price will stay the same.",
      "You may cancel any time after the first 90 days with no cancellation fee. A cancellation fee of $100 applies only if cancelled within the first 90 days. There are no sign-up fees, no hidden charges, and no additional costs.",
      "Start today and take the first step toward a stronger, healthier you.",
    ],
  },
};

const aboutParagraphs = [
  "For over 27 years, National Gym & Fitness Centre has proudly served members from Etobicoke, Rexdale, Malton, and Toronto's northwest communities.",
  "We are a trusted local gym that has helped over 10,000 members improve their health, build strength, and feel better in their daily lives.",
  "If you're looking for a gym with a true Toronto atmosphere — welcoming, respectful, and focused on real results — you'll feel right at home here.",
  "Our gym is still here in Rexdale – Etobicoke North today because of our commitment to running an honest business. People continue to train here because they know they deserve something better than the typical crowded franchise gym experience.",
  "At National Gym you'll find plate-loaded machines for powerful strength training, selectorized machines for controlled resistance, and free weights for traditional lifting. This combination allows both beginners and experienced lifters to train the way they prefer.",
  "One of the biggest advantages members notice right away — no long lines. No frustration. Just productive workouts.",
  "National Gym welcomes people of all ages and fitness levels. Beginners feel comfortable, experienced lifters stay challenged, and everyone trains at their own pace.",
  "Regular exercise can help reduce the risk of heart disease, diabetes, obesity, and stress-related health problems. A few hours each week in the gym can make a powerful difference.",
  "Your health is your most valuable asset. After family, nothing is more important than health. Train hard. Feel better. Live stronger.",
];

const hours = [
  ["Monday",    "5:00 a.m. – 10:00 p.m."],
  ["Tuesday",   "5:00 a.m. – 10:00 p.m."],
  ["Wednesday", "5:00 a.m. – 10:00 p.m."],
  ["Thursday",  "5:00 a.m. – 10:00 p.m."],
  ["Friday",    "5:00 a.m. – 10:00 p.m."],
  ["Saturday",  "7:00 a.m. – 7:00 p.m."],
  ["Sunday",    "7:00 a.m. – 7:00 p.m."],
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

const navLinks = [
  ["#amenities", "Amenities"],
  ["#pricing",   "Memberships"],
  ["#gallery",   "Facility"],
] as const;

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-3">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading font-bold text-[clamp(36px,4.5vw,56px)] tracking-[-0.04em] leading-[1.1] text-foreground mb-4">
      {children}
    </h2>
  );
}

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <motion.div
      initial={false}
      animate={open ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/85 overflow-y-auto p-6 sm:p-10"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={false}
        animate={open ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
        className="relative w-full max-w-2xl bg-card border border-border rounded-sm my-4"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-colors text-xl leading-none"
        >
          ×
        </button>
        <div className="p-8 sm:p-12">{children}</div>
      </motion.div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [aboutOpen,   setAboutOpen]   = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activePlan,  setActivePlan]  = useState<string | null>(null);
  const [lightbox,    setLightbox]    = useState<{ src: string; alt: string } | null>(null);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDir,     setSlideDir]     = useState(1);
  const plan = activePlan ? planDetails[activePlan] : null;

  const prevSlide = () => { setSlideDir(-1); setCurrentSlide((i) => (i - 1 + galleryImages.length) % galleryImages.length); };
  const nextSlide = () => { setSlideDir(1);  setCurrentSlide((i) => (i + 1) % galleryImages.length); };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    const initGsap = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".gsap-hero-item",
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.13, ease: "power3.out", delay: 0.15 }
        );
        gsap.fromTo(
          ".gsap-stat",
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: "power2.out",
            scrollTrigger: { trigger: "#stats", start: "top 80%" } }
        );
        gsap.fromTo(
          ".gsap-amenity",
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: "#amenities", start: "top 78%" } }
        );
        gsap.utils.toArray<Element>(".gsap-section-hdr").forEach((el) => {
          gsap.fromTo(el, { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 85%" } });
        });
        gsap.fromTo(
          ".gsap-price",
          { scale: 0.93, opacity: 0, y: 16 },
          { scale: 1, opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "back.out(1.5)",
            scrollTrigger: { trigger: "#pricing", start: "top 72%" } }
        );
        gsap.fromTo(
          ".gsap-dropin",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: "#dropin", start: "top 80%" } }
        );
        gsap.fromTo(
          ".gsap-gallery",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: "#gallery", start: "top 78%" } }
        );
        gsap.fromTo(
          ".gsap-cta",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: "#cta", start: "top 80%" } }
        );
        gsap.fromTo(
          ".gsap-footer",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: "footer", start: "top 90%" } }
        );
      });
    };

    initGsap();
    return () => { ctx?.revert(); };
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  { setSlideDir(-1); setCurrentSlide((i) => (i - 1 + galleryImages.length) % galleryImages.length); }
      if (e.key === "ArrowRight") { setSlideDir(1);  setCurrentSlide((i) => (i + 1) % galleryImages.length); }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSlideDir(1);
      setCurrentSlide((i) => (i + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(id);
  }, [currentSlide]);

  return (
    <>
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-['Bebas_Neue'] text-[22px] tracking-widest text-foreground no-underline">
            National Gym &amp; Fitness Centre
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(([href, label]) => (
              <motion.a
                key={href}
                href={href}
                className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >{label}</motion.a>
            ))}
            <motion.button
              onClick={() => setAboutOpen(true)}
              className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >About Us</motion.button>
            <motion.button
              onClick={() => setContactOpen(true)}
              className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >Contact Us</motion.button>
            <MotionButton href="#pricing" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide">
              Join Now
            </MotionButton>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.svg key="close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <path d="M18 6L6 18M6 6l12 12" />
                </motion.svg>
              ) : (
                <motion.svg key="open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="md:hidden overflow-hidden border-t border-border bg-background"
            >
              <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-5">
                {navLinks.map(([href, label]) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)}
                    className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">{label}</a>
                ))}
                <button onClick={() => { setAboutOpen(true); setMenuOpen(false); }}
                  className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors text-left">About Us</button>
                <button onClick={() => { setContactOpen(true); setMenuOpen(false); }}
                  className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors text-left">Contact Us</button>
                <div className="pt-1">
                  <MotionButton href="#pricing" size="sm" onClick={() => setMenuOpen(false)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide w-full">
                    Join Now
                  </MotionButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center bg-cover bg-center" style={{ backgroundImage: "url('/images/g4.webp')" }}>
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20">
          <p className="gsap-hero-item text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-6">
            Est. 1998 — Etobicoke, ON
          </p>
          <h1 className="gsap-hero-item font-heading font-bold text-[clamp(52px,7.5vw,80px)] leading-[1.04] tracking-[-0.04em] text-foreground mb-8">
            Train Harder.<br />
            Live Better.
          </h1>
          <p className="gsap-hero-item text-base font-light text-muted-foreground max-w-xl leading-[1.8] mb-8">
            Etobicoke &bull; Rexdale &bull; Malton&apos;s Trusted Gym for 27+ Years.<br />
            Serving Toronto&apos;s Northwest Communities.
          </p>
          <div className="gsap-hero-item flex flex-col gap-2.5 mb-10">
            {[
              "Real Equipment · No Crowding · Train Any Time",
              "No Contracts · No Sign-Up Fees · Cancel Anytime",
              "Sauna · Lockers · Showers · Free Parking",
            ].map((line) => (
              <p key={line} className="flex items-center gap-2.5 text-[12px] font-light text-muted-foreground">
                <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                {line}
              </p>
            ))}
          </div>
          <div className="gsap-hero-item">
            <MotionButton href="#pricing" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide">
              View Membership Plans
            </MotionButton>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section id="stats" className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {[
              { value: "27+",     label: "Years in Business",   sub: "Est. 1998, Etobicoke" },
              { value: "10,000+", label: "Members Served",      sub: "And counting" },
              { value: "7 Days",  label: "Open Every Week",     sub: "5 am – 10 pm weekdays" },
            ].map((stat) => (
              <div key={stat.label} className="gsap-stat text-center px-8 py-14">
                <p className="font-heading font-bold text-[clamp(40px,4vw,56px)] tracking-[-0.04em] leading-none text-foreground mb-3">
                  {stat.value}
                </p>
                <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-primary mb-1.5">{stat.label}</p>
                <p className="text-xs font-light text-muted-foreground">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Amenities ── */}
      <section id="amenities" className="py-28 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="gsap-section-hdr mb-1"><SectionLabel>What&apos;s Included</SectionLabel></div>
          <div className="gsap-section-hdr"><SectionTitle>Everything You Need</SectionTitle></div>
          <p className="gsap-section-hdr text-sm font-light text-muted-foreground leading-[1.8] max-w-lg mb-16">
            Every membership includes full access to our premium facilities — no add-ons, no surprises.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-border rounded-sm overflow-hidden [&>*]:border-r [&>*]:border-b [&>*:nth-child(5n)]:border-r-0 [&>*:nth-last-child(-n+5)]:border-b-0">
            {amenities.map((a) => (
              <Card key={a.title} className="gsap-amenity rounded-none border-0 bg-card hover:bg-secondary transition-colors overflow-hidden">
                <div className="relative w-full h-44">
                  <Image src={a.image} alt={a.title} fill className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw" />
                </div>
                <CardContent className="p-7">
                  <div className="w-11 h-11 flex items-center justify-center border border-border rounded-sm mb-5 text-primary">{a.icon}</div>
                  <h3 className="text-sm font-semibold tracking-[-0.01em] text-foreground mb-2">{a.title}</h3>
                  <p className="text-sm font-light text-muted-foreground leading-[1.8]">{a.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Memberships ── */}
      <section id="pricing" className="py-28 border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="gsap-section-hdr mb-1"><SectionLabel>Memberships</SectionLabel></div>
          <div className="gsap-section-hdr"><SectionTitle>Choose Your Plan</SectionTitle></div>
          <p className="gsap-section-hdr text-sm font-light text-muted-foreground leading-[1.8] max-w-lg mb-16">
            All plans include full facility access. No hidden fees.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] border border-border rounded-sm overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-border">

            {/* Couples */}
            <div className="flex flex-col">
              <div className="px-6 py-4 border-b border-border bg-secondary/40">
                <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-muted-foreground">Couples</p>
              </div>
              <div className="flex flex-col divide-y divide-border flex-1">
                {[
                  { key:"couples1year",  name:"Couples — 1 Year",   amount:"CAD$1,198", period:"/pair", note:"Only $599 per person — unlimited access" },
                  { key:"couples6month", name:"Couples — 6 Months", amount:"CAD$798",   period:"/pair", note:"Only $399 per person — unlimited access" },
                ].map((p) => (
                  <Card key={p.key} className="gsap-price rounded-none border-0 bg-background flex-1">
                    <CardContent className="p-6 flex flex-col gap-2.5">
                      <Badge variant="outline" className="w-fit text-[9px] font-semibold border-border text-muted-foreground tracking-[0.2em] uppercase">Spring Special</Badge>
                      <p className="font-heading font-bold text-lg tracking-[-0.03em] leading-tight text-foreground">{p.name}</p>
                      <p className="text-2xl font-light text-foreground">{p.amount}<span className="text-sm text-muted-foreground ml-1">{p.period}</span></p>
                      <p className="text-xs font-light text-muted-foreground leading-[1.8]">{p.note}</p>
                      <motion.button onClick={() => setActivePlan(p.key)} className="text-xs font-normal text-primary text-left cursor-pointer"
                        whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>View Details →</motion.button>
                      <MotionButton variant="outline" size="sm" className="border-border text-white hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors mt-1">Get Started</MotionButton>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Individual */}
            <div className="flex flex-col">
              <div className="px-6 py-4 border-b border-border bg-secondary/40">
                <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-muted-foreground">Individual</p>
              </div>
              <div className="grid grid-cols-2 flex-1 [&>*:nth-child(odd)]:border-r [&>*:nth-child(-n+2)]:border-b border-border">
                {[
                  { key:"1year",  badge:"Best Value", name:"1 Year",   amount:"CAD$699",    note:"$58/month — less than $2/day", featured: true },
                  { key:"6month",                     name:"6 Months", amount:"CAD$439.99", note:"$73/month — full access" },
                  { key:"3month",                     name:"3 Months", amount:"CAD$255.99", note:"$85/month — full access" },
                  { key:"1month",                     name:"1 Month",  amount:"CAD$87.99",  note:"Month-to-month — no commitment" },
                ].map((p) => (
                  <Card key={p.key} className={`gsap-price rounded-none border-0 ${p.featured ? "bg-secondary" : "bg-background"}`}>
                    <CardContent className="p-6 flex flex-col gap-2.5">
                      {p.badge && <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary">{p.badge}</p>}
                      <p className="font-heading font-bold text-lg tracking-[-0.03em] leading-tight text-foreground">{p.name}</p>
                      <p className="text-2xl font-light text-foreground">{p.amount}</p>
                      <p className="text-xs font-light text-muted-foreground leading-[1.8]">{p.note}</p>
                      <motion.button onClick={() => setActivePlan(p.key)} className="text-xs font-normal text-primary text-left cursor-pointer"
                        whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>View Details →</motion.button>
                      {p.featured
                        ? <MotionButton size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 mt-1">Get Started</MotionButton>
                        : <MotionButton variant="outline" size="sm" className="border-border text-white hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors mt-1">Get Started</MotionButton>
                      }
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Special Offers */}
            <div className="flex flex-col">
              <div className="px-6 py-4 border-b border-border bg-secondary/40">
                <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-muted-foreground">Special Offers</p>
              </div>
              <div className="flex flex-col divide-y divide-border flex-1">
                {[
                  { key:"student",    name:"Student",     amount:"CAD$59",    period:"/mo",   note:"Ages 22 & under — valid student ID required" },
                  { key:"quickstart", name:"Quick Start", amount:"CAD$33.99", period:"/2wks", note:"Billed every 2 weeks — easiest way to begin" },
                ].map((p) => (
                  <Card key={p.key} className="gsap-price rounded-none border-0 bg-background flex-1">
                    <CardContent className="p-6 flex flex-col gap-2.5">
                      <Badge variant="outline" className="w-fit text-[9px] font-semibold border-border text-muted-foreground tracking-[0.2em] uppercase">Spring Special</Badge>
                      <p className="font-heading font-bold text-lg tracking-[-0.03em] leading-tight text-foreground">{p.name}</p>
                      <p className="text-2xl font-light text-foreground">{p.amount}<span className="text-sm text-muted-foreground ml-1">{p.period}</span></p>
                      <p className="text-xs font-light text-muted-foreground leading-[1.8]">{p.note}</p>
                      <motion.button onClick={() => setActivePlan(p.key)} className="text-xs font-normal text-primary text-left cursor-pointer"
                        whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>View Details →</motion.button>
                      <MotionButton variant="outline" size="sm" className="border-border text-white hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors mt-1">Get Started</MotionButton>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Drop-In Registration — Redesigned ── */}
      <section id="dropin" className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="gsap-dropin grid grid-cols-1 lg:grid-cols-2 border border-border rounded-sm overflow-hidden bg-card">

            {/* Hours */}
            <div className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-border">
              <SectionLabel>No Appointment Needed</SectionLabel>
              <h2 className="font-heading font-bold text-[clamp(26px,3vw,36px)] tracking-[-0.04em] leading-[1.1] text-foreground mb-10">
                Drop-In Registration Hours
              </h2>
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-primary mb-2.5">Monday – Friday</p>
                  <p className="text-sm font-light text-muted-foreground">11:30 am – 1:30 pm</p>
                  <p className="text-sm font-light text-muted-foreground">4:30 pm – 8:30 pm</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-primary mb-2.5">Saturday &amp; Sunday</p>
                  <p className="text-sm font-light text-muted-foreground">11:30 am – 6:30 pm</p>
                </div>
              </div>
            </div>

            {/* Appointments & Day Pass */}
            <div className="p-10 lg:p-14 flex flex-col gap-10">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-primary mb-3">Appointments Available</p>
                <p className="text-sm font-light text-muted-foreground leading-[1.8]">
                  Outside drop-in hours, call{" "}
                  <a href="tel:4166790990" className="text-foreground hover:text-primary transition-colors">(416) 679-0990</a>{" "}
                  to schedule. Same-day appointments welcome — one hour&apos;s notice is enough.
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-primary mb-3">Day Pass — $25</p>
                <p className="text-sm font-light text-muted-foreground leading-[1.8]">
                  Government-issued photo ID required. Your day pass payment may be applied toward any membership on the date of purchase.
                </p>
                <a href="tel:4166790990" className="inline-block mt-5 text-sm font-normal text-primary hover:opacity-75 transition-opacity">
                  Call to Request →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="py-28 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="gsap-section-hdr mb-1"><SectionLabel>The Facility</SectionLabel></div>
          <div className="gsap-section-hdr"><SectionTitle>See the Space</SectionTitle></div>
          <p className="gsap-section-hdr text-sm font-light text-muted-foreground leading-[1.8] max-w-md">
            90,000+ sq ft of premium equipment — no waiting, no crowding.
          </p>
        </div>

        <div className="gsap-gallery max-w-6xl mx-auto px-6">
          {/* Main slide */}
          <div className="relative aspect-video overflow-hidden rounded-sm bg-card">
            <AnimatePresence custom={slideDir}>
              <motion.div
                key={currentSlide}
                custom={slideDir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 cursor-zoom-in"
                onClick={() => setLightbox(galleryImages[currentSlide])}
              >
                <Image
                  src={galleryImages[currentSlide].src}
                  alt={galleryImages[currentSlide].alt}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1152px"
                  className="object-cover brightness-90"
                />
              </motion.div>
            </AnimatePresence>

            {/* Arrows */}
            <button onClick={prevSlide} aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/10 rounded-sm text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button onClick={nextSlide} aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/10 rounded-sm text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 right-4 z-10 text-xs font-light text-white/70 bg-black/50 px-3 py-1.5 rounded-sm tabular-nums">
              {currentSlide + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-1 mt-1">
            {galleryImages.map((img, i) => (
              <button
                key={img.src}
                onClick={() => { setSlideDir(i > currentSlide ? 1 : -1); setCurrentSlide(i); }}
                aria-label={img.alt}
                className={`relative flex-shrink-0 overflow-hidden rounded-sm transition-opacity aspect-video w-[calc((100%-56px)/15)] ${
                  i === currentSlide ? "ring-1 ring-primary opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <Image src={img.src} alt={img.alt} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", stiffness: 340, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full max-h-[90vh] aspect-[4/3]"
              >
                <Image src={lightbox.src} alt={lightbox.alt} fill sizes="100vw" className="object-contain" />
              </motion.div>
              <button onClick={() => setLightbox(null)}
                className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors" aria-label="Close">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── CTA ── */}
      <section id="cta" className="py-28 border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="gsap-cta text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-4">
            Get Started Today
          </p>
          <h2 className="gsap-cta font-heading font-bold text-[clamp(40px,5.5vw,64px)] tracking-[-0.04em] leading-[1.06] text-foreground mb-6">
            Your next workout<br />starts today.
          </h2>
          <p className="gsap-cta text-sm font-light text-muted-foreground max-w-md mx-auto leading-[1.8] mb-10">
            No contracts. No hidden fees. Join online in minutes, or call us to get started.
          </p>
          <div className="gsap-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <MotionButton href="#pricing" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide">
              View Membership Plans
            </MotionButton>
            <MotionButton variant="outline" size="lg" href="tel:4166790990"
              className="border-border text-foreground hover:bg-secondary transition-colors">
              (416) 679-0990
            </MotionButton>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-background py-20">
        <div className="gsap-footer max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <p className="font-['Bebas_Neue'] text-2xl tracking-widest text-foreground mb-3">National Gym</p>
              <p className="text-sm font-light text-muted-foreground italic leading-[1.8]">Built for the ones who show up.</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-4">Address</p>
              <p className="text-sm font-light text-muted-foreground leading-[1.8]">
                National Gym &amp; Fitness Centre<br />
                220 Humberline Drive Unit 12B<br />
                Etobicoke, Ontario M9W 5Y4
              </p>
              <a href="tel:4166790990" className="text-sm font-normal text-primary hover:opacity-75 transition-opacity mt-1 inline-block">
                (416) 679-0990
              </a>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-4">Hours</p>
              <table className="text-sm w-full">
                <tbody>
                  {hours.map(([day, time]) => (
                    <tr key={day}>
                      <td className="text-foreground font-normal pr-4 py-0.5 w-28">{day}</td>
                      <td className="text-muted-foreground font-light py-0.5 whitespace-nowrap">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-4">Links</p>
              <div className="flex flex-col gap-2">
                {navLinks.map(([href, label]) => (
                  <a key={href} href={href} className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">{label}</a>
                ))}
                <button onClick={() => setContactOpen(true)}
                  className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors text-left">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
          <Separator className="bg-border mb-8" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs font-light text-muted-foreground">&copy; 2026 National Gym &amp; Fitness Centre. All rights reserved.</p>
            <p className="text-xs font-light text-muted-foreground">
              Designed &amp; Managed by{" "}
              <a href="https://omnigriddigital.ca" target="_blank" rel="noopener noreferrer"
                className="text-primary hover:underline underline-offset-2 transition-colors">Omnigrid Digital</a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── About Modal ── */}
      <Modal open={aboutOpen} onClose={() => setAboutOpen(false)}>
        <SectionLabel>About Us</SectionLabel>
        <h2 className="font-heading font-bold text-[clamp(28px,4vw,40px)] tracking-[-0.04em] leading-[1.1] text-foreground mb-2">
          About National Gym &amp; Fitness Centre
        </h2>
        <p className="text-primary italic text-sm font-light leading-[1.8] mb-8">Sweat Now, Shine Later. Health Matters.</p>
        <div className="space-y-4">
          {aboutParagraphs.map((p, i) => <p key={i} className="text-sm font-light text-muted-foreground leading-[1.8]">{p}</p>)}
        </div>
        <Separator className="bg-border my-8" />
        <MotionButton href="#pricing" onClick={() => setAboutOpen(false)} className="bg-primary text-primary-foreground hover:bg-primary/90">
          View Memberships
        </MotionButton>
      </Modal>

      {/* ── Contact Modal ── */}
      <Modal open={contactOpen} onClose={() => setContactOpen(false)}>
        <SectionLabel>Contact Us</SectionLabel>
        <h2 className="font-heading font-bold text-[clamp(28px,4vw,40px)] tracking-[-0.04em] leading-[1.1] text-foreground mb-8">
          Get in Touch
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
          {[
            { id:"c-name",  label:"Name",  type:"text",  ph:"Your name" },
            { id:"c-phone", label:"Phone", type:"tel",   ph:"(416) 000-0000" },
            { id:"c-email", label:"Email", type:"email", ph:"your@email.com" },
          ].map((f) => (
            <div key={f.id} className="flex flex-col gap-2">
              <label htmlFor={f.id} className="text-[10px] font-semibold tracking-[0.35em] uppercase text-muted-foreground">{f.label}</label>
              <input id={f.id} type={f.type} placeholder={f.ph}
                className="bg-secondary border border-border rounded-sm text-sm font-light text-foreground px-4 py-3 outline-none focus:border-primary transition-colors placeholder:text-muted-foreground" />
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <label htmlFor="c-msg" className="text-[10px] font-semibold tracking-[0.35em] uppercase text-muted-foreground">Message</label>
            <textarea id="c-msg" rows={5} placeholder="How can we help?"
              className="bg-secondary border border-border rounded-sm text-sm font-light text-foreground px-4 py-3 outline-none focus:border-primary transition-colors placeholder:text-muted-foreground resize-none" />
          </div>
          <MotionButton type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            Send Message
          </MotionButton>
        </form>
      </Modal>

      {/* ── Plan Details Modal ── */}
      <Modal open={!!activePlan} onClose={() => setActivePlan(null)}>
        {plan && (
          <>
            <SectionLabel>Membership Details</SectionLabel>
            <h2 className="font-heading font-bold text-[clamp(24px,3.5vw,34px)] tracking-[-0.04em] leading-[1.15] text-foreground mb-8">
              {plan.title}
            </h2>
            <div className="space-y-4">
              {plan.paragraphs.map((p, i) => <p key={i} className="text-sm font-light text-muted-foreground leading-[1.8]">{p}</p>)}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
