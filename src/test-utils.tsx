import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import AppProviders from 'Providers/AppProviders';

const AllTheProviders = ({ children }: { children: ReactElement }) => {
  return <AppProviders>{children}</AppProviders>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
