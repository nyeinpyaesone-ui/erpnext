import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './lib/namespace'
import { DirectionProvider } from './components/ui/direction.tsx'
import type { FrappeNamespace } from './lib/namespace/types'

interface DevContextResponse {
  message: {
    boot: string;
    layout_direction: string;
  };
}

const initializeApp = (layoutDirection: string) => {
  const root = document.getElementById('root');
  if (!root) return;

  createRoot(root).render(
    <StrictMode>
      <DirectionProvider dir={layoutDirection}>
        <App />
      </DirectionProvider>
    </StrictMode>,
  );
};

if (import.meta.env.DEV) {
  fetch('/api/method/erpnext.www.banking.get_context_for_dev', {
    method: 'POST',
  })
    .then((response) => response.json())
    .then((values: DevContextResponse) => {
      if (!window.frappe) {
        window.frappe = {} as FrappeNamespace;
      }

      const frappe = window.frappe as FrappeNamespace & { 
        boot: any; 
        _messages: any; 
        model: { sync: (docs: any) => void };
      };
      
      frappe.boot = JSON.parse(values.message.boot);
      frappe._messages = frappe.boot["__messages"];

      // Set document direction to rtl
      document.dir = values.message.layout_direction;
      frappe.model.sync(frappe.boot.docs);
      
      initializeApp(values.message.layout_direction);
    })
    .catch((error) => {
      console.error('Failed to load dev context:', error);
    });
} else {
  const frappe = window.frappe as FrappeNamespace & { 
    model: { sync: (docs: any) => void };
  } | undefined;
  
  if (frappe?.model) {
    frappe.model.sync(frappe.boot?.docs);
  }
  
  const layoutDirection = window.frappe?.boot?.layout_direction ?? 'ltr';
  initializeApp(layoutDirection);
}
