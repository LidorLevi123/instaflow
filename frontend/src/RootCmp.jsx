import React from 'react'
import { Routes, Route, Navigate } from 'react-router'

import { UserMsg } from './cmps/UserMsg.jsx'
import { FeedIndex } from './pages/FeedIndex.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignupPage } from './pages/SignupPage.jsx'
import { UserPage } from './pages/UserPage.jsx'
import { userService } from './services/user/user.service.local.js'

function RouteGuard({ children }) {
    const user = userService.getLoggedinUser()
    if (!user) return <Navigate to="/login" />
    return children
}

export function RootCmp() {
    return (
        <div className="main-container">
            <UserMsg />
            <main>
                <Routes>
                    <Route path="" element={<RouteGuard><FeedIndex /></RouteGuard>} >
                        <Route path="" element={<HomePage />} />
                        <Route path="user/:userId" element={<UserPage />} />
                    </Route>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                </Routes>
            </main>
        </div>
    )
}


