import logo from './logo.svg';
import './App.css';
import DynamicForm from "./dynamicForm";

function App() {
  return (
      <div className="App">
          <div>
              <h1>Form using Formik and Yup</h1>

          </div>
          <DynamicForm />
      </div>
  );
}

export default App;
