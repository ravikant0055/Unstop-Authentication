import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/')({
  component: () => {
    const isLoggedIn = !!localStorage.getItem('auth');
    return <Navigate to={isLoggedIn ? "/home" : "/login"} />
  }
})


