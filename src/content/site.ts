/**
 * Centralized seed content for the FitZone public site.
 *
 * Everything the gym owner would edit lives here for V1. Structuring it as
 * typed data (rather than inline JSX) means a headless CMS can replace this
 * module later with zero changes to the section components.
 *
 * Replace placeholder copy/photos with client-provided assets before launch.
 */

export type Plan = {
  name: string;
  price: number;
  period: string;
  featured?: boolean;
  badge?: string;
  features: string[];
};

export type Trainer = {
  name: string;
  specialty: string;
  bio: string;
  photo: string;
  /** alt text describing the photo */
  photoAlt: string;
};

export type GalleryItem = {
  caption: string;
  category: string;
  photo: string;
  photoAlt: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export const settings = {
  name: "FitZone",
  tagline: "Get to Work.",
  // E.164-style digits only for tel:/wa.me links. Replace with the real number.
  phoneDisplay: "(415) 555-0123",
  phoneDial: "+14155550123",
  whatsapp: "14155550123",
  email: "hello@fitzonegym.com",
  address: {
    line1: "248 Ironworks Avenue",
    line2: "Downtown District, CA 94016",
  },
  hours: [
    { days: "Mon – Fri", time: "5:00 AM – 11:00 PM" },
    { days: "Saturday", time: "6:00 AM – 9:00 PM" },
    { days: "Sunday", time: "7:00 AM – 7:00 PM" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
  ],
} as const;

export const hero = {
  eyebrow: "Train Hard. Train Smart.",
  headline: "Get to Work.",
  subhead:
    "No gimmicks. No crowds. Just serious equipment, expert coaches, and a floor built to push you further. Start with 4 free sessions.",
  primaryCta: "Join Now",
  secondaryCta: "Take a Tour",
  image:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80",
  imageAlt: "Athlete training with a barbell on the FitZone floor",
} as const;

export const about = {
  title: "Why FitZone",
  lead: "We built the gym we always wanted to train in.",
  body: [
    "FitZone isn't a wellness lounge or a social club. It's a training floor — 12,000 square feet of premium racks, platforms, and machines, run by coaches who actually know how to program.",
    "Whether you're chasing your first pull-up or your next personal record, you get the equipment, the guidance, and the room to work without waiting in line.",
  ],
  stats: [
    { value: "12K", label: "Sq Ft Floor" },
    { value: "24", label: "Expert Coaches" },
    { value: "3.5K", label: "Active Members" },
    { value: "7", label: "Days a Week" },
  ],
  image:
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1100&q=80",
  imageAlt: "Wide view of the FitZone strength floor and equipment",
} as const;

export const plans: Plan[] = [
  {
    name: "Day Pass",
    price: 15,
    period: "per day",
    features: [
      "Full floor access",
      "Locker & towel service",
      "No commitment",
      "Perfect for travelers",
    ],
  },
  {
    name: "Unlimited",
    price: 49,
    period: "per month",
    featured: true,
    badge: "Most Popular",
    features: [
      "24/7 floor access",
      "All group classes included",
      "1 free coaching session / month",
      "Guest passes (2 / month)",
      "Locker & towel service",
    ],
  },
  {
    name: "Performance",
    price: 89,
    period: "per month",
    features: [
      "Everything in Unlimited",
      "Weekly 1-on-1 coaching",
      "Custom training program",
      "Nutrition guidance",
      "Recovery suite access",
    ],
  },
];

export const trainers: Trainer[] = [
  {
    name: "Maria Vega",
    specialty: "Strength & Powerlifting",
    bio: "Former national powerlifter. Specializes in barbell technique and progressive overload.",
    photo: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=80",
    photoAlt: "Coach Maria Vega in the weight room",
  },
  {
    name: "Andre Cole",
    specialty: "Conditioning & HIIT",
    bio: "Turns gassed-out beginners into engines. High-intensity work without the burnout.",
    photo: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80",
    photoAlt: "Coach Andre Cole during a conditioning session",
  },
  {
    name: "Priya Nair",
    specialty: "Mobility & Recovery",
    bio: "Keeps you training pain-free. Movement screening and recovery programming.",
    photo: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
    photoAlt: "Coach Priya Nair demonstrating a mobility drill",
  },
  {
    name: "Sam Okafor",
    specialty: "Olympic Lifting",
    bio: "Snatch and clean-and-jerk specialist. Patient with technical lifts, relentless on standards.",
    photo: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
    photoAlt: "Coach Sam Okafor coaching an overhead lift",
  },
];

export const gallery: GalleryItem[] = [
  {
    caption: "Main strength floor",
    category: "Facility",
    photo: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
    photoAlt: "Rows of squat racks on the FitZone strength floor",
  },
  {
    caption: "Olympic platforms",
    category: "Equipment",
    photo: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=700&q=80",
    photoAlt: "Olympic lifting platforms with bumper plates",
  },
  {
    caption: "Conditioning zone",
    category: "Facility",
    photo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=700&q=80",
    photoAlt: "Open conditioning area with equipment",
  },
  {
    caption: "Free weights",
    category: "Equipment",
    photo: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=700&q=80",
    photoAlt: "Dumbbell rack along the wall",
  },
  {
    caption: "Recovery suite",
    category: "Facility",
    photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80",
    photoAlt: "Member using recovery and mobility tools",
  },
  {
    caption: "Group class studio",
    category: "Facility",
    photo: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=700&q=80",
    photoAlt: "Studio set up for a group class",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Jordan M.",
    role: "Member, 2 years",
    quote:
      "I've been to a dozen gyms. This is the first one that actually feels built for lifting. Never waiting for a rack, and the coaches know their stuff.",
    rating: 5,
  },
  {
    name: "Lena T.",
    role: "Member, 8 months",
    quote:
      "Started as a total beginner. The free coaching session got me set up with a real plan instead of guessing. Down 18 pounds and stronger than ever.",
    rating: 5,
  },
  {
    name: "Chris D.",
    role: "Member, 1 year",
    quote:
      "Clean, serious, no nonsense. The 24/7 access fits my shift work perfectly. Worth every cent of the Unlimited plan.",
    rating: 5,
  },
];

export const faqs: Faq[] = [
  {
    question: "Do I need to sign a long-term contract?",
    answer:
      "No. Our memberships are month-to-month — stay because you want to, not because you're locked in. Cancel anytime with 30 days' notice.",
  },
  {
    question: "What are the free trial sessions?",
    answer:
      "New members get 4 free sessions to use the full floor and try group classes before committing. Just submit an inquiry and we'll set it up.",
  },
  {
    question: "Is the gym really open 24/7?",
    answer:
      "Unlimited and Performance members get secure 24/7 floor access. Staffed hours and group classes run throughout the day — just ask the front desk for the current schedule.",
  },
  {
    question: "Do you offer personal training?",
    answer:
      "Yes. Performance members get weekly 1-on-1 coaching, and any member can book individual sessions with our coaches.",
  },
  {
    question: "Is there parking?",
    answer:
      "Free member parking is available in the lot behind the building, with additional street parking on Ironworks Avenue.",
  },
  {
    question: "Can I freeze my membership?",
    answer:
      "Absolutely. You can freeze your membership for up to 3 months per year for travel, injury, or any reason — no fees.",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Trainers", href: "#trainers" },
  { label: "Gallery", href: "#gallery" },
  { label: "Plans", href: "#plans" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;
