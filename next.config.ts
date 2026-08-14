import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    // Two root layouts (frontend/payload route groups) mean no single layout
    // can compose a 404; app/global-not-found.tsx handles unmatched URLs.
    globalNotFound: true,
  },
};

export default withPayload(nextConfig);
