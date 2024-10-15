import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import SignIn from 'src/pages/sign-in';
import MenuPage from 'src/pages/menu';
import BlogPage from 'src/pages/blog';
import UserPage from 'src/pages/user';
import ProductsPage from 'src/pages/products';
import Page404 from 'src/pages/page-not-found';
import PrivateRoute from './PrivateRoute';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
