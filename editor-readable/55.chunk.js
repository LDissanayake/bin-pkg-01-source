"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([[55],{

/***/ 2055:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $c: () => (/* binding */ updateSiteOptions),
/* harmony export */   Gp: () => (/* binding */ updatePostData),
/* harmony export */   Gr: () => (/* binding */ getSiteOptions),
/* harmony export */   JB: () => (/* binding */ setActiveKitConnection),
/* harmony export */   hA: () => (/* binding */ publishSiteTemplate),
/* harmony export */   ix: () => (/* binding */ getPostTypes),
/* harmony export */   pD: () => (/* binding */ getCurrentUserInfo),
/* harmony export */   pY: () => (/* binding */ getPostData),
/* harmony export */   vp: () => (/* binding */ fetchMedia),
/* harmony export */   y9: () => (/* binding */ fetchPosts)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1083);


// Helper to get nonce from window object
const getNonce = () => window.addifectStudio?.nonce || "";
const path = window.addifectStudio?.root || "";

/**
 * Fetches posts by type from the server.
 */
const fetchPosts = async postType => {
  try {
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.get(`${path}addifect-client/v1/load-posts?post_type=${postType}`, {
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
const updatePostData = async postData => {
  try {
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.post(`${path}addifect-client/v1/update-post/`, postData, {
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': getNonce()
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Load Design/Post Data from WP
 */
const getPostData = async postId => {
  try {
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.get(`${path}addifect-client/v1/get-post-data/`, {
      params: {
        id: postId
      },
      headers: {
        "Content-Type": "application/json",
        'X-WP-Nonce': getNonce()
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Load Media
 */
const fetchMedia = async function () {
  let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'image';
  let page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  let perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  // Media usually requires a nonce for certain authenticated views
  const response = await fetch(`${path}wp/v2/media?media_type=${type}&page=${page}&per_page=${perPage}`, {
    headers: {
      'X-WP-Nonce': getNonce()
    }
  });
  const data = await response.json();
  const totalPages = response.headers.get('X-WP-TotalPages');
  return {
    data,
    totalPages
  };
};

/**
 * Get Site Options
 */
const getSiteOptions = async () => {
  try {
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.get(path + "addifect-client/v1/site-options/", {
      headers: {
        'X-WP-Nonce': getNonce()
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update Site Options
 */
const updateSiteOptions = async data => {
  try {
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.post(path + "addifect-client/v1/site-options/", data, {
      headers: {
        "Content-Type": "application/json",
        'X-WP-Nonce': getNonce()
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get Post Types
 */
const getPostTypes = async () => {
  try {
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.get(path + "addifect-client/v1/post-types/", {
      withCredentials: true,
      headers: {
        'X-WP-Nonce': getNonce()
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Save Site Template
 */
const publishSiteTemplate = async postData => {
  try {
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.post(`${path}addifect-client/v1/save-template/`, postData, {
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': getNonce()
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get current user data
 */
const getCurrentUserInfo = async () => {
  try {
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.get(path + 'addifect-client/v1/current-user/', {
      withCredentials: true,
      headers: {
        'X-WP-Nonce': getNonce()
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Set Active Kit: Maps the Studio to a specific Kit and Design Post
 */
const setActiveKitConnection = async connectionData => {
  try {
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.post(`${path}addifect-client/v1/set-active-kit/`, connectionData, {
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': getNonce()
      }
    });
    return response.data;
  } catch (error) {
    // Log error or handle specific status codes (e.g., 400, 403)
    throw error;
  }
};

/***/ })

}]);