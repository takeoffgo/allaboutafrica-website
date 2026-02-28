import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx"),
  route("2026", "routes/home.tsx"),
  route("2026/itinerary/:key", "routes/itinerary.tsx"),
  route("guides/gorilla-trekking", "routes/guides.gorilla-trekking.tsx"),
  route("guides/safari", "routes/guides.safari.tsx"),
  route("guides/packing", "routes/guides.packing.tsx"),
] satisfies RouteConfig;
