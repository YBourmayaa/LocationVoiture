import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarCheck,
  Car,
  Check,
  Clock,
  DollarSign,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  Zap,
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import Map from './Map.jsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion.jsx';
import { Button } from './components/ui/button.jsx';
import { Card, CardContent } from './components/ui/card.jsx';
import { Input, Select, Textarea } from './components/ui/input.jsx';

const phoneDisplay = '06 61 44 47 96';
const phoneHref = 'tel:+212661444796';
const whatsappHref = 'https://wa.me/212661444796';
const googleMapsHref = 'https://maps.google.com/?q=33.5731,-7.6355';

const navLinks = [
  ['Home', '#home'],
  ['Services', '#services'],
  ['Fleet', '#fleet'],
  ['Reviews', '#reviews'],
  ['FAQ', '#faq'],
  ['Contact', '#contact'],
];

const stats = [
  ['4.1/5', 'Customer Rating'],
  ['47', 'Google Reviews'],
  ['24/7', 'Available'],
  ['Casablanca', 'Local Agency'],
];

const reasons = [
  [Zap, 'Fast Booking', 'Reserve quickly by phone or WhatsApp without complicated steps.'],
  [DollarSign, 'Competitive Prices', 'Clear daily rates for economy, SUV, premium and luxury rentals.'],
  [Sparkles, 'Clean Vehicles', 'Cars prepared carefully so every trip starts with confidence.'],
  [MessageCircle, 'Direct WhatsApp Contact', 'Speak directly with the agency team and confirm availability.'],
  [Clock, '24/7 Availability', 'Support available day and night for urgent travel plans.'],
  [ShieldCheck, 'Trusted By Customers', 'A local Casablanca agency with real customer review signals.'],
];

const services = [
  ['Short-Term Rental', 'Ideal for city errands, business trips and weekend plans.'],
  ['Long-Term Rental', 'Flexible rental periods for extended stays and company needs.'],
  ['Economy Cars', 'Efficient vehicles for daily use at affordable prices.'],
  ['SUV and Family Cars', 'More comfort, more space and easier travel with luggage.'],
  ['Premium Vehicles', 'A refined driving experience for business and special occasions.'],
  ['Delivery Depending On Availability', 'Ask the team about delivery options in Casablanca.'],
];

const fleet = [
  [
    'Renault Clio',
    'Economy',
    '350 MAD/day',
    'Manual',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Renault_Clio_(V,_Facelift)_–_f_02092025.jpg',
  ],
  [
    'Volkswagen Golf',
    'Compact',
    '600 MAD/day',
    'Automatic',
    'https://commons.wikimedia.org/wiki/Special:FilePath/2020_Volkswagen_Golf_Style_ETSi_S-A_1.5_Front.jpg',
  ],
  [
    'Hyundai Tucson',
    'SUV',
    '700 MAD/day',
    'Automatic',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Hyundai_Tucson_1.6_T-GDI_PHEV_Trend_(IV,_Facelift)_–_f_15022025.jpg',
  ],
  [
    'Dacia Duster',
    'SUV',
    '550 MAD/day',
    'Manual',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Dacia_Duster_TCe_130_Extreme_(III)_–_f_13102024.jpg',
  ],
  [
    'Mercedes C-Class',
    'Premium',
    '1200 MAD/day',
    'Automatic',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-AMG_C_43_(W206)_IMG_0249.jpg',
  ],
  [
    'Range Rover Evoque',
    'Luxury SUV',
    '1500 MAD/day',
    'Automatic',
    'https://commons.wikimedia.org/wiki/Special:FilePath/2023_Range_Rover_Evoque_(L551)_IMG_3588.jpg',
  ],
];

const steps = [
  [Car, 'Choose car', 'Select the category and vehicle that fits your trip.'],
  [MessageCircle, 'Contact us', 'Send a WhatsApp message or call the agency directly.'],
  [CalendarCheck, 'Confirm booking', 'Share your dates and confirm availability with the team.'],
  [MapPin, 'Pick up car', 'Visit the Casablanca agency or ask about delivery options.'],
];

const reviews = [
  'Very good service and reasonable prices.',
  'Fast response and professional experience.',
  'Clean vehicle and easy booking process.',
  'Will definitely rent again.',
];

