export const AddNotification = (message, url, label, isUnRead) => {
  // Get existing notifications from sessionStorage
  const notifications = JSON.parse(sessionStorage.getItem("notifications") || "[]");

  // Check if a notification with the same URL already exists
  const existingIndex = notifications.findIndex((notif) => notif.url === url);

  if (existingIndex !== -1) {
    // If found, update the existing notification
    notifications[existingIndex] = {
      ...notifications[existingIndex],
      message,
      isUnRead,
      label,
    };
  } else {
    // Otherwise, add a new one
    notifications.push({ message, url, isUnRead, label });
  }

  // Save updated array back into sessionStorage
  sessionStorage.setItem("notifications", JSON.stringify(notifications));
};

export const GetNotifications = () =>
  JSON.parse(sessionStorage.getItem("notifications") || "[]");

export const RemoveNotification = (message) => {
  let notifications = JSON.parse(sessionStorage.getItem("notifications") || "[]");
  notifications = notifications.filter((n) => n.message !== message);
  sessionStorage.setItem("notifications", JSON.stringify(notifications));
};

export const UpdateNotification = (message, updates) => {
  let notifications = JSON.parse(sessionStorage.getItem("notifications") || "[]");
  notifications = notifications.map((n) =>
    n.message === message ? { ...n, ...updates } : n
  );
  sessionStorage.setItem("notifications", JSON.stringify(notifications));
};