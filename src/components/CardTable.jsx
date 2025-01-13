export const CardTable = ({ title, data }) => {
  return (
      <div className="flex flex-col justify-stretch border  rounded overflow-hidden">
        <div className="header-card bg-main_dark text-white px-4 py-2">
          {title}
        </div>
        <div className="body-card px-4 py-2">
          <table className="w-full">
            <tbody>
              {data &&
                data.map((item, i) => (
                  <tr key={i}>
                    <td className="py-1 border-b">{item.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};
