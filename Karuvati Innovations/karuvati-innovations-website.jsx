import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Code2, Smartphone, ShoppingCart, LayoutDashboard, CalendarCheck, Boxes,
  Users, Receipt, RefreshCw, Wrench, Globe, Server, ShieldCheck, BarChart3,
  Search, Sparkles, CheckCircle2, Star, MessageCircle, Phone, Mail, MapPin,
  Sun, Moon, Menu, X, ChevronDown, ChevronUp, ArrowRight, ArrowUp, Send,
  Clock, Award, Building2, Stethoscope, Dumbbell, GraduationCap,
  UtensilsCrossed, Home, Briefcase, Palette, Zap, ThumbsUp, MessageSquare,
  Bot, ExternalLink, Github, Linkedin, Instagram, Facebook, Twitter,
  Download, FileText, Calculator, ChevronRight, Quote, Cookie, Layers,
  Database, Rocket, Heart, GitBranch, Cloud, Lock, Gauge, Filter, TrendingUp,
  BadgeCheck, Info, Loader2, PlayCircle
} from "lucide-react";

/* ============================= DATA ============================= */

const NAV_LINKS = [
  { id: "home", label: "Home", label_hi: "होम" },
  { id: "services", label: "Services", label_hi: "सेवाएं" },
  { id: "portfolio", label: "Portfolio", label_hi: "पोर्टफोलियो" },
  { id: "pricing", label: "Pricing", label_hi: "मूल्य" },
  { id: "about", label: "About", label_hi: "हमारे बारे में" },
  { id: "faq", label: "FAQ", label_hi: "सवाल-जवाब" },
  { id: "contact", label: "Contact", label_hi: "संपर्क" },
];

const HERO_STATS = [
  { value: "100%", label: "Responsive" },
  { value: "72hr", label: "Fast Delivery" },
  { value: "₹2,999", label: "Starts From" },
  { value: "5★", label: "Premium Quality" },
];

const WEBSITE_TYPES = [
  { icon: Briefcase, label: "Business" },
  { icon: Palette, label: "Portfolio" },
  { icon: Users, label: "Personal" },
  { icon: Building2, label: "Company" },
  { icon: UtensilsCrossed, label: "Restaurant" },
  { icon: Dumbbell, label: "Gym" },
  { icon: Stethoscope, label: "Hospital" },
  { icon: GraduationCap, label: "School" },
  { icon: Home, label: "Real Estate" },
  { icon: Heart, label: "NGO" },
  { icon: Zap, label: "Landing Page" },
  { icon: ShoppingCart, label: "E-Commerce" },
];

const WEB_APP_SERVICES = [
  {
    icon: Globe,
    title: "Business Website",
    desc: "A polished, credible online home for your business that turns visitors into enquiries.",
    features: ["Custom design", "Mobile responsive", "Contact forms", "Basic SEO"],
    price: "4,999",
  },
  {
    icon: Code2,
    title: "Web Application",
    desc: "Custom web apps built around how your business actually operates, not a generic template.",
    features: ["Custom logic", "User accounts", "Database backed", "Scalable"],
    price: "14,999",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    desc: "A clean control panel to manage your data, orders, and content without touching code.",
    features: ["Role-based access", "Data visualizations", "Real-time updates", "Export reports"],
    price: "9,999",
  },
  {
    icon: CalendarCheck,
    title: "Booking System",
    desc: "Let customers book appointments, tables, or classes online, day or night.",
    features: ["Live availability", "Auto reminders", "Payment ready", "Calendar sync"],
    price: "7,999",
  },
  {
    icon: Boxes,
    title: "Inventory System",
    desc: "Track stock levels, purchases, and sales in one place instead of three spreadsheets.",
    features: ["Stock alerts", "Barcode ready", "Multi-location", "Reports"],
    price: "12,999",
  },
  {
    icon: Users,
    title: "CRM",
    desc: "Keep every lead, client, and follow-up organized so nothing slips through the cracks.",
    features: ["Contact pipeline", "Task reminders", "Notes & history", "Team access"],
    price: "13,999",
  },
  {
    icon: Receipt,
    title: "Billing Software",
    desc: "Generate invoices, track payments, and stay GST-ready without the spreadsheet chaos.",
    features: ["GST invoices", "Payment tracking", "Auto numbering", "PDF export"],
    price: "9,999",
  },
  {
    icon: Smartphone,
    title: "Android APK",
    desc: "Bring your website into your customer's pocket with a lightweight Android app.",
    features: ["Native feel", "Push ready", "Play Store ready", "Offline splash"],
    price: "2,999",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Website",
    desc: "A full online store built to convert browsers into buyers, from catalog to checkout.",
    features: ["Product catalog", "Cart & checkout", "Payment gateway", "Order tracking"],
    price: "19,999",
  },
];

const ADDITIONAL_SERVICES = [
  { icon: RefreshCw, title: "Website Redesign", price: "3,999" },
  { icon: Wrench, title: "Website Maintenance", price: "999/mo" },
  { icon: Globe, title: "Domain Setup", price: "Free w/ project" },
  { icon: Server, title: "Hosting Setup", price: "1,499" },
  { icon: Search, title: "SEO Optimization", price: "2,999" },
  { icon: Gauge, title: "Speed Optimization", price: "1,999" },
  { icon: Lock, title: "SSL Installation", price: "499" },
  { icon: BarChart3, title: "Google Analytics Setup", price: "999" },
  { icon: TrendingUp, title: "Search Console Setup", price: "999" },
];

const PRICING_PLANS = [
  { name: "Landing Page", price: "2,999", desc: "One high-impact page to launch fast.", features: ["1 page", "Mobile responsive", "Contact form", "3 day delivery"], highlighted: false },
  { name: "Personal Website", price: "3,999", desc: "For creators, consultants & personal brands.", features: ["Up to 3 pages", "Basic SEO", "WhatsApp chat", "5 day delivery"], highlighted: false },
  { name: "Website Redesign", price: "3,999", desc: "Modernize an existing site without starting over.", features: ["Fresh UI/UX", "Speed upgrade", "Mobile-first", "Content migration"], highlighted: false },
  { name: "Basic Business Website", price: "4,999", desc: "A credible online presence for small businesses.", features: ["Up to 5 pages", "Basic SEO", "Google Maps", "7 day delivery"], highlighted: false },
  { name: "Portfolio Website", price: "5,999", desc: "Showcase your work with a design-led portfolio.", features: ["Up to 6 pages", "Gallery layout", "Animations", "7 day delivery"], highlighted: false },
  { name: "Professional Website", price: "9,999", desc: "Our most popular plan for growing businesses.", features: ["Up to 10 pages", "Advanced SEO", "Blog section", "Priority support"], highlighted: true },
  { name: "SEO Optimization", price: "2,999", desc: "Get found on Google with technical & on-page SEO.", features: ["Keyword research", "On-page fixes", "Sitemap & schema", "Monthly report"], highlighted: false },
  { name: "Web Application", price: "14,999", desc: "Custom-built software for your workflow.", features: ["Custom features", "Database", "User logins", "Admin panel"], highlighted: false },
  { name: "E-Commerce Website", price: "19,999", desc: "A complete store, ready to take orders.", features: ["Unlimited products", "Payment gateway", "Order management", "Inventory sync"], highlighted: false },
  { name: "Android APK", price: "2,999", desc: "Turn your website into an Android app.", features: ["Native wrapper", "App icon & splash", "Push-ready", "Play Store guide"], highlighted: false },
];

const FREE_FEATURES = [
  { icon: Smartphone, label: "Mobile Responsive" },
  { icon: Search, label: "Basic SEO" },
  { icon: MessageCircle, label: "Contact Form" },
  { icon: MessageSquare, label: "WhatsApp Integration" },
  { icon: MapPin, label: "Google Maps" },
  { icon: ShieldCheck, label: "SSL Support" },
  { icon: Zap, label: "Fast Loading" },
  { icon: Instagram, label: "Social Media Integration" },
  { icon: Clock, label: "7 Days Free Support" },
  { icon: Globe, label: "Free Domain Setup" },
];

