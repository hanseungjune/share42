import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { TokenStorage } from "./tokenStorage";

const tokenStorage = new TokenStorage();
const HTTPS_URL = process.env.REACT_APP_API_MAIN_KEY;
const TOKEN = tokenStorage.getToken();

export function useLikeMutation() {
  const queryClient = useQueryClient();

  const { mutate: setLike } = useMutation(
    (id) => {
      return axios({
        method: "post",
        url: `${HTTPS_URL}/user/share/share-articles/like/${id}`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["get-object-list"], { exact: true });
      },
    }
  );

  const { mutate: setUnLike } = useMutation(
    (id) => {
      return axios({
        method: "post",
        url: `${HTTPS_URL}/user/share/share-articles/unlike/${id}`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["get-object-list"], { exact: true });
      },
    }
  );

  const like = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: any,
    likeCheck: null | number
  ) => {
    e.stopPropagation();
    if (likeCheck) {
      setUnLike(id);
    } else {
      setLike(id);
    }
  };

  return { like };
}
