import logo from './logo.svg';
import './App.css';
import { Link, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Admin from './pages/admin/Admin';
import { useState } from 'react';

function App() {
    const [isAuth, setIsAuth] = useState(false);

    return (
        <div>
            <Route path='/' exact>
                <button onClick={() => setIsAuth(true)}>Login</button>
                <button onClick={() => setIsAuth(false)}>Logout</button>
            </Route>
            <Link to='/admin'>Go to admin</Link>
            <ProtectedRoute path='/admin' component={Admin} isAuth={isAuth} />
        </div>
    );
}

export default App;
