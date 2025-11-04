// types/auth.ts
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  token?: string
  message?: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
}


export type SignupRequest = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export type SignupResponse = {
  success: boolean
  message: string
  user?: { fullName: string; email: string }
}


// lib/users.ts

// Use a single shared array to mock DB
export type User = {
  username?: string
  fullName?: string
  email: string
  password: string
}

export const users: User[] = [
  { username: "admin", email: "admin@example.com", password: "Admin@123" },
  { username: "jack", email: "jack@xyzcorporation.com", password: "123456" },
]
