import type { LinksFunction } from "react-router";
import type { Route } from "./+types/guides.gorilla-trekking";
import { Link } from "react-router";

import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import styles from "../guides/guides.module.scss";

const PARTNER_URL = "https://rqo13.share.hsforms.com/2ZrXw0pG4TASFD_3lUpditw";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gorilla Trekking: Rwanda vs Uganda vs DRC — All About Africa" },
    {
      name: "description",
      content:
        "A complete guide to gorilla trekking in East Africa. Compare Rwanda, Uganda, and the DRC — permits, trek difficulty, lodges, and what's right for your client.",
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

export default function GorillaTrekking({}: Route.ComponentProps) {
  return (
    <div className={styles.page}>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div
          className={styles.hero__bg}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1508780709619-79562169bc64?w=1920&q=80&fit=crop&crop=center)",
          }}
        />
        <div className={styles.hero__overlay} />
        <div className={styles.hero__content}>
          <SiteNav />
          <div className={styles.hero__spacer} />
          <div className={styles.hero__body}>
            <p className={styles.hero__eyebrow}>East Africa</p>
            <h1 className={styles.hero__title}>
              Gorilla
              <br />
              Trekking
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
              <span>Gorilla Trekking</span>
            </div>
            <h2 className={styles.lead__title}>
              Rwanda, Uganda or DRC?
              <br />
              Choosing the Right Destination
            </h2>
            <p className={styles.lead__text}>
              Mountain gorilla trekking is one of the most extraordinary wildlife
              experiences on the planet — a genuine face-to-face encounter with our
              closest relatives in their natural habitat. But the three countries where
              you can do it — Rwanda, Uganda, and the DRC — offer very different
              experiences. This guide breaks down what matters when helping your
              clients choose.
            </p>
          </div>
          <div className={styles.lead__meta}>
            <div className={styles.lead__metaItem}>
              <span className={styles.lead__metaLabel}>Countries</span>
              <span className={styles.lead__metaValue}>Rwanda, Uganda, DRC</span>
            </div>
            <div className={styles.lead__metaItem}>
              <span className={styles.lead__metaLabel}>Permits from</span>
              <span className={styles.lead__metaValue}>USD 400</span>
            </div>
            <div className={styles.lead__metaItem}>
              <span className={styles.lead__metaLabel}>Best time</span>
              <span className={styles.lead__metaValue}>Jun–Sep · Dec–Feb</span>
            </div>
            <div className={styles.lead__metaItem}>
              <span className={styles.lead__metaLabel}>Age minimum</span>
              <span className={styles.lead__metaValue}>15 years</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Destination cards ─────────────────────────────────────────── */}
      <div className={styles.content}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionHead__eyebrow}>The Three Destinations</span>
          <h2 className={styles.sectionHead__title}>Pick Your Forest</h2>
          <p className={styles.sectionHead__body}>
            All three countries are home to habituated mountain gorilla families.
            The key differences are permit price, trek duration, luxury accommodation
            options, and the overall experience for your client.
          </p>
        </div>

        <div className={styles.destGrid}>
          {/* Rwanda */}
          <div className={styles.destCard}>
            <div
              className={styles.destCard__image}
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1508780709619-79562169bc64?w=800&q=80&fit=crop&crop=top)",
              }}
            >
              <span className={styles.destCard__imageBadge}>Volcanoes NP</span>
            </div>
            <div className={styles.destCard__body}>
              <span className={styles.destCard__permit}>USD 1,500</span>
              <span className={styles.destCard__permitLabel}>Per person, per trek</span>
              <h3 className={styles.destCard__title}>Rwanda</h3>
              <span className={styles.destCard__park}>Volcanoes National Park</span>
              <hr className={styles.destCard__rule} />
              <div className={styles.destCard__facts}>
                <div className={styles.destCard__fact}>
                  <span className={styles.destCard__factLabel}>Trek time</span>
                  <span className={styles.destCard__factValue}>1–4 hours</span>
                </div>
                <div className={styles.destCard__fact}>
                  <span className={styles.destCard__factLabel}>From airport</span>
                  <span className={styles.destCard__factValue}>2.5 hrs (Kigali)</span>
                </div>
                <div className={styles.destCard__fact}>
                  <span className={styles.destCard__factLabel}>Lodges</span>
                  <span className={styles.destCard__factValue}>World-class luxury</span>
                </div>
                <div className={styles.destCard__fact}>
                  <span className={styles.destCard__factLabel}>Families</span>
                  <span className={styles.destCard__factValue}>12 habituated</span>
                </div>
              </div>
              <p className={styles.destCard__desc}>
                Rwanda is the premium gorilla trekking destination. The permit is the
                most expensive but the experience is the most polished — shorter treks,
                extraordinary lodges (Singita, One&amp;Only, Wilderness), and easy
                combination with Kigali&apos;s culture and memorial. Most habituated
                gorillas per family, and the trek is generally shorter. Ideal for
                luxury-focused clients or those short on time.
              </p>
              <div className={styles.destCard__best}>
                <span className={styles.destCard__bestLabel}>Best for</span>
                <span className={styles.destCard__bestText}>
                  Luxury travellers · First-timers · Short itineraries · Cultural add-on
                </span>
              </div>
            </div>
          </div>

          {/* Uganda */}
          <div className={styles.destCard}>
            <div
              className={styles.destCard__image}
              style={{
                background:
                  "linear-gradient(145deg, #162618 0%, #223820 50%, #162618 100%)",
              }}
            >
              <span className={styles.destCard__imageBadge}>Bwindi Impenetrable Forest</span>
            </div>
            <div className={styles.destCard__body}>
              <span className={styles.destCard__permit}>USD 700</span>
              <span className={styles.destCard__permitLabel}>Per person, per trek</span>
              <h3 className={styles.destCard__title}>Uganda</h3>
              <span className={styles.destCard__park}>Bwindi Impenetrable Forest</span>
              <hr className={styles.destCard__rule} />
              <div className={styles.destCard__facts}>
                <div className={styles.destCard__fact}>
                  <span className={styles.destCard__factLabel}>Trek time</span>
                  <span className={styles.destCard__factValue}>1–8 hours</span>
                </div>
                <div className={styles.destCard__fact}>
                  <span className={styles.destCard__factLabel}>From airport</span>
                  <span className={styles.destCard__factValue}>8 hrs (Entebbe) or fly-in</span>
                </div>
                <div className={styles.destCard__fact}>
                  <span className={styles.destCard__factLabel}>Lodges</span>
                  <span className={styles.destCard__factValue}>Good, more rustic</span>
                </div>
                <div className={styles.destCard__fact}>
                  <span className={styles.destCard__factLabel}>Families</span>
                  <span className={styles.destCard__factValue}>19+ habituated</span>
                </div>
              </div>
              <p className={styles.destCard__desc}>
                Uganda offers more gorilla families than anywhere else in the world.
                The permit is more affordable, and the experience is wilder — treks
                through genuinely impenetrable forest can be long and strenuous, but
                the payoff is extraordinary. Bwindi can be combined with a savannah
                safari at Queen Elizabeth or Murchison Falls, making it ideal for
                clients who want both forest and plains.
              </p>
              <div className={styles.destCard__best}>
                <span className={styles.destCard__bestLabel}>Best for</span>
                <span className={styles.destCard__bestText}>
                  Adventure seekers · Value-conscious clients · Combined Uganda safari
                </span>
              </div>
            </div>
          </div>

          {/* DRC */}
          <div className={styles.destCard}>
            <div
              className={styles.destCard__image}
              style={{
                background:
                  "linear-gradient(145deg, #0e1a0e 0%, #1a2a18 50%, #0e1a0e 100%)",
              }}
            >
              <span className={styles.destCard__imageBadge}>Virunga NP</span>
            </div>
            <div className={styles.destCard__body}>
              <span className={styles.destCard__permit}>USD 400</span>
              <span className={styles.destCard__permitLabel}>Per person, per trek</span>
              <h3 className={styles.destCard__title}>DRC</h3>
              <span className={styles.destCard__park}>Virunga National Park</span>
              <hr className={styles.destCard__rule} />
              <div className={styles.destCard__facts}>
                <div className={styles.destCard__fact}>
                  <span className={styles.destCard__factLabel}>Trek time</span>
                  <span className={styles.destCard__factValue}>1–3 hours</span>
                </div>
                <div className={styles.destCard__fact}>
                  <span className={styles.destCard__factLabel}>From airport</span>
                  <span className={styles.destCard__factValue}>1.5 hrs (Goma)</span>
                </div>
                <div className={styles.destCard__fact}>
                  <span className={styles.destCard__factLabel}>Lodges</span>
                  <span className={styles.destCard__factValue}>Limited, improving</span>
                </div>
                <div className={styles.destCard__fact}>
                  <span className={styles.destCard__factLabel}>Add-on</span>
                  <span className={styles.destCard__factValue}>Nyiragongo Volcano</span>
                </div>
              </div>
              <p className={styles.destCard__desc}>
                Virunga is Africa&apos;s oldest national park and a UNESCO World Heritage
                Site. At USD 400, it&apos;s the most affordable gorilla permit. The
                security situation has improved significantly since Virunga Lodge
                reopened, but each trip must be individually assessed. For the right
                adventurous client, it&apos;s a remarkable experience — you can also
                add the overnight Nyiragongo volcano trek.
              </p>
              <div className={styles.destCard__best}>
                <span className={styles.destCard__bestLabel}>Best for</span>
                <span className={styles.destCard__bestText}>
                  Adventure travellers · Photographers · Off-the-beaten-path seekers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Comparison table ──────────────────────────────────────────── */}
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionHead__title}>Quick Comparison</h2>
        </div>
        <div className={styles.compareTable}>
          <div className={styles.compareTable__head}>
            <div className={styles.compareTable__headCell}></div>
            <div className={styles.compareTable__headCell}>Rwanda</div>
            <div className={styles.compareTable__headCell}>Uganda</div>
            <div className={styles.compareTable__headCell}>DRC</div>
          </div>
          {[
            ["Permit cost", "USD 1,500", "USD 700", "USD 400"],
            ["Trek duration", "1–4 hours", "1–8 hours", "1–3 hours"],
            ["Terrain difficulty", "Moderate", "Moderate–Strenuous", "Moderate"],
            ["Luxury lodges", "Excellent", "Good", "Limited"],
            ["Gorilla families", "12 habituated", "19+ habituated", "8 habituated"],
            ["Nearest airport", "Kigali (2.5hr)", "Entebbe / Kisoro", "Goma (1.5hr)"],
            ["Combine with", "Culture, Lake Kivu", "Uganda wildlife safari", "Nyiragongo volcano"],
            ["Security", "Stable", "Stable", "Assess trip-by-trip"],
          ].map(([label, rw, ug, drc]) => (
            <div key={label} className={styles.compareTable__row}>
              <div className={styles.compareTable__cell}>{label}</div>
              <div className={styles.compareTable__cell}>{rw}</div>
              <div className={styles.compareTable__cell}>{ug}</div>
              <div className={styles.compareTable__cell}>{drc}</div>
            </div>
          ))}
        </div>

        {/* ── Practical info ────────────────────────────────────────────── */}
        <div className={styles.sectionHead}>
          <span className={styles.sectionHead__eyebrow}>Practical Information</span>
          <h2 className={styles.sectionHead__title}>What Your Clients Need to Know</h2>
        </div>
        <div className={styles.practicalGrid}>
          <div className={styles.practicalCard}>
            <span className={styles.practicalCard__title}>Best Time to Go</span>
            <p className={styles.practicalCard__body}>
              Gorilla trekking is possible year-round, but the dry seasons make it
              significantly more comfortable. June–September is the primary dry season
              across all three destinations. December–February is a shorter dry window.
              The wet season (April–May, October–November) brings lush forest but muddy,
              slippery trails — treks can be more challenging but permits may be cheaper
              or more available.
            </p>
          </div>
          <div className={styles.practicalCard}>
            <span className={styles.practicalCard__title}>Fitness &amp; Preparation</span>
            <p className={styles.practicalCard__body}>
              Clients should be able to walk for several hours on uneven, often steep
              terrain. Rwanda&apos;s treks are generally shorter and more predictable.
              Uganda&apos;s Bwindi can be genuinely exhausting — clients should know
              this upfront. Porters are available at all destinations and are highly
              recommended. Altitude ranges from 2,200–4,500m, so altitude awareness
              is relevant, particularly for DRC.
            </p>
          </div>
          <div className={styles.practicalCard}>
            <span className={styles.practicalCard__title}>What to Wear</span>
            <p className={styles.practicalCard__body}>
              Long trousers and long-sleeved shirts are essential — the forest is full
              of nettles, insects, and thorns. Sturdy waterproof hiking boots are
              non-negotiable (ankle support is important). Garden/work gloves help when
              grabbing branches. A light rain jacket or poncho is important even in
              the dry season — it&apos;s a rainforest. Gaiters keep mud and ants out
              of boots. Dark or neutral colours preferred.
            </p>
          </div>
          <div className={styles.practicalCard}>
            <span className={styles.practicalCard__title}>Permits &amp; Booking</span>
            <p className={styles.practicalCard__body}>
              Rwanda and Uganda permits should be booked well in advance — Rwanda&apos;s
              permits in particular sell out months ahead for peak season. Groups are
              limited to 8 people per gorilla family per day, and one hour is spent
              with the gorillas (strictly enforced). DRC permits are more readily
              available. The minimum age for gorilla trekking across all destinations
              is 15 years. Speak to us about permit availability and timing.
            </p>
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <div className={styles.cta}>
        <span className={styles.cta__eyebrow}>Talk to Africa Specialists</span>
        <h2 className={styles.cta__title}>
          Ready to Plan a Gorilla Trek?
        </h2>
        <p className={styles.cta__body}>
          We&apos;ve trekked in all three countries and know which destination
          suits which client. Let&apos;s talk through the right fit.
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
