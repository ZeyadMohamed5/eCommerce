import { Section } from "../../types/types";

const Sections = ({ label, title, extraContent, children }: Section) => {
  return (
    <section className="py-5 md:py-20 border-b-1 border-gray-300">
      {label && (
        <h4 className="text-accent-clr font-semibold border-l-20 rounded p-2">
          {label}
        </h4>
      )}

      <div className=" flex-col flex md:items-center md:flex-row gap-8 py-5 ">
        <h3 className="font-semibold text-3xl">{title}</h3>
        {extraContent && <>{extraContent}</>}
      </div>
      <div className="grid grid-cols-12 gap-6">{children}</div>
    </section>
  );
};
export default Sections;
