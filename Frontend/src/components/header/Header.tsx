import React from 'react';
import { Image } from 'react-bootstrap';
import { RowLayout } from '../common/RowLayout';

export const Header: React.FC = () => {
  return (
    <RowLayout>
      <Image src="clearPointLogo.png" fluid rounded />
    </RowLayout>
  );
};
