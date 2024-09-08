import React from 'react'
import { Routes, Route } from 'react-router'

import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { FeedDetails } from './pages/FeedDetails.jsx'
import { FeedIndex } from './pages/FeedIndex.jsx'

export function RootCmp() {
    console.log('We\'re live')

    return (
        <div className="main-container">
            <UserMsg />

            <main>
                <Routes>
                    <Route path="" element={<FeedIndex />} />
                    <Route path="feed/:feedId" element={<FeedDetails />} />
                    <Route path="login" element={<LoginSignup />} />
                </Routes>
            </main>
        </div>
    )
}


