// Libraries
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Context
import { TodoProvider } from './context/todosContext.tsx';
// Components
import App from './App.tsx';
// Styles
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<TodoProvider>
			<App />
		</TodoProvider>
	</StrictMode>
);

