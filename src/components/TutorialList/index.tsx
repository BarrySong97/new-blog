import React from "react";
import "./index.css";
type Props = {};

type TutorialListItem = {
  name: string;
  cover: string;
};
const TutorialList = () => {
  const data: TutorialListItem[] = [
    {
      name: "如何创建一个自己的组件库(基于vite)",
      cover:
        "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/359ac54a4608421f854b11b27201723c~tplv-k3u1fbpfcp-watermark.image?",
    },
  ];
  return (
    <div className="tutorial-list">
      {data.map((v, i) => (
        <div key={i} className="tutorial-item">
          <img src={v.cover} alt="" />
          <div>{v.name}</div>
        </div>
      ))}
    </div>
  );
};

export default TutorialList;
