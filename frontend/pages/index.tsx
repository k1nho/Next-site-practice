import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import { Header } from "../components/Header";
import { Login } from "../components/Login";

export default function Home({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!session) {
    return <Login />;
  }
  return (
    <div>
      <head>
        <title>Social Site</title>
        <meta name="keywords" content="Social Site" />
      </head>
      {/* Header */}
      <Header username={session.user.name} userImg={session.user.image} />
      <main>
        {/* Sidebar */}
        {/* Feed */}
        {/* Widget */}
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //Get user
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
