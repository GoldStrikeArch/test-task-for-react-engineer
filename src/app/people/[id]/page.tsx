import PersonByIdPage from "./components/PersonByIdPage";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <>
      <PersonByIdPage id={id} />
    </>
  );
};

export default Page;
