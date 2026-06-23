"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MotionButton } from "@/components/motion-button";

// ── Data ──────────────────────────────────────────────────────────────────────

const amenities = [
  {
    title: "Free Weights",
    desc: "Dumbbells 5–150 lbs, barbells, and 6 Olympic lifting platforms with bumper plates.",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4M6 12h12" /></svg>),
  },
  {
    title: "Cardio Floor",
    desc: "60+ machines including treadmills, rowers, bikes, and stair climbers with personal screens.",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
  },
  {
    title: "Sauna & Steam",
    desc: "Dedicated dry sauna and steam room for recovery. Available 7 days a week.",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12h20M12 2a10 10 0 0 1 10 10M12 2a10 10 0 0 0-10 10" /><path d="M12 22a10 10 0 0 0 10-10M12 22a10 10 0 0 1-10-10" /></svg>),
  },
  {
    title: "Locker Rooms",
    desc: "Spacious change rooms with private showers, complimentary towel service, and secure lockers.",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" /></svg>),
  },
  {
    title: "Free Parking",
    desc: "150-spot private lot with direct access to the facility. No validation required.",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h6l2 5v3h-8V8zM5 19a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM17 19a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" /></svg>),
  },
];

const galleryImages = [
  { src: "/images/g1.webp", alt: "Main gym floor", large: true },
  { src: "/images/g2.webp", alt: "Cable machines" },
  { src: "/images/g3.webp", alt: "Free weight area" },
  { src: "/images/g4.webp", alt: "Bench press stations" },
  { src: "/images/g5.webp", alt: "Cardio and weight floor" },
  { src: "/images/g6.webp", alt: "Treadmill row", large: true },
  { src: "/images/g7.webp", alt: "Full gym floor view" },
  { src: "/images/g8.webp", alt: "Leg press" },
  { src: "/images/g9.webp", alt: "Machine section" },
  { src: "/images/g10.webp", alt: "Squat racks" },
  { src: "/images/g11.webp", alt: "Cardio equipment", large: true },
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

// ── Helpers ───────────────────────────────────────────────────────────────────

// Uppercase eyebrow label — wide tracking for premium feel
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-3">
      {children}
    </p>
  );
}

