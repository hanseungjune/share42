/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import UserCommunityBottomBar from "../../components/community/UserCommunityBottomBar";
import communityStore from "../../store/communityStore";
import useDebounce from "../../hooks/useDebounce";
import useLoadPosts, {
  OrderState,
  SortCategories,
} from "../../hooks/useLoadPosts";
import useScrollIntercept from "../../hooks/useScrollIntercept";
import SortButtons from "../../components/community/SortButtons";
import Post from "../../components/community/Post";

const UserCommunity = () => {
  // 상태 초기화
  const resetPostsState = () => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  };

  const [sort, setSort] = useState("recent");
  const [order, setOrder] = useState<OrderState>({
    recent: "asc",
    popular: "asc",
    news: "asc",
    need: "asc",
    share: "asc",
  });
  const { search } = communityStore();
  const debouncedSearchTerm = useDebounce(search, 500);
  const { posts, loadMore, setPosts, setPage, setHasMore } = useLoadPosts(
    sort,
    order,
    debouncedSearchTerm
  );
  const loader = useScrollIntercept(loadMore);
  const [activeSort, setActiveSort] = useState("");

  // 정렬 함수
  const handleSort = (sortCategory: SortCategories) => {
    setActiveSort(sortCategory);
    const isSameCategory = sort === sortCategory;
    if (isSameCategory) {
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
    resetPostsState();
  };

  // API 요청시 새롭게 리렌더링 하기(뒤에 추가 데이터 없이)
  useEffect(() => {
    if (debouncedSearchTerm) {
      resetPostsState();
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <SortButtons activeSort={activeSort} handleSort={handleSort} />
      <Post posts={posts} />
      <div ref={loader} style={{ height: "10px" }}></div>
      <UserCommunityBottomBar />
    </>
  );
};

export default UserCommunity;
