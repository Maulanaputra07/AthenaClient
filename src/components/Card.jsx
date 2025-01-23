export const Card = ({ title, digit = 0 }) => {
  return (
    <div className="flex flex-col w-full h-34 justify-stretch border  rounded overflow-hidden">
      <div className="header-card w-full bg-main_dark text-white px-4 py-2">
        {title}
      </div>
      <div className="body-card px-4 py-2">
        <h1 className="text-4xl text-bold">{digit}</h1>
      </div>
    </div>
  );
};
