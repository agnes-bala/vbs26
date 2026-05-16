// import { create } from 'apisauce';

// const apiClient = create ({
//     baseURL: "https://partnerservice-stage.jesusredeems.com/"
//     //  baseURL: "http://localhost:8080" Do not use localhost as Android may not be able connect
// });

// export default apiClient;

// import { create } from 'apisauce';

// const apiClient = create ({
//     baseURL: "https://partnerservice-stage.jesusredeems.com/"
//     //  baseURL: "http://localhost:8080" Do not use localhost as Android may not be able connect
// });

// export default apiClient;

// src/services/Client.js
import { create } from 'apisauce';
import { config } from "../partnerconfig"; // Change to named import

const apiClient = create({
    baseURL: config.baseUrl,
    // baseURL: "http://localhost:8080" Do not use localhost as Android may not be able connect
});

// Add request interceptor for auth header
apiClient.addRequestTransform(request => {
    const token = localStorage.getItem('jwt');
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
});

// Add response interceptor for error handling
apiClient.addResponseTransform(response => {
    if (!response.ok) {
        console.error('API Error:', response.problem, response.data);
        if (response.status === 401) {
            // Handle unauthorized - maybe redirect to login
            localStorage.clear();
            // window.location.href = '/auth/login';
        }
    }
});

export default apiClient;