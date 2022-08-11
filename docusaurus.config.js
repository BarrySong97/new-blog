// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "BarrySong4Real",
  tagline: "Dinosaurs are cool",
  url: "https://barrysong.netlify.app/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "BarrySong97", // Usually your GitHub org/user name.
  projectName: "BarrySongBlog", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh",
    locales: ["zh"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          blogSidebarCount: 5,
          postsPerPage: 15,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      algolia: {
        appId: "0OBNE796HF",

        // Public API key: it is safe to commit it
        apiKey: "d1ca46629d989baf0770ae813a08cd90",

        indexName: "netlify_f5a2c39d-f76f-4ed6-ac05-eb3ac5119cd4_main_all",

        // Optional: see doc section below
        contextualSearch: true,
      },
      navbar: {
        title: "BarrySong4Real",
        logo: {
          src: "img/logo.svg",
        },
        items: [
          { to: "/blog", label: "Blog", position: "right" },
          {
            to: "/project",
            position: "right",
            label: "Project",
          },
          {
            label: "小册",
            position: "right",
            to: "/tutorial",
          },
          {
            label: "Resume",
            position: "right",
            href: "https://github.com/facebook/docusaurus",
          },
          // {
          //   href: "https://github.com/facebook/docusaurus",
          //   label: "GitHub",
          //   position: "right",
          // },
          {
            href: "https://github.com/your/repo",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
