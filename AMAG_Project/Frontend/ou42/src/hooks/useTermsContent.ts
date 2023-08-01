import { useState, useEffect } from "react";
import axios from "axios";
import { TokenStorage } from "./tokenStorage";
const HTTPS_URL = process.env.REACT_APP_API_MAIN_KEY;
const tokenStorage = new TokenStorage();

// const SHARE_REG_API = () => {
//   return `${HTTPS_URL}/common/usage/0`;
// };

export default function useTermsContent() {
  const TOKEN = tokenStorage.getToken();
  const [termsContent, setTermsContent] = useState<string[]>([]);

//   useEffect(() => {
//     axios({
//       method: "GET",
//       url: SHARE_REG_API(),
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     })
//       .then((res: any) => {
//         const lst = res.data.message[0].content.split("\r\n");
//         setTermsContent(lst.slice(0, lst.length - 1));
//       })
//       .catch();
//   }, []);

  return termsContent;
}
