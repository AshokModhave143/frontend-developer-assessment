import React from 'react';

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="page-footer font-small teal pt-4">
      <div className="footer-copyright text-center py-3">
        © 2021 Copyright:
        <a href="https://clearpoint.digital" target="_blank" rel="noreferrer">
          clearpoint.digital
        </a>
      </div>
    </footer>
  );
};
