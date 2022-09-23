import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { SettingsProvider } from "@/contexts/settings-context";
import { Head } from "@/components/common/head";
import { Layout } from "@/components/common/layouts";

function MyApp({ Component, pageProps }: AppProps) {
  const { settings, taxonomies } = pageProps;
  return (
    <>
      <NextNProgress
        color="#154291"
        height={2}
        options={{ showSpinner: false }}
      />
      <SettingsProvider value={{ ...settings, taxonomies }}>
        <Head />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SettingsProvider>
    </>
  );
}

export default MyApp;
