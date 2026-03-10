import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import chatPage from './pages/chatPage.tsx'
import fileManagerPage from "./pages/fileManagerPage"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import LoginPage from "./pages/loginPage"
import RegisterPage from "./pages/registerPage"
import ChatPage from "./pages/chatPage"
import FileManagerPage from "./pages/fileManagerPage"
import Dashboard from "./pages/dashboardPage.tsx"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/files" element={<FileManagerPage />} />
      </Routes>
    </BrowserRouter>
  )
}