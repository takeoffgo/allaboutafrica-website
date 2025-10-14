import moment from "moment";
import Link from "next/link";

const Footer: React.FC = () => (
  <footer className="section container has-text-centered is-hidden-print is-uppercase">
    <ul>
      <li>
        <p className="heading">
          Take Off Go, copyright {moment().format("YYYY")}. All rights reserved.
          ABN <span className="is-amount">15 634 608 567</span>
        </p>
      </li>
      <li>
        <Link href="/legal/website-terms" className="heading">
          Terms and conditions
        </Link>
      </li>
      <li>
        <Link href="/legal/privacy-policy" className="heading">
          Privacy policy
        </Link>
      </li>
      <li>
        <a
          className="heading"
          href="https://www.pokko.io/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Powered by Pokko
        </a>
      </li>
    </ul>
  </footer>
);

export default Footer;
