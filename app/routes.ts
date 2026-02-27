import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("2026/itinerary/:key", "routes/itinerary.tsx")
] satisfies RouteConfig;
