import { BrowserRouter, Routes, Route } from "react-router-dom";
import Show from './crud/Show';
import Edit from './crud/Edit';

function app() {
  return (<div>
   <BrowserRouter>
      <Routes>
            <Route path="/" element={<Show />} />
            <Route path='/edit/:id' element={ <Edit /> } />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default app;

