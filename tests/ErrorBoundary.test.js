import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../src/components/ErrorBoundary';


function ProblemChild() {
  throw new Error('Test error');
}

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

test('dummy test to validate Jest execution', () => {
  expect(true).toBe(true);
});

describe('ErrorBoundary tests', () => {
  test('should render children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Hello world</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  test('should catch error and render fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Test error/i)).toBeInTheDocument();
  });
});