const faqs = [
  ['What documents are required?', 'A valid driving license and identity document are usually required. Contact Pôle Car to confirm details for your booking.'],
  ['Can I reserve through WhatsApp?', 'Yes. Use the WhatsApp button to check availability, share dates and reserve directly.'],
  ['Are you available 24/7?', 'Yes. Pôle Car offers 24/7 availability for customer support and booking requests.'],
  ['Can the car be delivered?', 'Delivery may be possible depending on availability and location in Casablanca.'],
  ['Which car categories are available?', 'Economy, compact, SUV, family, premium and luxury SUV options are available.'],
  ['How do I check availability?', 'Call the agency or send a WhatsApp message with your dates and preferred vehicle.'],
];

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: 'easeOut' },
};

function Section({ id, eyebrow, title, text, dark = false, children, className = '' }) {
  return (
    <motion.section id={id} className={`px-5 py-20 sm:px-8 lg:py-28 ${dark ? 'bg-[#050505] text-white' : 'bg-[#f6f4ef] text-neutral-950'} ${className}`} {...fadeUp}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || text) && (
          <div className="mb-12 max-w-3xl">
            {eyebrow && <p className={`mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.34em] ${dark ? 'text-[#d8b66f]' : 'text-[#9b7836]'}`}>{eyebrow}</p>}
            {title && <h2 className={`text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl ${dark ? 'text-white' : 'text-neutral-950'}`}>{title}</h2>}
            {text && <p className={`mt-5 text-base leading-8 sm:text-lg ${dark ? 'text-white/62' : 'text-neutral-600'}`}>{text}</p>}
          </div>
        )}
        {children}
      </div>
    </motion.section>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${scrolled ? 'bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 py-5 transition duration-500 sm:px-8 ${scrolled ? 'text-neutral-950' : 'text-white'}`}>
        <a href="#home" className="group flex items-center gap-4" onClick={() => setOpen(false)} aria-label="Pôle Car home">
          <span className={`h-px w-10 transition ${scrolled ? 'bg-[#c9a45c]' : 'bg-[#d8b66f]'}`} />
          <span className="leading-none">
            <span className="block text-[1.05rem] font-semibold uppercase tracking-[0.32em]">Pôle</span>
            <span className="mt-1 block text-[0.62rem] font-medium uppercase tracking-[0.58em] opacity-75">Car</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} className={`group relative px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition ${scrolled ? 'text-neutral-600 hover:text-neutral-950' : 'text-white/72 hover:text-white'}`}>
              {label}
              <span className="absolute bottom-0 left-4 h-px w-0 bg-[#c9a45c] transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className={`hidden items-center gap-2 border-r pr-4 text-[0.72rem] font-semibold tracking-[0.18em] sm:flex ${scrolled ? 'border-neutral-200 text-neutral-500' : 'border-white/20 text-white/70'}`}>
            <button className="text-[#c9a45c]" type="button">FR</button>
            <span>/</span>
            <button className="transition hover:text-[#c9a45c]" type="button">EN</button>
          </div>
          <Button asChild variant={scrolled ? 'dark' : 'glass'} size="sm" className="hidden sm:inline-flex uppercase">
            <a href={phoneHref}>
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </Button>
          <Button variant={scrolled ? 'outline' : 'glass'} size="icon" className="lg:hidden" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-y-0 right-0 top-0 z-50 w-[min(86vw,390px)] border-l border-neutral-200 bg-white px-7 py-6 text-neutral-950 shadow-2xl lg:hidden">
          <div className="mb-10 flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-[0.32em]">Pôle Car</span>
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="grid gap-1">
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} className="border-b border-neutral-100 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-700" onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            <button className="text-[#c9a45c]" type="button">FR</button>
            <span>/</span>
            <button type="button">EN</button>
          </div>
          <Button asChild size="lg" className="mt-8 w-full uppercase">
            <a href={whatsappHref} target="_blank" rel="noreferrer">Book Now</a>
          </Button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden bg-black px-5 text-white sm:px-8">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=2200&q=86"
          alt="Luxury car at night"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.62)_42%,rgba(0,0,0,0.18)_100%),linear-gradient(180deg,rgba(0,0,0,0.44)_0%,rgba(0,0,0,0.08)_42%,#050505_100%)]" />
      <div className="mx-auto flex min-h-screen max-w-7xl items-center pt-24">
        <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-[#d8b66f]">
            Casablanca luxury rental
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[5.8rem]">
            Premium Car Rental in Casablanca
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/72 sm:text-lg">
            A curated fleet, direct concierge booking, and 24/7 support for business, airport and city travel.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle className="h-5 w-5" />
                Reserve on WhatsApp
              </a>
            </Button>
            <Button asChild variant="glass" size="lg">
              <a href="#fleet">
                View Fleet
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
          <div className="mt-10 grid max-w-3xl gap-x-8 gap-y-4 border-t border-white/15 pt-7 sm:grid-cols-2 lg:grid-cols-4">
            {['4.1/5 Rating', '47 Google Reviews', 'Available 24/7', 'Casablanca Agency'].map((badge) => (
              <div key={badge} className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                <Check className="mr-2 inline h-4 w-4 text-[#d8b66f]" />
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="bg-[#050505] px-5 pb-16 sm:px-8">
      <div className="mx-auto grid max-w-7xl border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([value, label]) => (
          <article key={label} className="border-b border-white/10 py-8 sm:border-r lg:border-b-0 lg:px-8">
            <strong className="block text-3xl font-semibold tracking-[-0.03em] text-white">{value}</strong>
            <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.22em] text-white/45">{label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <Section eyebrow="Why choose us" title="A premium rental experience, without the friction." text="Designed for fast decisions, clear communication and vehicles that feel ready for real business or leisure use.">
      <div className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 md:grid-cols-2 lg:grid-cols-3">
        {reasons.map(([Icon, title, text]) => (
          <article key={title} className="group bg-[#f6f4ef] p-8 transition hover:bg-white">
            <Icon className="mb-8 h-6 w-6 text-[#9b7836]" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-neutral-950">{title}</h3>
            <p className="mt-4 leading-7 text-neutral-600">{text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Services() {
  return (
    <Section id="services" dark eyebrow="Services" title="Flexible services for every type of trip." text="Short visits, long stays, family travel and premium occasions all fit inside one direct booking flow.">
      <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
        {services.map(([title, text]) => (
          <article key={title} className="bg-[#090909] p-8 transition hover:bg-[#111]">
            <Car className="mb-8 h-6 w-6 text-[#d8b66f]" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-white">{title}</h3>
            <p className="mt-4 leading-7 text-white/58">{text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Fleet() {
  return (
    <Section id="fleet" eyebrow="Fleet" title="A sharper fleet presentation for faster booking." text="Large vehicle imagery, visible prices and the key specs customers need before contacting you.">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {fleet.map(([name, category, price, transmission, image]) => (
          <article key={name} className="group bg-white">
            <div className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#343434,black_68%)]">
              <img
                src={image}
                alt={`${name} rental car`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-72 w-full object-contain object-center p-3 opacity-95 saturate-[0.92] transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:saturate-100 sm:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/10 to-transparent" />
              <span className="absolute left-5 top-5 border border-white/25 bg-black/35 px-3 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                {category}
              </span>
              <span className="absolute bottom-5 right-5 bg-[#c9a45c] px-4 py-2 text-sm font-semibold text-black shadow-xl">
                {price}
              </span>
            </div>
            <div className="border border-t-0 border-neutral-200 p-6">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">{name}</h3>
              <div className="mt-5 grid grid-cols-3 gap-px bg-neutral-200 text-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-neutral-600">
                {[transmission, 'A/C', '5 Seats'].map((spec) => (
                  <span key={spec} className="bg-white px-3 py-3">{spec}</span>
                ))}
              </div>
              <Button asChild variant="dark" className="mt-6 w-full uppercase">
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Book On WhatsApp
                </a>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section dark eyebrow="How it works" title="From choosing a car to driving away in four steps.">
      <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
        {steps.map(([Icon, title, text], index) => (
          <article key={title} className="bg-[#090909] p-8">
            <div className="mb-8 flex items-center justify-between">
              <Icon className="h-6 w-6 text-[#d8b66f]" strokeWidth={1.5} />
              <span className="text-4xl font-semibold text-white/10">0{index + 1}</span>
            </div>
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-white">{title}</h3>
            <p className="mt-4 leading-7 text-white/58">{text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Reviews() {
  return (
    <Section id="reviews" eyebrow="Reviews" title="Customer trust signals that feel real and immediate.">
      <div className="mb-8 inline-flex items-center gap-3 border border-neutral-200 bg-white px-5 py-3">
        <Star className="h-4 w-4 fill-[#c9a45c] text-[#c9a45c]" />
        <span className="text-sm font-semibold text-neutral-950">4.1/5 Google rating</span>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">47 reviews</span>
      </div>
      <div className="grid gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-2 lg:grid-cols-4">
        {reviews.map((review) => (
          <article key={review} className="bg-[#f6f4ef] p-7">
              <div className="mb-6 flex text-[#c9a45c]">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-base font-medium leading-8 text-neutral-800">“{review}”</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function FAQ() {
  return (
    <Section id="faq" dark eyebrow="FAQ" title="Clear answers before you reserve.">
      <Accordion type="single" collapsible defaultValue="faq-0" className="max-w-4xl">
        {faqs.map(([question, answer], index) => (
          <AccordionItem key={question} value={`faq-${index}`} className="rounded-none border-white/10 bg-transparent text-white">
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

function Contact() {
  function handleSubmit(event) {
    event.preventDefault();
    // Supabase integration point:
    // Insert full_name, phone, vehicle, pickup_date, return_date, message,
    // status: 'new', created_at: new Date().toISOString()
    // into a future reservations table.
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Reserve directly with the Casablanca agency." text="A premium form for future Supabase integration, plus direct phone and WhatsApp options today.">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="rounded-none border-neutral-200 bg-neutral-950 text-white">
          <CardContent className="p-8 lg:p-10">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#d8b66f]">Concierge desk</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white">Pôle Car Casablanca</h3>
            <div className="mt-8 grid gap-5 text-white/66">
              <span><Phone className="mr-3 inline h-5 w-5 text-[#d8b66f]" />{phoneDisplay}</span>
              <span><Clock className="mr-3 inline h-5 w-5 text-[#d8b66f]" />Available 24/7</span>
              <address className="not-italic"><MapPin className="mr-3 inline h-5 w-5 text-[#d8b66f]" />N°48, Résidence Les champs Centre Magasin, 165 Bd Abdelmoumen, Casablanca 20100, Morocco</address>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="glass">
                <a href={phoneHref}>
                  <Phone className="h-5 w-5" />
                  Call
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-neutral-200 bg-white">
          <CardContent className="p-6 sm:p-8 lg:p-10">
            <form className="grid gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">Full Name<Input name="full_name" placeholder="Your name" required /></label>
                <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">Phone Number<Input name="phone" type="tel" placeholder="+212..." required /></label>
              </div>
              <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
                Vehicle
                <Select name="vehicle" defaultValue="">
                  <option value="" disabled>Select a vehicle</option>
                  {fleet.map(([name]) => <option key={name}>{name}</option>)}
                </Select>
              </label>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">Pickup Date<Input name="pickup_date" type="date" /></label>
                <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">Return Date<Input name="return_date" type="date" /></label>
              </div>
              <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">Message<Textarea name="message" placeholder="Tell us what you need" /></label>
              <Button type="submit" variant="dark" size="lg" className="w-full uppercase">Send Request</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

function MapSection() {
  return (
    <Section dark eyebrow="Location" title="Find the agency in Casablanca." text="OpenStreetMap stays free and does not require a Google Maps API key.">
      <Map />
      <Button asChild variant="glass" className="mt-6">
        <a href={googleMapsHref} target="_blank" rel="noreferrer">
          <MapPin className="h-5 w-5" />
          Open In Google Maps
        </a>
      </Button>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-10 md:grid-cols-[1.4fr_0.8fr_1fr]">
        <div>
          <a href="#home" className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#c9a45c]" />
            <span>
              <span className="block text-sm font-semibold uppercase tracking-[0.32em]">Pôle</span>
              <span className="mt-1 block text-[0.62rem] font-medium uppercase tracking-[0.58em] text-white/55">Car</span>
            </span>
          </a>
          <p className="mt-4 max-w-md leading-7 text-slate-400">Premium car rental in Casablanca with clean vehicles, direct support and 24/7 availability.</p>
        </div>
        <div>
          <h3 className="font-black">Quick links</h3>
          <div className="mt-4 grid gap-2 text-slate-400">
            {navLinks.map(([label, href]) => <a key={href} href={href} className="hover:text-[#d8b66f]">{label}</a>)}
          </div>
        </div>
        <div>
          <h3 className="font-black">Contact</h3>
          <div className="mt-4 grid gap-2 text-slate-400">
            <a href={phoneHref} className="hover:text-[#d8b66f]">{phoneDisplay}</a>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="hover:text-[#d8b66f]">WhatsApp</a>
            <p>N°48, Résidence Les champs Centre Magasin, Casablanca</p>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-sm text-slate-500">© 2026 Pôle Car. All rights reserved.</p>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact Pôle Car on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 items-center gap-2 bg-[#1f9d55] px-5 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_18px_50px_rgba(31,157,85,0.32)] transition hover:-translate-y-1"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <WhyChoose />
        <Services />
        <Fleet />
        <HowItWorks />
        <Reviews />
        <FAQ />
        <Contact />
        <MapSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
