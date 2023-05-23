export default function axiosHeaders() {
    // Get authentication token from localStorage
    const token = localStorage.getItem('auth-token');
    if(!token) {
        return;
    }

    const config = {
        headers: {
            "Content-Type": "application-json",
            Authorization: `Bearer ${token}`
        }
    }

    return config;
}