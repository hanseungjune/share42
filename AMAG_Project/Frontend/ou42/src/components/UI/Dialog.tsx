/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { dialog } from "../../styles/user/UserHomeSpeenDial";

export default function Dialog({ termsContent }: any) {
  const dialogRef = React.useRef<HTMLDialogElement | any>({});
  const navigate = useNavigate();

  return (
    <dialog
      ref={(ref) => {
        return (dialogRef.current = ref);
      }}
      css={dialog}
      style={{
        textAlign: "center",
      }}
    >
      <h1>HOW TO 공유등록?</h1>
      <button
        onClick={() => {
          (dialogRef.current as any).close();
        }}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          border: "none",
          backgroundColor: "#ffffff",
        }}
      >
        X
      </button>
      <ul
        style={{
          textAlign: "left",
          paddingLeft: "20px",
        }}
      >
        {termsContent.map((term:string, index:number) => (
          <li
            style={{
              listStyleType: "dicimal",
            }}
            key={index}
          >
            {term}
          </li>
        ))}
      </ul>
      <button
        style={{
          padding: "3% 6%",
          fontWeight: "900",
          color: "#ffffff",
          backgroundColor: "#FFABAB",
          border: "none",
          borderRadius: "12px",
        }}
        onClick={() => navigate("/user/share-category")}
      >
        공유 등록하기
      </button>
    </dialog>
  );
}
