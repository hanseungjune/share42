/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const UserCommunityBtnStyle = css`
  & > .sort-button-news,
  & > .sort-button-need,
  & > .sort-button-share {
    font-size: 0.7rem;
    width: 15vw;
    height: 4vh;
    margin-right: 3vw;
    border-radius: 25%;
    background-color: white;
    border-color: rgb(173, 173, 173);
    border: 1px solid black;
  }

  & > .sort-button-recent,
  & > .sort-button-popular {
    font-size: 0.7rem;
    width: 15vw;
    height: 4vh;
    margin-right: 3vw;
    border-radius: 25%;
    color: #ffabab;
    background-color: white;
    border:#ffabab;
  }
  & > .sort-button-recent.active,
  & > .sort-button-popular.active,
  & > .sort-button-news.active,
  & > .sort-button-need.active,
  & > .sort-button-share.active {
    background-color: #ffabab;
    border: none;
    color: #ffffff;
    font-weight: 900;
  }
`;