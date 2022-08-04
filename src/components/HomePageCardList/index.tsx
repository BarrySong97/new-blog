import React from "react";
import HomePageCard from "../HomePageCard";
import { BrandicoBloggerRect } from "./icons";

type Props = {};

export default function HomePageCardList({}: Props) {
  const projectList = [
    {
      sectionName: "React Component",
      projects: [
        {
          title: "Resize-Layout",
          description: "可伸缩布局,类似vscode布局",
          href: "https://github.com/BarrySong97/z-components/tree/main/packages/resize-layout",
          icon: <BrandicoBloggerRect style={{ color: "#00b5f8" }} />,
        },
      ],
    },
  ];
  return (
    <div>
      {projectList.map((v) => (
        <div style={{ marginBottom: 16 }}>
          <h2>React Component</h2>
          <div className="homepagecard-list">
            {v.projects.map((p) => (
              <HomePageCard
                icon={p.icon}
                to={p.href}
                title={p.title}
                description={p.description}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
