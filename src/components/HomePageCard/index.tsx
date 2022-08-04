import React from "react";
import { paramCase } from "param-case";
import Link from "@docusaurus/Link";

export default function HomepageCard({ icon, title, description, to }) {
  return (
    <Link href={to} className="homepage-card">
      {icon && <div className="icon">{icon}</div>}
      <div className="card-content">
        <div className="title">
          {title}
          <svg
            width="13.5"
            height="13.5"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"
          >
            <path
              fill="currentColor"
              d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
            ></path>
          </svg>
        </div>
        <div className="description">{description}</div>
      </div>
    </Link>
  );
}
