// AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/m1-home-pages/homepages';
import { RecipePage } from './pages/m2-recipe-page/recipepage';
import { InfomationPage } from './pages/m3-infomation-pages/infomation-page/infomationPage';
import FullFunctionEditor from './pages/m3-infomation-pages/manage-recipe-page/manageRecipePage';
import { LoginScreen } from './pages/m0-login-pages/loginpage';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute
import { RecipeDetail } from './pages/m4-recipe-detail-pages/recipedetailpage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      
      {/* Các route cần bảo vệ */}
      <Route
        path="/recipe"
        element={
          <PrivateRoute>
            <RecipePage key="recipe"  />
          </PrivateRoute>
        }
      />
      <Route
        path="/savedRecipes"
        element={
          <PrivateRoute>
            <RecipePage key="savedRecipes"  typeData={2} />
          </PrivateRoute>
        }
      />
      <Route
        path="/infomation"
        element={
          <PrivateRoute>
            <InfomationPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/manageRecipePage"
        element={
          <PrivateRoute>
            <FullFunctionEditor />
          </PrivateRoute>
        }
      />
      <Route
        path="/detail"
        element={
          <PrivateRoute>
            <RecipeDetail />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
