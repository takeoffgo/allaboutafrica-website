import type { LinksFunction } from "react-router";
import type { Route } from "./+types/guides.packing";
import { Link } from "react-router";

import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import styles from "../guides/guides.module.scss";

const PARTNER_URL = "https://rqo13.share.hsforms.com/2ZrXw0pG4TASFD_3lUpditw";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Africa Packing Lists: Safari, Gorilla Trekking & More — All About Africa" },
    {
      name: "description",
      content:
        "What to pack for safari, gorilla trekking, or a coastal trip in Africa. Practical packing lists to share with your clients before they travel.",
    },
  ];
}

export function loader({}: Route.LoaderArgs) {}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://cdn.allaboutafrica.au/fonts/copernicus/font.css",
  },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap",
  },
];

const safariItems = [
  { text: "Neutral-coloured clothing — khaki, olive, tan, beige, grey", note: "No white, no bright colours, no camouflage" },
  { text: "Long-sleeved shirts (2–3)", note: "Sun and insect protection" },
  { text: "Lightweight trousers (2–3 pairs)", note: "Zip-off styles are versatile" },
  { text: "Comfortable walking shoes or ankle boots" },
  { text: "Wide-brimmed sun hat" },
  { text: "Swimwear", note: "Most camps have pools or plunge pools" },
  { text: "Light fleece or jacket for early mornings", note: "Game drives before sunrise can be cold" },
  { text: "Smart casual outfit for evenings", note: "Some lodges are semi-formal at dinner" },
  { text: "Sandals or flip flops for use in camp" },
  { text: "Camera with zoom lens (200mm minimum)", note: "APS-C or mirrorless recommended" },
  { text: "Extra batteries and memory cards" },
  { text: "Binoculars (8×42 or 10×42 recommended)" },
  { text: "Universal power adapter", note: "Southern Africa uses Type D/M, East Africa Type G/G3" },
  { text: "Malaria prophylactics", note: "Consult a travel doctor; start before departure" },
  { text: "DEET insect repellent (50%+)" },
  { text: "High-SPF sunscreen" },
  { text: "Personal medications with a letter from your GP" },
  { text: "Basic first aid kit" },
  { text: "Hand sanitiser" },
  { text: "Headlamp or torch" },
  { text: "Reusable water bottle" },
  { text: "Small daypack or bag for game drives" },
];

const gorillaItems = [
  { text: "Heavy-duty waterproof hiking boots", note: "Ankle support is essential — non-negotiable" },
  { text: "Long, thick trousers", note: "Protection from nettles, thorns, and insects" },
  { text: "Long-sleeved shirt or light layer" },
  { text: "Garden or work gloves", note: "For grabbing branches and roots on steep sections" },
  { text: "Waterproof rain jacket or poncho", note: "It's a rainforest — expect rain even in dry season" },
  { text: "Gaiters", note: "Keeps mud, ants, and insects out of your boots" },
  { text: "Trekking poles", note: "Often provided but consider bringing your own" },
  { text: "Strong insect repellent", note: "Forest mosquitoes are persistent" },
  { text: "Small waterproof daypack or dry bag" },
  { text: "Altitude medication if prone to AMS", note: "Rwanda/DRC is at 2,200–4,500m elevation" },
  { text: "Water and snacks for the trek" },
  { text: "Camera (no flash permitted near gorillas)" },
];

const beachItems = [
  { text: "Reef-safe sunscreen", note: "Essential for Zanzibar, Mozambique, Seychelles — protect the reefs" },
  { text: "Lightweight cotton or linen clothing" },
  { text: "Sarong or coverup" },
  { text: "Rash vest for snorkelling" },
  { text: "Waterproof sandals" },
  { text: "Snorkel mask and fins", note: "Usually available to hire, but own gear is better" },
  { text: "Light layers for evenings", note: "Coastal evenings can have a breeze" },
  { text: "Mosquito repellent", note: "Malaria is present in most East African coastal areas" },
  { text: "Waterproof bag or case for electronics" },
];

const generalTips = [
  {
    title: "Soft-sided bags only",
    body: "Many bush planes (particularly in Botswana, Zimbabwe, and remote Tanzania) have strict baggage requirements. Soft-sided bags only — no rigid suitcases. Total weight is often 15kg including hand luggage.",
  },
  {
    title: "Pack light",
    body: "Most luxury safari lodges offer complimentary laundry. Pack for 3–4 days and use laundry services throughout your trip. You'll thank yourself when fitting into a bush plane.",
  },
  {
    title: "Leave room for souvenirs",
    body: "Africa has extraordinary craft markets, art, and textiles. Leave space in your bag — or pack a soft fold-away bag for the return journey.",
  },
  {
    title: "Check domestic airline allowances",
    body: "International allowances don't apply to African domestic and charter flights. Many impose 15–20kg total weight limits and strict bag size rules. Check at the time of booking.",
  },
];

