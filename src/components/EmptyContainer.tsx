type Props = {
  title: string;
};

const EmptyContainer = ({ title }: Props) => {
  return (
    <div style={{ width: "100%", display: "grid", placeContent: "center" }}>
      {title}
    </div>
  );
};

export default EmptyContainer;
