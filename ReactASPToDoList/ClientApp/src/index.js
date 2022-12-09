import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from "./providers/AuthProvider";
import { ErrorFallback } from "./pages/Special/ErrorFallback";
import "bootstrap/dist/css/bootstrap.min.css";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <BrowserRouter basename={baseUrl}>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