export default function PackingLists({}: Route.ComponentProps) {
  return (
    <div className={styles.page}>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div
          className={styles.hero__bg}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=1920&q=80&fit=crop&crop=center)",
          }}
        />
        <div className={styles.hero__overlay} />
        <div className={styles.hero__content}>
          <SiteNav />
          <div className={styles.hero__spacer} />
          <div className={styles.hero__body}>
            <p className={styles.hero__eyebrow}>Practical Guide</p>
            <h1 className={styles.hero__title}>
              Packing
              <br />
              Lists
            </h1>
          </div>
        </div>
      </section>

      {/* ── Lead ──────────────────────────────────────────────────────── */}
      <div className={styles.lead}>
        <div className={styles.lead__inner}>
          <div>
            <div className={styles.lead__breadcrumb}>
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Packing Lists</span>
            </div>
            <h2 className={styles.lead__title}>
              What to Pack for Africa
            </h2>
            <p className={styles.lead__text}>
              Packing for Africa is different from any other destination — weight
              limits on bush flights are strict, neutral colours matter on safari,
              and the right footwear can make or break a gorilla trek. These lists
              are designed to be shared directly with your clients before they travel.
            </p>
          </div>
          <div className={styles.lead__meta}>
            <div className={styles.lead__metaItem}>
              <span className={styles.lead__metaLabel}>Covers</span>
              <span className={styles.lead__metaValue}>Safari · Gorilla · Beach</span>
            </div>
            <div className={styles.lead__metaItem}>
              <span className={styles.lead__metaLabel}>Bush flight limit</span>
              <span className={styles.lead__metaValue}>15kg soft bag</span>
            </div>
            <div className={styles.lead__metaItem}>
              <span className={styles.lead__metaLabel}>Colours</span>
              <span className={styles.lead__metaValue}>Neutral only on safari</span>
            </div>
            <div className={styles.lead__metaItem}>
              <span className={styles.lead__metaLabel}>Laundry</span>
              <span className={styles.lead__metaValue}>Most lodges included</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Safari packing ────────────────────────────────────────────── */}
      <div className={`${styles.packSection}`}>
        <div className={styles.packGrid}>
          <div className={styles.packInfo}>
            <span className={styles.packInfo__eyebrow}>East &amp; Southern Africa</span>
            <h2 className={styles.packInfo__title}>Safari Essentials</h2>
            <p className={styles.packInfo__body}>
              What to bring for a classic game drive safari — whether in Kenya,
              Tanzania, Botswana, Zimbabwe, or Zambia. Neutral colours are non-optional;
              bright clothing disturbs animals and can affect game viewing for everyone
              in the vehicle.
            </p>
          </div>
          <div className={styles.packList}>
            {safariItems.map((item, i) => (
              <div key={i} className={styles.packItem}>
                <span className={styles.packItem__dot} />
                <span className={styles.packItem__text}>
                  {item.text}
                  {item.note && (
                    <span className={styles.packItem__note}>{item.note}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gorilla packing ───────────────────────────────────────────── */}
      <div className={`${styles.packSection} ${styles["packSection--alt"]}`}>
        <div className={styles.packGrid}>
          <div className={styles.packInfo}>
            <span className={styles.packInfo__eyebrow}>Rwanda · Uganda · DRC</span>
            <h2 className={styles.packInfo__title}>Gorilla Trekking Additions</h2>
            <p className={styles.packInfo__body}>
              In addition to the safari essentials above, gorilla trekking requires
              specific gear. The forest is wet, steep, and thorny — the right boots
              and clothing make a real difference to your client&apos;s experience.
            </p>
          </div>
          <div className={styles.packList}>
            {gorillaItems.map((item, i) => (
              <div key={i} className={styles.packItem}>
                <span className={styles.packItem__dot} />
                <span className={styles.packItem__text}>
                  {item.text}
                  {item.note && (
                    <span className={styles.packItem__note}>{item.note}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Beach packing ─────────────────────────────────────────────── */}
      <div className={styles.packSection}>
        <div className={styles.packGrid}>
          <div className={styles.packInfo}>
            <span className={styles.packInfo__eyebrow}>Zanzibar · Mozambique · Seychelles</span>
            <h2 className={styles.packInfo__title}>Beach &amp; Coastal</h2>
            <p className={styles.packInfo__body}>
              Many Africa itineraries end with a beach extension. The Indian Ocean
              islands and coastline are spectacular — but reef-safe sunscreen is
              important, and coastal areas often require malaria precautions.
            </p>
          </div>
          <div className={styles.packList}>
            {beachItems.map((item, i) => (
              <div key={i} className={styles.packItem}>
                <span className={styles.packItem__dot} />
                <span className={styles.packItem__text}>
                  {item.text}
                  {item.note && (
                    <span className={styles.packItem__note}>{item.note}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── General tips ──────────────────────────────────────────────── */}
      <div className={`${styles.packSection} ${styles["packSection--alt"]}`}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionHead__eyebrow}>Key Rules</span>
          <h2 className={styles.sectionHead__title}>Things Clients Always Ask</h2>
        </div>
        <div className={styles.practicalGrid}>
          {generalTips.map((tip) => (
            <div key={tip.title} className={styles.practicalCard}>
              <span className={styles.practicalCard__title}>{tip.title}</span>
              <p className={styles.practicalCard__body}>{tip.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <div className={styles.cta}>
        <span className={styles.cta__eyebrow}>Ready to Plan?</span>
        <h2 className={styles.cta__title}>
          Let&apos;s Build the Perfect Africa Itinerary
        </h2>
        <p className={styles.cta__body}>
          These lists are a starting point — every trip is different. Talk to
          us about what your client is planning and we&apos;ll tailor the
          advice to their specific itinerary.
        </p>
        <a
          href={PARTNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta__button}
        >
          Partner With Us
        </a>
      </div>

      <SiteFooter />
    </div>
  );
}
