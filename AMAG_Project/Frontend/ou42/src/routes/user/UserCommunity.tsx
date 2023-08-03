/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
// import { useEffect, useRef, useState } from "react";
// import communityStore from "../../store/communityStore";
// import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
// import axios from "axios";
// import UserCommunityBtns from "../../components/community/UserCommunityBtns";
// import UserCommunityPosts from "../../components/community/UserCommunityPosts";
// import UserCommunityBottomBar from "../../components/community/UserCommunityBottomBar";
// import { getTimeAgo } from "../../utils/getTimeAgo";
// import { L, pipe, takeAll } from "../../custom/FxJS";
// import { TokenStorage } from './../../hooks/tokenStorage';

import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaRegComment } from "react-icons/fa";
import { getTimeAgo } from "../../utils/getTimeAgo";
import UserCommunityBtns from "../../components/community/UserCommunityBtns";
import UserCommunityBottomBar from "../../components/community/UserCommunityBottomBar";
import { UserCommunityBtnStyle } from "../../styles/user/UserCommunity";

const sortArray = [
  { idx: 0, num: 0, title: "최신순", category: "recent" },
  { idx: 1, num: 1, title: "인기순", category: "popular" },
  { idx: 2, num: 1, title: "소식공유", category: "news" },
  { idx: 3, num: 2, title: "필요해요", category: "need" },
  { idx: 4, num: 3, title: "공유해요", category: "share" },
  { idx: 5, num: 0, title: "모든", category: "all" },
];

export type Post = {
  id: number;
  category: string;
  title: string;
  content: string;
  region: string;
  date: Date;
  hit: number;
  commentCount: number;
};

type SortCategories = "recent" | "popular" | "news" | "need" | "share";

interface OrderState {
  [key: string]: 'asc' | 'desc';
}

const HTTPS_URL = process.env.REACT_APP_API_MAIN_KEY;
const UserCommunity = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState("recent");
  const [order, setOrder] = useState<OrderState>({
    recent: "asc",
    popular: "asc",
    news: "asc",
    need: "asc",
    share: "asc",
  });
  const [activeSort, setActiveSort] = useState("");
  const loader = useRef<HTMLDivElement>(null);

  const handleDetailNavigate = (id: number) => {
    navigate(`/user/community/${id}`);
  };

  const loadMore = useCallback(async () => {
    if (!hasMore) return;

    const nextPage = page + 1;
    const response = await axios.get(
      `${HTTPS_URL}/posts?page=${page}&sort=${sort}&order=${order[sort]}`
    );
    console.log(`${HTTPS_URL}/posts?page=${page}&sort=${sort}&order=${order[sort]}`)
    setPosts((prev) => [...prev, ...response.data]);

    if (response.data.length === 0) {
      setHasMore(false);
    } else {
      setPage(nextPage);
    }
  }, [page, hasMore, sort, order]);

  const handleObserver = useCallback(
    (entities: any) => {
      const target = entities[0];
      if (target.isIntersecting) {
        loadMore();
      }
    },
    [loadMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.9,
    });
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  const handleSort = (sortCategory: SortCategories) => {
    setActiveSort(sortCategory);
    if (sort === sortCategory) {
      setOrder((prev) => ({
        ...prev,
        [sortCategory]: prev[sortCategory] === "asc" ? "desc" : "asc",
      }));
    } else {
      setSort(sortCategory);
      setOrder((prev) => ({
        ...prev,
        [sortCategory]: "asc",
      }));
    }

    setPosts([]);
    setPage(1);
    setHasMore(true);
  };

  function isSortCategory(category: string): category is SortCategories {
    return ["recent", "popular", "news", "need", "share"].includes(category);
  }

  return (
    <>
      <div
        style={{
          borderTop: "1px solid #adadad",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "7vh",
          marginTop: "11vh",
        }}
      >
        {posts.map((item: any, index: number) => {
          return (
            <div
              style={{
                padding: "1rem",
                height: "140px",
                width: "90vw",
                borderBottom: "1px solid #adadad",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={index}
              onClick={() => handleDetailNavigate(item.userId)}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    padding: "0.5rem 1rem",
                    width: "4rem",
                    height: "1.4rem",
                    backgroundColor: "#EFEFEF",
                    color: "#3b3b3b",
                  }}
                >
                  {item.category}
                </span>
                <span
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "900",
                    lineHeight: "2.5rem",
                  }}
                >
                  {item.title.slice(0, 15) + "..."}
                </span>
                <span
                  style={{
                    color: "#adadad",
                    lineHeight: "1rem",
                    fontWeight: "900",
                  }}
                >
                  {item.content.slice(0, 15) + "..."}
                </span>
                <span
                  style={{
                    color: "#adadad",
                    lineHeight: "2rem",
                    fontWeight: "900",
                  }}
                >
                  {item.region + " " + getTimeAgo(item.date)}
                </span>
              </div>
              <div
                style={{
                  width: "24vw",
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#adadad",
                    fontSize: "1rem",
                  }}
                >
                  <FaRegComment
                    style={{
                      fontSize: "1rem",
                      color: "#adadad",
                    }}
                  />
                  <div
                    style={{
                      marginLeft: "0.5rem",
                      marginRight: "0.5rem",
                    }}
                  >
                    {item.commentCount}
                  </div>
                  <FaEye
                    style={{
                      fontSize: "1.2rem",
                      color: "#adadad",
                    }}
                  />
                  <div
                    style={{
                      marginLeft: "0.5rem",
                    }}
                  >
                    {item.hit}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
      <div ref={loader}>Loading...</div>
      <UserCommunityBottomBar />
    </>
  );
};

export default UserCommunity;
