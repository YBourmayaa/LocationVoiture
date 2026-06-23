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

const fleet = [
  ['Renault Clio', 'economy', '350 MAD/day', 'manual', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=86'],
  ['Volkswagen Golf', 'compact', '600 MAD/day', 'automatic', 'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?auto=format&fit=crop&w=1200&q=86'],
  ['Hyundai Tucson', 'suv', '700 MAD/day', 'automatic', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=86'],
  ['Dacia Duster', 'suv', '550 MAD/day', 'manual', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=86'],
  ['Mercedes C-Class', 'premium', '1200 MAD/day', 'automatic', 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&w=1200&q=86'],
  ['Range Rover Evoque', 'luxurySuv', '1500 MAD/day', 'automatic', 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=1200&q=86'],
];

const copy = {
  en: {
    dir: 'ltr',
    nav: ['Home', 'Services', 'Fleet', 'Reviews', 'FAQ', 'Contact'],
    callNow: 'Call Now',
    bookNow: 'Book Now',
    reserveWhatsapp: 'Reserve on WhatsApp',
    viewFleet: 'View Fleet',
    bookWhatsapp: 'Book On WhatsApp',
    whatsapp: 'WhatsApp',
    heroEyebrow: 'Casablanca luxury rental',
    heroTitle: 'Premium Car Rental in Casablanca',
    heroText: 'A curated fleet, direct concierge booking, and 24/7 support for business, airport and city travel.',
    badges: ['4.1/5 Rating', '47 Google Reviews', 'Available 24/7', 'Casablanca Agency'],
    stats: [['4.1/5', 'Customer Rating'], ['47', 'Google Reviews'], ['24/7', 'Available'], ['Casablanca', 'Local Agency']],
    why: {
      eyebrow: 'Why choose us',
      title: 'A premium rental experience, without the friction.',
      text: 'Designed for fast decisions, clear communication and vehicles that feel ready for real business or leisure use.',
      items: [
        [Zap, 'Fast Booking', 'Reserve quickly by phone or WhatsApp without complicated steps.'],
        [DollarSign, 'Competitive Prices', 'Clear daily rates for economy, SUV, premium and luxury rentals.'],
        [Sparkles, 'Clean Vehicles', 'Cars prepared carefully so every trip starts with confidence.'],
        [MessageCircle, 'Direct WhatsApp Contact', 'Speak directly with the agency team and confirm availability.'],
        [Clock, '24/7 Availability', 'Support available day and night for urgent travel plans.'],
        [ShieldCheck, 'Trusted By Customers', 'A local Casablanca agency with real customer review signals.'],
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'Flexible services for every type of trip.',
      text: 'Short visits, long stays, family travel and premium occasions all fit inside one direct booking flow.',
      items: [
        ['Short-Term Rental', 'Ideal for city errands, business trips and weekend plans.'],
        ['Long-Term Rental', 'Flexible rental periods for extended stays and company needs.'],
        ['Economy Cars', 'Efficient vehicles for daily use at affordable prices.'],
        ['SUV and Family Cars', 'More comfort, more space and easier travel with luggage.'],
        ['Premium Vehicles', 'A refined driving experience for business and special occasions.'],
        ['Delivery Depending On Availability', 'Ask the team about delivery options in Casablanca.'],
      ],
    },
    fleet: {
      eyebrow: 'Fleet',
      title: 'A sharper fleet presentation for faster booking.',
      text: 'Large vehicle imagery, visible prices and the key specs customers need before contacting you.',
      categories: { economy: 'Economy', compact: 'Compact', suv: 'SUV', premium: 'Premium', luxurySuv: 'Luxury SUV' },
      specs: { manual: 'Manual', automatic: 'Automatic', ac: 'A/C', seats: '5 Seats' },
    },
    steps: {
      eyebrow: 'How it works',
      title: 'From choosing a car to driving away in four steps.',
      items: [
        [Car, 'Choose car', 'Select the category and vehicle that fits your trip.'],
        [MessageCircle, 'Contact us', 'Send a WhatsApp message or call the agency directly.'],
        [CalendarCheck, 'Confirm booking', 'Share your dates and confirm availability with the team.'],
        [MapPin, 'Pick up car', 'Visit the Casablanca agency or ask about delivery options.'],
      ],
    },
    reviews: {
      eyebrow: 'Reviews',
      title: 'Customer trust signals that feel real and immediate.',
      badge: '4.1/5 Google rating',
      count: '47 reviews',
      items: ['Very good service and reasonable prices.', 'Fast response and professional experience.', 'Clean vehicle and easy booking process.', 'Will definitely rent again.'],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Clear answers before you reserve.',
      items: [
        ['What documents are required?', 'A valid driving license and identity document are usually required. Contact Pôle Car to confirm details for your booking.'],
        ['Can I reserve through WhatsApp?', 'Yes. Use the WhatsApp button to check availability, share dates and reserve directly.'],
        ['Are you available 24/7?', 'Yes. Pôle Car offers 24/7 availability for customer support and booking requests.'],
        ['Can the car be delivered?', 'Delivery may be possible depending on availability and location in Casablanca.'],
        ['Which car categories are available?', 'Economy, compact, SUV, family, premium and luxury SUV options are available.'],
        ['How do I check availability?', 'Call the agency or send a WhatsApp message with your dates and preferred vehicle.'],
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Reserve directly with the Casablanca agency.',
      text: 'A premium form for future Supabase integration, plus direct phone and WhatsApp options today.',
      desk: 'Concierge desk',
      available: 'Available 24/7',
      labels: ['Full Name', 'Phone Number', 'Vehicle', 'Pickup Date', 'Return Date', 'Message'],
      placeholders: ['Your name', '+212...', 'Select a vehicle', 'Tell us what you need'],
      send: 'Send Request',
    },
    map: { eyebrow: 'Location', title: 'Find the agency in Casablanca.', text: 'OpenStreetMap stays free and does not require a Google Maps API key.', open: 'Open In Google Maps' },
    footer: { quick: 'Quick links', contact: 'Contact', text: 'Premium car rental in Casablanca with clean vehicles, direct support and 24/7 availability.', copyright: '© 2026 Pôle Car. All rights reserved.' },
  },
  fr: {
    dir: 'ltr',
    nav: ['Accueil', 'Services', 'Flotte', 'Avis', 'FAQ', 'Contact'],
    callNow: 'Appeler',
    bookNow: 'Réserver',
    reserveWhatsapp: 'Réserver sur WhatsApp',
    viewFleet: 'Voir la flotte',
    bookWhatsapp: 'Réserver sur WhatsApp',
    whatsapp: 'WhatsApp',
    heroEyebrow: 'Location premium à Casablanca',
    heroTitle: 'Location de voitures premium à Casablanca',
    heroText: 'Une flotte sélectionnée, une réservation directe et une assistance 24h/24 pour vos déplacements professionnels, aéroport et ville.',
    badges: ['Note 4.1/5', '47 avis Google', 'Disponible 24/7', 'Agence à Casablanca'],
    stats: [['4.1/5', 'Note client'], ['47', 'Avis Google'], ['24/7', 'Disponible'], ['Casablanca', 'Agence locale']],
    why: {
      eyebrow: 'Pourquoi nous choisir',
      title: 'Une expérience de location premium, sans complication.',
      text: 'Pensée pour décider vite, communiquer clairement et partir avec un véhicule prêt pour vos trajets.',
      items: [
        [Zap, 'Réservation rapide', 'Réservez rapidement par téléphone ou WhatsApp, sans étapes inutiles.'],
        [DollarSign, 'Prix compétitifs', 'Des tarifs clairs pour les voitures économiques, SUV, premium et luxe.'],
        [Sparkles, 'Véhicules propres', 'Chaque voiture est préparée avec soin avant la location.'],
        [MessageCircle, 'Contact WhatsApp direct', 'Discutez directement avec l’agence et confirmez la disponibilité.'],
        [Clock, 'Disponibilité 24/7', 'Une assistance disponible jour et nuit pour vos besoins urgents.'],
        [ShieldCheck, 'Clients satisfaits', 'Une agence locale à Casablanca avec des avis clients réels.'],
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'Des services flexibles pour chaque trajet.',
      text: 'Courte durée, longue durée, voyage en famille ou occasion premium dans un parcours de réservation direct.',
      items: [
        ['Location courte durée', 'Idéal pour vos courses, rendez-vous et week-ends.'],
        ['Location longue durée', 'Des périodes flexibles pour les séjours prolongés et besoins professionnels.'],
        ['Voitures économiques', 'Des véhicules pratiques à prix raisonnables.'],
        ['SUV et familiales', 'Plus de confort et d’espace pour les bagages.'],
        ['Véhicules premium', 'Une expérience plus raffinée pour les rendez-vous et occasions spéciales.'],
        ['Livraison selon disponibilité', 'Demandez à l’équipe les options de livraison à Casablanca.'],
      ],
    },
    fleet: {
      eyebrow: 'Flotte',
      title: 'Une flotte claire pour réserver plus vite.',
      text: 'Images larges, prix visibles et caractéristiques essentielles avant de nous contacter.',
      categories: { economy: 'Économique', compact: 'Compacte', suv: 'SUV', premium: 'Premium', luxurySuv: 'SUV luxe' },
      specs: { manual: 'Manuelle', automatic: 'Automatique', ac: 'Clim', seats: '5 places' },
    },
    steps: {
      eyebrow: 'Comment ça marche',
      title: 'De la sélection du véhicule au départ en quatre étapes.',
      items: [
        [Car, 'Choisissez la voiture', 'Sélectionnez la catégorie adaptée à votre trajet.'],
        [MessageCircle, 'Contactez-nous', 'Envoyez un message WhatsApp ou appelez directement l’agence.'],
        [CalendarCheck, 'Confirmez la réservation', 'Partagez vos dates et confirmez la disponibilité.'],
        [MapPin, 'Récupérez la voiture', 'Passez à l’agence ou demandez les options de livraison.'],
      ],
    },
    reviews: {
      eyebrow: 'Avis',
      title: 'Des signaux de confiance simples et réels.',
      badge: 'Note Google 4.1/5',
      count: '47 avis',
      items: ['Très bon service et prix raisonnables.', 'Réponse rapide et expérience professionnelle.', 'Véhicule propre et réservation facile.', 'Je louerai certainement à nouveau.'],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Réponses claires avant de réserver.',
      items: [
        ['Quels documents sont nécessaires ?', 'Un permis de conduire valide et une pièce d’identité sont généralement demandés. Contactez Pôle Car pour confirmer.'],
        ['Puis-je réserver via WhatsApp ?', 'Oui. Utilisez le bouton WhatsApp pour vérifier la disponibilité et réserver directement.'],
        ['Êtes-vous disponible 24/7 ?', 'Oui. Pôle Car propose une disponibilité 24h/24 pour les demandes de réservation.'],
        ['La voiture peut-elle être livrée ?', 'La livraison peut être possible selon la disponibilité et l’emplacement à Casablanca.'],
        ['Quelles catégories sont disponibles ?', 'Économique, compacte, SUV, familiale, premium et SUV luxe.'],
        ['Comment vérifier la disponibilité ?', 'Appelez l’agence ou envoyez un message WhatsApp avec vos dates et le véhicule souhaité.'],
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Réservez directement avec l’agence de Casablanca.',
      text: 'Un formulaire premium prêt pour Supabase, avec contact direct par téléphone et WhatsApp.',
      desk: 'Conciergerie',
      available: 'Disponible 24/7',
      labels: ['Nom complet', 'Numéro de téléphone', 'Véhicule', 'Date de départ', 'Date de retour', 'Message'],
      placeholders: ['Votre nom', '+212...', 'Choisir un véhicule', 'Expliquez votre besoin'],
      send: 'Envoyer la demande',
    },
    map: { eyebrow: 'Localisation', title: 'Trouvez l’agence à Casablanca.', text: 'OpenStreetMap reste gratuit et ne nécessite pas de clé API Google Maps.', open: 'Ouvrir dans Google Maps' },
    footer: { quick: 'Liens rapides', contact: 'Contact', text: 'Location de voitures premium à Casablanca avec véhicules propres, contact direct et disponibilité 24/7.', copyright: '© 2026 Pôle Car. Tous droits réservés.' },
  },
  ar: {
    dir: 'rtl',
    nav: ['الرئيسية', 'الخدمات', 'السيارات', 'الآراء', 'الأسئلة', 'اتصل بنا'],
    callNow: 'اتصل الآن',
    bookNow: 'احجز الآن',
    reserveWhatsapp: 'احجز عبر واتساب',
    viewFleet: 'عرض السيارات',
    bookWhatsapp: 'احجز عبر واتساب',
    whatsapp: 'واتساب',
    heroEyebrow: 'تأجير سيارات فاخرة في الدار البيضاء',
    heroTitle: 'تأجير سيارات مميز في الدار البيضاء',
    heroText: 'أسطول مختار بعناية، حجز مباشر، ودعم متوفر 24/7 لرحلات العمل والمطار والتنقل داخل المدينة.',
    badges: ['تقييم 4.1/5', '47 مراجعة Google', 'متوفر 24/7', 'وكالة في الدار البيضاء'],
    stats: [['4.1/5', 'تقييم العملاء'], ['47', 'مراجعة Google'], ['24/7', 'متوفر'], ['الدار البيضاء', 'وكالة محلية']],
    why: {
      eyebrow: 'لماذا تختارنا',
      title: 'تجربة تأجير راقية بدون تعقيد.',
      text: 'مصممة لاتخاذ القرار بسرعة، والتواصل بوضوح، والانطلاق بسيارة جاهزة لرحلتك.',
      items: [
        [Zap, 'حجز سريع', 'احجز بسرعة عبر الهاتف أو واتساب دون خطوات معقدة.'],
        [DollarSign, 'أسعار مناسبة', 'أسعار واضحة للسيارات الاقتصادية وSUV والفاخرة.'],
        [Sparkles, 'سيارات نظيفة', 'يتم تجهيز السيارات بعناية قبل كل عملية تأجير.'],
        [MessageCircle, 'تواصل مباشر عبر واتساب', 'تحدث مباشرة مع فريق الوكالة وتأكد من التوفر.'],
        [Clock, 'متوفر 24/7', 'دعم متواصل ليلاً ونهاراً لطلبات السفر العاجلة.'],
        [ShieldCheck, 'ثقة العملاء', 'وكالة محلية في الدار البيضاء مع تقييمات حقيقية.'],
      ],
    },
    services: {
      eyebrow: 'الخدمات',
      title: 'خدمات مرنة لكل نوع من الرحلات.',
      text: 'إيجار قصير أو طويل، سفر عائلي أو مناسبة خاصة، كل ذلك عبر حجز مباشر وبسيط.',
      items: [
        ['إيجار قصير المدة', 'مناسب للتنقل داخل المدينة والمواعيد وعطلات نهاية الأسبوع.'],
        ['إيجار طويل المدة', 'مدد مرنة للإقامات الطويلة واحتياجات الشركات.'],
        ['سيارات اقتصادية', 'سيارات عملية بأسعار مناسبة.'],
        ['SUV وسيارات عائلية', 'راحة ومساحة أكبر للأمتعة والعائلة.'],
        ['سيارات فاخرة', 'تجربة أكثر أناقة للمواعيد والمناسبات الخاصة.'],
        ['التوصيل حسب التوفر', 'اسأل الفريق عن خيارات التوصيل داخل الدار البيضاء.'],
      ],
    },
    fleet: {
      eyebrow: 'السيارات',
      title: 'أسطول واضح يساعدك على الحجز بسرعة.',
      text: 'صور كبيرة، أسعار واضحة، ومواصفات أساسية قبل التواصل معنا.',
      categories: { economy: 'اقتصادية', compact: 'مدمجة', suv: 'SUV', premium: 'فاخرة', luxurySuv: 'SUV فاخرة' },
      specs: { manual: 'يدوي', automatic: 'أوتوماتيك', ac: 'مكيف', seats: '5 مقاعد' },
    },
    steps: {
      eyebrow: 'طريقة الحجز',
      title: 'من اختيار السيارة إلى الانطلاق في أربع خطوات.',
      items: [
        [Car, 'اختر السيارة', 'اختر الفئة المناسبة لرحلتك.'],
        [MessageCircle, 'تواصل معنا', 'أرسل رسالة واتساب أو اتصل بالوكالة مباشرة.'],
        [CalendarCheck, 'أكد الحجز', 'شارك تواريخك وتأكد من التوفر مع الفريق.'],
        [MapPin, 'استلم السيارة', 'زر الوكالة أو اسأل عن خيارات التوصيل.'],
      ],
    },
    reviews: {
      eyebrow: 'الآراء',
      title: 'مؤشرات ثقة بسيطة وحقيقية.',
      badge: 'تقييم Google 4.1/5',
      count: '47 مراجعة',
      items: ['خدمة جيدة جداً وأسعار مناسبة.', 'رد سريع وتجربة احترافية.', 'سيارة نظيفة وحجز سهل.', 'سأستأجر مرة أخرى بالتأكيد.'],
    },
    faq: {
      eyebrow: 'الأسئلة الشائعة',
      title: 'إجابات واضحة قبل الحجز.',
      items: [
        ['ما هي الوثائق المطلوبة؟', 'عادةً يلزم رخصة قيادة سارية ووثيقة هوية. تواصل مع Pôle Car للتأكيد.'],
        ['هل يمكنني الحجز عبر واتساب؟', 'نعم. استخدم زر واتساب للتحقق من التوفر والحجز مباشرة.'],
        ['هل أنتم متوفرون 24/7؟', 'نعم. Pôle Car متوفر 24/7 لطلبات الدعم والحجز.'],
        ['هل يمكن توصيل السيارة؟', 'قد يكون التوصيل ممكناً حسب التوفر والموقع داخل الدار البيضاء.'],
        ['ما هي الفئات المتوفرة؟', 'اقتصادية، مدمجة، SUV، عائلية، فاخرة وSUV فاخرة.'],
        ['كيف أتحقق من التوفر؟', 'اتصل بالوكالة أو أرسل رسالة واتساب مع التواريخ والسيارة المطلوبة.'],
      ],
    },
    contact: {
      eyebrow: 'اتصل بنا',
      title: 'احجز مباشرة مع وكالة الدار البيضاء.',
      text: 'نموذج حجز أنيق جاهز لتكامل Supabase مع خيارات التواصل المباشر عبر الهاتف وواتساب.',
      desk: 'خدمة الحجز',
      available: 'متوفر 24/7',
      labels: ['الاسم الكامل', 'رقم الهاتف', 'السيارة', 'تاريخ الاستلام', 'تاريخ الإرجاع', 'الرسالة'],
      placeholders: ['اسمك', '+212...', 'اختر سيارة', 'اكتب ما تحتاجه'],
      send: 'إرسال الطلب',
    },
    map: { eyebrow: 'الموقع', title: 'اعثر على الوكالة في الدار البيضاء.', text: 'OpenStreetMap مجاني ولا يحتاج إلى مفتاح Google Maps API.', open: 'فتح في Google Maps' },
    footer: { quick: 'روابط سريعة', contact: 'اتصال', text: 'تأجير سيارات مميز في الدار البيضاء مع سيارات نظيفة وتواصل مباشر وتوفر 24/7.', copyright: '© 2026 Pôle Car. جميع الحقوق محفوظة.' },
  },
};

const navHrefs = ['#home', '#services', '#fleet', '#reviews', '#faq', '#contact'];
const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: 'easeOut' },
};

function LanguageSwitch({ lang, setLang, scrolled = true }) {
  return (
    <div className={`flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] ${scrolled ? 'text-neutral-500' : 'text-white/70'}`}>
      {['fr', 'ar', 'en'].map((code, index) => (
        <React.Fragment key={code}>
          <button className={lang === code ? 'text-[#c9a45c]' : 'transition hover:text-[#c9a45c]'} type="button" onClick={() => setLang(code)}>
            {code.toUpperCase()}
          </button>
          {index < 2 && <span>/</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

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

function Navbar({ t, lang, setLang }) {
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
          {t.nav.map((label, index) => (
            <a key={label} href={navHrefs[index]} className={`group relative px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition ${scrolled ? 'text-neutral-600 hover:text-neutral-950' : 'text-white/72 hover:text-white'}`}>
              {label}
              <span className="absolute bottom-0 left-4 h-px w-0 bg-[#c9a45c] transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className={`hidden border-r pr-4 sm:block ${scrolled ? 'border-neutral-200' : 'border-white/20'}`}>
            <LanguageSwitch lang={lang} setLang={setLang} scrolled={scrolled} />
          </div>
          <Button asChild variant={scrolled ? 'dark' : 'glass'} size="sm" className="hidden sm:inline-flex uppercase">
            <a href={phoneHref}><Phone className="h-4 w-4" />{t.callNow}</a>
          </Button>
          <Button variant={scrolled ? 'outline' : 'glass'} size="icon" className="lg:hidden" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className={`fixed inset-y-0 top-0 z-50 w-[min(86vw,390px)] border-neutral-200 bg-white px-7 py-6 text-neutral-950 shadow-2xl lg:hidden ${t.dir === 'rtl' ? 'left-0 border-r' : 'right-0 border-l'}`}>
          <div className="mb-10 flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-[0.32em]">Pôle Car</span>
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
          </div>
          <nav className="grid gap-1">
            {t.nav.map((label, index) => (
              <a key={label} href={navHrefs[index]} className="border-b border-neutral-100 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-700" onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-8"><LanguageSwitch lang={lang} setLang={setLang} /></div>
          <Button asChild size="lg" className="mt-8 w-full uppercase">
            <a href={whatsappHref} target="_blank" rel="noreferrer">{t.bookNow}</a>
          </Button>
        </div>
      )}
    </header>
  );
}

function Hero({ t }) {
  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden bg-black px-5 text-white sm:px-8">
      <div className="absolute inset-0 -z-20">
        <img src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=2200&q=86" alt="Luxury car at night" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.62)_42%,rgba(0,0,0,0.18)_100%),linear-gradient(180deg,rgba(0,0,0,0.44)_0%,rgba(0,0,0,0.08)_42%,#050505_100%)]" />
      <div className="mx-auto flex min-h-screen max-w-7xl items-center pt-24">
        <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-[#d8b66f]">{t.heroEyebrow}</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[5.8rem]">{t.heroTitle}</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/72 sm:text-lg">{t.heroText}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><a href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle className="h-5 w-5" />{t.reserveWhatsapp}</a></Button>
            <Button asChild variant="glass" size="lg"><a href="#fleet">{t.viewFleet}<ArrowRight className="h-5 w-5" /></a></Button>
          </div>
          <div className="mt-10 grid max-w-3xl gap-x-8 gap-y-4 border-t border-white/15 pt-7 sm:grid-cols-2 lg:grid-cols-4">
            {t.badges.map((badge) => (
              <div key={badge} className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70"><Check className="mr-2 inline h-4 w-4 text-[#d8b66f]" />{badge}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats({ t }) {
  return <section className="bg-[#050505] px-5 pb-16 sm:px-8"><div className="mx-auto grid max-w-7xl border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">{t.stats.map(([value, label]) => <article key={label} className="border-b border-white/10 py-8 sm:border-r lg:border-b-0 lg:px-8"><strong className="block text-3xl font-semibold tracking-[-0.03em] text-white">{value}</strong><span className="mt-2 block text-xs font-semibold uppercase tracking-[0.22em] text-white/45">{label}</span></article>)}</div></section>;
}

function WhyChoose({ t }) {
  return <Section eyebrow={t.why.eyebrow} title={t.why.title} text={t.why.text}><div className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 md:grid-cols-2 lg:grid-cols-3">{t.why.items.map(([Icon, title, text]) => <article key={title} className="group bg-[#f6f4ef] p-8 transition hover:bg-white"><Icon className="mb-8 h-6 w-6 text-[#9b7836]" strokeWidth={1.5} /><h3 className="text-lg font-semibold tracking-[-0.02em] text-neutral-950">{title}</h3><p className="mt-4 leading-7 text-neutral-600">{text}</p></article>)}</div></Section>;
}

function Services({ t }) {
  return <Section id="services" dark eyebrow={t.services.eyebrow} title={t.services.title} text={t.services.text}><div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">{t.services.items.map(([title, text]) => <article key={title} className="bg-[#090909] p-8 transition hover:bg-[#111]"><Car className="mb-8 h-6 w-6 text-[#d8b66f]" strokeWidth={1.5} /><h3 className="text-lg font-semibold tracking-[-0.02em] text-white">{title}</h3><p className="mt-4 leading-7 text-white/58">{text}</p></article>)}</div></Section>;
}

function Fleet({ t }) {
  return (
    <Section id="fleet" eyebrow={t.fleet.eyebrow} title={t.fleet.title} text={t.fleet.text}>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {fleet.map(([name, category, price, transmission, image]) => (
          <article key={name} className="group bg-white">
            <div className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#343434,black_68%)]">
              <img src={image} alt={`${name} rental car`} loading="lazy" className="h-72 w-full object-cover object-center opacity-95 saturate-[0.92] transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:saturate-100 sm:h-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/10 to-transparent" />
              <span className="absolute left-5 top-5 border border-white/25 bg-black/35 px-3 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">{t.fleet.categories[category]}</span>
              <span className="absolute bottom-5 right-5 bg-[#c9a45c] px-4 py-2 text-sm font-semibold text-black shadow-xl">{price}</span>
            </div>
            <div className="border border-t-0 border-neutral-200 p-6">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">{name}</h3>
              <div className="mt-5 grid grid-cols-3 gap-px bg-neutral-200 text-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-neutral-600">
                {[t.fleet.specs[transmission], t.fleet.specs.ac, t.fleet.specs.seats].map((spec) => <span key={spec} className="bg-white px-3 py-3">{spec}</span>)}
              </div>
              <Button asChild variant="dark" className="mt-6 w-full uppercase"><a href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle className="h-5 w-5" />{t.bookWhatsapp}</a></Button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function HowItWorks({ t }) {
  return <Section dark eyebrow={t.steps.eyebrow} title={t.steps.title}><div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">{t.steps.items.map(([Icon, title, text], index) => <article key={title} className="bg-[#090909] p-8"><div className="mb-8 flex items-center justify-between"><Icon className="h-6 w-6 text-[#d8b66f]" strokeWidth={1.5} /><span className="text-4xl font-semibold text-white/10">0{index + 1}</span></div><h3 className="text-lg font-semibold tracking-[-0.02em] text-white">{title}</h3><p className="mt-4 leading-7 text-white/58">{text}</p></article>)}</div></Section>;
}

function Reviews({ t }) {
  return <Section id="reviews" eyebrow={t.reviews.eyebrow} title={t.reviews.title}><div className="mb-8 inline-flex items-center gap-3 border border-neutral-200 bg-white px-5 py-3"><Star className="h-4 w-4 fill-[#c9a45c] text-[#c9a45c]" /><span className="text-sm font-semibold text-neutral-950">{t.reviews.badge}</span><span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">{t.reviews.count}</span></div><div className="grid gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-2 lg:grid-cols-4">{t.reviews.items.map((review) => <article key={review} className="bg-[#f6f4ef] p-7"><div className="mb-6 flex text-[#c9a45c]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-5 w-5 fill-current" />)}</div><p className="text-base font-medium leading-8 text-neutral-800">“{review}”</p></article>)}</div></Section>;
}

function FAQ({ t }) {
  return <Section id="faq" dark eyebrow={t.faq.eyebrow} title={t.faq.title}><Accordion type="single" collapsible defaultValue="faq-0" className="max-w-4xl">{t.faq.items.map(([question, answer], index) => <AccordionItem key={question} value={`faq-${index}`} className="rounded-none border-white/10 bg-transparent text-white"><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}</Accordion></Section>;
}

function Contact({ t }) {
  function handleSubmit(event) {
    event.preventDefault();
    // Supabase integration point:
    // Insert full_name, phone, vehicle, pickup_date, return_date, message,
    // status: 'new', created_at: new Date().toISOString()
    // into a future reservations table.
  }

  return (
    <Section id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title} text={t.contact.text}>
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="rounded-none border-neutral-200 bg-neutral-950 text-white"><CardContent className="p-8 lg:p-10"><p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#d8b66f]">{t.contact.desk}</p><h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white">Pôle Car Casablanca</h3><div className="mt-8 grid gap-5 text-white/66"><span><Phone className="mr-3 inline h-5 w-5 text-[#d8b66f]" />{phoneDisplay}</span><span><Clock className="mr-3 inline h-5 w-5 text-[#d8b66f]" />{t.contact.available}</span><address className="not-italic"><MapPin className="mr-3 inline h-5 w-5 text-[#d8b66f]" />N°48, Résidence Les champs Centre Magasin, 165 Bd Abdelmoumen, Casablanca 20100, Morocco</address></div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild><a href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle className="h-5 w-5" />{t.whatsapp}</a></Button><Button asChild variant="glass"><a href={phoneHref}><Phone className="h-5 w-5" />{t.callNow}</a></Button></div></CardContent></Card>
        <Card className="rounded-none border-neutral-200 bg-white"><CardContent className="p-6 sm:p-8 lg:p-10"><form className="grid gap-5" onSubmit={handleSubmit}><div className="grid gap-5 md:grid-cols-2"><label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">{t.contact.labels[0]}<Input name="full_name" placeholder={t.contact.placeholders[0]} required /></label><label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">{t.contact.labels[1]}<Input name="phone" type="tel" placeholder={t.contact.placeholders[1]} required /></label></div><label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">{t.contact.labels[2]}<Select name="vehicle" defaultValue=""><option value="" disabled>{t.contact.placeholders[2]}</option>{fleet.map(([name]) => <option key={name}>{name}</option>)}</Select></label><div className="grid gap-5 md:grid-cols-2"><label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">{t.contact.labels[3]}<Input name="pickup_date" type="date" /></label><label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">{t.contact.labels[4]}<Input name="return_date" type="date" /></label></div><label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">{t.contact.labels[5]}<Textarea name="message" placeholder={t.contact.placeholders[3]} /></label><Button type="submit" variant="dark" size="lg" className="w-full uppercase">{t.contact.send}</Button></form></CardContent></Card>
      </div>
    </Section>
  );
}

function MapSection({ t }) {
  return <Section dark eyebrow={t.map.eyebrow} title={t.map.title} text={t.map.text}><Map /><Button asChild variant="glass" className="mt-6"><a href={googleMapsHref} target="_blank" rel="noreferrer"><MapPin className="h-5 w-5" />{t.map.open}</a></Button></Section>;
}

function Footer({ t }) {
  return <footer className="bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-10 md:grid-cols-[1.4fr_0.8fr_1fr]"><div><a href="#home" className="flex items-center gap-4"><span className="h-px w-10 bg-[#c9a45c]" /><span><span className="block text-sm font-semibold uppercase tracking-[0.32em]">Pôle</span><span className="mt-1 block text-[0.62rem] font-medium uppercase tracking-[0.58em] text-white/55">Car</span></span></a><p className="mt-4 max-w-md leading-7 text-slate-400">{t.footer.text}</p></div><div><h3 className="font-black">{t.footer.quick}</h3><div className="mt-4 grid gap-2 text-slate-400">{t.nav.map((label, index) => <a key={label} href={navHrefs[index]} className="hover:text-[#d8b66f]">{label}</a>)}</div></div><div><h3 className="font-black">{t.footer.contact}</h3><div className="mt-4 grid gap-2 text-slate-400"><a href={phoneHref} className="hover:text-[#d8b66f]">{phoneDisplay}</a><a href={whatsappHref} target="_blank" rel="noreferrer" className="hover:text-[#d8b66f]">{t.whatsapp}</a><p>N°48, Résidence Les champs Centre Magasin, Casablanca</p></div></div></div><p className="mx-auto mt-10 max-w-7xl text-sm text-slate-500">{t.footer.copyright}</p></footer>;
}

function FloatingWhatsApp({ t }) {
  return <a href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Contact Pôle Car on WhatsApp" className="fixed bottom-5 right-5 z-50 inline-flex h-14 items-center gap-2 bg-[#1f9d55] px-5 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_18px_50px_rgba(31,157,85,0.32)] transition hover:-translate-y-1"><MessageCircle className="h-5 w-5" /><span className="hidden sm:inline">{t.whatsapp}</span></a>;
}

function App() {
  const [lang, setLang] = useState('fr');
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  return (
    <>
      <Navbar t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero t={t} />
        <Stats t={t} />
        <WhyChoose t={t} />
        <Services t={t} />
        <Fleet t={t} />
        <HowItWorks t={t} />
        <Reviews t={t} />
        <FAQ t={t} />
        <Contact t={t} />
        <MapSection t={t} />
      </main>
      <Footer t={t} />
      <FloatingWhatsApp t={t} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
