import Head from "next/head";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";

const THEME = {
  COLORS: {
    ALABASTER: "#f9fafa",
    RICE_CAKE: "#f3f3f3",
    LILAC: "#e8e8e8",
    WHITE: "#fff",
    BLACK: "#000",
  },
};

const Layout = ({ children }) => {
  const isProduction = process.env.NODE_ENV === "production";
  return (
    <ThemeProvider theme={THEME}>
      <Head>
        <title>Lyra Labs 🥰</title>
        {isProduction && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-EW50ZSVFBP"
            ></script>

            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-EW50ZSVFBP');
              `,
              }}
            />
          </>
        )}
      </Head>
      <Global
        styles={css`
          body {
            font-size: 18px;
            background-color: ${THEME.COLORS.ALABASTER};
            margin: 0;
          }
          iframe {
            z-index: 2;
          }
        `}
      />
      <main>{children}</main>
      <link rel="shortcut icon" href="/static/favicon.ico" />
    </ThemeProvider>
  );
};

export default Layout;
