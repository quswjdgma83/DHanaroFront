import React from "react";
import { PhotoType } from "./type/commonType";
import "./ImageList.css"; // CSS 파일 임포트

function ImageList({ images }: { images: PhotoType[] }) {
  return (
    <div className="image-grid">
      {images.map((item: PhotoType) => {
        return (
          <img
            key={item.id} // key 속성 추가
            src={item.thumbnailUrl}
            alt={item.title} // alt 속성을 이미지 제목으로 변경
            style={{ width: "100%" }} // 인라인 스타일 수정
          />
        );
      })}
    </div>
  );
}

export default ImageList;
