import React from 'react'
import { Routes, Route } from 'react-router'

import { UserMsg } from './cmps/UserMsg.jsx'
import { FeedIndex } from './pages/FeedIndex.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignupPage } from './pages/SignupPage.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <UserMsg />
            <main>
                <Routes>
                    <Route path="" element={<FeedIndex />} >
                        <Route path="" element={<HomePage />} />
                    </Route>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                </Routes>
            </main>
        </div>
    )
}