const WHY_CHOOSE_US = [
  { icon: Sparkles, title: "Modern Design", desc: "Interfaces that feel current, not recycled." },
  { icon: Rocket, title: "Fast Delivery", desc: "Most projects ship in days, not months." },
  { icon: Code2, title: "Clean Code", desc: "Readable, maintainable, built to last." },
  { icon: BadgeCheck, title: "Affordable Pricing", desc: "Premium quality without the agency markup." },
  { icon: Users, title: "Lifetime Guidance", desc: "We stay reachable long after handover." },
  { icon: ShieldCheck, title: "No Hidden Charges", desc: "The quote you get is the price you pay." },
  { icon: Clock, title: "On-Time Delivery", desc: "Deadlines we commit to, we meet." },
  { icon: ThumbsUp, title: "Premium Support", desc: "Real answers from real developers." },
  { icon: Award, title: "Experienced Developer", desc: "Years of shipping production software." },
  { icon: Lock, title: "Secure Coding", desc: "Built with security best practices in mind." },
  { icon: Layers, title: "Latest Technologies", desc: "React, modern tooling, no outdated stacks." },
  { icon: Search, title: "SEO Friendly", desc: "Structured to be found on Google." },
  { icon: Gauge, title: "High Performance", desc: "Lighthouse scores that actually hold up." },
  { icon: Smartphone, title: "Responsive Design", desc: "Looks right on every screen size." },
  { icon: MessageSquare, title: "Professional Communication", desc: "Clear updates, no chasing us for status." },
];

const PROCESS_STEPS = [
  { title: "Requirement Discussion", desc: "We start by understanding your business, goals and audience." },
  { title: "Research", desc: "Competitor and industry research to shape the right approach." },
  { title: "Planning", desc: "Sitemap, features and timeline are locked before any design begins." },
  { title: "UI/UX Design", desc: "Wireframes and visual design tailored to your brand." },
  { title: "Development", desc: "Clean, scalable code built with modern tools." },
  { title: "Testing", desc: "Cross-device, cross-browser QA before anything ships." },
  { title: "Deployment", desc: "Your site goes live on a fast, secure hosting setup." },
  { title: "Support", desc: "Free post-launch support, then ongoing help whenever you need it." },
];

const TECH_STACK = [
  "React", "Vite", "Tailwind CSS", "Firebase", "Node.js", "JavaScript",
  "HTML5", "CSS3", "GitHub", "Vercel",
];

const PORTFOLIO_ITEMS = [
  { title: "GreenLeaf Organics", category: "E-Commerce", tech: ["React", "Firebase"], color: "from-emerald-500 to-teal-600", icon: ShoppingCart, desc: "Full online store for an organic grocery brand." },
  { title: "Dr. Mehta Clinic", category: "Business", tech: ["React", "Tailwind"], color: "from-blue-500 to-cyan-500", icon: Stethoscope, desc: "Appointment-ready website for a family clinic." },
  { title: "Spice Route Kitchen", category: "Business", tech: ["React", "EmailJS"], color: "from-orange-500 to-red-500", icon: UtensilsCrossed, desc: "Menu-forward site for a multi-cuisine restaurant." },
  { title: "PowerHouse Gym", category: "Landing Page", tech: ["Vite", "Framer Motion"], color: "from-violet-500 to-purple-600", icon: Dumbbell, desc: "High-energy landing page driving trial sign-ups." },
  { title: "Skyline Realty", category: "Business", tech: ["React", "Google Maps"], color: "from-slate-600 to-slate-800", icon: Home, desc: "Property listings with map-based browsing." },
  { title: "Studio Aanya", category: "Portfolio", tech: ["React", "Framer Motion"], color: "from-pink-500 to-rose-500", icon: Palette, desc: "Portfolio for an independent interior designer." },
  { title: "Bright Minds School", category: "Business", tech: ["React", "Firebase"], color: "from-amber-500 to-yellow-500", icon: GraduationCap, desc: "Admissions-focused website for a K-12 school." },
  { title: "Orders Admin Panel", category: "Dashboard", tech: ["React", "Chart.js"], color: "from-cyan-500 to-blue-600", icon: LayoutDashboard, desc: "Internal dashboard for order & inventory tracking." },
];

const TESTIMONIALS = [
  { name: "Rohan Kulkarni", company: "GreenLeaf Organics", rating: 5, text: "Karuvati delivered our store two days early and it still runs faster than our old site ever did. Communication was clear at every step." },
  { name: "Dr. Ananya Mehta", company: "Mehta Family Clinic", rating: 5, text: "Patients now book online instead of calling. The team understood exactly what a clinic website needed without much back and forth." },
  { name: "Farhan Sheikh", company: "Spice Route Kitchen", rating: 5, text: "Our menu site looks better than restaurants twice our size. Worth every rupee and the WhatsApp button alone brings us daily orders." },
  { name: "Priya Nair", company: "PowerHouse Gym", rating: 5, text: "The landing page they built converted more trial sign-ups in a month than our old Instagram bio link did all year." },
  { name: "Vikram Desai", company: "Skyline Realty", rating: 4, text: "Solid, fast, and the map integration works exactly as we wanted. A couple of revisions but they handled every one quickly." },
  { name: "Aanya Kapoor", company: "Studio Aanya", rating: 5, text: "Finally a portfolio that feels as considered as my actual design work. Clients comment on the site itself now." },
];

const FAQS = [
  { q: "How long does it take to build a website?", a: "Most business websites are delivered within 5-7 days. Landing pages can be ready in 2-3 days, while larger web applications typically take 3-4 weeks depending on complexity." },
  { q: "Do I need to pay the full amount upfront?", a: "No. We usually work on a 50% advance to begin the project, with the remaining 50% due on delivery, before final handover of source files." },
  { q: "Will my website work on mobile phones?", a: "Yes, every website we build is fully responsive by default and tested across phones, tablets, and desktops before delivery." },
  { q: "Do you provide hosting and domain?", a: "We can set up hosting and domain on your behalf, or guide you through purchasing and connecting your own. Domain setup guidance is free with every project." },
  { q: "Can you redesign my existing website?", a: "Yes, website redesign is one of our core services. We can modernize your current site's design and performance while keeping your existing content and SEO intact." },
  { q: "Do you offer support after the website is delivered?", a: "Every project includes 7 days of free post-launch support. Extended maintenance plans are available if you'd like ongoing help." },
  { q: "What is included in the SEO optimization?", a: "Basic on-page SEO, meta tags, sitemap and robots.txt are included free with every website. Advanced SEO with keyword research and monthly reporting is available as an add-on." },
  { q: "Can you build an online store for my business?", a: "Yes, we build complete e-commerce websites with product catalogs, cart, checkout and payment gateway integration." },
  { q: "Do you build custom web applications, not just websites?", a: "Yes. Beyond websites, we build custom web apps, admin dashboards, booking systems, CRMs and billing software tailored to how your business works." },
  { q: "What technologies do you use?", a: "We primarily build with React, Vite and Tailwind CSS on the frontend, with Firebase or Node.js on the backend, giving you a modern, fast and maintainable codebase." },
  { q: "Is the final price always what's listed?", a: "Listed prices are starting prices. Your final quote depends on the number of pages, features and complexity, and we always confirm it with you before starting work." },
  { q: "Do you sign an agreement or provide invoices?", a: "Yes, every project comes with a clear scope of work and a proper invoice, so there is complete transparency on what's being delivered and paid for." },
];

const BLOG_POSTS = [
  { title: "Why Your Small Business Needs a Website in 2026", category: "Strategy", date: "Jun 2026", excerpt: "A slow, outdated site quietly costs you customers every single day. Here's what actually moves the needle." },
  { title: "5 Signs It's Time to Redesign Your Website", category: "Design", date: "May 2026", excerpt: "If your bounce rate is climbing, these are the warning signs worth paying attention to." },
  { title: "React vs WordPress: What Should You Actually Pick?", category: "Tech", date: "Apr 2026", excerpt: "Two very different tools for two very different needs. Here's how we help clients decide." },
];

