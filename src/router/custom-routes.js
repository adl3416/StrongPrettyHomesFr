import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from '../pages/users/AboutPage';
import AuthPage from "../pages/users/AuthPage";
import ContactPage from '../pages/users/ContactPage';
import HomePage from '../pages/users/HomePage';
import { PropertiesPage } from '../pages/users/PropertiesPage';
import { PropertyDetailPage } from '../pages/users/PropertyDetailPage';
import { UserTemplate } from '../templates/usertemplate';
import NotFoundPage from "../pages/common/NotFoundPage";
import UnAuthorizedPage from "../pages/common/UnAuthorizedPage";
import ProfilePage from "../pages/users/ProfilePage";
import ProtectedRoute from "./protected-route";
import UserTourRequestDetailsPage from "../pages/users/UserTourRequestDetailsPage";
import UserTourRequestsPage from "../pages/users/UserTourRequestsPage";
import AdminTemplate from "../templates/admin-template";
import AdminDashboardPage from '../pages/admins/AdminDashboardPage';
import AdminUsersEditPage from '../pages/admins/AdminUsersEditPage';
import AdminUsersPage from '../pages/admins/AdminUsersPage';
import AdminPropertiesPage from '../pages/admins/AdminPropertiesPage';
import AdminsPropertiesEditPage from '../pages/admins/AdminPropertiesEditPage';
import AdminUsersNewPage from '../pages/admins/AdminUsersNewPage';
import AdminPropertiesNewPage from '../pages/admins/AdminPropertiesNewPage';
import AdminTourRequestsPage from '../pages/admins/AdminTourRequestsPage';
import AdminTourRequestEditPage from '../pages/admins/AdminTourRequestEditPage';
import UserReviewEditPage from '../pages/users/UserReviewEditPage';
import AdminAgentsEditPage from '../pages/admins/AdminAgentsEditPage';
import AdminAgentsNewPage from '../pages/admins/AdminAgentsNewPage';
import AdminAgentPage from '../pages/admins/AdminAgentPage';
import { AdminReviewPage } from '../pages/admins/AdminReviewPage';
import UserReviewsPage from '../pages/users/UserRewiewsPage';
import AdminReviewEditPage from '../pages/admins/AdminReviewEditPage';






export const CustomRoutes = () => {
  return (

    <BrowserRouter>
    <Routes>

    <Route path="/">
        
  {/* ADMIN ROUTES */}
       <Route path="admin">
            <Route index element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminDashboardPage/></AdminTemplate></ProtectedRoute>}/>
            <Route path="users">
              <Route index element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminUsersPage/></AdminTemplate></ProtectedRoute>}/>
              <Route path=":userId" element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminUsersEditPage/></AdminTemplate></ProtectedRoute>}/>
              <Route path="new" element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminUsersNewPage/></AdminTemplate></ProtectedRoute>}/>
            </Route>
            <Route path="agents">
              <Route index element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminAgentPage/></AdminTemplate></ProtectedRoute>}/>
             <Route path=":agentId" element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminAgentsEditPage/></AdminTemplate></ProtectedRoute>}/> 
              <Route path="new" element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminAgentsNewPage/></AdminTemplate></ProtectedRoute>}/> 
            </Route>
            <Route path="reviews">
              <Route index element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminReviewPage/></AdminTemplate></ProtectedRoute>}/>
              <Route path=":reviewId" element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminReviewEditPage/></AdminTemplate></ProtectedRoute>}/> 
              {/* <Route path="new" element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminAgentsNewPage/></AdminTemplate></ProtectedRoute>}/> */}  
            </Route>
          


            <Route path="properties">
              <Route index element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminPropertiesPage/></AdminTemplate></ProtectedRoute>}/>
              <Route path=":propertiesId" element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminsPropertiesEditPage/></AdminTemplate></ProtectedRoute>}/>
              <Route path="new" element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminPropertiesNewPage/></AdminTemplate></ProtectedRoute>}/>
            </Route>
            <Route path="tourrequest">
              <Route index element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminTourRequestsPage/></AdminTemplate></ProtectedRoute>}/>
              <Route path=":tourId" element={<ProtectedRoute isAdmin={true}><AdminTemplate><AdminTourRequestEditPage/></AdminTemplate></ProtectedRoute>}/>
        
            </Route>
          </Route>


        {/* user routes */}

         <Route index element={<UserTemplate><HomePage/></UserTemplate>}/>
         <Route path="about" element={<UserTemplate><AboutPage/></UserTemplate>}/>
         <Route path="contact" element={<UserTemplate><ContactPage/></UserTemplate>}/>
         <Route path="auth" element={<UserTemplate><AuthPage/></UserTemplate>}/>


         <Route path="properties"> 
         <Route index element={<UserTemplate><PropertiesPage/></UserTemplate>}/>
         <Route path=":propertyId" element={<UserTemplate><PropertyDetailPage/></UserTemplate>}/>
         </Route>
         <Route path=":agentId" element={<UserTemplate><PropertyDetailPage/></UserTemplate>}/>

          <Route path="user">
            <Route index element={<ProtectedRoute><UserTemplate><ProfilePage /></UserTemplate></ProtectedRoute>} />
            <Route path="tourrequest">
              <Route index element={<ProtectedRoute><UserTemplate><UserTourRequestsPage/></UserTemplate></ProtectedRoute>} />
              <Route path=":tourrequestId" element={<ProtectedRoute><UserTemplate><UserTourRequestDetailsPage/></UserTemplate></ProtectedRoute>} />
            </Route>

            <Route path="review">
              <Route index element={<ProtectedRoute><UserTemplate><UserReviewsPage/></UserTemplate></ProtectedRoute>} />
              <Route path=":reviewId" element={<ProtectedRoute><UserTemplate><UserReviewEditPage/></UserTemplate></ProtectedRoute>} />
            </Route>
          </Route>
         
          <Route path='unauthorized' element={<UserTemplate><UnAuthorizedPage /></UserTemplate>} />
          <Route path='*' element={<UserTemplate><NotFoundPage /></UserTemplate>} />
     </Route>
    </Routes>
    </BrowserRouter>
  )
}