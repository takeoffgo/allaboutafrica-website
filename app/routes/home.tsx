import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "All About Africa" }];
}

export function loader({}: Route.LoaderArgs) {}

export default function Home({}: Route.ComponentProps) {
  return <pre>Shhh... we're sleeping. Come back soon.</pre>;
}