const STATS_COUNTERS = [
  { label: "Projects Completed", value: 120, suffix: "+" },
  { label: "Happy Clients", value: 95, suffix: "+" },
  { label: "Years of Experience", value: 4, suffix: "+" },
  { label: "Support Hours", value: 24, suffix: "/7" },
];

const CALC_TYPE_PRICE = { Business: 4999, Portfolio: 5999, "E-Commerce": 19999, "Web App": 14999, "Landing Page": 2999 };

const CHAT_SYSTEM_PROMPT = `You are the friendly AI assistant embedded on the Karuvati Innovations website, a website & app development company. Keep replies short (2-4 sentences), warm, and specific. Reply in whichever language/style the visitor writes in (English or Hindi/Hinglish).

COMPANY FACTS (use these, don't invent other numbers or promises):
- Services: business websites, portfolio sites, personal sites, restaurant/gym/hospital/school/real estate/NGO websites, landing pages, e-commerce stores, web applications, admin dashboards, booking systems, inventory systems, CRM, billing software, Android APK wrapping, website redesign, maintenance, domain/hosting setup, SEO, speed optimization, SSL, Google Analytics/Search Console setup.
- Starting prices: Landing Page ₹2,999, Personal Website ₹3,999, Website Redesign ₹3,999, Basic Business Website ₹4,999, Portfolio Website ₹5,999, Professional Website ₹9,999 (most popular), SEO Optimization ₹2,999, Web Application ₹14,999, E-Commerce Website ₹19,999, Android APK ₹2,999. These are starting prices — final cost depends on requirements.
- Typical delivery: landing pages 2-3 days, business websites 5-7 days, web applications 3-4 weeks.
- Free with every website: mobile responsive design, basic SEO, contact form, WhatsApp integration, Google Maps, SSL support, fast loading, social media integration, 7 days free post-launch support, free domain setup guidance.
- Payment: 50% advance to start, 50% on delivery. EMI available on projects above ₹15,000.
- Contact: phone +91 99309 64404, email kvs.sujit@gmail.com, website www.sujitwebsolutions.in, WhatsApp available on the same number.
- Tech stack: React, Vite, Tailwind CSS, Firebase, Node.js.

If asked something unrelated to websites/apps/this business, politely steer back to how you can help with their project. Never invent discounts, dates, or guarantees not listed above. If unsure, suggest they tap "Get Free Quote" or message on WhatsApp.`;

/* ============================= HELPERS ============================= */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function CountUp({ target, suffix = "", duration = 1600 }) {
  const [ref, visible] = useReveal();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function SectionLabel({ children, dark = false }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide uppercase ${
        dark
          ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
          : "border-blue-200 bg-blue-50 text-blue-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </div>
  );
}

function StarRow({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          className={i < count ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700"}
        />
      ))}
    </div>
  );
}

/* ============================= APP ============================= */

