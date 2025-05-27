import { apiUrl } from "./constant.jsx";

// ✅ Fetch function accepts setProduct from context
export const fetchProducts = async (setProduct) => {
    try {
        const response = await fetch(`${apiUrl}/products/get-all-products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response?.ok){
            const result = await response.json();
            
            if (result?.data) {
                setProduct(result.data); // ✅ Update state inside component
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const refreshTokens = async () => {
  try {
    const response = await fetch(`${apiUrl}/users/refresh-token`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (response?.ok) {
      const result = await response.json();
      return result;
    } else {
      return response;
    }
  } catch (error) {
    console.error("Error refreshing tokens:", error);
  }
};


export const registerUser = async (userInputData,setUser) => {
    try {
        const response = await fetch(`${apiUrl}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInputData),
        });

        const result = await response.json();
        if (result?.data) {
            setUser(result.data); // ✅ Update state inside component
        }
    } catch (error) {
        console.error("Error registering user:", error);
    }
};

export const loginUser = async (loginData, setUser,setIsLoginOpen) => {
    try {
        const response = await fetch(`${apiUrl}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            credentials: 'include', // ✅ Ensures cookies are sent
        });

        const result = await response.json();
        if (result?.data) {
            setUser(result.data); // ✅ Update state inside component
            setIsLoginOpen(false); // ✅ Reload page to reflect changes
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
};

export const logoutUser = async (setResponse) => {
    try {
        const response = await fetch(`${apiUrl}/users/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        if (result?.statusCode === 200) {
            console.log("User logged out successfully")
            setResponse(result); // ✅ Update state inside component
            return true;
        }
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export const getUserProfile = async (setUser) => {
    try {
        const response = await fetch(`${apiUrl}/users/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const result = await response.json();
        if (result?.data) {
            setUser(result.data); // ✅ Update state inside component
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
};

export const updateUserProfile = async (updatedData) => {
    try {
        const response = await fetch(`${apiUrl}/users/update-password`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        const result = await response.json();
        return result
    } catch (error) {
        console.error("Error updating user profile:", error);
    }
};


// sendOTP API call
export const sendOTP = async (number) => {
    try {
      const res = await fetch(`${apiUrl}/users/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number }),
      });
      const result = await res.json();
      return result;
      
    } catch (err) {
      console.error("Send OTP failed:", err);
      return false;
    }
  };
  
  // verifyOTP API call
  export const verifyOTP = async (number, otp) => {
    try {
      const res = await fetch(`${apiUrl}/users/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number, otp }),
      });
      const data = await res.json();
      return data.success;
    } catch (err) {
      console.error("Verify OTP failed:", err);
      return false;
    }
  };
  