import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import React from "react";

class UnasukeFmDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <link
            rel="alternate"
            type="application/rss+xml"
            href={`${process.env.DEPLOY_URL}/feed.xml`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default UnasukeFmDocument;
