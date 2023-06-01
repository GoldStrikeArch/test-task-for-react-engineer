import PersonByIdPage from "./components/PersonByIdPage";

type Params = {
  params: {
    id: string;
  };
};
const Page = ({ params }: Params) => {
  const { id } = params;

  return (
    <>
      <PersonByIdPage id={id} />
    </>
  );
};

export default Page;
