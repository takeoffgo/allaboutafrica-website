import type { LinksFunction } from "react-router";
import type { Route } from "./+types/home";
import { Link } from "react-router";

import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import styles from "../home/home.module.scss";

const PARTNER_URL = "https://rqo13.share.hsforms.com/2ZrXw0pG4TASFD_3lUpditw";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "All About Africa — Africa Specialists for the Travel Trade" },
    {
      name: "description",
      content:
        "Australia's dedicated Africa travel specialists, exclusively serving travel agents. Expertly curated African experiences for your clients.",
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

export default function Home({}: Route.ComponentProps) {
  return (
    <div className={styles.page}>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div
          className={styles.hero__bg}
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80&fit=crop&crop=center)" }}
        />
        <div className={styles.hero__overlay} />
        <div className={styles.hero__content}>
          <SiteNav />
          <div className={styles.hero__spacer} />
          <div className={styles.hero__body}>
            <p className={styles.hero__eyebrow}>For the Travel Trade</p>
            <h1 className={styles.hero__title}>
              Africa.
              <br />
              All
              <br />
              Heart.
            </h1>
            <hr className={styles.hero__divider} />
            <p className={styles.hero__subtitle}>
              Australia&apos;s dedicated Africa specialists — exclusively serving
              travel agents who want to take their clients somewhere
              extraordinary.
            </p>
            <div className={styles.hero__actions}>
              <a
                href={PARTNER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.hero__ctaPrimary}
              >
                Partner With Us
              </a>
              <Link to="/guides/gorilla-trekking" className={styles.hero__ctaSecondary}>
                Explore Our Guides
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.hero__scroll}>
          <span className={styles.hero__scrollLine} />
          Scroll
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────── */}
      <div className={styles.strip}>
        <div className={styles.strip__item}>
          <div className={styles.strip__number}>20+</div>
          <div className={styles.strip__label}>
            Years travelling &amp; working across Africa
          </div>
        </div>
        <div className={styles.strip__item}>
          <div className={styles.strip__number}>B2B</div>
          <div className={styles.strip__label}>
            Exclusively serving travel agents — not the public
          </div>
        </div>
        <div className={styles.strip__item}>
          <div className={styles.strip__number}>100%</div>
          <div className={styles.strip__label}>
            Personalised support on every quote &amp; itinerary
          </div>
        </div>
      </div>

      {/* ── About ─────────────────────────────────────────────────────── */}
      <section className={styles.about}>
        <div
          className={styles.about__image}
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1612895155585-85e5b9ff2e8c?w=1200&q=80&fit=crop&crop=center)" }}
        >
          <div className={styles.about__imageFigure}>
            <p className={styles.about__imageQuote}>
              &ldquo;Africa changes you. I&apos;ve seen it happen to every
              traveller I&apos;ve ever sent there.&rdquo;
            </p>
            <p className={styles.about__imageName}>Ivona — Founder</p>
          </div>
        </div>
        <div className={styles.about__content}>
          <span className={styles.about__eyebrow}>About Us</span>
          <h2 className={styles.about__title}>
            We Live &amp;
            <br />
            Breathe Africa
          </h2>
          <p className={styles.about__body}>
            All About Africa is an Australian-based travel business built
            entirely around the African continent. Founded by Ivona — an
            experienced Africa traveller who has spent decades exploring the
            continent&apos;s wildest corners — we partner exclusively with
            travel agents to bring their clients extraordinary African
            experiences.
          </p>
          <p className={styles.about__body}>
            We know Africa the way only repeated, passionate travel can teach
            you. From the gorilla forests of Rwanda and Uganda to the vast
            private conservancies of Botswana, from the Serengeti&apos;s
            endless plains to Mozambique&apos;s deserted islands — we have
            been there, slept there, and fallen in love there.
          </p>
          <hr className={styles.about__rule} />
          <p className={styles.about__byline}>
            &ldquo;We won&apos;t send your client somewhere we wouldn&apos;t
            go ourselves.&rdquo;
          </p>
          <span className={styles.about__bylineName}>
            Ivona — Founder, All About Africa
          </span>
        </div>
      </section>

      {/* ── Expertise ─────────────────────────────────────────────────── */}
      <section className={styles.expertise}>
        <div className={styles.expertise__head}>
          <span className={styles.expertise__eyebrow}>Our Specialities</span>
          <h2 className={styles.expertise__title}>
            Where We
            <br />
            Take Your Clients
          </h2>
        </div>
        <div className={styles.expertise__grid}>
          {/* East Africa */}
          <div className={styles.expertise__card}>
            <div
              className={styles.expertise__bg}
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=1200&q=80&fit=crop&crop=center)",
              }}
            />
            <div className={styles.expertise__overlay} />
            <div className={styles.expertise__cardContent}>
              <span className={styles.expertise__tag}>East Africa</span>
              <h3 className={styles.expertise__cardTitle}>Safari &amp; Migration</h3>
              <p className={styles.expertise__cardSub}>
                Kenya · Tanzania · Rwanda · Uganda
              </p>
              <Link to="/guides/safari" className={styles.expertise__cardLink}>
                Safari Guide →
              </Link>
            </div>
          </div>

          {/* Southern Africa */}
          <div className={styles.expertise__card}>
            <div
              className={styles.expertise__bg}
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80&fit=crop&crop=center)",
              }}
            />
            <div className={styles.expertise__overlay} />
            <div className={styles.expertise__cardContent}>
              <span className={styles.expertise__tag}>Southern Africa</span>
              <h3 className={styles.expertise__cardTitle}>Delta &amp; Victoria Falls</h3>
              <p className={styles.expertise__cardSub}>
                Botswana · Zimbabwe · Zambia · Namibia
              </p>
              <Link to="/guides/safari" className={styles.expertise__cardLink}>
                Safari Guide →
              </Link>
            </div>
          </div>

          {/* Gorilla Trekking */}
          <div className={styles.expertise__card}>
            <div
              className={styles.expertise__bg}
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1508780709619-79562169bc64?w=1200&q=80&fit=crop&crop=center)",
              }}
            />
            <div className={styles.expertise__overlay} />
            <div className={styles.expertise__cardContent}>
              <span className={styles.expertise__tag}>Gorilla Trekking</span>
              <h3 className={styles.expertise__cardTitle}>Into the Forest</h3>
              <p className={styles.expertise__cardSub}>Rwanda · Uganda · DRC</p>
              <Link to="/guides/gorilla-trekking" className={styles.expertise__cardLink}>
                Gorilla Guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Guides ────────────────────────────────────────────────────── */}
      <section className={styles.guides}>
        <div className={styles.guides__head}>
          <div>
            <span className={styles.guides__eyebrow}>Resources for Agents</span>
            <h2 className={styles.guides__title}>Agent Guides</h2>
          </div>
        </div>
        <div className={styles.guides__grid}>
          {/* Gorilla guide */}
          <Link to="/guides/gorilla-trekking" className={styles.guides__card}>
            <div
              className={styles.guides__cardImage}
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1508780709619-79562169bc64?w=800&q=80&fit=crop&crop=center)",
              }}
            />
            <div className={styles.guides__cardBody}>
              <span className={styles.guides__cardTag}>Destination Guide</span>
              <h3 className={styles.guides__cardTitle}>
                Gorilla Trekking: Rwanda vs Uganda vs DRC
              </h3>
              <p className={styles.guides__cardDesc}>
                The three countries where you can trek mountain gorillas offer
                very different experiences. Here&apos;s how to choose the right
                one for your client.
              </p>
              <span className={styles.guides__cardLink}>Read Guide</span>
            </div>
          </Link>

          {/* Safari guide */}
          <Link to="/guides/safari" className={styles.guides__card}>
            <div
              className={styles.guides__cardImage}
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=800&q=80&fit=crop&crop=center)",
              }}
            />
            <div className={styles.guides__cardBody}>
              <span className={styles.guides__cardTag}>Destination Guide</span>
              <h3 className={styles.guides__cardTitle}>
                East Africa vs Southern Africa Safari
              </h3>
              <p className={styles.guides__cardDesc}>
                Both regions offer world-class safari. Understanding the
                differences — landscape, wildlife, style, price — helps you
                match the right destination to the right client.
              </p>
              <span className={styles.guides__cardLink}>Read Guide</span>
            </div>
          </Link>

          {/* Packing guide */}
          <Link to="/guides/packing" className={styles.guides__card}>
            <div
              className={styles.guides__cardImage}
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=800&q=80&fit=crop&crop=center)",
              }}
            />
            <div className={styles.guides__cardBody}>
              <span className={styles.guides__cardTag}>Practical Guide</span>
              <h3 className={styles.guides__cardTitle}>
                Africa Packing Lists: Safari, Gorilla Trekking &amp; More
              </h3>
              <p className={styles.guides__cardDesc}>
                What to pack for a safari, gorilla trek, or coastal trip in
                Africa. Share these practical lists directly with your clients.
              </p>
              <span className={styles.guides__cardLink}>Read Guide</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Partner CTA ───────────────────────────────────────────────── */}
      <section className={styles.partner}>
        <span className={styles.partner__eyebrow}>Ready to Partner?</span>
        <h2 className={styles.partner__title}>
          Let&apos;s Talk
          <br />
          Africa
        </h2>
        <p className={styles.partner__body}>
          We work exclusively with travel agents. If you have clients who want
          to experience Africa — whether a classic safari, gorilla trek, or
          something completely custom — we&apos;d love to help you build it.
        </p>
        <a
          href={PARTNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.partner__cta}
        >
          Start the Conversation
        </a>
      </section>

      <SiteFooter />
    </div>
  );
}
