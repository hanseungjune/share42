/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { rest } from "msw";

const USER = 0;
const REPAIR = 1;
const INSPECTOR = 2;
const INSURANCE = 3;

const users = [
  { id: "user1", password: "pass1", userType: USER },
  { id: "user2", password: "pass2", userType: REPAIR },
  { id: "user3", password: "pass3", userType: INSPECTOR },
  { id: "user4", password: "pass4", userType: INSURANCE },
];

interface LoginRequestBody {
  loginid: string;
  loginpassword: string;
}

interface dummyPostsType {
  id: number | null;
  title: string | null;
  content: string | null;
  category: string | null;
  sort: number | null;
}

const dummyPosts = [
  { id: 1, title: "Post 1", content: "Content 1", category: "0", sort: 1 },
  { id: 2, title: "Post 2", content: "Content 2", category: "1", sort: 2 },
  { id: 3, title: "Post 3", content: "Content 3", category: "2", sort: 0 },
  { id: 4, title: "Post 4", content: "Content 4", category: "0", sort: 3 },
  { id: 5, title: "Post 5", content: "Content 5", category: "1", sort: 1 },
  { id: 6, title: "Post 6", content: "Content 6", category: "2", sort: 2 },
  { id: 7, title: "Post 7", content: "Content 7", category: "0", sort: 0 },
  { id: 8, title: "Post 8", content: "Content 8", category: "1", sort: 3 },
  { id: 9, title: "Post 9", content: "Content 9", category: "2", sort: 1 },
  { id: 10, title: "Post 10", content: "Content 10", category: "0", sort: 2 },
  { id: 11, title: "Post 11", content: "Content 11", category: "1", sort: 0 },
  { id: 12, title: "Post 12", content: "Content 12", category: "2", sort: 3 },
  { id: 13, title: "Post 13", content: "Content 13", category: "0", sort: 1 },
  { id: 14, title: "Post 14", content: "Content 14", category: "1", sort: 2 },
  { id: 15, title: "Post 15", content: "Content 15", category: "2", sort: 0 },
];

const HTTPS_URL = process.env.REACT_APP_API_MAIN_KEY;

export const handlers = [
  rest.post(`${HTTPS_URL}/login`, (req, res, ctx) => {
    const { loginid, loginpassword } = req.body as LoginRequestBody;

    const user = users.find(
      (user) => user.id === loginid && user.password === loginpassword
    );

    if (user) {
      const accessToken = "exampleAccessToken";
      const expire = Date.now() + 0.3 * 60 * 1000;

      return res(
        ctx.status(200),
        ctx.json({
          status: 200,
          accessToken: accessToken,
          userType: user.userType,
          expire: expire,
        })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          status: 401,
          error: "Invalid credentials",
        })
      );
    }
  }),
  // rest.get("https://www.share42-together.com/api/logout", (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json({ status: 200 }));
  // }),
  rest.get(`${HTTPS_URL}/user/community/posts/list`, (req, res, ctx) => {
    const page: string | null = req.url.searchParams.get("page");
    const size: string | null = req.url.searchParams.get("size");
    const sort: string | null = req.url.searchParams.get("sort");
    const category: string | null = req.url.searchParams.get("category");
    const search: string | null = req.url.searchParams.get("search");

    const pageNumber: number = parseInt(page || "1", 10);
    const pageSize: number = parseInt(size || "10", 10);

    const startIndex: number = (pageNumber - 1) * pageSize;
    const endIndex: number = pageNumber * pageSize;

    let filteredPosts = dummyPosts;

    if (search) {
      filteredPosts = filteredPosts.filter((post: dummyPostsType) =>
        post.title?.includes(search)
      );
    }

    if (category) {
      filteredPosts = filteredPosts.filter(
        (post: dummyPostsType) => post.category === category
      );
    }

    if (sort) {
      filteredPosts.sort((a, b) =>
        sort === "0" ? b.id - a.id : b.sort - a.sort
      );
    }

    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return res(
      ctx.status(200),
      ctx.json({
        message: {
          content: paginatedPosts,
          totalPages: Math.ceil(filteredPosts.length / pageSize),
        },
      })
    );
  }),
];
