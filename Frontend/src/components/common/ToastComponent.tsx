import React from 'react';
import { Toast, ToastContainer, ToastContainerProps } from 'react-bootstrap';

export interface ToastComponentProps extends ToastContainerProps {
  show: boolean;
  message: string;
  variant: 'success' | 'danger' | 'warning' | 'info';
  onCloseToast: () => void;
}

export const ToastComponent: React.FC<ToastComponentProps> = ({
  show = false,
  message,
  onCloseToast,
  variant,
  ...props
}) => {
  return (
    <ToastContainer {...props} className="p-3" position="bottom-center">
      <Toast show={show} onClose={onCloseToast} bg={variant}>
        <Toast.Header style={{ justifyContent: 'right' }}>&nbsp;</Toast.Header>
        <Toast.Body className={variant === 'danger' ? 'text-white' : ''}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
