interface Iprops {
  Icon: any;
  active?: boolean;
}

export const HeaderIcon: React.FC<Iprops> = ({ Icon, active }) => {
  return (
    <div className=" flex items-center cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 rounded-xl active:boder-b-2 active:boder-blue-500 group">
      <Icon
        className={`text-gray-500 h-5 group-hover:text-blue-500 text-center sm:h-7 mx-auto ${
          active && "text-blue-500"
        }`}
      />
    </div>
  );
};
