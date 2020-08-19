import Header from './header'


export default function home({ data }) {
  return (
    <>
      <Header user={data.user} />
      <h1>Home</h1>
      <p>Welcome</p>
    </>
  );
}

export async function getServerSideProps(context) {

  const { req } = context

  const data = { "user" : req.user.username }

  return { props: { data } }
}