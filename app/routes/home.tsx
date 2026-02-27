import type { LinksFunction } from "react-router";
import type { Route } from "./+types/home";

import '../app.css';

export function meta({}: Route.MetaArgs) {
  return [{ title: "All About Africa" }];
}

export function loader({}: Route.LoaderArgs) {}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://cdn.allaboutafrica.au/fonts/copernicus/font.css",
  },
];

export default function Home({}: Route.ComponentProps) {
  return (
    <>
      <h1>
        All About Africa
        <br />
        All Heart
        <br />
        All Coming Soon
        <br />
        For the Travel Trade
      </h1>
      <div>
        <p>Interested about partnering with us?</p>
        <p>
          <a
            href="https://rqo13.share.hsforms.com/2ZrXw0pG4TASFD_3lUpditw"
            target="_blank"
            rel="noopener noreferrer"
          >
            Let&apos;s Talk Africa
          </a>
        </p>
      </div>
    </>
  );
}
