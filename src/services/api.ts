import axios from 'axios';

// Automatically detect if you are running locally or on your live site!
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const API_BASE_URL = isLocalhost 
  ? 'http://localhost:5000/api' 
  : 'https://mjda-backend.onrender.com/api';

// --- 1. Create Axios Instance ---
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- 2. Axios Interceptor ---
api.interceptors.request.use(
  (config) => {
    const sessionStr = sessionStorage.getItem('mj_session');
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      if (session.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- 3. Global Error Handler ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (error: any) => {
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  }
  throw new Error('Something went wrong. Please check your connection.');
};

// ==========================================
//               USER ENDPOINTS
// ==========================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginUser = async (credentials: any) => {
  try {
    const response = await api.post('/users/login', credentials);
    return response.data;
  } catch (error) { handleError(error); }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (userData: any) => {
  try {
    const response = await api.post('/users/signup', userData);
    return response.data;
  } catch (error) { handleError(error); }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) { handleError(error); }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) { handleError(error); }
};

export const requestPasswordReset = async (email: string) => {
  try {
    const response = await api.post('/users/forgot-password', { email });
    return response.data;
  } catch (error) { handleError(error); }
};

export const verifyResetOtp = async (data: { email: string; otp: string }) => {
  try {
    const response = await api.post('/users/verify-otp', data);
    return response.data;
  } catch (error) { handleError(error); }
};

export const submitNewPassword = async (data: { email: string; otp: string; newPassword: string }) => {
  try {
    const response = await api.post('/users/reset-password', data);
    return response.data;
  } catch (error) { handleError(error); }
};

// ==========================================
//              COURSE ENDPOINTS
// ==========================================
export const getAllCourses = async () => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) { handleError(error); }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCourse = async (courseData: any) => {
  try {
    const response = await api.post('/courses', courseData);
    return response.data;
  } catch (error) { handleError(error); }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateCourse = async (id: string, courseData: any) => {
  try {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  } catch (error) { handleError(error); }
};

export const deleteCourse = async (id: string) => {
  try {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  } catch (error) { handleError(error); }
};

// ==========================================
//            APPLICATION ENDPOINTS
// ==========================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createApplication = async (appData: any) => {
  try {
    const response = await api.post('/applications', appData);
    return response.data;
  } catch (error) { handleError(error); }
};

export const getMyApplications = async () => {
  try {
    const response = await api.get('/applications/myapps');
    return response.data;
  } catch (error) { handleError(error); }
};

export const getAllApplications = async () => {
  try {
    const response = await api.get('/applications');
    return response.data;
  } catch (error) { handleError(error); }
};

export const updateApplicationStatus = async (id: string, status: string) => {
  try {
    const response = await api.put(`/applications/${id}/status`, { status });
    return response.data;
  } catch (error) { handleError(error); }
};

// ==========================================
//              ENQUIRY ENDPOINTS
// ==========================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createEnquiry = async (enquiryData: any) => {
  try {
    const response = await api.post('/enquiries', enquiryData);
    return response.data;
  } catch (error) { handleError(error); }
};

export const getAllEnquiries = async () => {
  try {
    const response = await api.get('/enquiries');
    return response.data;
  } catch (error) { handleError(error); }
};

// Replace your existing markEnquiryReplied with this one:
export const markEnquiryReplied = async (id: string, replyMessage?: string) => {
  try {
    const response = await api.put(`/enquiries/${id}/reply`, { replyMessage });
    return response.data;
  } catch (error) { handleError(error); }
};