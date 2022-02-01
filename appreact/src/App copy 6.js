import React from "react";

const App = () => {
  const [notification, setNotification] = React.useState(null);
  const [item, setItem] = React.useState(0);

  React.useEffect(() => {
    if (!notification) return;
    const timeout = setTimeout(() => {
      setNotification(null);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [notification]);

  return (
    <div>
      {notification && <p>{notification}</p>}
      <button
        onClick={() => {
          setItem((prev) => prev + 1);
          setNotification("Item added successfully");
        }}
      >
        add to cart {item}
      </button>
    </div>
  );
};

export default App;
