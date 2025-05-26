import { apiUrl } from "./constant";

export const registerSupplier = async (supplierInputData, setIsSupplierOpen) => {
    try {
        const response = await fetch(`${apiUrl}/suppliers/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplierInputData),
        });

        const result = await response.json();
        if (result?.data) {
            setIsSupplierOpen(false)   
        }
    } catch (error) {
        console.error("Error registering supplier:", error);
    }
};

export const getAllSuppliers = async (setSuppliers) => {
    try {
        const response = await fetch(`${apiUrl}/suppliers`);
        const result = await response.json();
        if (result?.data) {
            setSuppliers(result.data);
        }
    } catch (error) {
        console.error("Error fetching suppliers:", error);
    }
};


export const getSupplierById = async (id, setSuppliers,setIsSuppliers) => {
    try {
        const response = await fetch(`${apiUrl}/suppliers/${id}`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        console.log("Supplier Data:", result);
        
        if (result?.data) {
            setSuppliers(result.data);
            console.log("Supplier Data:", result.data);
            
            if(result?.data?.length !== 0) {
                setIsSuppliers(true);
            }
            else {
                setIsSuppliers(false);
            }
        }
    } catch (error) {
        console.error("Error fetching supplier:", error);
    }
};

export const updateSupplier = async (updatedData, setSupplier) => {
    try {
        const formData = new FormData();
        if (updatedData.image) {
            formData.append('avatar', updatedData.image); // must match multer field name
        }

        const response = await fetch(`${apiUrl}/suppliers/update`, {
            method: 'PUT',
            credentials: 'include',
            body: formData, // no headers here
        });

        const result = await response.json();
        if (result?.data) {
            setSupplier(result.data);
        }
    } catch (error) {
        console.error("Error updating supplier:", error);
    }
};


export const deleteSupplier = async (id, role, token, onSuccess) => {
    try {
        const response = await fetch(`${apiUrl}/suppliers/delete?id=${id}&role=${role}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();
        if (response.ok) {
            onSuccess?.(); // optional callback on success
        } else {
            console.error("Delete failed:", result.message);
        }
    } catch (error) {
        console.error("Error deleting supplier:", error);
    }
};
