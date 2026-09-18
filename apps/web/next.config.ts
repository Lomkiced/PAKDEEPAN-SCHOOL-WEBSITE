import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  transpilePackages: ["@pakdeepan/ui", "@pakdeepan/config"],
};

export default withPayload(nextConfig);
