export const NotificationMessage = ({
  message,
}: {
  message: string | null;
}) => {
  if (!message) return null;
  return <div className="error container">{message}</div>;
};
