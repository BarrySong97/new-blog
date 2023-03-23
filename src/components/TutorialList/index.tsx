import React, { CSSProperties } from "react";
import "./index.css";
type Props = {};

type TutorialListItem = {
  name: string;
  cover: string;
  url: string;
  style: CSSProperties;
};
const TutorialList = () => {
  const commonStye = {
    height: 300,
    display: "flex",
    alignItems: "flex-end",
    borderRadius: 6,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const data: TutorialListItem[] = [
    {
      name: "AI 绘画",
      url: "/docs/AI",
      cover:
        "https://cdn.midjourney.com/b944491b-f2eb-4049-b6e2-067870f42640/grid_0.png",
      style: {
        backgroundColor: "#827fff",
        backgroundImage: `url(${"https://cdn.midjourney.com/b944491b-f2eb-4049-b6e2-067870f42640/grid_0.png"})`,
        ...commonStye,
      },
    },
  ];
  return (
    <div className="tutorial-list">
      {data.map((v, i) => (
        <div
          onClick={() => {
            window.open(v.url, "_blank");
          }}
          key={i}
          className="tutorial-item"
          style={v.style}
        >
          <div style={{ color: "white", padding: "10px 6px", fontWeight: 600 }}>
            {v.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TutorialList;
