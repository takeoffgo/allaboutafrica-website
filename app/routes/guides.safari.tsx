import type { LinksFunction } from "react-router";
import type { Route } from "./+types/guides.safari";
import { Link } from "react-router";

import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import styles from "../guides/guides.module.scss";

const PARTNER_URL = "https://rqo13.share.hsforms.com/2ZrXw0pG4TASFD_3lUpditw";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "East Africa vs Southern Africa Safari — All About Africa" },
    {
      name: "description",
      content:
        "Choosing between East and Southern Africa for safari? We break down wildlife, landscapes, price, and experience to help you match your client to the right destination.",
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

export default function SafariGuide({}: Route.ComponentProps) {
  return (
    <div className={styles.page}>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div
          className={styles.hero__bg}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80&fit=crop&crop=center)",
          }}
        />
        <div className={styles.hero__overlay} />
        <div className={styles.hero__content}>
          <SiteNav />
          <div className={styles.hero__spacer} />
          <div className={styles.hero__body}>
            <p className={styles.hero__eyebrow}>Safari Destinations</p>
            <h1 className={styles.hero__title}>
              East
              <br />
              vs South
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
              <span>Safari Guide</span>
            </div>
            <h2 className={styles.lead__title}>
              East Africa or Southern Africa?
              <br />
              Matching Your Client to the Right Safari
            </h2>
            <p className={styles.lead__text}>
              Both regions offer world-class safari experiences — but they&apos;re
              fundamentally different. East Africa is defined by its vast open
              plains, extraordinary wildlife density, and the Great Migration.
              Southern Africa offers more diverse landscapes, more exclusive private
              conservancies, and different wildlife entirely. Here&apos;s how to
              think about the choice.
            </p>
          </div>
          <div className={styles.lead__meta}>
            <div className={styles.lead__metaItem}>
              <span className={styles.lead__metaLabel}>East Africa</span>
              <span className={styles.lead__metaValue}>Kenya · Tanzania</span>
            </div>
            <div className={styles.lead__metaItem}>
              <span className={styles.lead__metaLabel}>Southern Africa</span>
              <span className={styles.lead__metaValue}>Botswana · Zimbabwe · Zambia</span>
            </div>
            <div className={styles.lead__metaItem}>
              <span className={styles.lead__metaLabel}>Best for first-timers</span>
              <span className={styles.lead__metaValue}>Both regions</span>
            </div>
            <div className={styles.lead__metaItem}>
              <span className={styles.lead__metaLabel}>Price range</span>
              <span className={styles.lead__metaValue}>Mid to ultra-luxury</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Safari split panels ───────────────────────────────────────── */}
      <div className={styles.content}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionHead__eyebrow}>The Destinations</span>
          <h2 className={styles.sectionHead__title}>Two Worlds, One Continent</h2>
        </div>

        <div className={styles.safariSplit}>
          {/* East Africa */}
          <div className={styles.safariPanel}>
            <div
              className={styles.safariPanel__image}
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=1200&q=80&fit=crop&crop=center)",
              }}
            >
              <div className={styles.safariPanel__imageBadge}>
                <h3 className={styles.safariPanel__imageBadgeTitle}>East Africa</h3>
              </div>
            </div>
            <div className={styles.safariPanel__body}>
              <span className={styles.safariPanel__sub}>
                Kenya · Tanzania · Rwanda · Uganda
              </span>
              <ul className={styles.safariPanel__highlights}>
                <li className={styles.safariPanel__highlight}>
                  The Great Wildebeest Migration — 2 million animals moving between
                  Tanzania&apos;s Serengeti and Kenya&apos;s Masai Mara
                </li>
                <li className={styles.safariPanel__highlight}>
                  Open savannah landscapes; Africa&apos;s iconic big skies and acacia trees
                </li>
                <li className={styles.safariPanel__highlight}>
                  Extraordinary big cat density — lions, cheetahs, leopards
                </li>
                <li className={styles.safariPanel__highlight}>
                  Kilimanjaro as a backdrop in Amboseli; Ngorongoro Crater&apos;s extraordinary density
                </li>
                <li className={styles.safariPanel__highlight}>
                  Rich Maasai cultural experiences woven into many itineraries
                </li>
                <li className={styles.safariPanel__highlight}>
                  Gorilla trekking in Rwanda or Uganda as an add-on
                </li>
                <li className={styles.safariPanel__highlight}>
                  Beach extension to Zanzibar, Pemba Island, or the Kenyan coast
                </li>
              </ul>
              <div className={styles.safariPanel__bestFor}>
                <span className={styles.safariPanel__bestForLabel}>Best for</span>
                <span className={styles.safariPanel__bestForText}>
                  First-time safari-goers · The Migration · Wildlife volume ·
                  Cultural experiences · Gorilla add-on
                </span>
              </div>
            </div>
          </div>

          {/* Southern Africa */}
          <div className={styles.safariPanel}>
            <div
              className={styles.safariPanel__image}
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80&fit=crop&crop=center)",
              }}
            >
              <div className={styles.safariPanel__imageBadge}>
                <h3 className={styles.safariPanel__imageBadgeTitle}>Southern Africa</h3>
              </div>
            </div>
            <div className={styles.safariPanel__body}>
              <span className={styles.safariPanel__sub}>
                Botswana · Zimbabwe · Zambia · Namibia · South Africa
              </span>
              <ul className={styles.safariPanel__highlights}>
                <li className={styles.safariPanel__highlight}>
                  Okavango Delta water-based safari — mokoro, boat, and walking
                  in a UNESCO World Heritage wilderness
                </li>
                <li className={styles.safariPanel__highlight}>
                  Victoria Falls — one of the Seven Natural Wonders, split between
                  Zimbabwe and Zambia
                </li>
                <li className={styles.safariPanel__highlight}>
                  Africa&apos;s largest elephant herds in Chobe National Park, Botswana
                </li>
                <li className={styles.safariPanel__highlight}>
                  Private conservancies with very low visitor numbers — exclusive,
                  intimate game viewing
                </li>
                <li className={styles.safariPanel__highlight}>
                  Walking safaris at South Luangwa, Lower Zambezi — deeper
                  interaction with the bush
                </li>
                <li className={styles.safariPanel__highlight}>
                  Exceptional rhino tracking, particularly in Zimbabwe and South Africa
                </li>
                <li className={styles.safariPanel__highlight}>
                  Mozambique, Seychelles, or Madagascar beach extension options
                </li>
              </ul>
              <div className={styles.safariPanel__bestFor}>
                <span className={styles.safariPanel__bestForLabel}>Best for</span>
                <span className={styles.safariPanel__bestForText}>
                  Luxury &amp; exclusive experiences · Return safari-goers ·
                  Landscape diversity · Victoria Falls · Walking safaris
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Comparison table ──────────────────────────────────────────── */}
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionHead__title}>Side by Side</h2>
        </div>
        <div className={styles.compareTable}>
          <div className={styles.compareTable__head}>
            <div className={styles.compareTable__headCell}></div>
            <div className={styles.compareTable__headCell}>East Africa</div>
            <div className={styles.compareTable__headCell}>Southern Africa</div>
          </div>
          {[
            ["Wildlife density", "Very high", "High"],
            ["Landscape variety", "Savannah focused", "High — delta, desert, bushveld"],
            ["Big cats", "Exceptional", "Very good"],
            ["Elephants", "Good", "Outstanding (Chobe, Hwange)"],
            ["Exclusivity", "Shared conservancies", "Private concessions common"],
            ["Walking safaris", "Available", "Signature experience"],
            ["The Migration", "Yes — peak Jul–Oct", "No"],
            ["Victoria Falls", "No", "Yes"],
            ["Gorillas", "Yes — Rwanda/Uganda", "No"],
            ["Beach combo", "Zanzibar, Pemba", "Mozambique, Seychelles"],
            ["Best time", "Year-round; peak Jul–Oct", "May–Oct (dry season)"],
            ["Price", "Mid–ultra luxury", "Mid–ultra luxury"],
          ].map(([label, east, south]) => (
            <div key={label} className={styles.compareTable__row}>
              <div className={styles.compareTable__cell}>{label}</div>
              <div className={styles.compareTable__cell}>{east}</div>
              <div className={styles.compareTable__cell}>{south}</div>
            </div>
          ))}
        </div>

        {/* ── Practical info ────────────────────────────────────────────── */}
        <div className={styles.sectionHead}>
          <span className={styles.sectionHead__eyebrow}>For Travel Agents</span>
          <h2 className={styles.sectionHead__title}>How to Choose for Your Client</h2>
        </div>
        <div className={styles.practicalGrid}>
          <div className={styles.practicalCard}>
            <span className={styles.practicalCard__title}>First-Time Safari</span>
            <p className={styles.practicalCard__body}>
              Both regions work well for first-timers. If the client&apos;s dream is
              the Migration or seeing the Serengeti, start with East Africa. If they
              want something more exclusive and unusual — the Okavango Delta, Victoria
              Falls — Southern Africa is remarkable even for those new to safari. The
              key question is: what image do they have in their head?
            </p>
          </div>
          <div className={styles.practicalCard}>
            <span className={styles.practicalCard__title}>Return Visitors</span>
            <p className={styles.practicalCard__body}>
              If a client has done Kenya or Tanzania before, Southern Africa offers
              something genuinely different — water-based safari, walking safaris, and
              landscapes unlike anything in East Africa. The Okavango Delta in particular
              is unlike anywhere else on earth. Botswana and Zimbabwe are often the
              &ldquo;upgrade&rdquo; destination for experienced safari-goers.
            </p>
          </div>
          <div className={styles.practicalCard}>
            <span className={styles.practicalCard__title}>The Migration Factor</span>
            <p className={styles.practicalCard__body}>
              The Great Migration — the annual movement of 2 million wildebeest,
              zebra, and gazelle between Tanzania and Kenya — is one of the great
              wildlife spectacles on earth. The dramatic Mara River crossings happen
              July–October. Calving season in the southern Serengeti (January–February)
              is extraordinary. If a client mentions the Migration, East Africa
              is the answer.
            </p>
          </div>
          <div className={styles.practicalCard}>
            <span className={styles.practicalCard__title}>Budget &amp; Exclusivity</span>
            <p className={styles.practicalCard__body}>
              Both regions span a wide price range. East Africa is slightly more
              accessible at the middle-market level, with more competition and
              variety. Southern Africa&apos;s private conservancies and Botswana&apos;s
              exclusive camps tend to sit at the higher end — but they offer a
              genuinely more exclusive experience with far fewer visitors.
              For clients who value privacy and intimacy, Southern Africa delivers.
            </p>
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <div className={styles.cta}>
        <span className={styles.cta__eyebrow}>Let&apos;s Build the Itinerary</span>
        <h2 className={styles.cta__title}>
          Not Sure Which Way to Go?
        </h2>
        <p className={styles.cta__body}>
          We&apos;ve spent years in both regions and can help you match your
          client&apos;s personality, budget, and dream to the right destination.
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
