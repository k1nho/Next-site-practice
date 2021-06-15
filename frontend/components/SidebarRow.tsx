import { SVGProps } from "react";

interface Iprops {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
}

export const SidebarRow: React.FC<Iprops> = ({ Icon, title }) => {
  return (
    <div className="flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer">
      <Icon className="h-8 w-8 text-blue-500" />
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
};
