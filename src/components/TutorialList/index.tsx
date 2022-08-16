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
      name: "如何创建一个自己的组件库(基于vite)",
      url: "/docs/create-your-own-component-library",
      cover:
        "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/359ac54a4608421f854b11b27201723c~tplv-k3u1fbpfcp-watermark.image?",
      style: {
        backgroundColor: "#827fff",
        backgroundImage: `url(${"https://camo.githubusercontent.com/61e102d7c605ff91efedb9d7e47c1c4a07cef59d3e1da202fd74f4772122ca4e/68747470733a2f2f766974656a732e6465762f6c6f676f2e737667"})`,
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
