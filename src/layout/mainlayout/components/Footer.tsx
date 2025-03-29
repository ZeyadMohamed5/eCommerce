import FooterForm from "./FooterForm";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white ">
      <div className="grid grid-cols-12 w-[85%] mx-auto py-10 space-y-8">
        <div className="col-span-12 md:col-span-3 space-y-3">
          <h3 className="font-bold text-xl">eCommerce</h3>
          <h4 className="font-semibold">Subscirbe</h4>
          <FooterForm />
        </div>
        <div className="col-span-12 md:col-span-3 space-y-3">
          <h3 className="font-bold text-xl">Support</h3>
          <ul className="space-y-2 break-words">
            <li className="text-gray-300">
              417 Butternut Lanem, Metropolis, IL, USA, 62960
            </li>
            <li className="text-gray-300 ">eCommerce@example.com</li>
            <li className="text-gray-300">+20100000666</li>
          </ul>
        </div>
      </div>
      <div className="border-t-1 border-gray-400 text-center py-3">
        <p className="font-light text-gray-300">
          ©This website made by Zeyad Mohamed
        </p>
      </div>
    </footer>
  );
};
export default Footer;
