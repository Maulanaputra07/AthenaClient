export const Alert = ({ color = "red", message }) => {
  return (
    <div className={"w-full h-10 rounded flex items-center px-3 my-2 bg-red-light border-2 border-" + color}>
      {message}
    </div>
  );
};
