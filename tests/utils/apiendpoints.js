// utils/apiEndpoints.ts

export const API_ENDPOINTS = {
  HEALTH_CHECK: '/health',
  SIGN_UP: '/signup',
  LOGIN: '/login',
  ADD_NEW_BOOK: '/books/',
  UPDATE_BOOK: (id) => `/books/${id}`,
  GET_BOOK_ID: (id) => `/books/${id}`,
  GET_ALL_BOOKS: '/books/'
};
