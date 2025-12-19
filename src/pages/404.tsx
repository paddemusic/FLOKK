
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, scaleOnPress } from "@/lib/motion";
import { Home, ArrowLeft } from "lucide-react";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found | FREND</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-brand-black">
        <div className="text-center px-6 max-w-2xl">
          <motion.div
            {...fadeUp}
            className="mb-8"
          >
            <h1 className="text-9xl font-bold text-brand-red mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-brand-white mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-brand-white/60 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/">
              <motion.button
                {...scaleOnPress}
                className="flex items-center gap-2 px-6 py-3 bg-brand-red text-brand-white font-semibold rounded-lg hover:bg-brand-red/90 transition-colors"
              >
                <Home size={20} />
                Back to Home
              </motion.button>
            </Link>

            <motion.button
              {...scaleOnPress}
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 bg-brand-white/5 border border-brand-white/10 text-brand-white font-semibold rounded-lg hover:bg-brand-white/10 transition-colors"
            >
              <ArrowLeft size={20} />
              Go Back
            </motion.button>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.4 }}
            className="mt-16"
          >
            <p className="text-sm text-brand-white/40">
              Error Code: 404 | Lost in the creative void
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