export default function App() {
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);
  const [exitShown, setExitShown] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [lang, setLang] = useState("en");
  const [filter, setFilter] = useState("All");
  const [openFaq, setOpenFaq] = useState(0);
  const [tIndex, setTIndex] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [chatLog, setChatLog] = useState([
    { from: "bot", text: "Hi! I'm the Karuvati assistant. Ask me about pricing, timelines, or services." },
  ]);
  const [portalOpen, setPortalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [contactErrors, setContactErrors] = useState({});
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [callbackForm, setCallbackForm] = useState({ name: "", phone: "", time: "" });
  const [calc, setCalc] = useState({
    type: "Business",
    pages: 5,
    admin: false,
    payment: false,
    blog: false,
    login: false,
    hosting: false,
    domain: false,
    seo: false,
  });

  const T = lang === "en"
    ? { getQuote: "Get Free Quote", viewPortfolio: "View Portfolio", quickQuote: "Get Quote" }
    : { getQuote: "मुफ़्त कोटेशन पाएं", viewPortfolio: "पोर्टफोलियो देखें", quickQuote: "कोटेशन पाएं" };

  /* Loading screen */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

  /* Cookie consent */
  useEffect(() => {
    const t = setTimeout(() => setCookieVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  /* Scroll progress + back to top + scrollspy */
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      setScrollPct(isFinite(scrolled) ? scrolled : 0);
      setShowTop(h.scrollTop > 500);

      const sections = NAV_LINKS.map((n) => document.getElementById(n.id)).filter(Boolean);
      let current = "home";
      for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120) current = sec.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Exit intent */
  useEffect(() => {
    const onLeave = (e) => {
      if (e.clientY < 10 && !exitShown) {
        setShowExit(true);
        setExitShown(true);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, [exitShown]);

  /* Auto-scroll chat to latest message */
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatLog, chatLoading, chatOpen]);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const submitContact = (e) => {
    e.preventDefault();
    const errs = {};
    if (!contactForm.name.trim()) errs.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(contactForm.email)) errs.email = "Enter a valid email";
    if (!contactForm.message.trim()) errs.message = "Tell us a little about your project";
    setContactErrors(errs);
    if (Object.keys(errs).length === 0) {
      showToast("Message sent! We'll get back to you within a few hours.");
      setContactForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  const submitNewsletter = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      showToast("Please enter a valid email address.");
      return;
    }
    showToast("Subscribed! Watch your inbox for web tips.");
    setNewsletterEmail("");
  };

  const submitCallback = (e) => {
    e.preventDefault();
    if (!callbackForm.name.trim() || !callbackForm.phone.trim()) {
      showToast("Please add your name and phone number.");
      return;
    }
    showToast("Callback requested! We'll ring you shortly.");
    setCallbackForm({ name: "", phone: "", time: "" });
  };

  const calcPrice = (() => {
    let p = CALC_TYPE_PRICE[calc.type] || 4999;
    const extraPages = Math.max(0, calc.pages - 5);
    p += extraPages * 300;
    if (calc.admin) p += 4000;
    if (calc.payment) p += 3000;
    if (calc.blog) p += 1500;
    if (calc.login) p += 2500;
    if (calc.hosting) p += 1499;
    if (calc.domain) p += 999;
    if (calc.seo) p += 2999;
    return p;
  })();

  const sendChat = async (text) => {
    const newLog = [...chatLog, { from: "user", text }];
    setChatLog(newLog);
    setChatLoading(true);
    try {
      const firstUserIdx = newLog.findIndex((m) => m.from === "user");
      const apiMessages = newLog.slice(firstUserIdx).map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: CHAT_SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });
      const data = await response.json();
      const reply = (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();
      setChatLog((c) => [...c, { from: "bot", text: reply || "Sorry, I didn't quite catch that — could you rephrase, or tap Get Free Quote?" }]);
    } catch (err) {
      setChatLog((c) => [...c, { from: "bot", text: "I'm having trouble connecting right now. Please try again in a moment, or message us directly on WhatsApp." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const filteredPortfolio = filter === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((p) => p.category === filter);
  const portfolioCats = ["All", "Business", "Portfolio", "E-Commerce", "Dashboard", "Landing Page"];

  const theme = {
    bg: dark ? "bg-slate-950" : "bg-white",
    bgAlt: dark ? "bg-slate-900" : "bg-slate-50",
    bgAlt2: dark ? "bg-slate-900/60" : "bg-white",
    card: dark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200",
    cardAlt: dark ? "bg-slate-800/60 border-slate-700" : "bg-slate-50 border-slate-200",
    text: dark ? "text-slate-100" : "text-slate-900",
    textMuted: dark ? "text-slate-400" : "text-slate-600",
    textFaint: dark ? "text-slate-500" : "text-slate-500",
    border: dark ? "border-slate-800" : "border-slate-200",
    nav: dark ? "bg-slate-950/85 border-slate-800" : "bg-white/85 border-slate-200",
    input: dark ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400",
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-4" style={{ backgroundColor: "#0F172A" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap');`}</style>
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>
          <Code2 className="h-8 w-8 text-white animate-pulse" />
        </div>
        <p className="text-lg font-bold tracking-tight text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
          Karuvati Innovations
        </p>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
          <div className="loadbar-run h-full w-1/2 rounded-full" style={{ background: "linear-gradient(90deg,#2563EB,#06B6D4)" }} />
        </div>
        <style>{`@keyframes loadbar {0%{transform:translateX(-100%)} 100%{transform:translateX(300%)}} .loadbar-run{animation:loadbar 1.1s ease-in-out infinite;}`}</style>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300`} style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        h1,h2,h3,h4,.font-display { font-family: 'Poppins', sans-serif; }
        @keyframes floaty { 0%,100%{transform:translateY(0) rotate(var(--r,0deg))} 50%{transform:translateY(-14px) rotate(var(--r,0deg))} }
        .float-anim { animation: floaty 5s ease-in-out infinite; }
        @keyframes blobmove { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-30px) scale(1.08)} 66%{transform:translate(-15px,20px) scale(0.95)} }
        .blob-anim { animation: blobmove 12s ease-in-out infinite; }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .marquee-track { animation: marquee 22s linear infinite; }
        @keyframes ticker { 0%{transform:translateY(0)} 100%{transform:translateY(-100%)} }
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#2563EB,#06B6D4); border-radius: 8px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        * { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { .float-anim,.blob-anim,.marquee-track { animation: none !important; } }
      `}</style>

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 h-1 w-full bg-transparent" style={{ zIndex: 70 }}>
        <div className="h-full" style={{ width: `${scrollPct}%`, background: "linear-gradient(90deg,#2563EB,#06B6D4)", transition: "width 0.1s linear" }} />
      </div>

      {/* NAVBAR */}
      <header className={`fixed top-1 left-0 right-0 border-b backdrop-blur-md ${theme.nav}`} style={{ zIndex: 60 }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl shadow-lg shadow-blue-500/20" style={{ background: "linear-gradient(135deg,#0F172A,#2563EB)" }}>
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <div className="text-left leading-tight">
              <p className="font-display text-base font-bold">Karuvati <span style={{ color: "#2563EB" }}>Innovations</span></p>
              <p className={`text-xs font-medium tracking-wide ${theme.textFaint}`}>Website & App Development</p>
            </div>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active === n.id ? "text-blue-600 dark:text-cyan-400" : `${theme.textMuted} hover:text-blue-600`
                }`}
              >
                {lang === "en" ? n.label : n.label_hi}
                {active === n.id && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,#2563EB,#06B6D4)" }} />}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className={`hidden h-9 items-center rounded-lg px-2.5 text-xs font-semibold sm:flex ${theme.textMuted} hover:text-blue-600`}
              title="Switch language"
            >
              {lang === "en" ? "EN / हिं" : "हिं / EN"}
            </button>
            <button
              onClick={() => setDark(!dark)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border ${theme.border} ${theme.textMuted} hover:text-blue-600`}
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="hidden items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-105 sm:flex"
              style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}
            >
              {T.quickQuote} <ArrowRight size={15} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className={`border-t px-5 py-4 lg:hidden ${theme.border} ${theme.bg}`}>
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium ${active === n.id ? "bg-blue-50 text-blue-600 dark:bg-cyan-400/10 dark:text-cyan-400" : theme.textMuted}`}>
                  {lang === "en" ? n.label : n.label_hi}
                </button>
              ))}
              <button onClick={() => scrollTo("contact")} className="mt-2 rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>
                {T.quickQuote}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32" style={{ background: "radial-gradient(ellipse 90% 60% at 50% -10%, #1e3a8a 0%, #0F172A 55%, #0F172A 100%)" }}>
        {/* grid overlay */}
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "56px 56px", opacity: 0.12 }} />
        <div className="blob-anim pointer-events-none absolute -top-20 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: "#2563EB", left: "8%" }} />
        <div className="blob-anim pointer-events-none absolute top-40 h-80 w-80 rounded-full opacity-20 blur-3xl" style={{ background: "#06B6D4", right: "6%", animationDelay: "3s" }} />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
              <Sparkles size={13} /> Professional • Fast • Affordable
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Build Professional Websites &amp; Web Apps That{" "}
              <span style={{ background: "linear-gradient(135deg,#38bdf8,#06B6D4)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                Grow Your Business
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              We create modern, responsive, fast, SEO-friendly websites and web applications that help businesses establish a strong online presence and attract more customers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <button onClick={() => scrollTo("contact")} className="group flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/30 transition-transform hover:scale-105" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>
                {T.getQuote} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => scrollTo("portfolio")} className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                <PlayCircle size={16} /> {T.viewPortfolio}
              </button>
            </div>
            <div className="mt-12 grid grid-cols-4 gap-3">
              {HERO_STATS.map((s, i) => (
                <div key={i} className="border-l border-white/10 pl-3">
                  <p className="font-display text-xl font-bold text-white sm:text-2xl">{s.value}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Signature: stacked device mockups representing the variety of sites we build */}
          <div className="relative hidden lg:block" style={{ height: 420 }}>
            <div className="float-anim absolute left-2 top-6 w-64 rounded-xl border border-white/10 bg-white shadow-2xl" style={{ "--r": "-7deg", transform: "rotate(-7deg)" }}>
              <div className="flex items-center gap-1.5 rounded-t-xl bg-slate-100 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-red-400" /><span className="h-2 w-2 rounded-full bg-amber-400" /><span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <div className="space-y-2 p-3">
                <div className="h-3 w-2/3 rounded bg-slate-200" />
                <div className="h-14 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center"><UtensilsCrossed className="text-white" size={20} /></div>
                <div className="h-2 w-full rounded bg-slate-100" /><div className="h-2 w-4/5 rounded bg-slate-100" />
              </div>
            </div>
            <div className="float-anim absolute right-0 top-24 w-64 rounded-xl border border-white/10 bg-white shadow-2xl" style={{ "--r": "6deg", transform: "rotate(6deg)", animationDelay: "1s" }}>
              <div className="flex items-center gap-1.5 rounded-t-xl bg-slate-100 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-red-400" /><span className="h-2 w-2 rounded-full bg-amber-400" /><span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <div className="space-y-2 p-3">
                <div className="h-3 w-1/2 rounded bg-slate-200" />
                <div className="h-14 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"><ShoppingCart className="text-white" size={20} /></div>
                <div className="grid grid-cols-3 gap-1.5"><div className="h-8 rounded bg-slate-100" /><div className="h-8 rounded bg-slate-100" /><div className="h-8 rounded bg-slate-100" /></div>
              </div>
            </div>
            <div className="float-anim absolute left-16 bottom-2 w-64 rounded-xl border border-white/10 bg-white shadow-2xl" style={{ "--r": "-3deg", transform: "rotate(-3deg)", animationDelay: "2s" }}>
              <div className="flex items-center gap-1.5 rounded-t-xl bg-slate-100 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-red-400" /><span className="h-2 w-2 rounded-full bg-amber-400" /><span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <div className="space-y-2 p-3">
                <div className="h-3 w-3/5 rounded bg-slate-200" />
                <div className="h-14 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><Dumbbell className="text-white" size={20} /></div>
                <div className="h-2 w-full rounded bg-slate-100" /><div className="h-2 w-3/5 rounded bg-slate-100" />
              </div>
            </div>
            <div className="absolute -right-4 -bottom-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500"><CheckCircle2 size={18} className="text-white" /></div>
              <div><p className="text-xs font-semibold text-white">Delivered on time</p><p className="text-xs text-slate-300">120+ projects shipped</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY / CLIENT LOGOS MARQUEE */}
      <section className={`border-y py-6 ${theme.border} ${theme.bgAlt}`}>
        <p className={`mb-4 text-center text-xs font-semibold uppercase tracking-widest ${theme.textFaint}`}>Trusted by local businesses across industries</p>
        <div className="overflow-hidden no-scrollbar">
          <div className="marquee-track flex w-max gap-14">
            {[...WEBSITE_TYPES, ...WEBSITE_TYPES].map((w, i) => (
              <div key={i} className={`flex items-center gap-2 whitespace-nowrap text-sm font-semibold ${theme.textMuted}`}>
                <w.icon size={16} className="text-blue-500" /> {w.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Our Services</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">Every kind of website your business needs</h2>
          <p className={`mt-4 text-base ${theme.textMuted}`}>From a single landing page to full custom software — one team, one clean codebase.</p>
        </Reveal>

        {/* website type chips */}
        <Reveal delay={100} className="mt-10 flex flex-wrap justify-center gap-3">
          {WEBSITE_TYPES.map((w, i) => (
            <div key={i} className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${theme.border} ${theme.textMuted} hover:border-blue-400 hover:text-blue-600 transition-colors`}>
              <w.icon size={15} className="text-blue-500" /> {w.label} Website
            </div>
          ))}
        </Reveal>

        {/* web app / software services */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WEB_APP_SERVICES.map((s, i) => (
            <Reveal key={i} delay={(i % 3) * 80}>
              <div className={`group h-full rounded-2xl border p-6 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-xl ${theme.card}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110" style={{ background: "linear-gradient(135deg,#2563EB20,#06B6D420)" }}>
                  <s.icon size={22} style={{ color: "#2563EB" }} />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold">{s.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${theme.textMuted}`}>{s.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-2 text-xs ${theme.textMuted}`}>
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <div className={`mt-5 flex items-center justify-between border-t pt-4 ${theme.border}`}>
                  <p className="text-sm"><span className={theme.textFaint}>From </span><span className="font-display text-lg font-bold" style={{ color: "#2563EB" }}>₹{s.price}</span></p>
                  <button onClick={() => scrollTo("contact")} className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:gap-1.5 transition-all dark:text-cyan-400">
                    Get Quote <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* additional services */}
        <Reveal delay={150} className="mt-14">
          <h3 className="font-display text-center text-xl font-bold">Add-on &amp; Maintenance Services</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ADDITIONAL_SERVICES.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 rounded-xl border p-4 ${theme.cardAlt}`}>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10">
                  <s.icon size={17} style={{ color: "#2563EB" }} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{s.title}</p>
                  <p className={`text-xs ${theme.textFaint}`}>₹{s.price}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* COST CALCULATOR */}
      <section className={`${theme.bgAlt} border-y ${theme.border} py-24`}>
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>Instant Estimate</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">Website Cost Calculator</h2>
            <p className={`mt-4 text-base ${theme.textMuted}`}>Pick your requirements and see an instant starting estimate — no signup needed.</p>
          </Reveal>

          <Reveal delay={100} className={`mt-10 flex flex-col gap-8 rounded-3xl border p-6 shadow-xl sm:p-8 lg:flex-row ${theme.card}`}>
            <div className="flex-1 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold">Website Type</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(CALC_TYPE_PRICE).map((t) => (
                    <button key={t} onClick={() => setCalc({ ...calc, type: t })} className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors ${calc.type === t ? "border-transparent text-white" : `${theme.border} ${theme.textMuted}`}`} style={calc.type === t ? { background: "linear-gradient(135deg,#2563EB,#06B6D4)" } : {}}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 flex justify-between text-sm font-semibold"><span>Number of Pages</span><span className="text-blue-600 dark:text-cyan-400">{calc.pages}</span></label>
                <input type="range" min="1" max="25" value={calc.pages} onChange={(e) => setCalc({ ...calc, pages: Number(e.target.value) })} className="w-full accent-blue-600" />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold">Additional Features</label>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {[
                    ["admin", "Admin Panel"], ["payment", "Payment Gateway"], ["blog", "Blog"],
                    ["login", "Login System"], ["hosting", "Hosting"], ["domain", "Domain"], ["seo", "SEO"],
                  ].map(([key, label]) => (
                    <label key={key} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium ${calc[key] ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-cyan-400/10 dark:text-cyan-300 dark:border-cyan-400/40" : `${theme.border} ${theme.textMuted}`}`}>
                      <input type="checkbox" checked={calc[key]} onChange={(e) => setCalc({ ...calc, [key]: e.target.checked })} className="accent-blue-600" />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl p-6 text-white lg:w-80 lg:shrink-0" style={{ background: "linear-gradient(160deg,#0F172A,#1e3a8a)" }}>
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-cyan-300"><Calculator size={14} /> Estimated Price</p>
                <p className="font-display mt-3 text-4xl font-extrabold">₹{calcPrice.toLocaleString("en-IN")}<span className="text-base font-normal text-slate-400">+</span></p>
                <p className="mt-2 text-xs text-slate-400">Final cost depends on exact project requirements.</p>
              </div>
              <button onClick={() => { scrollTo("contact"); showToast("Estimate saved — tell us more below to finalize your quote."); }} className="mt-6 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>
                Get Final Quote <ArrowRight size={15} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">Simple, transparent pricing</h2>
          <p className={`mt-4 text-base ${theme.textMuted}`}>Prices are starting from the mentioned amount. Final cost depends on project requirements.</p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRICING_PLANS.map((p, i) => (
            <Reveal key={i} delay={(i % 3) * 80}>
              <div className={`relative flex h-full flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1.5 ${p.highlighted ? "shadow-2xl shadow-blue-500/20" : `shadow-sm hover:shadow-xl ${theme.card}`}`} style={p.highlighted ? { background: "linear-gradient(165deg,#0F172A,#1e3a8a)", borderColor: "#2563EB" } : {}}>
                {p.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3.5 py-1 text-xs font-bold text-white shadow-lg" style={{ background: "linear-gradient(135deg,#06B6D4,#2563EB)" }}>
                    MOST POPULAR
                  </span>
                )}
                <h3 className={`font-display text-lg font-bold ${p.highlighted ? "text-white" : ""}`}>{p.name}</h3>
                <p className={`mt-1.5 text-xs ${p.highlighted ? "text-slate-300" : theme.textMuted}`}>{p.desc}</p>
                <p className="mt-4"><span className={`font-display text-3xl font-extrabold ${p.highlighted ? "text-white" : ""}`}>₹{p.price}</span><span className={`text-sm ${p.highlighted ? "text-slate-400" : theme.textFaint}`}>+</span></p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-2 text-sm ${p.highlighted ? "text-slate-200" : theme.textMuted}`}>
                      <CheckCircle2 size={15} className={p.highlighted ? "text-cyan-300" : "text-emerald-500"} /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollTo("contact")} className={`mt-6 rounded-xl py-2.5 text-sm font-semibold transition-transform hover:scale-105 ${p.highlighted ? "text-slate-900" : "text-white"}`} style={p.highlighted ? { background: "white" } : { background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>
                  Get Quote
                </button>
              </div>
            </Reveal>
          ))}
        </div>
        <p className={`mt-8 text-center text-xs ${theme.textFaint}`}>Prices are starting from the mentioned amount. Final cost depends on project requirements.</p>
      </section>

      {/* FREE FEATURES */}
      <section className={`${theme.bgAlt} border-y py-24 ${theme.border}`}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>Included, Always</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">Free with every website</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {FREE_FEATURES.map((f, i) => (
              <Reveal key={i} delay={(i % 5) * 70}>
                <div className={`flex h-full flex-col items-center gap-3 rounded-2xl border p-5 text-center ${theme.card}`}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10">
                    <f.icon size={19} className="text-emerald-500" />
                  </div>
                  <p className="text-sm font-semibold">{f.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">Built by developers who care about the details</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((w, i) => (
            <Reveal key={i} delay={(i % 3) * 70}>
              <div className={`flex items-start gap-3.5 rounded-xl border p-4 ${theme.card}`}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg,#2563EB20,#06B6D420)" }}>
                  <w.icon size={18} style={{ color: "#2563EB" }} />
                </div>
                <div>
                  <p className="text-sm font-bold">{w.title}</p>
                  <p className={`mt-0.5 text-xs leading-relaxed ${theme.textMuted}`}>{w.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className={`${theme.bgAlt} border-y py-24 ${theme.border}`}>
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">From first call to launch day</h2>
          </Reveal>
          <div className="relative mt-14 pl-14 sm:pl-16">
            <div className={`absolute left-5 top-2 bottom-2 w-0.5 ${dark ? "bg-slate-800" : "bg-slate-200"}`} />
            <div className="space-y-8">
              {PROCESS_STEPS.map((step, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="relative">
                    <div className="absolute -left-14 top-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg sm:-left-16" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>
                      {i + 1}
                    </div>
                    <div className={`rounded-xl border p-4 ${theme.card}`}>
                      <p className="font-display text-sm font-bold">{step.title}</p>
                      <p className={`mt-1 text-xs leading-relaxed ${theme.textMuted}`}>{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
        <Reveal className="text-center">
          <SectionLabel>Technology</SectionLabel>
          <h2 className="font-display mt-4 text-2xl font-bold sm:text-3xl">Built with modern, reliable tools</h2>
        </Reveal>
        <Reveal delay={100} className="mt-10 flex flex-wrap justify-center gap-3">
          {TECH_STACK.map((t, i) => (
            <span key={i} className={`rounded-full border px-4 py-2 text-sm font-semibold ${theme.card}`}>{t}</span>
          ))}
        </Reveal>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className={`${theme.bgAlt} border-y py-24 ${theme.border}`}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">Recent work we're proud of</h2>
            <p className={`mt-4 text-base ${theme.textMuted}`}>Sample projects illustrating the range of sites we design and build.</p>
          </Reveal>

          <Reveal delay={100} className="mt-10 flex flex-wrap justify-center gap-2">
            {portfolioCats.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${filter === c ? "text-white" : `border ${theme.border} ${theme.textMuted}`}`} style={filter === c ? { background: "linear-gradient(135deg,#2563EB,#06B6D4)" } : {}}>
                {c === "All" && <Filter size={12} />} {c}
              </button>
            ))}
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPortfolio.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 80}>
                <div className={`group overflow-hidden rounded-2xl border shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-xl ${theme.card}`}>
                  <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${p.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    <p.icon size={40} className="relative text-white/90 transition-transform group-hover:scale-110" />
                    <span className="absolute top-3 right-3 rounded-full bg-white/20 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">{p.category}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-bold">{p.title}</h3>
                    <p className={`mt-1.5 text-xs leading-relaxed ${theme.textMuted}`}>{p.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tech.map((t, j) => (
                        <span key={j} className={`rounded-md px-2 py-0.5 text-xs font-semibold ${theme.bgAlt} ${theme.textMuted}`}>{t}</span>
                      ))}
                    </div>
                    <div className={`mt-4 flex items-center gap-3 border-t pt-3 ${theme.border}`}>
                      <button onClick={() => showToast(`${p.title} — live demo link coming soon.`)} className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-cyan-400">
                        Live Demo <ExternalLink size={12} />
                      </button>
                      <button onClick={() => showToast(`${p.title} — source available on request.`)} className={`flex items-center gap-1 text-xs font-semibold ${theme.textMuted}`}>
                        Source <Github size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionLabel>About Us</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">A modern software studio, built for small business</h2>
            <p className={`mt-5 text-base leading-relaxed ${theme.textMuted}`}>
              Karuvati Innovations is a modern software company focused on creating professional websites and web applications for businesses, startups, and individuals. We work with restaurants, gyms, doctors, schools, real estate agencies and e-commerce brands who want a website that actually earns its keep.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className={`rounded-xl border p-4 ${theme.card}`}>
                <p className="flex items-center gap-2 text-sm font-bold"><Rocket size={16} className="text-blue-500" /> Mission</p>
                <p className={`mt-1.5 text-xs leading-relaxed ${theme.textMuted}`}>Give every small business access to the same quality of web presence that big brands take for granted.</p>
              </div>
              <div className={`rounded-xl border p-4 ${theme.card}`}>
                <p className="flex items-center gap-2 text-sm font-bold"><Sparkles size={16} className="text-blue-500" /> Vision</p>
                <p className={`mt-1.5 text-xs leading-relaxed ${theme.textMuted}`}>To be the trusted web partner for a new generation of Indian businesses going online.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {["Innovation", "Quality", "Trust", "Customer Satisfaction"].map((v, i) => (
                <span key={i} className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:text-cyan-300" style={{ background: dark ? "#06B6D420" : "#EFF6FF" }}>
                  <CheckCircle2 size={12} /> {v}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150} className="grid grid-cols-2 gap-4">
            {STATS_COUNTERS.map((s, i) => (
              <div key={i} className={`rounded-2xl border p-6 text-center ${theme.card}`}>
                <p className="font-display text-3xl font-extrabold" style={{ color: "#2563EB" }}>
                  <CountUp target={s.value} suffix={s.suffix} />
                </p>
                <p className={`mt-1.5 text-xs font-medium ${theme.textMuted}`}>{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={`${theme.bgAlt} border-y py-24 ${theme.border}`}>
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">What our clients say</h2>
          </Reveal>

          <Reveal delay={100} className={`relative mt-12 rounded-3xl border p-8 shadow-lg sm:p-10 ${theme.card}`}>
            <Quote size={36} className="text-blue-100 dark:text-slate-700" />
            <p className="mt-2 text-base leading-relaxed sm:text-lg">{TESTIMONIALS[tIndex].text}</p>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full font-display text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>
                  {TESTIMONIALS[tIndex].name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-bold">{TESTIMONIALS[tIndex].name}</p>
                  <p className={`text-xs ${theme.textFaint}`}>{TESTIMONIALS[tIndex].company}</p>
                </div>
              </div>
              <StarRow count={TESTIMONIALS[tIndex].rating} />
            </div>
            <div className="mt-7 flex items-center justify-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setTIndex(i)} className={`h-2 rounded-full transition-all ${i === tIndex ? "w-6 bg-blue-600" : `w-2 ${theme.border} bg-slate-300 dark:bg-slate-700`}`} />
              ))}
            </div>
            <button onClick={() => setTIndex((tIndex + 1) % TESTIMONIALS.length)} className={`absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-md sm:flex ${theme.card}`}>
              <ChevronRight size={17} />
            </button>
            <button onClick={() => setTIndex((tIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className={`absolute -left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-md sm:flex ${theme.card}`}>
              <ChevronRight size={17} className="rotate-180" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-24 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">Frequently asked questions</h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={(i % 6) * 40}>
              <div className={`overflow-hidden rounded-xl border ${theme.card}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                  <span className="text-sm font-semibold">{f.q}</span>
                  {openFaq === i ? <ChevronUp size={17} className="shrink-0 text-blue-500" /> : <ChevronDown size={17} className={`shrink-0 ${theme.textFaint}`} />}
                </button>
                <div style={{ maxHeight: openFaq === i ? "200px" : "0px", transition: "max-height 0.35s ease" }} className="overflow-hidden">
                  <p className={`px-5 pb-4 text-sm leading-relaxed ${theme.textMuted}`}>{f.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className={`${theme.bgAlt} border-y py-24 ${theme.border}`}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>From the Blog</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">Ideas on web &amp; growth</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {BLOG_POSTS.map((b, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`h-full rounded-2xl border p-6 transition-all hover:-translate-y-1.5 hover:shadow-xl ${theme.card}`}>
                  <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-cyan-400">{b.category}</span>
                  <h3 className="font-display mt-3 text-base font-bold leading-snug">{b.title}</h3>
                  <p className={`mt-2 text-xs leading-relaxed ${theme.textMuted}`}>{b.excerpt}</p>
                  <p className={`mt-4 text-xs font-medium ${theme.textFaint}`}>{b.date}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS + CAREERS + TEAM TEASER */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal className={`rounded-2xl border p-7 ${theme.card}`}>
            <Award size={24} className="text-amber-500" />
            <h3 className="font-display mt-3 text-lg font-bold">Awards &amp; Recognition</h3>
            <p className={`mt-2 text-sm leading-relaxed ${theme.textMuted}`}>Recognized among emerging web studios for design quality and client satisfaction in 2025-26.</p>
          </Reveal>
          <Reveal delay={80} className={`rounded-2xl border p-7 ${theme.card}`}>
            <Briefcase size={24} className="text-blue-500" />
            <h3 className="font-display mt-3 text-lg font-bold">We're Hiring</h3>
            <p className={`mt-2 text-sm leading-relaxed ${theme.textMuted}`}>Freelance developers and designers — reach out with your portfolio for upcoming projects.</p>
            <button onClick={() => scrollTo("contact")} className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-cyan-400">View openings <ChevronRight size={13} /></button>
          </Reveal>
          <Reveal delay={160} className={`rounded-2xl border p-7 ${theme.card}`}>
            <Users size={24} className="text-cyan-500" />
            <h3 className="font-display mt-3 text-lg font-bold">Growing Team</h3>
            <p className={`mt-2 text-sm leading-relaxed ${theme.textMuted}`}>Our team page is coming soon as we scale — meet us directly on a call for now.</p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`${theme.bgAlt} border-y py-24 ${theme.border}`}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>Contact</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">Let's build something great together</h2>
            <p className={`mt-4 text-base ${theme.textMuted}`}>Tell us about your project and we'll reply with a clear quote, usually within a few hours.</p>
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-5">
            <Reveal className={`lg:col-span-3 rounded-2xl border p-6 shadow-sm sm:p-8 ${theme.card}`}>
              <form onSubmit={submitContact} className="space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">Full Name</label>
                    <input value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} type="text" placeholder="Your name" className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 ${theme.input}`} />
                    {contactErrors.name && <p className="mt-1 text-xs text-red-500">{contactErrors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">Phone</label>
                    <input value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} type="tel" placeholder="+91 00000 00000" className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 ${theme.input}`} />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold">Email</label>
                  <input value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} type="email" placeholder="you@example.com" className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 ${theme.input}`} />
                  {contactErrors.email && <p className="mt-1 text-xs text-red-500">{contactErrors.email}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold">Tell us about your project</label>
                  <textarea value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} rows={4} placeholder="I need a website for..." className={`w-full resize-none rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 ${theme.input}`} />
                  {contactErrors.message && <p className="mt-1 text-xs text-red-500">{contactErrors.message}</p>}
                </div>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-105" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>
                  <Send size={15} /> Send Message
                </button>
              </form>

              <div className={`mt-6 grid gap-3 border-t pt-6 sm:grid-cols-2 ${theme.border}`}>
                <button onClick={() => showToast("Generating company profile PDF...")} className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-semibold ${theme.border} ${theme.textMuted} hover:text-blue-600`}>
                  <Download size={14} /> Company Profile PDF
                </button>
                <button onClick={() => showToast("Generating price list PDF...")} className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-semibold ${theme.border} ${theme.textMuted} hover:text-blue-600`}>
                  <FileText size={14} /> Price List PDF
                </button>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-2 space-y-5">
              <div className={`rounded-2xl border p-6 ${theme.card}`}>
                <div className="space-y-4">
                  <a href="tel:+919930964404" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10"><Phone size={17} className="text-blue-600" /></div>
                    <div><p className={`text-xs ${theme.textFaint}`}>Call us</p><p className="text-sm font-semibold">+91 99309 64404</p></div>
                  </a>
                  <a href="mailto:kvs.sujit@gmail.com" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10"><Mail size={17} className="text-blue-600" /></div>
                    <div><p className={`text-xs ${theme.textFaint}`}>Email us</p><p className="text-sm font-semibold break-all">kvs.sujit@gmail.com</p></div>
                  </a>
                  <a href="https://www.sujitwebsolutions.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10"><Globe size={17} className="text-blue-600" /></div>
                    <div><p className={`text-xs ${theme.textFaint}`}>Website</p><p className="text-sm font-semibold">www.sujitwebsolutions.in</p></div>
                  </a>
                  <a href="https://wa.me/919930964404" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10"><MessageCircle size={17} className="text-emerald-500" /></div>
                    <div><p className={`text-xs ${theme.textFaint}`}>WhatsApp</p><p className="text-sm font-semibold">Chat with us directly</p></div>
                  </a>
                </div>
                <div className="mt-5 flex gap-2.5 border-t pt-5" style={{ borderColor: dark ? "#1e293b" : "#e2e8f0" }}>
                  {[Facebook, Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
                    <a key={i} href="#" onClick={(e) => e.preventDefault()} className={`flex h-8 w-8 items-center justify-center rounded-full border ${theme.border} ${theme.textMuted} hover:text-blue-600`}>
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>

              <div className={`overflow-hidden rounded-2xl border ${theme.card}`}>
                <iframe
                  title="Karuvati Innovations location"
                  className="h-44 w-full grayscale"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Mumbai,Maharashtra,India&output=embed"
                />
              </div>

              <div className={`rounded-2xl border p-5 ${theme.card}`}>
                <p className="flex items-center gap-2 text-sm font-bold"><CalendarCheck size={16} className="text-blue-500" /> Request a Callback</p>
                <form onSubmit={submitCallback} className="mt-3 space-y-2.5">
                  <input value={callbackForm.name} onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })} placeholder="Name" className={`w-full rounded-lg border px-3 py-2 text-xs outline-none focus:border-blue-500 ${theme.input}`} />
                  <div className="grid grid-cols-2 gap-2.5">
                    <input value={callbackForm.phone} onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })} placeholder="Phone" className={`w-full rounded-lg border px-3 py-2 text-xs outline-none focus:border-blue-500 ${theme.input}`} />
                    <input value={callbackForm.time} onChange={(e) => setCallbackForm({ ...callbackForm, time: e.target.value })} placeholder="Best time" className={`w-full rounded-lg border px-3 py-2 text-xs outline-none focus:border-blue-500 ${theme.input}`} />
                  </div>
                  <button type="submit" className="w-full rounded-lg py-2 text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>Request Callback</button>
                </form>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} className={`mt-6 rounded-2xl border p-5 text-center ${theme.card}`}>
            <p className={`text-sm ${theme.textMuted}`}>
              <span className="font-semibold text-blue-600 dark:text-cyan-400">EMI available</span> on projects above ₹15,000 — split your payment into easy monthly installments. Ask us for details when you get your quote.
            </p>
          </Reveal>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
        <Reveal className="rounded-3xl p-8 text-center sm:p-12" style={{ background: "linear-gradient(135deg,#0F172A,#1e3a8a)" }}>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Get web tips in your inbox</h2>
          <p className="mt-3 text-sm text-slate-300">One short email a month. No spam, unsubscribe anytime.</p>
          <form onSubmit={submitNewsletter} className="mx-auto mt-6 flex max-w-md flex-col gap-2.5 sm:flex-row">
            <input value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-cyan-400" />
            <button type="submit" className="shrink-0 rounded-xl px-6 py-3 text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>Subscribe</button>
          </form>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className={`border-t pt-16 pb-8 ${theme.border} ${dark ? "bg-slate-950" : "bg-slate-50"}`}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg,#0F172A,#2563EB)" }}>
                  <Code2 className="h-5 w-5 text-white" />
                </div>
                <p className="font-display text-base font-bold">Karuvati Innovations</p>
              </div>
              <p className={`mt-4 max-w-xs text-sm leading-relaxed ${theme.textMuted}`}>
                Professional, fast and affordable websites &amp; web applications for local businesses, startups and personal brands.
              </p>
              <button onClick={() => setPortalOpen(true)} className={`mt-5 flex items-center gap-1.5 text-xs font-semibold ${theme.textMuted} hover:text-blue-600`}>
                <LayoutDashboard size={13} /> Client Portal (demo)
              </button>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-cyan-400">Quick Links</p>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((n) => (
                  <li key={n.id}><button onClick={() => scrollTo(n.id)} className={`text-sm ${theme.textMuted} hover:text-blue-600`}>{n.label}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-cyan-400">Services</p>
              <ul className="mt-4 space-y-2.5">
                {["Business Website", "E-Commerce Website", "Web Application", "Admin Dashboard", "SEO Optimization"].map((s, i) => (
                  <li key={i}><button onClick={() => scrollTo("services")} className={`text-sm ${theme.textMuted} hover:text-blue-600`}>{s}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-cyan-400">Contact</p>
              <ul className={`mt-4 space-y-2.5 text-sm ${theme.textMuted}`}>
                <li>+91 99309 64404</li>
                <li className="break-all">kvs.sujit@gmail.com</li>
                <li>www.sujitwebsolutions.in</li>
                <li>Mumbai, Maharashtra, India</li>
              </ul>
            </div>
          </div>

          <div className={`mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row ${theme.border}`}>
            <p className={`text-xs ${theme.textFaint}`}>© {new Date().getFullYear()} Karuvati Innovations. All rights reserved.</p>
            <div className={`flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs ${theme.textFaint}`}>
              <button className="hover:text-blue-600">Privacy Policy</button>
              <button className="hover:text-blue-600">Terms &amp; Conditions</button>
              <button className="hover:text-blue-600">Refund Policy</button>
              <button className="hover:text-blue-600">Sitemap</button>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-6 left-5 z-50 flex flex-col gap-3">
        <a href="https://wa.me/919930964404" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 transition-transform hover:scale-110" title="Chat on WhatsApp">
          <MessageCircle size={21} />
        </a>
        <a href="tel:+919930964404" className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl shadow-blue-500/30 transition-transform hover:scale-110" style={{ background: "#2563EB" }} title="Call us">
          <Phone size={19} />
        </a>
        <a href="mailto:kvs.sujit@gmail.com" className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl shadow-slate-500/30 transition-transform hover:scale-110" style={{ background: "#0F172A" }} title="Email us">
          <Mail size={19} />
        </a>
      </div>

      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
        {showTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-lg transition-transform hover:scale-110 ${theme.card}`} title="Back to top">
            <ArrowUp size={17} />
          </button>
        )}

        {chatOpen && (
          <div className={`mb-1 flex w-80 flex-col overflow-hidden rounded-2xl border shadow-2xl ${theme.card}`} style={{ height: 420 }}>
            <div className="flex items-center gap-2.5 px-4 py-3 text-white" style={{ background: "linear-gradient(135deg,#0F172A,#2563EB)" }}>
              <Bot size={18} />
              <div className="flex-1"><p className="text-sm font-bold">Karuvati Assistant</p><p className="text-xs text-slate-300">Powered by Claude AI</p></div>
              <button onClick={() => setChatOpen(false)}><X size={16} /></button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {chatLog.map((m, i) => (
                <div key={i} className={`rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${m.from === "bot" ? `${theme.bgAlt} ${theme.text}` : "ml-auto text-white"}`} style={{ maxWidth: "85%", ...(m.from === "user" ? { background: "linear-gradient(135deg,#2563EB,#06B6D4)" } : {}) }}>
                  {m.text}
                </div>
              ))}
              {chatLoading && (
                <div className={`flex items-center gap-1 rounded-2xl px-3.5 py-2.5 ${theme.bgAlt}`} style={{ maxWidth: "50%" }}>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-60" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-60" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-60" style={{ animationDelay: "300ms" }} />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); if (chatInput.trim() && !chatLoading) { sendChat(chatInput.trim()); setChatInput(""); } }}
              className={`flex items-center gap-2 border-t p-2.5 ${theme.border}`}
            >
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} disabled={chatLoading} placeholder="Ask about pricing, timelines..." className={`flex-1 rounded-full border px-3.5 py-2 text-xs outline-none focus:border-blue-500 disabled:opacity-60 ${theme.input}`} />
              <button type="submit" disabled={chatLoading} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white disabled:opacity-60" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>
                {chatLoading ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
              </button>
            </form>
          </div>
        )}

        <button onClick={() => setChatOpen(!chatOpen)} className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition-transform hover:scale-110" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }} title="AI Chat Assistant">
          {chatOpen ? <X size={22} /> : <Bot size={22} />}
        </button>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl px-5 py-3 text-sm font-medium text-white shadow-2xl" style={{ background: "#0F172A", zIndex: 80 }}>
          <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400" /> {toast}</div>
        </div>
      )}

      {/* COOKIE CONSENT */}
      {cookieVisible && (
        <div className={`fixed bottom-0 left-0 right-0 border-t p-4 shadow-2xl sm:p-5 ${theme.border} ${theme.bg}`} style={{ zIndex: 65 }}>
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
            <p className={`flex items-center gap-2 text-xs sm:text-sm ${theme.textMuted}`}>
              <Cookie size={16} className="shrink-0 text-blue-500" /> We use cookies to improve your browsing experience. By continuing, you agree to our use of cookies.
            </p>
            <div className="flex shrink-0 gap-2.5">
              <button onClick={() => setCookieVisible(false)} className={`rounded-lg border px-4 py-1.5 text-xs font-semibold ${theme.border} ${theme.textMuted}`}>Decline</button>
              <button onClick={() => setCookieVisible(false)} className="rounded-lg px-4 py-1.5 text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>Accept</button>
            </div>
          </div>
        </div>
      )}

      {/* EXIT INTENT POPUP */}
      {showExit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-5" style={{ zIndex: 90 }} onClick={() => setShowExit(false)}>
          <div onClick={(e) => e.stopPropagation()} className={`relative w-full max-w-sm rounded-2xl border p-7 text-center shadow-2xl ${theme.card}`}>
            <button onClick={() => setShowExit(false)} className={`absolute right-4 top-4 ${theme.textFaint}`}><X size={18} /></button>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg,#2563EB20,#06B6D420)" }}>
              <Sparkles size={24} style={{ color: "#2563EB" }} />
            </div>
            <h3 className="font-display mt-4 text-lg font-bold">Before you go...</h3>
            <p className={`mt-2 text-sm ${theme.textMuted}`}>Get a free, no-obligation quote for your website in under 24 hours.</p>
            <button onClick={() => { setShowExit(false); scrollTo("contact"); }} className="mt-5 w-full rounded-xl py-3 text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>
              Get My Free Quote
            </button>
          </div>
        </div>
      )}

      {/* CLIENT PORTAL DEMO MODAL */}
      {portalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-5" style={{ zIndex: 90 }} onClick={() => setPortalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl ${theme.card}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-cyan-400"><Info size={13} /> Demo Preview</p>
                <h3 className="font-display mt-1 text-lg font-bold">Client Portal</h3>
              </div>
              <button onClick={() => setPortalOpen(false)} className={theme.textFaint}><X size={18} /></button>
            </div>
            <p className={`mt-2 text-xs ${theme.textMuted}`}>This is a preview of what active clients see. Real accounts are set up once a project begins.</p>
            <div className="mt-4 space-y-2.5">
              {[
                { label: "GreenLeaf Organics — Store Build", pct: 80, icon: ShoppingCart },
                { label: "Invoice #KI-2026-014", pct: 100, icon: Receipt },
                { label: "Assets & Files", pct: 100, icon: FileText },
              ].map((row, i) => (
                <div key={i} className={`flex items-center gap-3 rounded-xl border p-3 ${theme.cardAlt}`}>
                  <row.icon size={16} className="text-blue-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-semibold">{row.label}</p>
                    <div className={`mt-1.5 h-1.5 w-full overflow-hidden rounded-full ${dark ? "bg-slate-700" : "bg-slate-200"}`}>
                      <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: "linear-gradient(90deg,#2563EB,#06B6D4)" }} />
                    </div>
                  </div>
                  <span className={`text-xs font-bold ${theme.textFaint}`}>{row.pct}%</span>
                </div>
              ))}
            </div>
            <button onClick={() => { setPortalOpen(false); scrollTo("contact"); }} className="mt-5 w-full rounded-xl py-2.5 text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>
              Start a Project to Get Your Own Portal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
