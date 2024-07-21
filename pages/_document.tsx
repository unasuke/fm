import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class UnasukeFmDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default UnasukeFmDocument;
