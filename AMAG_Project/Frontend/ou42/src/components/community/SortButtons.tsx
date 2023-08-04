/** @jsxImportSource @emotion/react */
import { SortCategories } from "../../hooks/useLoadPosts";
import { UserCommunityBtnStyle } from "../../styles/user/UserCommunity";

export type SortButtonsType = {
  activeSort: string;
  handleSort: (sortCategory: SortCategories) => void;
};

const sortArray = [
  { idx: 0, num: 0, title: "최신순", category: "recent" },
  { idx: 1, num: 1, title: "인기순", category: "popular" },
  { idx: 2, num: 1, title: "소식공유", category: "news" },
  { idx: 3, num: 2, title: "필요해요", category: "need" },
  { idx: 4, num: 3, title: "공유해요", category: "share" },
  { idx: 5, num: 0, title: "모든", category: "all" },
];

const SortButtons = ({ activeSort, handleSort }: SortButtonsType) => {
  function isSortCategory(category: string): category is SortCategories {
    return ["recent", "popular", "news", "need", "share"].includes(category);
  }

  return (
    <div
      style={{
        height: "7vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1vh",
        position: "fixed",
        top: "6vh",
        left: "7vw",
        backgroundColor: "#ffffff !important",
      }}
      css={UserCommunityBtnStyle}
    >
      {/* 순서버튼 */}
      {sortArray.map((item, idx) => {
        if (item.title === "모든") {
          return null;
        }
        return (
          <button
            key={idx}
            value={item.title}
            className={
              item.category === activeSort
                ? `sort-button-news active`
                : `sort-button-news`
            }
            onClick={() => {
              if (isSortCategory(item.category)) {
                handleSort(item.category);
              }
            }}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
};

export default SortButtons;
