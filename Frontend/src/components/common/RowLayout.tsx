import React, { PropsWithChildren } from 'react';
import { Col, Row } from 'react-bootstrap';

export interface RowLayoutProps extends PropsWithChildren {}

export const RowLayout: React.FC<RowLayoutProps> = ({ children }) => {
  return (
    <Row>
      <Col>{children}</Col>
    </Row>
  );
};
