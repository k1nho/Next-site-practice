import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { Feed } from "../components/Feed";
import { Header } from "../components/Header";
import { Login } from "../components/Login";
import { Sidebar } from "../components/Sidebar";
import { Widgets } from "../components/Widgets";
import { db } from "../firebase";

export default function Home({
  session,
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!session) {
    return <Login />;
  }

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Discodify</title>
        <meta name="keywords" content="Social Site" />
      </Head>
      {/* Header */}
      <Header username={session.user.name} userImg={session.user.image} />
      <main className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed
          userImg={session.user.image}
          username={session.user.name}
          posts={posts}
        />
        {/* Widget */}
        <Widgets />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //Get user
  const session = await getSession(context);

  // prefetch posts on server
  const posts = await db.collection("posts").orderBy("timestamp", "desc").get();

  const docs = posts.docs.map((post) => ({
    id: post.id,
    name: post.data().name,
    message: post.data().message,
    image: post.data().image,
    timestamp: null,
  }));

  return {
    props: {
      session,
      posts: docs,
    },
  };
};
