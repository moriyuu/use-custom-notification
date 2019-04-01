import * as React from "react";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  Notification,
  getDefaultNotification,
  NotificationStatus
} from "./types";

type WrapperType = {
  type: string;
  status: NotificationStatus;
};
const Wrapper = styled.div<WrapperType>`
  height: 100px;
  width: 200px;
  margin: 16px;
  background-color: ${p =>
    p.type === "success"
      ? "#00c853"
      : p.type === "error"
      ? "#ff5252"
      : "#f5f5f5"};

  transition: all 0.5s ease-out;
  transform: translateX(500px);

  ${p =>
    p.status === "showing" &&
    css`
      transform: translateX(0);
    `}
  ${p =>
    p.status === "died" &&
    css`
      height: 0;
      margin-top: 0;
      margin-bottom: 0;
    `}
`;

const Notification: React.FC<Notification> = props => {
  const { type, children, timeout } = props;

  const [status, setStatus] = useState<NotificationStatus>("ready");

  useEffect(() => {
    setTimeout(() => {
      setStatus("showing");
    }, 1);

    setTimeout(() => {
      setStatus("died");
    }, timeout || 5000);
  }, []);

  return (
    <Wrapper type={type} status={status}>
      {children}
    </Wrapper>
  );
};

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (notification: {
    type?: "normal" | "success" | "error";
    children: React.ReactNode;
    timeout?: number; // ms
  }) => {
    const defaultNotification = getDefaultNotification();

    // add
    setNotifications(_notifications => [
      ..._notifications,
      {
        ...defaultNotification,
        ...notification
      }
    ]);

    // auto remove
    setTimeout(() => {
      setNotifications(_notifications =>
        _notifications.filter(_noti => _noti.id !== defaultNotification.id)
      );
    }, (notification.timeout || 5000) + 500);
  };

  return {
    notify,
    notificationManager: (
      <div style={{ position: "fixed", top: 0, right: 0 }}>
        {notifications.map(noti => {
          return (
            <Notification key={noti.id} {...noti}>
              {noti.children}
            </Notification>
          );
        })}
      </div>
    )
  };
};
