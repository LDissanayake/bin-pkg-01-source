import axios from "axios";

// Helper to get nonce from window object
const getNonce = () => window.addifectStudio?.nonce || "";
const path = window.addifectStudio?.root || "";

/**
 * Fetches posts by type from the server.
 */
export const fetchPosts = async (postType: string): Promise<any[]> => {
    try {
        const response = await axios.get<any[]>(`${path}addifect-client/v1/load-posts?post_type=${postType}`, {
            headers: {
                'X-WP-Nonce': getNonce()
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${postType} posts:`, error);
        throw error;
    }
};


/**
 * Update Post: Save Design/Post to WP
 */
export const updatePostData = async (
    postData: { id: string, title?: string, data?: string }
) => {
    try {
        const response = await axios.post(
            `${path}addifect-client/v1/update-post/`,
            postData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': getNonce()
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Load Design/Post Data from WP
 */
export const getPostData = async (
    postId: string
): Promise<any> => {
    try {
        const response = await axios.get(`${path}addifect-client/v1/get-post-data/`, {
            params: { id: postId },
            headers: {
                "Content-Type": "application/json",
                'X-WP-Nonce': getNonce()
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Load Media
 */
export const fetchMedia = async (
    type = 'image',
    page = 1,
    perPage = 10
) => {
    // Media usually requires a nonce for certain authenticated views
    const response = await fetch(
        `${path}wp/v2/media?media_type=${type}&page=${page}&per_page=${perPage}`,
        {
            headers: {
                'X-WP-Nonce': getNonce()
            }
        }
    );
    const data = await response.json();
    const totalPages = response.headers.get('X-WP-TotalPages');
    return { data, totalPages };
};

/**
 * Get Site Options
 */
export const getSiteOptions = async () => {
    try {
        const response = await axios.get(
            path + "addifect-client/v1/site-options/", {
            headers: {
                'X-WP-Nonce': getNonce()
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Update Site Options
 */
export const updateSiteOptions = async (
    data: { site_options: {} }
) => {
    try {
        const response = await axios.post(
            path + "addifect-client/v1/site-options/",
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    'X-WP-Nonce': getNonce()
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Get Post Types
 */
export const getPostTypes = async () => {
    try {
        const response = await axios.get(
            path + "addifect-client/v1/post-types/", {
            withCredentials: true,
            headers: {
                'X-WP-Nonce': getNonce()
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Save Site Template
 */
export const publishSiteTemplate = async (
    postData: {
        template_id: string;
        template_data: Record<string, any>;
        is_part: boolean
    }
) => {
    try {
        const response = await axios.post(
            `${path}addifect-client/v1/save-template/`,
            postData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': getNonce()
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get current user data
 */
export const getCurrentUserInfo = async () => {
    try {
        const response = await axios.get(path + 'addifect-client/v1/current-user/', {
            withCredentials: true,
            headers: {
                'X-WP-Nonce': getNonce(),
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Set Active Kit: Maps the Studio to a specific Kit and Design Post
 */
export const setActiveKitConnection = async (
    connectionData: { kit_id: string, design_id: number }
) => {
    try {
        const response = await axios.post(
            `${path}addifect-client/v1/set-active-kit/`,
            connectionData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': getNonce()
                },
            }
        );
        return response.data;
    } catch (error) {
        // Log error or handle specific status codes (e.g., 400, 403)
        throw error;
    }
};