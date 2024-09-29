import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="w-[18.75rem] h-full bg-whiteColor px-8 pt-8">
      <Image src={"/assets/logo-dark.svg"} width={152} height={25} />
    </div>
  );
};

export default Sidebar;
