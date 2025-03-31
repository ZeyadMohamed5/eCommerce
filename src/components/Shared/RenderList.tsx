import { RenderListProps } from "../../types/types";

const RenderList = <T,>({
  data,
  resourceName,
  ItemComponent,
  limit,
}: RenderListProps<T>) => {
  return (
    <>
      {data.slice(0, limit ?? data.length).map((item) => (
        <ItemComponent
          key={(item as any).id}
          {...({ [resourceName]: item } as any)}
        />
      ))}
    </>
  );
};
export default RenderList;
