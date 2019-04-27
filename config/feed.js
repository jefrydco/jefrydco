import fm from "front-matter";
import { locales, readFileAsync } from "../helpers";

import blogPaths from "../contents/blogs";

export default () => {
  const feedList = locales.map(locale => {
    let path = null;
    if (locale.code === "id") {
      path = `/blog.xml`;
    } else {
      path = `/${locale.code}/blog.xml`;
    }
    return {
      path,
      type: "rss2",
      async create(feed) {
        feed.options = {
          title: "Blog - Jefrydco",
          id: `https://jefrydco.id${path}`,
          link: `https://jefrydco.id${path}`,
          language: locale.code,
          description: "A personal site of Jefry Dewangga."
        };

        feed.addContributor({
          name: "Jefry Dewangga",
          email: "jefrydco@gmail.com",
          link: "https://jefrydco.id"
        });

        const feedItems = await Promise.all(
          blogPaths.map(async blogPath => {
            let blogs = null;
            if (locale.code === "id") {
              blogs = await readFileAsync(
                `./contents/blogs/${blogPath}/index.md`
              );
            } else {
              blogs = await readFileAsync(
                `./contents/blogs/${blogPath}/index.${locale.code}.md`
              );
            }
            const { attributes } = await fm(blogs.toString());

            if (locale.code === "id") {
              return {
                title: attributes.title,
                id: `https://jefrydco.id/blog/${attributes.slug}`,
                link: `https://jefrydco.id/blog/${attributes.slug}`,
                image: `https://jefrydco.id${attributes.img}`,
                date: attributes.date,
                description: attributes.description,
                content: attributes.summary
              };
            } else {
              return {
                title: attributes.title,
                id: `https://jefrydco.id/blog/${attributes.slug}`,
                link: `https://jefrydco.id/${locale.code}/blog/${
                  attributes.slug
                }`,
                image: `https://jefrydco.id/${attributes.img}`,
                date: attributes.date,
                description: attributes.description,
                content: attributes.summary
              };
            }
          })
        );

        feedItems.forEach(feedItem => {
          feed.addItem(feedItem);
        });
      }
    };
  });

  return feedList;
};
