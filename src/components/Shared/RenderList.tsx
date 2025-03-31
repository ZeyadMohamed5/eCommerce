import { Product, RenderListProps } from "../../types/types";

const RenderList = <T extends Product>({
  data,
  ItemComponent,
  limit,
}: RenderListProps<T>) => {
  return (
    <>
      {data.slice(0, limit ?? data.length).map((product) => (
        <ItemComponent key={product.id} product={product} />
      ))}
    </>
  );
};
export default RenderList;
