import "@/app/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { SettingsProvider } from "@/app/contexts/settings-context";
import { Head } from "@/shared/ui/head";
import { Layout } from "@/shared/ui/layouts";

function MyApp({ Component, pageProps }: AppProps) {
  const { settings, taxonomies, advert } = pageProps;
  return (
    <>
      <NextNProgress
        color="#154291"
        height={2}
        options={{ showSpinner: false }}
      />
      <SettingsProvider value={{ ...settings, taxonomies, advert }}>
        <Head />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SettingsProvider>
    </>
  );
}

export default MyApp;
