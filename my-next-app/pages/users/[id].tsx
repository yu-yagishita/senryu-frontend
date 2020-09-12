import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import { useRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

type GetResponseData = {
  posts: [
    {
      postId: string;
      kamigo: string;
      nakashichi: string;
      shimogo: string;
      userId: string;
      signupAt: string;
    }
  ];
};

export default function MyPage() {
  const router = useRouter();
  const { id } = router.query;

  const fetcher = async (url: string) => {
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({}),
    });
    const getResponseData: GetResponseData = await response.json();
    return getResponseData;
  };

  const { data, error } = useSWR("/api/get-senryu?id=" + id, fetcher);

  console.log(data);

  console.log(error);

  console.log(id);

  if (typeof data === "undefined") {
    return <div>川柳データ取得に失敗</div>;
  } else {
    const listItems =
      data.posts == null ? (
        <div key="0"></div>
      ) : (
        data.posts.map((post) => (
          <div key={post.postId}>
            {post.kamigo} {post.nakashichi} {post.shimogo}
          </div>
        ))
      );

    return (
      <>
        <h1>SENRYU MyPage</h1>
        {listItems}
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const userId = typeof cookies.userId === "undefined" ? "" : cookies.userId;
  if (userId === "") {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
  }

  return {
    props: {},
  };
};
