document.addEventListener("DOMContentLoaded", function () {
    // Get user information
    fetch("/user/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((user) => {
            // Handle user data
            console.log("User:", user);
        })
        .catch((error) => {
            console.error("Error fetching user:", error);
        });

    // Get all users
    fetch("/api/admin/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((users) => {
            // Handle users data
            console.log("All Users:", users);
        })
        .catch((error) => {
            console.error("Error fetching all users:", error);
        });

    // Get new user form data
    fetch("/api/admin/new", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((formData) => {
            // Handle form data
            console.log("New User Form Data:", formData);
        })
        .catch((error) => {
            console.error("Error fetching new user form data:", error);
        });

    // Add a new user
    const newUser = {
        name: "",
        surname: "",
    };
    fetch("/api/admin/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    })
        .then((response) => response.json())
        .then((addedUser) => {
            // Handle added user data
            console.log("Added User:", addedUser);
        })
        .catch((error) => {
            console.error("Error adding new user:", error);
        });

    //Update user by id
    const updatedUser = {
        id: userId,
        name: "",
        surname: "",
    };
    fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
    })
        .then((response) => response.json())
        .then((user) => {
            // Handle updated user data
            console.log("Updated User:", user);
        })
        .catch((error) => {
            console.error("Error updating user:", error);
        });

    // Delete a user by ID
    fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.status === 204) {
                console.log("User deleted successfully");
            } else {
                console.error("Error deleting user");
            }
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
        });
});