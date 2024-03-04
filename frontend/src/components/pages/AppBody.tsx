const AppBody = ({ id, children }) => {
  return (
    <div id={id} className="app-body">
      {children}
    </div>
  );
};

export default AppBody;