// Section heading — Space Grotesk bold, tight tracking + tight line-height
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
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const plan = activePlan ? planDetails[activePlan] : null;

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
          ".gsap-gallery",
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "power2.out",
            scrollTrigger: { trigger: "#gallery", start: "top 78%" } }
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

  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-[#0b0b0b]/88 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand keeps Bebas Neue as a logo typeface */}
          <a href="#" className="font-['Bebas_Neue'] text-[22px] tracking-widest text-foreground no-underline">
            National Gym &amp; Fitness Centre
          </a>
          <div className="hidden md:flex items-center gap-7">
            {[["#amenities","Amenities"],["#pricing","Memberships"],["#gallery","Facility"]].map(([href,label]) => (
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
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-cover bg-center" style={{ backgroundImage: "url('/images/g4.webp')" }}>
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20">
          <p className="gsap-hero-item text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-6">
            Est. 1998 — Etobicoke, ON
          </p>
          {/* Hero title: Space Grotesk 700, 80px, tight tracking, dramatic two-line break */}
          <h1 className="gsap-hero-item font-heading font-bold text-[clamp(52px,7.5vw,80px)] leading-[1.04] tracking-[-0.04em] text-foreground mb-8">
            Train Harder.<br />
            Live Better.
          </h1>
          <p className="gsap-hero-item text-base font-light text-muted-foreground max-w-xl leading-[1.8] mb-8">
            Etobicoke &bull; Rexdale &bull; Malton&apos;s Trusted Gym for 27+ Years<br />
            Serving Toronto&apos;s Northwest Communities.
          </p>
          <div className="gsap-hero-item grid grid-cols-2 gap-x-10 gap-y-2 max-w-lg mb-10">
            {[
              ["Real Gym • Real Equipment",          "No Contracts • No Sign-Up Fees"],
              ["No Class Schedules • Train Any Time", "Cancel Any Time • No Headaches"],
              ["Real Sauna • Lockers • Showers",      "Join Online in Minutes"],
              ["Unlimited Gym Memberships Online",    "Start Training Today"],
            ].map(([l,r],i) => (
              <div key={i} className="contents">
                <p className="text-[12px] font-light text-muted-foreground pl-3.5 relative before:absolute before:left-0 before:top-[8px] before:w-1 before:h-1 before:rounded-full before:bg-primary">{l}</p>
                <p className="text-[12px] font-light text-muted-foreground pl-3.5 relative before:absolute before:left-0 before:top-[8px] before:w-1 before:h-1 before:rounded-full before:bg-primary">{r}</p>
              </div>
            ))}
          </div>
          <div className="gsap-hero-item">
            <MotionButton href="#pricing" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide">
              View Membership Plans
            </MotionButton>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="py-28 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="gsap-section-hdr mb-1"><SectionLabel>What&apos;s Included</SectionLabel></div>
          <div className="gsap-section-hdr"><SectionTitle>Everything You Need</SectionTitle></div>
          <p className="gsap-section-hdr text-sm font-light text-muted-foreground leading-[1.8] max-w-lg mb-16">
            Every membership includes full access to our premium facilities — no add-ons, no surprises.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-border rounded-sm overflow-hidden [&>*]:border-r [&>*]:border-b [&>*:nth-child(5n)]:border-r-0 [&>*:nth-last-child(-n+5)]:border-b-0 border-border">
            {amenities.map((a) => (
              <Card key={a.title} className="gsap-amenity rounded-none border-0 bg-card hover:bg-secondary transition-colors">
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

      {/* Memberships */}
      <section id="pricing" className="py-28 border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="gsap-section-hdr mb-1"><SectionLabel>Memberships</SectionLabel></div>
          <div className="gsap-section-hdr"><SectionTitle>Choose Your Plan</SectionTitle></div>
          <p className="gsap-section-hdr text-sm font-light text-muted-foreground leading-[1.8] max-w-lg mb-16">
            All plans include full facility access. No hidden fees.
          </p>

          {/* Unified 3-column layout: Couples | Individual | Special Offers */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] border border-border rounded-sm overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-border">

            {/* ── Couples ── */}
            <div className="flex flex-col">
              <div className="px-6 py-4 border-b border-border bg-secondary/40">
                <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-muted-foreground">Couples</p>
              </div>
              <div className="flex flex-col divide-y divide-border flex-1">
                {[
                  { key:"couples1year",  name:"Couples — 1 Year",  amount:"CAD$1,198", period:"/pair", note:"Only $599 per person — unlimited access" },
                  { key:"couples6month", name:"Couples — 6 Months", amount:"CAD$798",   period:"/pair", note:"Only $399 per person — unlimited access" },
                ].map((p) => (
                  <Card key={p.key} className="gsap-price rounded-none border-0 bg-background flex-1">
                    <CardContent className="p-6 flex flex-col gap-2.5">
                      <Badge variant="outline" className="w-fit text-[9px] font-semibold border-border text-muted-foreground tracking-[0.2em] uppercase">Spring Special</Badge>
                      <p className="font-heading font-bold text-lg tracking-[-0.03em] leading-tight text-foreground">{p.name}</p>
                      <p className="text-2xl font-light text-foreground">{p.amount}<span className="text-sm text-muted-foreground ml-1">{p.period}</span></p>
                      <p className="text-xs font-light text-muted-foreground leading-[1.8]">{p.note}</p>
                      <motion.button onClick={() => setActivePlan(p.key)} className="text-xs font-normal text-primary text-left" whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>View Details →</motion.button>
                      <MotionButton variant="outline" size="sm" className="border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors mt-1">Get Started</MotionButton>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* ── Individual (2×2 inner grid) ── */}
            <div className="flex flex-col">
              <div className="px-6 py-4 border-b border-border bg-secondary/40">
                <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-muted-foreground">Individual</p>
              </div>
              <div className="grid grid-cols-2 flex-1 [&>*:nth-child(odd)]:border-r [&>*:nth-child(-n+2)]:border-b border-border">
                {[
                  { key:"1year",  badge:"Best Value", name:"1 Year",   amount:"CAD$699",    note:"$58/month — less than $2/day",  featured:true },
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
                      <motion.button onClick={() => setActivePlan(p.key)} className="text-xs font-normal text-primary text-left" whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>View Details →</motion.button>
                      {p.featured
                        ? <MotionButton size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 mt-1">Get Started</MotionButton>
                        : <MotionButton variant="outline" size="sm" className="border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors mt-1">Get Started</MotionButton>
                      }
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* ── Special Offers ── */}
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
                      <motion.button onClick={() => setActivePlan(p.key)} className="text-xs font-normal text-primary text-left" whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>View Details →</motion.button>
                      <MotionButton variant="outline" size="sm" className="border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors mt-1">Get Started</MotionButton>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-28 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="gsap-section-hdr mb-1"><SectionLabel>The Facility</SectionLabel></div>
          <div className="gsap-section-hdr"><SectionTitle>See the Space</SectionTitle></div>
          <p className="gsap-section-hdr text-sm font-light text-muted-foreground leading-[1.8] max-w-md">
            90,000+ sq ft of premium equipment — no waiting, no crowding.
          </p>
        </div>

        <div className="px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-4 auto-rows-[240px] gap-1">
            {galleryImages.map((img) => (
              <div
                key={img.src}
                className={`gsap-gallery relative overflow-hidden rounded-sm bg-card group ${img.large ? "col-span-2 row-span-2" : ""}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover brightness-[0.85] group-hover:scale-[1.04] transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-20">
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
              <a href="tel:4166790990" className="text-sm font-normal text-primary hover:opacity-75 transition-opacity">(416) 679-0990</a>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-4">Hours</p>
              <table className="text-sm w-full">
                <tbody>
                  {hours.map(([day,time]) => (
                    <tr key={day}>
                      <td className="text-foreground font-normal pr-4 py-0.5 w-28">{day}</td>
                      <td className="text-muted-foreground font-light py-0.5">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-4">Links</p>
              <div className="flex flex-col gap-2">
                {[["#amenities","Amenities"],["#pricing","Memberships"],["#gallery","Facility"]].map(([href,label]) => (
                  <a key={href} href={href} className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">{label}</a>
                ))}
                <button onClick={() => setContactOpen(true)} className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors text-left">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
          <Separator className="bg-border mb-8" />
          <p className="text-xs font-light text-muted-foreground">&copy; 2026 National Gym &amp; Fitness Centre. All rights reserved.</p>
        </div>
      </footer>

      {/* About Modal */}
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

      {/* Contact Modal */}
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
              <input
                id={f.id} type={f.type} placeholder={f.ph}
                className="bg-secondary border border-border rounded-sm text-sm font-light text-foreground px-4 py-3 outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
              />
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <label htmlFor="c-msg" className="text-[10px] font-semibold tracking-[0.35em] uppercase text-muted-foreground">Message</label>
            <textarea
              id="c-msg" rows={5} placeholder="How can we help?"
              className="bg-secondary border border-border rounded-sm text-sm font-light text-foreground px-4 py-3 outline-none focus:border-primary transition-colors placeholder:text-muted-foreground resize-none"
            />
          </div>
          <MotionButton type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            Send Message
          </MotionButton>
        </form>
      </Modal>

      {/* Plan Details Modal */}
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
