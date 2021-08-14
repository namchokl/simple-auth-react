import { uiActions } from './ui';

export const notify = (notification, clearTimeMs=2000) => {
  return (dispatch) => {
    const timer = setTimeout(() => {
      dispatch( uiActions.clearNotification());
    }, clearTimeMs);

    notification.timer = timer;
    dispatch( uiActions.setNotification(notification) );
  };
};