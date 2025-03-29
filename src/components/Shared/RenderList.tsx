const RenderList = ({ data, resourceName, ItemComponent, limit }: any) => {
  return (
    <>
      {data.slice(0, limit ?? data.length).map((item: any) => (
        <ItemComponent key={item.id} {...{ [resourceName]: item }} />
      ))}
    </>
  );
};
export default RenderList;
