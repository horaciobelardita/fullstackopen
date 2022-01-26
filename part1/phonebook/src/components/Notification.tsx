export const Notification = ({ message }: { message: string | null }) => {
  if (!message) {
    return null;
  }

  return <div className="error">{message}</div>;
};
