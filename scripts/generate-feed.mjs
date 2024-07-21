import fs from "fs";
import path from "path";
import { Podcast } from "podcast";
import yaml from "js-yaml";
import fetch from "node-fetch";

(async () => {
  const episodes = yaml.load(
    fs.readFileSync(path.join(process.cwd(), "episodes.yaml"), "utf8")
  );

  const feed = new Podcast({
    title: "unasuke.fm",
    description: "description",
    feed_url: `${process.env.DEPLOY_URL}/feed.xml`,
    site_url: process.env.DEPLOY_URL,
    image_url: `${process.env.DEPLOY_URL}/artwork.png`,
    docs: process.env.DEPLOY_URL,
    author: "unasuke",
    language: "ja",
    categories: ["Technology"],
    ttl: "60",
    itunesAuthor: "unasuke",
    itunesSubtitle: "",
    itunesSummary: "",
    itunesOwner: { name: "unasuke", email: "yusuke1994525@gmail.com" },
    itunesExplicit: false,
    itunesCategory: [
      {
        text: "Entertainment",
        subcats: [
          {
            text: "Television",
          },
        ],
      },
    ],
    itunesImage: `${process.env.DEPLOY_URL}/artwork.png`,
  });
  for (const ep of episodes) {
    // console.log(ep);
    let length, type;
    await fetch(ep.url, { method: "HEAD" })
      .then((response) => {
        length = response.headers.get("content-length");
        type = response.headers.get("content-type").split("; ")[0];
      })
      .catch((e) => {
        console.warn(e);
      });
    feed.addItem({
      title: ep.title,
      description: ep.description,
      url: `${process.env.DEPLOY_URL}/ep/${ep.id}`,
      date: ep.date,
      enclosure: { url: ep.url, size: length.toString(), type: type },
    });
  }
  const xml = feed.buildXml("  ");
  fs.writeFileSync("public/feed.xml", xml);
})();
