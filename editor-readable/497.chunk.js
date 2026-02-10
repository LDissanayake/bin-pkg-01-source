"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([[497,55],{

/***/ 7497:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src_App)
});

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/MantineProvider/MantineProvider.mjs + 15 modules
var MantineProvider = __webpack_require__(1926);
// EXTERNAL MODULE: ./node_modules/@mantine/notifications/esm/Notifications.mjs + 37 modules
var Notifications = __webpack_require__(8704);
// EXTERNAL MODULE: ./node_modules/@mantine/notifications/esm/notifications.store.mjs + 1 modules
var notifications_store = __webpack_require__(9543);
// EXTERNAL MODULE: ./node_modules/@mantine/core/styles.css
var styles = __webpack_require__(7752);
// EXTERNAL MODULE: ./node_modules/@mantine/notifications/styles.css
var notifications_styles = __webpack_require__(5349);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs
var IconX = __webpack_require__(4067);
// EXTERNAL MODULE: ./src/FullScreenLoader.tsx + 1 modules
var FullScreenLoader = __webpack_require__(4065);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(5072);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(7825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(7659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(5056);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(1113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/Home/Home.module.css
var Home_module = __webpack_require__(1311);
;// CONCATENATED MODULE: ./src/Home/Home.module.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(Home_module/* default */.Ay, options);




       /* harmony default export */ const Home_Home_module = (Home_module/* default */.Ay && Home_module/* default */.Ay.locals ? Home_module/* default */.Ay.locals : undefined);

// EXTERNAL MODULE: ./src/icons/logo.svg
var logo = __webpack_require__(3030);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/CloseButton/CloseButton.mjs + 1 modules
var CloseButton = __webpack_require__(3255);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Button/Button.mjs + 3 modules
var Button = __webpack_require__(5055);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/ScrollArea/ScrollArea.mjs + 26 modules
var ScrollArea = __webpack_require__(2923);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Accordion/Accordion.mjs + 9 modules
var Accordion = __webpack_require__(5781);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Text/Text.mjs + 1 modules
var Text = __webpack_require__(7826);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Menu/Menu.mjs + 13 modules
var Menu = __webpack_require__(8830);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.mjs + 3 modules
var ActionIcon = __webpack_require__(8324);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/units-converters/rem.mjs
var rem = __webpack_require__(8149);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-icons/dist/react-icons.esm.js
var react_icons_esm = __webpack_require__(7049);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconFileTypeCss.mjs
var IconFileTypeCss = __webpack_require__(4748);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconFileTypeJs.mjs
var IconFileTypeJs = __webpack_require__(4014);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconPencil.mjs
var IconPencil = __webpack_require__(7370);
// EXTERNAL MODULE: ./src/util/wpApi.ts
var wpApi = __webpack_require__(2055);
// EXTERNAL MODULE: ./node_modules/lodash/cloneDeep.js
var cloneDeep = __webpack_require__(8055);
var cloneDeep_default = /*#__PURE__*/__webpack_require__.n(cloneDeep);
;// CONCATENATED MODULE: ./src/Home/HomeContext.tsx


// 1. Define types for state and context

// 2. Create the Context with a default value of `undefined`
const HomeContext = /*#__PURE__*/(0,external_React_.createContext)(undefined);

// 3. Define the provider's props

// 4. Create the Provider Component
const HomeProvider = _ref => {
  let {
    children,
    userData,
    setEditor,
    edition,
    setEdition
  } = _ref;
  return /*#__PURE__*/external_React_default().createElement(HomeContext.Provider, {
    value: {
      userData,
      setEditor,
      edition,
      setEdition
    }
  }, children);
};

// 5. Create a custom hook to use the HomeContext
const useHomeContext = () => {
  const context = (0,external_React_.useContext)(HomeContext);
  if (context === undefined) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/Home/CMSManage.module.css
var CMSManage_module = __webpack_require__(9616);
;// CONCATENATED MODULE: ./src/Home/CMSManage.module.css

      
      
      
      
      
      
      
      
      

var CMSManage_module_options = {};

CMSManage_module_options.styleTagTransform = (styleTagTransform_default());
CMSManage_module_options.setAttributes = (setAttributesWithoutAttributes_default());
CMSManage_module_options.insert = insertBySelector_default().bind(null, "head");
CMSManage_module_options.domAPI = (styleDomAPI_default());
CMSManage_module_options.insertStyleElement = (insertStyleElement_default());

var CMSManage_module_update = injectStylesIntoStyleTag_default()(CMSManage_module/* default */.Ay, CMSManage_module_options);




       /* harmony default export */ const Home_CMSManage_module = (CMSManage_module/* default */.Ay && CMSManage_module/* default */.Ay.locals ? CMSManage_module/* default */.Ay.locals : undefined);

// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Divider/Divider.mjs + 1 modules
var Divider = __webpack_require__(3403);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Notification/Notification.mjs + 1 modules
var Notification = __webpack_require__(2798);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Input/Input.mjs + 9 modules
var Input = __webpack_require__(6214);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Select/Select.mjs + 1 modules
var Select = __webpack_require__(5447);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/HoverCard/HoverCard.mjs + 3 modules
var HoverCard = __webpack_require__(8953);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Code/Code.mjs + 1 modules
var Code = __webpack_require__(3073);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconEdit.mjs
var IconEdit = __webpack_require__(9637);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconTrash.mjs
var IconTrash = __webpack_require__(4225);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconMinus.mjs
var IconMinus = __webpack_require__(8891);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconPlus.mjs
var IconPlus = __webpack_require__(2449);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs
var IconCheck = __webpack_require__(899);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconInfoCircle.mjs
var IconInfoCircle = __webpack_require__(7693);
;// CONCATENATED MODULE: ./src/Home/CMSManage.tsx




const CMSManage = _ref => {
  let {
    options,
    setOptions
  } = _ref;
  const [customPostData, setCustomPostData] = (0,external_React_.useState)(options?.custom_posts || []);
  const [newPostInputs, setNewPostInputs] = (0,external_React_.useState)({
    id: '',
    slug: '',
    archiveSlug: '',
    labelSingle: '',
    labelPlural: '',
    type: 'post',
    fields: [] // Initialize as an empty array
  });
  const [isCreating, setIsCreating] = (0,external_React_.useState)(false);
  const [editingIndex, setEditingIndex] = (0,external_React_.useState)(null);
  const [error, setError] = (0,external_React_.useState)(null);
  (0,external_React_.useEffect)(() => {
    if (options?.custom_posts && JSON.stringify(options?.custom_posts) !== JSON.stringify(customPostData)) {
      setCustomPostData(options.custom_posts);
    }
  }, [options]);
  const [mount, setMount] = (0,external_React_.useState)(false);
  (0,external_React_.useEffect)(() => {
    setMount(true);
  }, []);
  (0,external_React_.useEffect)(() => {
    if (!mount) {
      return;
    }
    setOptions('custom_posts', customPostData);
  }, [customPostData]);
  const canCreate = newPostInputs.id && newPostInputs.slug && newPostInputs.labelSingle;
  const isUnique = function (id, slug) {
    let excludeIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return !customPostData.some((post, index) => {
      if (excludeIndex !== null && index === excludeIndex) return false; // Exclude the current post
      return post.id === id || post.slug === slug;
    });
  };
  const sanitizeId = value => {
    // Convert to lowercase, remove anything not a–z
    return value.toLowerCase().replace(/[^a-z]/g, '');
  };
  const handleNewInputChange = (key, value) => {
    if (key === 'id') {
      value = sanitizeId(value);
    }
    setNewPostInputs(prevState => {
      const updatedInputs = {
        ...prevState,
        [key]: value
      };

      // If the `id` changes and the type is 'record', update the slug with the new `id`.
      if (key === 'id' && prevState.type === 'record') {
        updatedInputs.slug = value;
      }

      // If the `type` changes to 'record', update the slug with the current `id`.
      if (key === 'type' && value === 'record') {
        updatedInputs.slug = prevState.id;
      }
      return updatedInputs;
    });
  };
  const handleCreate = () => {
    if (!isUnique(newPostInputs.id, newPostInputs.slug)) {
      setError('ID or Slug must be unique.');
      return;
    }
    setCustomPostData([...customPostData, newPostInputs]);
    resetForm();
    setError(null);
  };
  const handleEdit = index => {
    setEditingIndex(index);
    setNewPostInputs(customPostData[index]);
    setIsCreating(true);
  };
  const handleUpdate = () => {
    if (editingIndex === null) return;
    if (!isUnique(newPostInputs.id, newPostInputs.slug, editingIndex)) {
      setError('ID or Slug must be unique.');
      return;
    }
    const updatedPosts = [...customPostData];
    updatedPosts[editingIndex] = newPostInputs;
    setCustomPostData(updatedPosts);
    resetForm();
    setError(null);
  };
  const handleRemove = index => {
    const updatedPosts = customPostData.filter((_, i) => i !== index);
    setCustomPostData(updatedPosts);
  };
  const resetForm = () => {
    setNewPostInputs({
      id: '',
      slug: '',
      archiveSlug: '',
      labelSingle: '',
      labelPlural: '',
      type: 'post',
      fields: []
    });
    setIsCreating(false);
    setEditingIndex(null);
  };
  const renderCustomPosts = () => {
    const groupedPosts = customPostData.reduce((acc, post) => {
      acc[post.type] = acc[post.type] || [];
      acc[post.type].push(post);
      return acc;
    }, {});
    return Object.entries(groupedPosts).map(_ref2 => {
      let [type, posts] = _ref2;
      return /*#__PURE__*/external_React_default().createElement("div", {
        key: type
      }, /*#__PURE__*/external_React_default().createElement(Divider/* Divider */.c, {
        my: "xs",
        label: type === 'post' ? 'Custom Posts' : 'Info Records',
        labelPosition: "left"
      }), posts.map((post, index) => {
        const originalIndex = customPostData.indexOf(post);
        return /*#__PURE__*/external_React_default().createElement("div", {
          key: `${type}-${index}`
        }, /*#__PURE__*/external_React_default().createElement("div", {
          className: CMSManage_module/* postItem */.YD
        }, /*#__PURE__*/external_React_default().createElement("div", {
          className: CMSManage_module/* postTitle */.pT
        }, post.labelPlural, type === 'post' && /*#__PURE__*/external_React_default().createElement("span", null, "/", post.slug, "/")), /*#__PURE__*/external_React_default().createElement("div", {
          className: CMSManage_module/* postActions */.AU
        }, /*#__PURE__*/external_React_default().createElement(ActionIcon/* ActionIcon */.M, {
          variant: "light",
          onClick: () => handleEdit(originalIndex)
        }, /*#__PURE__*/external_React_default().createElement(IconEdit/* default */.A, {
          width: "70%",
          height: "70%",
          stroke: 1
        })), /*#__PURE__*/external_React_default().createElement(ActionIcon/* ActionIcon */.M, {
          variant: "light",
          onClick: () => handleRemove(originalIndex),
          color: "red"
        }, /*#__PURE__*/external_React_default().createElement(IconTrash/* default */.A, {
          width: "70%",
          height: "70%",
          stroke: 1
        })))));
      }));
    });
  };
  return /*#__PURE__*/external_React_default().createElement("div", null, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* title */.DD
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* titleCol */.bb
  }, "CMS", infoData.cms), /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* titleCol */.bb
  }, /*#__PURE__*/external_React_default().createElement(ActionIcon/* ActionIcon */.M, {
    onClick: () => {
      if (isCreating) {
        setIsCreating(false);
        resetForm();
      } else {
        setIsCreating(true);
      }
    }
  }, isCreating ? /*#__PURE__*/external_React_default().createElement(IconMinus/* default */.A, {
    width: "70%",
    height: "70%",
    stroke: 1
  }) : /*#__PURE__*/external_React_default().createElement(IconPlus/* default */.A, {
    width: "70%",
    height: "70%",
    stroke: 1
  })))), error && /*#__PURE__*/external_React_default().createElement(Notification/* Notification */.E, {
    color: "red",
    withCloseButton: false,
    withBorder: true,
    m: 6
  }, error), /*#__PURE__*/external_React_default().createElement("div", null, isCreating ? /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* formWrap */.xb
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlWrap */.qf
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlCol */.Gw
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabel */.g5
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabelText */.vo
  }, "ID"), /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabelInfo */.yi
  }, infoData.id))), /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlCol */.Gw
  }, /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    size: "xs",
    value: newPostInputs.id,
    onChange: event => handleNewInputChange('id', event.currentTarget.value)
  }))), /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlWrap */.qf
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlCol */.Gw
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabel */.g5
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabelText */.vo
  }, "Type"), /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabelInfo */.yi
  }, infoData.type))), /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlCol */.Gw
  }, /*#__PURE__*/external_React_default().createElement(Select/* Select */.l, {
    value: newPostInputs.type,
    data: [{
      value: 'post',
      label: 'Post'
    }, {
      value: 'record',
      label: 'Info Record'
    }],
    size: "xs",
    onChange: value => handleNewInputChange('type', value || 'post'),
    comboboxProps: {
      withinPortal: false
    },
    allowDeselect: false
  }))), newPostInputs.type === 'post' && /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, /*#__PURE__*/external_React_default().createElement(Divider/* Divider */.c, {
    my: "xs",
    label: "Slugs",
    labelPosition: "left"
  }), /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlWrap */.qf
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlCol */.Gw
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabel */.g5
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabelText */.vo
  }, "Post-type Slug"), /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabelInfo */.yi
  }, infoData.slug)), /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    size: "xs",
    value: newPostInputs.slug,
    onChange: event => handleNewInputChange('slug', event.currentTarget.value)
  })), /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlCol */.Gw
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabel */.g5
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabelText */.vo
  }, "Archive Slug"), /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabelInfo */.yi
  }, infoData.archiveSlug)), /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    size: "xs",
    value: newPostInputs.archiveSlug,
    onChange: event => handleNewInputChange('archiveSlug', event.currentTarget.value)
  })))), /*#__PURE__*/external_React_default().createElement(Divider/* Divider */.c, {
    my: "xs",
    label: "Labels",
    labelPosition: "left"
  }), /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlWrap */.qf
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlCol */.Gw
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabel */.g5
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabelText */.vo
  }, "Label Single"), /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabelInfo */.yi
  }, infoData.labelSingle)), /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    size: "xs",
    value: newPostInputs.labelSingle,
    onChange: event => handleNewInputChange('labelSingle', event.currentTarget.value)
  })), /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlCol */.Gw
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabel */.g5
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabelText */.vo
  }, "Label Plural"), /*#__PURE__*/external_React_default().createElement("div", {
    className: CMSManage_module/* controlLabelInfo */.yi
  }, infoData.labelPlural)), /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    size: "xs",
    value: newPostInputs.labelPlural,
    onChange: event => handleNewInputChange('labelPlural', event.currentTarget.value)
  }))), /*#__PURE__*/external_React_default().createElement("div", null, editingIndex === null ? /*#__PURE__*/external_React_default().createElement(ActionIcon/* ActionIcon */.M, {
    disabled: !canCreate,
    onClick: handleCreate
  }, /*#__PURE__*/external_React_default().createElement(IconPlus/* default */.A, {
    width: "70%",
    height: "70%",
    stroke: 1
  })) : /*#__PURE__*/external_React_default().createElement(ActionIcon/* ActionIcon */.M, {
    disabled: !canCreate,
    onClick: handleUpdate
  }, /*#__PURE__*/external_React_default().createElement(IconCheck/* default */.A, {
    width: "70%",
    height: "70%",
    stroke: 1
  })))) : renderCustomPosts()));
};
/* harmony default export */ const Home_CMSManage = (CMSManage);
const Info = _ref3 => {
  let {
    children
  } = _ref3;
  return /*#__PURE__*/external_React_default().createElement(HoverCard/* HoverCard */.j, {
    width: 280,
    shadow: "md",
    withinPortal: false,
    withArrow: true
  }, /*#__PURE__*/external_React_default().createElement(HoverCard/* HoverCard */.j.Target, null, /*#__PURE__*/external_React_default().createElement(IconInfoCircle/* default */.A, {
    width: "16px",
    height: "16px"
  })), /*#__PURE__*/external_React_default().createElement(HoverCard/* HoverCard */.j.Dropdown, null, children));
};
const infoData = {
  cms: /*#__PURE__*/external_React_default().createElement(Info, null, /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs"
  }, "CMS"), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs",
    c: "dimmed",
    my: "xs"
  }, "A tool for managing additional content types beyond the default WordPress Posts and Pages."), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs",
    c: "dimmed",
    my: "xs"
  }, "This CMS allows you to create and manage Custom Posts (e.g., portfolios, concept projects, galleries) and Info Records (e.g., team members, testimonials), tailored to your website's specific needs."), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs",
    c: "dimmed",
    my: "xs",
    fs: "italic"
  }, "This CMS extends WordPress's core capabilities, which already handle Posts and Pages.")),
  id: /*#__PURE__*/external_React_default().createElement(Info, null, /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs"
  }, "ID"), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs",
    c: "dimmed",
    my: "xs"
  }, "A unique identifier for the custom post type. This is used internally to manage and reference your custom posts."), /*#__PURE__*/external_React_default().createElement(Divider/* Divider */.c, {
    my: 12
  }), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs",
    c: "dimmed",
    my: "xs"
  }, "\u26A0\uFE0F Warning: Once the ID is set, avoid changing it."), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs",
    c: "dimmed",
    my: "xs"
  }, "If you have existing posts associated with this custom post ID, they will become unreachable until you revert to the old ID or create a new custom post type with the previous ID.")),
  type: /*#__PURE__*/external_React_default().createElement(Info, null, /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs"
  }, "Custom Posts"), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs",
    c: "dimmed",
    my: "xs"
  }, "Manage unique types of posts for custom use cases, such as projects, concept or portfolios."), /*#__PURE__*/external_React_default().createElement(Divider/* Divider */.c, {
    my: 12
  }), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs"
  }, "Info Records"), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs",
    c: "dimmed",
    my: "xs"
  }, "A flexible data type used to store structured information that supports your content. Info records are ideal for backend data like team member profiles, testimonials, FAQs, or other auxiliary details. They are not designed to be directly displayed as standalone pages but are often used to populate sections of your site dynamically.")),
  slug: /*#__PURE__*/external_React_default().createElement(Info, null, /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs"
  }, "Post-type Slug"), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs",
    c: "dimmed",
    my: "xs"
  }, "The unique identifier used in the URL structure for posts of this custom type. It defines how the posts will be accessed on the front end."), /*#__PURE__*/external_React_default().createElement(Divider/* Divider */.c, {
    my: 12
  }), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs"
  }, "Example:"), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs",
    c: "dimmed"
  }, "If you set the PostType Slug as ", /*#__PURE__*/external_React_default().createElement(Code/* Code */.C, null, "projects"), ", posts of this type will appear at ", /*#__PURE__*/external_React_default().createElement(Code/* Code */.C, null, "/projects/your-post-title/"), ".")),
  archiveSlug: /*#__PURE__*/external_React_default().createElement(Info, null, /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs"
  }, "Archive Slug"), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs",
    c: "dimmed",
    my: "xs"
  }, "Optional: A redirect slug for archive pages. Use this if the archive URL differs from the Post-type Slug.")),
  labelSingle: /*#__PURE__*/external_React_default().createElement(Info, null, /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs"
  }, "Label Single"), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs",
    c: "dimmed",
    my: "xs"
  }, "An admin-only label used to represent a single instance of this item (e.g., 'Product'). Not used on the front end.")),
  labelPlural: /*#__PURE__*/external_React_default().createElement(Info, null, /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs"
  }, "Label Plural"), /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs",
    c: "dimmed",
    my: "xs"
  }, "An admin-only label used to represent multiple instances of this item (e.g., 'Products'). Not used on the front end."))
};
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Stack/Stack.mjs + 1 modules
var Stack = __webpack_require__(9019);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Group/Group.mjs + 2 modules
var Group = __webpack_require__(4999);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Switch/Switch.mjs + 6 modules
var Switch = __webpack_require__(648);
;// CONCATENATED MODULE: ./src/Home/CapturedStyles.tsx




// Matches your PHP capture logic

const CapturedStyles = _ref => {
  let {
    styles,
    options,
    setOptions
  } = _ref;
  // 1. Initialize local state from options prop
  const [styleState, setStyleState] = (0,external_React_.useState)(() => ({
    stylesheet: options?.disabled_css?.stylesheet || [],
    inline: options?.disabled_css?.inline || []
  }));

  // 2. Surgical toggle function
  const handleToggle = (handle, type) => {
    // Map 'stylesheet' OR 'script' to the 'stylesheet' state key
    const stateKey = type === "inline" ? "inline" : "stylesheet";
    const currentHandles = styleState[stateKey];
    const isCurrentlyDisabled = currentHandles.includes(handle);
    const updatedHandles = isCurrentlyDisabled ? currentHandles.filter(h => h !== handle) : [...currentHandles, handle];
    const newState = {
      ...styleState,
      [stateKey]: updatedHandles
    };

    // Update local UI immediately
    setStyleState(newState);

    // Notify parent (Studio) of the change
    setOptions("disabled_css", newState);
  };
  if (!styles || styles.length === 0) {
    return /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
      size: "sm",
      c: "dimmed",
      my: "md"
    }, "No styles captured.");
  }
  return /*#__PURE__*/external_React_default().createElement(Stack/* Stack */.B, {
    gap: "xs"
  }, /*#__PURE__*/external_React_default().createElement(Divider/* Divider */.c, {
    my: "xs",
    label: "Captured Styles",
    labelPosition: "left"
  }), styles.map((style, index) => {
    // Determine the correct key for state lookup
    const stateKey = style.type === "inline" ? "inline" : "stylesheet";
    const isExcluded = styleState[stateKey]?.includes(style.handle);
    return /*#__PURE__*/external_React_default().createElement("div", {
      key: `${style.handle}-${index}`
    }, /*#__PURE__*/external_React_default().createElement(Group/* Group */.Y, {
      gap: "xs"
    }, /*#__PURE__*/external_React_default().createElement(Switch/* Switch */.d, {
      label: style.handle
      // Flip the logic: if it IS NOT in the excluded list, show it as "On" (Blue)
      ,
      checked: !isExcluded
      // When toggled, it still adds/removes from your disabled list correctly
      ,
      onChange: () => handleToggle(style.handle, style.type),
      size: "xs",
      color: "rgb(153 177 210)" // Standard active color
    }), style.type === "stylesheet" || style.type === "script" ? /*#__PURE__*/external_React_default().createElement(HoverCard/* HoverCard */.j, {
      width: 280,
      shadow: "md",
      withArrow: true
    }, /*#__PURE__*/external_React_default().createElement(HoverCard/* HoverCard */.j.Target, null, /*#__PURE__*/external_React_default().createElement(IconInfoCircle/* default */.A, {
      size: 14,
      style: {
        cursor: 'help',
        color: 'gray'
      }
    })), /*#__PURE__*/external_React_default().createElement(HoverCard/* HoverCard */.j.Dropdown, null, /*#__PURE__*/external_React_default().createElement("div", {
      style: {
        fontSize: 10,
        wordBreak: 'break-all'
      }
    }, /*#__PURE__*/external_React_default().createElement("strong", null, "Source:"), " ", style.src || "Internal", " ", /*#__PURE__*/external_React_default().createElement("br", null), /*#__PURE__*/external_React_default().createElement("strong", null, "Dependencies:"), " ", style.deps?.length ? style.deps.join(", ") : "None", " ", /*#__PURE__*/external_React_default().createElement("br", null), /*#__PURE__*/external_React_default().createElement("strong", null, "Media:"), " ", style.media || "All", " ", /*#__PURE__*/external_React_default().createElement("br", null), /*#__PURE__*/external_React_default().createElement("strong", null, "Origin:"), " ", style.source || "Unknown"))) : /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
      c: "dimmed",
      size: "xs",
      fs: "italic"
    }, "[inline style]")));
  }));
};
/* harmony default export */ const Home_CapturedStyles = (CapturedStyles);
;// CONCATENATED MODULE: ./src/Home/CapturedScripts.tsx



const CapturedScripts = _ref => {
  let {
    scripts,
    options,
    setOptions
  } = _ref;
  // 1. Single source of truth: Local state initialized from props
  const [scriptState, setScriptState] = (0,external_React_.useState)(() => ({
    script: options?.disabled_scripts?.script || [],
    inline: options?.disabled_scripts?.inline || []
  }));

  // 2. Optimized Toggle Function
  const handleToggle = (handle, type) => {
    const currentHandles = scriptState[type];
    const isCurrentlyDisabled = currentHandles.includes(handle);
    const updatedHandles = isCurrentlyDisabled ? currentHandles.filter(h => h !== handle) : [...currentHandles, handle];
    const newState = {
      ...scriptState,
      [type]: updatedHandles
    };

    // Update local state for immediate UI feedback
    setScriptState(newState);

    // Push to parent immediately to ensure the "Save" button gets the right data
    setOptions("disabled_scripts", newState);
  };

  // 3. Prevent render if no scripts exist
  if (!scripts || scripts.length === 0) {
    return /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
      size: "sm",
      c: "dimmed",
      my: "md"
    }, "No scripts captured.");
  }
  return /*#__PURE__*/external_React_default().createElement(Stack/* Stack */.B, {
    gap: "xs"
  }, /*#__PURE__*/external_React_default().createElement(Divider/* Divider */.c, {
    my: "xs",
    label: "Captured Scripts",
    labelPosition: "left"
  }), scripts.map((script, index) => {
    // Determine if this specific item is disabled (checked)
    // We use script.type as the key to look into the state
    const isExcluded = scriptState[script.type]?.includes(script.handle);
    return /*#__PURE__*/external_React_default().createElement("div", {
      key: `${script.handle}-${index}`
    }, /*#__PURE__*/external_React_default().createElement(Group/* Group */.Y, {
      gap: "xs"
    }, /*#__PURE__*/external_React_default().createElement(Switch/* Switch */.d, {
      label: script.handle
      // Flip the logic: if it IS NOT in the excluded list, show it as "On" (Blue)
      ,
      checked: !isExcluded
      // When toggled, it still adds/removes from your disabled list correctly
      ,
      onChange: () => handleToggle(script.handle, script.type),
      size: "xs",
      color: "rgb(153 177 210)" // Standard active color
    }), script.type === "script" ? /*#__PURE__*/external_React_default().createElement(HoverCard/* HoverCard */.j, {
      width: 280,
      shadow: "md",
      withArrow: true
    }, /*#__PURE__*/external_React_default().createElement(HoverCard/* HoverCard */.j.Target, null, /*#__PURE__*/external_React_default().createElement(IconInfoCircle/* default */.A, {
      size: 14,
      style: {
        cursor: 'help',
        color: 'gray'
      }
    })), /*#__PURE__*/external_React_default().createElement(HoverCard/* HoverCard */.j.Dropdown, null, /*#__PURE__*/external_React_default().createElement("div", {
      style: {
        fontSize: 10,
        wordBreak: "break-all"
      }
    }, /*#__PURE__*/external_React_default().createElement("strong", null, "Source:"), " ", script.src || "Core / Internal", " ", /*#__PURE__*/external_React_default().createElement("br", null), /*#__PURE__*/external_React_default().createElement("strong", null, "Dependencies:"), " ", script.deps?.length ? script.deps.join(", ") : "None", " ", /*#__PURE__*/external_React_default().createElement("br", null), /*#__PURE__*/external_React_default().createElement("strong", null, "Location:"), " ", script.in_footer ? "Footer" : "Header", " ", /*#__PURE__*/external_React_default().createElement("br", null), /*#__PURE__*/external_React_default().createElement("strong", null, "Origin:"), " ", script.source || "Unknown"))) : /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
      c: "dimmed",
      size: "xs",
      fs: "italic"
    }, "[inline]")));
  }));
};
/* harmony default export */ const Home_CapturedScripts = (CapturedScripts);
;// CONCATENATED MODULE: ./src/Home/useGridAlign.tsx

function useGridAlign(step) {
  let gap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  let mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "next";
  let align = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "left";
  const ref = (0,external_React_.useRef)(null);
  const [alignedWidth, setAlignedWidth] = (0,external_React_.useState)(undefined);
  (0,external_React_.useEffect)(() => {
    function alignFn() {
      if (!ref.current) return;
      const naturalWidth = ref.current.scrollWidth;
      let aligned;
      switch (mode) {
        case "prev":
          aligned = Math.floor(naturalWidth / step) * step;
          break;
        case "nearest":
          aligned = Math.round(naturalWidth / step) * step;
          break;
        default:
          aligned = Math.ceil(naturalWidth / step) * step;
      }

      // Adjust for right alignment: shift one gap forward
      if (align === "right") aligned -= gap;
      setAlignedWidth(Math.max(aligned, 0));
    }
    alignFn();
    window.addEventListener("resize", alignFn);
    return () => window.removeEventListener("resize", alignFn);
  }, [step, gap, mode, align]);
  return {
    ref,
    alignedWidth
  };
}
;// CONCATENATED MODULE: ./src/Home/Home.tsx













const Home = _ref => {
  let {
    userData,
    setEditor,
    edition,
    setEdition
  } = _ref;
  return /*#__PURE__*/external_React_default().createElement(HomeProvider, {
    userData: userData,
    setEditor: setEditor,
    edition: edition,
    setEdition: setEdition
  }, /*#__PURE__*/external_React_default().createElement(Inside, null));
};
const Inside = () => {
  const {
    userData,
    edition
  } = useHomeContext();
  const [loading, setLoading] = (0,external_React_.useState)(true);
  const [dialog, setDialog] = (0,external_React_.useState)(null);
  const [postTypes, setPostTypes] = (0,external_React_.useState)([]);
  const ref = (0,external_React_.useRef)(null);
  (0,external_React_.useEffect)(() => {
    setLoading(true);
    (0,wpApi/* getPostTypes */.ix)().then(response => {
      if (response) {
        setPostTypes(response);
      }
      setLoading(false);
    }).catch(error => {
      console.error('Error loading style data:', error);
      setLoading(false);
    });
  }, []);
  const [init, setInit] = (0,external_React_.useState)(false);
  (0,external_React_.useEffect)(() => {
    setInit(true);
  }, []);
  const filterIcons = {
    page: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* FileTextIcon */.dsF, null),
    post: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* ReaderIcon */.XKI, null),
    record: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* TableIcon */.KbA, null),
    design: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* OpacityIcon */.FNe, null)
  };
  const ucd = userData.capable === '1' || userData.capable === '2';
  const [activeType, setActiveType] = (0,external_React_.useState)(null);
  (0,external_React_.useEffect)(() => {
    if (postTypes.length) {
      setActiveType(postTypes[0].id);
    }
  }, [postTypes]);
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* mainWrap */.sR,
    style: {
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      opacity: init ? 1 : 0,
      transition: 'opacity 1s ease'
    }
  }, /*#__PURE__*/external_React_default().createElement("div", {
    ref: ref,
    className: Home_module/* main */.iW
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* content */.Qs
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* left */.kb
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* brand */.wk
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* brand_left */.sU
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* brand_wrap */.x3
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* brand_logo */._4
  }, /*#__PURE__*/external_React_default().createElement(logo/* default */.A, null)), /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* brand_card */.rP
  }, "addifect")), /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* nav_panel */.h5
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* nav_item */.q4,
    onClick: () => setDialog('settings')
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* nav_item_icon */.bF
  }, /*#__PURE__*/external_React_default().createElement(react_icons_esm/* GearIcon */.L64, null)), "Settings"), /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* nav_item */.q4
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* nav_item_icon */.bF
  }, /*#__PURE__*/external_React_default().createElement(react_icons_esm/* InfoCircledIcon */._TA, null)), "Help"))), /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* brand_right */.jE
  }))), /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* right */.pG
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* top_bar */.Y
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* top_bar_filter */.p4
  }, /*#__PURE__*/external_React_default().createElement(Loader, {
    loaded: !loading
  }), loading ? '' : /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, [{
    'id': 'addifect_design',
    'label': 'Designs',
    'type': 'design'
  }].map((item, i) => {
    const active = activeType === item.id;
    return /*#__PURE__*/external_React_default().createElement(FilterItem, {
      key: item.id,
      active: active,
      onClick: () => setActiveType(item.id)
    }, /*#__PURE__*/external_React_default().createElement("span", null, filterIcons[item.type]), item.label);
  }))), /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* top_bar_author_card */.Rv
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* top_bar_mode */.eS
  }, edition), /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* top_bar_author_name */.Mm
  }, "Hello! ", userData.name), userData.url ? /*#__PURE__*/external_React_default().createElement("img", {
    className: Home_module/* top_bar_author_img */.uE,
    src: userData.url,
    alt: userData.name
  }) : /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* top_bar_author_placeholder */.ub
  }, /*#__PURE__*/external_React_default().createElement(react_icons_esm/* PersonIcon */.nXn, null)))), activeType ? /*#__PURE__*/external_React_default().createElement(Cards, {
    id: activeType,
    slug: 'design'
  }) : ''))), dialog === 'settings' && /*#__PURE__*/external_React_default().createElement(SiteSettings, {
    close: () => setDialog(null)
  }));
};
/* harmony default export */ const Home_Home = (Home);
const FilterItem = _ref2 => {
  let {
    children,
    active,
    onClick
  } = _ref2;
  const gap = 2;
  const cellWidth = 12;
  const step = cellWidth + gap;
  const {
    ref: nameRef,
    alignedWidth
  } = useGridAlign(step, gap, "next", "right");
  return /*#__PURE__*/external_React_default().createElement("div", {
    ref: nameRef,
    className: Home_module/* top_bar_filter_btn */.av,
    style: {
      width: alignedWidth ? `${alignedWidth}px` : "auto"
    },
    "data-active": active,
    onClick: onClick
  }, children);
};
const DialogWrap = _ref3 => {
  let {
    title,
    close,
    children
  } = _ref3;
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* dw_outer_wrap */.zf
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* dw_wrap */.RS
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* dw_topbar */.pC
  }, title, /*#__PURE__*/external_React_default().createElement(CloseButton/* CloseButton */.J, {
    onClick: close
  })), /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* dw_container */.m0
  }, children)));
};
const SiteSettings = _ref4 => {
  let {
    close
  } = _ref4;
  const [activeTab, setActiveTab] = (0,external_React_.useState)('2');
  const [loaded, setLoaded] = (0,external_React_.useState)(false);
  const [initOptions, setInitOptions] = (0,external_React_.useState)({});
  const [siteOptionsData, setSiteOptionsData] = (0,external_React_.useState)({});
  const [options, setOptions] = (0,external_React_.useState)({});
  (0,external_React_.useEffect)(() => {
    setLoaded(false);
    (0,wpApi/* getSiteOptions */.Gr)().then(response => {
      if (response?.site_options_data && typeof response?.site_options_data === 'object') {
        setSiteOptionsData(response.site_options_data);
      }
      if (response?.site_options && typeof response?.site_options === 'object') {
        setInitOptions(response.site_options);
        setOptions(response.site_options);
      }
      setLoaded(true);
    }).catch(error => {
      setLoaded(true);
      console.error('Error loading style data:', error);
    });
  }, []);
  const canSave = JSON.stringify(initOptions) !== JSON.stringify(options);
  const [dataSaving, setDataSaving] = (0,external_React_.useState)(false);
  const handleSaveData = async () => {
    setDataSaving(true);
    try {
      const response = await (0,wpApi/* updateSiteOptions */.$c)({
        site_options: options
      });
      setInitOptions(cloneDeep_default()(options));
      setDataSaving(false);
    } catch (error) {
      console.error('Error saving style data:', error);
      setDataSaving(false);
    }
  };
  const handleOptionChange = (option, value) => {
    setOptions(prev => {
      return {
        ...prev,
        [option]: value
      };
    });
  };
  return /*#__PURE__*/external_React_default().createElement(DialogWrap, {
    title: "Settings",
    close: close
  }, /*#__PURE__*/external_React_default().createElement(Loader, {
    loaded: loaded
  }), /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* dw_sidebar */.vg
  }, /*#__PURE__*/external_React_default().createElement("div", null, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* dw_sidebar_pill */.fm,
    onClick: () => setActiveTab('2'),
    "data-active": activeTab === '2'
  }, "Optimize")), /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* dw_sidebar_footer */.VL
  }, /*#__PURE__*/external_React_default().createElement(Button/* Button */.$, {
    disabled: !canSave,
    fullWidth: true,
    size: "xs",
    loading: dataSaving,
    onClick: handleSaveData
  }, "Save Changes"))), /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* dw_content */.Gx
  }, /*#__PURE__*/external_React_default().createElement(ScrollArea/* ScrollArea */.F, {
    h: "100%"
  }, activeTab === '1' && /*#__PURE__*/external_React_default().createElement(Home_CMSManage, {
    options: options,
    setOptions: handleOptionChange
  }), activeTab === '2' && /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "To capture scripts and styles, ", /*#__PURE__*/external_React_default().createElement("a", {
    href: `${window.addifectStudio?.home}/?addifect_capture_assets=1`,
    target: "_blank"
  }, "visit this link"), "after publishing your Addifect design. Then, refresh this page."), /*#__PURE__*/external_React_default().createElement(Accordion/* Accordion */.n, {
    variant: "separated",
    radius: "md"
  }, /*#__PURE__*/external_React_default().createElement(Accordion/* Accordion */.n.Item, {
    value: "css"
  }, /*#__PURE__*/external_React_default().createElement(Accordion/* Accordion */.n.Control, {
    icon: /*#__PURE__*/external_React_default().createElement(IconFileTypeCss/* default */.A, null)
  }, "Optimize CSS Loading"), /*#__PURE__*/external_React_default().createElement(Accordion/* Accordion */.n.Panel, null, /*#__PURE__*/external_React_default().createElement("div", null, /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs"
  }, "Enable/Disable external stylesheets and inline styles from loading in Addifect views (pages/posts)."), /*#__PURE__*/external_React_default().createElement(Home_CapturedStyles, {
    styles: siteOptionsData?.registered_styles || [],
    options: options,
    setOptions: handleOptionChange
  })))), /*#__PURE__*/external_React_default().createElement(Accordion/* Accordion */.n.Item, {
    value: "js"
  }, /*#__PURE__*/external_React_default().createElement(Accordion/* Accordion */.n.Control, {
    icon: /*#__PURE__*/external_React_default().createElement(IconFileTypeJs/* default */.A, null)
  }, "Optimize JS Loading"), /*#__PURE__*/external_React_default().createElement(Accordion/* Accordion */.n.Panel, null, /*#__PURE__*/external_React_default().createElement("div", null, /*#__PURE__*/external_React_default().createElement(Text/* Text */.E, {
    size: "xs"
  }, "Enable/Disable external scripts and inline JavaScript from loading in Addifect views (pages/posts)."), /*#__PURE__*/external_React_default().createElement(Home_CapturedScripts, {
    scripts: siteOptionsData?.registered_scripts || [],
    options: options,
    setOptions: handleOptionChange
  })))))))));
};
const Cards = _ref5 => {
  let {
    id,
    slug
  } = _ref5;
  const {
    setEditor
  } = useHomeContext();
  const [items, setItems] = (0,external_React_.useState)([]);
  const [loading, setLoading] = (0,external_React_.useState)(false);
  const [loadingError, setLoadingError] = (0,external_React_.useState)(false);
  const wrapperRef = (0,external_React_.useRef)(null);
  const cellWidth = 12;
  const gridGap = 2;
  const cardGap = 14;
  const cardsPerRow = 4;

  // Effect to check last edited time and fetch data if changed
  (0,external_React_.useEffect)(() => {
    loadData(id);
  }, [id]);
  (0,external_React_.useEffect)(() => {
    setLoading(true);
    setItems([]);
  }, [id]);

  // Function to load data for specified post type
  const loadData = async postType => {
    setLoading(true);
    setLoadingError(false);
    try {
      const posts = await (0,wpApi/* fetchPosts */.y9)(postType);
      setItems(posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setLoadingError(true);
    }
  };
  const renderItems = items => items && items.map(item => {
    return /*#__PURE__*/external_React_default().createElement("div", {
      key: item.id,
      className: Home_module/* content_cards_item */.ML
    }, /*#__PURE__*/external_React_default().createElement("div", {
      className: Home_module/* content_cards_item_image */.Q4,
      style: {
        backgroundImage: `url(${item.thumb})`
      }
    }, !item.thumb && item.title[0]), /*#__PURE__*/external_React_default().createElement("div", {
      className: Home_module/* content_cards_item_detail */.u2
    }, /*#__PURE__*/external_React_default().createElement("div", {
      className: Home_module/* content_cards_item_detail_left */._Y
    }, item.addifect_edited && /*#__PURE__*/external_React_default().createElement("span", {
      className: Home_module/* content_cards_item_icon */._C
    }, /*#__PURE__*/external_React_default().createElement(react_icons_esm/* CheckCircledIcon */.KaV, null)), /*#__PURE__*/external_React_default().createElement("div", {
      className: Home_module/* content_cards_item_label */.Dz
    }, item.title)), /*#__PURE__*/external_React_default().createElement(Menu/* Menu */.W, {
      shadow: "md",
      withArrow: true,
      position: "bottom-end",
      withinPortal: false
    }, /*#__PURE__*/external_React_default().createElement(Menu/* Menu */.W.Target, null, /*#__PURE__*/external_React_default().createElement(ActionIcon/* ActionIcon */.M, {
      variant: "transparent",
      color: "light"
    }, /*#__PURE__*/external_React_default().createElement(react_icons_esm/* DotsHorizontalIcon */.Oer, null))), /*#__PURE__*/external_React_default().createElement(Menu/* Menu */.W.Dropdown, null, /*#__PURE__*/external_React_default().createElement(Menu/* Menu */.W.Item, {
      leftSection: /*#__PURE__*/external_React_default().createElement(IconPencil/* default */.A, {
        style: {
          width: (0,rem/* rem */.D)(14),
          height: (0,rem/* rem */.D)(14)
        }
      }),
      onClick: () => setEditor({
        type: 'block',
        id: item.id
      })
    }, "Edit")))));
  });
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* content_cards */.E_
  }, /*#__PURE__*/external_React_default().createElement(ScrollArea/* ScrollArea */.F, {
    h: "100%",
    w: "100%",
    scrollbarSize: 2
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* content_cards_wrap */.NF,
    ref: wrapperRef
  }, !loading && renderItems(items), /*#__PURE__*/external_React_default().createElement(Loader, {
    loaded: !loading
  }))));
};
const Loader = _ref6 => {
  let {
    loaded
  } = _ref6;
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* loader */.wG,
    "data-loaded": loaded
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* loader_logoWrap */.EH
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: Home_module/* brand_logo */._4
  }, /*#__PURE__*/external_React_default().createElement(logo/* default */.A, null), /*#__PURE__*/external_React_default().createElement("span", null), /*#__PURE__*/external_React_default().createElement("span", null), /*#__PURE__*/external_React_default().createElement("span", null), /*#__PURE__*/external_React_default().createElement("span", null))));
};
;// CONCATENATED MODULE: ./src/Home/index.ts

/* harmony default export */ const src_Home = (Home_Home);
;// CONCATENATED MODULE: ./src/App.tsx











// Define the available tiers

// Lazy-loaded components
const BlockEditor = /*#__PURE__*/external_React_default().lazy(() => Promise.all(/* import() */[__webpack_require__.e(489), __webpack_require__.e(61), __webpack_require__.e(625), __webpack_require__.e(193)]).then(__webpack_require__.bind(__webpack_require__, 1193)));
// 1. DEFINE IMMEDIATELY (Top Level)
window.AddifectCore = window.AddifectCore || {
  version: '1.0.0',
  registry: {
    features: {}
  },
  registerProFeature: (name, config) => {
    window.AddifectCore.registry.features[name] = config;
    // Notify React Hooks that the registry changed.
    window.dispatchEvent(new CustomEvent('addifect_registry_updated'));
  }
};
function App() {
  const [userData, setUserData] = (0,external_React_.useState)({
    name: '',
    url: '',
    capable: ''
  }); // User's name and avatar URL
  const [editor, setEditor] = (0,external_React_.useState)(null); // Current editor state (if any)
  const [edition, setEdition] = (0,external_React_.useState)('lite');
  (0,external_React_.useEffect)(() => {
    // 2. SIGNAL READINESS
    // Now that React is mounting, tell addons they can start calling registerProFeature
    window.dispatchEvent(new CustomEvent('addifect_init'));
  }, []);
  (0,external_React_.useEffect)(() => {
    async function fetchUserInfo() {
      try {
        const data = await (0,wpApi/* getCurrentUserInfo */.pD)();
        setUserData({
          name: data?.user_name || '',
          url: data?.user_avatar || '',
          capable: data?.signature
        });
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    }
    fetchUserInfo();
  }, []);

  // Function to handle API errors and show notifications
  const handleApiError = error => {
    if (error.response?.data?.code === 'unauthorized') {
      // setUnauthorized(true);
    } else {
      const errorMsg = error?.message || 'Unknown Error';
      notifications_store/* notifications */.$e.show({
        icon: /*#__PURE__*/external_React_default().createElement(IconX/* default */.A, null),
        withCloseButton: true,
        color: "red",
        radius: "lg",
        title: errorMsg,
        message: 'Something went wrong. Please try again shortly.',
        autoClose: false
      });
    }
  };
  return /*#__PURE__*/external_React_default().createElement(MantineProvider/* MantineProvider */.y, {
    theme: {
      fontFamily: "'Poppins', sans-serif"
    },
    defaultColorScheme: "dark"
  }, editor && editor.type === 'block' ? /*#__PURE__*/external_React_default().createElement(external_React_.Suspense, {
    fallback: /*#__PURE__*/external_React_default().createElement(FullScreenLoader/* default */.A, {
      variant: "1"
    })
  }, /*#__PURE__*/external_React_default().createElement(BlockEditor, {
    id: editor.id,
    edition: edition,
    setEdition: setEdition,
    back: () => setEditor(null)
  })) : /*#__PURE__*/external_React_default().createElement(src_Home, {
    userData: userData,
    setEditor: setEditor,
    handleApiError: handleApiError,
    edition: edition,
    setEdition: setEdition
  }), /*#__PURE__*/external_React_default().createElement(Notifications/* Notifications */.$, {
    position: "top-right",
    zIndex: 999,
    containerWidth: 260
  }));
}
/* harmony default export */ const src_App = (App);

/***/ }),

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

/***/ }),

/***/ 9616:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AU: () => (/* binding */ postActions),
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   DD: () => (/* binding */ title),
/* harmony export */   Gw: () => (/* binding */ controlCol),
/* harmony export */   YD: () => (/* binding */ postItem),
/* harmony export */   bb: () => (/* binding */ titleCol),
/* harmony export */   g5: () => (/* binding */ controlLabel),
/* harmony export */   pT: () => (/* binding */ postTitle),
/* harmony export */   qf: () => (/* binding */ controlWrap),
/* harmony export */   vo: () => (/* binding */ controlLabelText),
/* harmony export */   xb: () => (/* binding */ formWrap),
/* harmony export */   yi: () => (/* binding */ controlLabelInfo)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.A7L2iJ_EWRTbD4v_XBZC {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    font-weight: 500;
    border-bottom: 1px solid var(--mantine-color-dark-5);
    padding: 6px 0;
    margin: 0 0 24px;
}

.wikMFF4VNtJcdm5MMG8y {
    display: flex;
    align-items: center;
    gap: 8px;
}

.FNW_Alnwz0Y3t_pmCYRS {
    border: 1px solid var(--mantine-color-dark-5);
    padding: 6px;
    border-radius: 3px;
}

.dpszg16Eh52sSB9AOdIb {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    gap: 6px;
}

.BtP1CqN6mesLmsBgQF2W {
    flex: 1;
}

.e8Ggl9fc9eRTV9BRqZ4h {
    display: flex;
    align-items: center;
    gap: 4px;
}

.e8Ggl9fc9eRTV9BRqZ4h:hover .LxZIUiF_vzu2cVe1jtBp {
        opacity: 1;
    }

.mRjiTUA6CHJK25ilCCRt {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
}

.LxZIUiF_vzu2cVe1jtBp {
    opacity: 0;
    display: flex;
    align-items: center;
}

.p7Gl7MgfZDBnMmQL5_QT {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--mantine-color-dark-5);
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 8px;
}

.RB8uPnBVgsA0Zdw6Rv7a {
    font-size: 13px;
    font-weight: 500;
}

.RB8uPnBVgsA0Zdw6Rv7a span {
        font-size: 10px;
        color: var(--mantine-color-blue-6);
        display: block;
    }

.mNTMRtPnA9yyn68Fq8si {
    display: flex;
    gap: 4px;
}`, "",{"version":3,"sources":["webpack://./src/Home/CMSManage.module.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;IACnB,eAAe;IACf,gBAAgB;IAChB,oDAAoD;IACpD,cAAc;IACd,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,QAAQ;AACZ;;AAEA;IACI,6CAA6C;IAC7C,YAAY;IACZ,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,kBAAkB;IAClB,QAAQ;AACZ;;AAEA;IACI,OAAO;AACX;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,QAAQ;AAIZ;;AAHI;QACI,UAAU;IACd;;AAGJ;IACI,eAAe;IACf,yBAAyB;IACzB,gBAAgB;AACpB;;AAEA;IACI,UAAU;IACV,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,6CAA6C;IAC7C,kBAAkB;IAClB,aAAa;IACb,kBAAkB;AACtB;;AAEA;IACI,eAAe;IACf,gBAAgB;AAMpB;;AALI;QACI,eAAe;QACf,kCAAkC;QAClC,cAAc;IAClB;;AAGJ;IACI,aAAa;IACb,QAAQ;AACZ","sourcesContent":[".title {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    font-size: 13px;\r\n    font-weight: 500;\r\n    border-bottom: 1px solid var(--mantine-color-dark-5);\r\n    padding: 6px 0;\r\n    margin: 0 0 24px;\r\n}\r\n\r\n.titleCol {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n}\r\n\r\n.formWrap {\r\n    border: 1px solid var(--mantine-color-dark-5);\r\n    padding: 6px;\r\n    border-radius: 3px;\r\n}\r\n\r\n.controlWrap {\r\n    display: flex;\r\n    align-items: center;\r\n    margin-bottom: 6px;\r\n    gap: 6px;\r\n}\r\n\r\n.controlCol {\r\n    flex: 1;\r\n}\r\n\r\n.controlLabel {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 4px;\r\n    &:hover .controlLabelInfo {\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n.controlLabelText {\r\n    font-size: 12px;\r\n    text-transform: uppercase;\r\n    font-weight: 500;\r\n}\r\n\r\n.controlLabelInfo {\r\n    opacity: 0;\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.postItem {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    border: 1px solid var(--mantine-color-dark-5);\r\n    border-radius: 6px;\r\n    padding: 12px;\r\n    margin-bottom: 8px;\r\n}\r\n\r\n.postTitle {\r\n    font-size: 13px;\r\n    font-weight: 500;\r\n    span {\r\n        font-size: 10px;\r\n        color: var(--mantine-color-blue-6);\r\n        display: block;\r\n    }\r\n}\r\n\r\n.postActions {\r\n    display: flex;\r\n    gap: 4px;\r\n}"],"sourceRoot":""}]);
// Exports
var title = `A7L2iJ_EWRTbD4v_XBZC`;
var titleCol = `wikMFF4VNtJcdm5MMG8y`;
var formWrap = `FNW_Alnwz0Y3t_pmCYRS`;
var controlWrap = `dpszg16Eh52sSB9AOdIb`;
var controlCol = `BtP1CqN6mesLmsBgQF2W`;
var controlLabel = `e8Ggl9fc9eRTV9BRqZ4h`;
var controlLabelInfo = `LxZIUiF_vzu2cVe1jtBp`;
var controlLabelText = `mRjiTUA6CHJK25ilCCRt`;
var postItem = `p7Gl7MgfZDBnMmQL5_QT`;
var postTitle = `RB8uPnBVgsA0Zdw6Rv7a`;
var postActions = `mNTMRtPnA9yyn68Fq8si`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 1311:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   Dz: () => (/* binding */ content_cards_item_label),
/* harmony export */   EH: () => (/* binding */ loader_logoWrap),
/* harmony export */   E_: () => (/* binding */ content_cards),
/* harmony export */   Gx: () => (/* binding */ dw_content),
/* harmony export */   ML: () => (/* binding */ content_cards_item),
/* harmony export */   Mm: () => (/* binding */ top_bar_author_name),
/* harmony export */   NF: () => (/* binding */ content_cards_wrap),
/* harmony export */   Q4: () => (/* binding */ content_cards_item_image),
/* harmony export */   Qs: () => (/* binding */ content),
/* harmony export */   RS: () => (/* binding */ dw_wrap),
/* harmony export */   Rv: () => (/* binding */ top_bar_author_card),
/* harmony export */   VL: () => (/* binding */ dw_sidebar_footer),
/* harmony export */   Y: () => (/* binding */ top_bar),
/* harmony export */   _4: () => (/* binding */ brand_logo),
/* harmony export */   _C: () => (/* binding */ content_cards_item_icon),
/* harmony export */   _Y: () => (/* binding */ content_cards_item_detail_left),
/* harmony export */   av: () => (/* binding */ top_bar_filter_btn),
/* harmony export */   bF: () => (/* binding */ nav_item_icon),
/* harmony export */   eS: () => (/* binding */ top_bar_mode),
/* harmony export */   fm: () => (/* binding */ dw_sidebar_pill),
/* harmony export */   h5: () => (/* binding */ nav_panel),
/* harmony export */   iW: () => (/* binding */ main),
/* harmony export */   jE: () => (/* binding */ brand_right),
/* harmony export */   kb: () => (/* binding */ left),
/* harmony export */   m0: () => (/* binding */ dw_container),
/* harmony export */   p4: () => (/* binding */ top_bar_filter),
/* harmony export */   pC: () => (/* binding */ dw_topbar),
/* harmony export */   pG: () => (/* binding */ right),
/* harmony export */   q4: () => (/* binding */ nav_item),
/* harmony export */   rP: () => (/* binding */ brand_card),
/* harmony export */   sR: () => (/* binding */ mainWrap),
/* harmony export */   sU: () => (/* binding */ brand_left),
/* harmony export */   u2: () => (/* binding */ content_cards_item_detail),
/* harmony export */   uE: () => (/* binding */ top_bar_author_img),
/* harmony export */   ub: () => (/* binding */ top_bar_author_placeholder),
/* harmony export */   vg: () => (/* binding */ dw_sidebar),
/* harmony export */   wG: () => (/* binding */ loader),
/* harmony export */   wk: () => (/* binding */ brand),
/* harmony export */   x3: () => (/* binding */ brand_wrap),
/* harmony export */   zf: () => (/* binding */ dw_outer_wrap)
/* harmony export */ });
/* unused harmony export dw_subtitle */
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
    --bg: #242424;
    --border-c: #3B3B3B;
    --in-c: #383838;
}

.JVpkFQklWeT2odhgfImq {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    /* display: flex; */
    /* align-items: center; */
}

.kpe9p4xMsVPkfHHOxBMR {
    height: 100%;
    margin: 0 auto;
    position: relative;
}

.nBTZnjum_cykK5DRRlJK {
    position: relative;
    z-index: 1;
    display: flex;
    height: 100%;
}

.d4UgtWHrkzOHoNmU68OB {
    width: 280px;
    height: 100%;
    position: relative;
    border-right: 1px solid var(--border-c);
}

.l_F7aiQXaULazeTwvrET {
    flex: 1;
    padding-right: 1px;
    display: flex;
    flex-direction: column;
}

.A4evTXrDFnIu5EnYQRK4 {
    display: flex;
    height: 100%;
}

.bvvipjNGV6T5zsTTN8JU {
        display: flex;
        gap: 2px;
        padding: 0 8px 8px;
        border-bottom: 1px solid var(--border-c);
    }

.I5eAao0Zmn1ysLQZq7Bs {
        display: flex;
        gap: 2px;
        flex-direction: column;
        width: 100%;
    }

.CRlD5YnSvidiKC38MZZN {}

.x416pUMzr8myJMAujhym {
        display: flex;
        align-items: flex-end;
        width: 18px;
        flex-wrap: wrap;
        position: relative;
    }

.x416pUMzr8myJMAujhym svg {
            max-width: 18px;
            color: #fff;
        }

.l6Ssl26V5Kcljul5rUCC {
        flex: 1;
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        height: 28px;
        font-size: 13px;
        letter-spacing: -.1px;
        padding: 0 6px;
        line-height: 1;
        position: relative;
    }



.j4aYhmO_w5Cw0gVBoDmu {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: end;
        gap: 2px;
    }



.l4oPnrx_uvoZQvTATjjH {
        height: 26px;
        width: 100%;
        border-radius: 2px;
        font-size: 11px;
        display: flex;
        align-items: center;
        gap: 2px;
        cursor: pointer;
        transition: all ease .4s;
    }



.zLcMtSWCGEikytRfg3Fi {
            width: 26px;
            height: 26px;
            display: flex;
            align-items: center;
            justify-content: center;
        }



.l4oPnrx_uvoZQvTATjjH:hover {}



.pYnkvAEvkeHuwlejYeVM {
    display: flex;
    justify-content: space-between;
    height: 37px;
    align-items: center;
    border-bottom: 1px solid var(--border-c);
    padding: 0 12px;
}



.GOX7p0A0NsReEXje5Pgc {
        display: flex;
        gap: 2px;
        cursor: pointer;
    }



.BrYqmIPvVapT6wAPhtUy {
            width: auto;
            height: 26px;
            /* color: #fff; */
            border: 1px solid #2c2c2c;
            border-radius: 3px;
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 0 8px;
            font-size: 10px;
            backdrop-filter: blur(1px);
        }



.BrYqmIPvVapT6wAPhtUy[data-active="true"] {
                color: #fff;
                background: rgb(153 177 210);
                border: 0;
            }



.BrYqmIPvVapT6wAPhtUy span,
            .BrYqmIPvVapT6wAPhtUy svg {
                width: 15px;
                height: 15px;
            }



.D6N1sgOp2FoVsEJXBe1c {
        display: flex;
        gap: 2px;
        background: #fff;
        padding: 2px;
        color: #333;
        border-radius: 3px;
    }



.zgl6oWJHmWUcGceF0DqQ,
    .IdUNq8Yt4CdrYF92PWlV {
        font-size: 11px;
        font-weight: 500;
        color: #333;
        border-radius: 3px;
        display: flex;
        align-items: center;
        padding: 0 12px;
        width: auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        letter-spacing: -0.2px;
    }



.zgl6oWJHmWUcGceF0DqQ {
        color: #fff;
        font-style: italic;
        background: #2f2e2e;
        user-select: none;
        font-weight: 400;
    }



.SJXFdLHBazHbaKnnXxra {
        width: 26px;
        height: 26px;
        min-width: 26px;
        border-radius: 3px;
        box-shadow: 0px 0px 11px rgb(153 177 210);
    }



.QjoUGaU0RnA11N0geFBa {
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        border-radius: 3px;
        background: rgb(153 177 210);
        box-shadow: 0px 0px 11px rgb(153 177 210);
    }

.YAsTjl1IV99T9RnmthH1 {
    flex: 1;
    display: flex;
    margin: 30px 28px 0 30px;
    padding-left: 1px;
    padding-bottom: 30px;
    /* background: #cd19196f; */
    overflow: hidden;
}

.UStLhlPLGFicpxAAbdPS {
        display: flex;
        flex-wrap: wrap;
        column-gap: 14px;
        row-gap: 30px;
    }

.dVeelphonj7uHzfMU_bz {
        width: 252px;
        position: relative;
    }

.YQQVVYO7_85lFxRYuhNQ {
            height: 166px;
            width: 100%;
            background: #333;
            border-radius: 3px;
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 160px;
            text-shadow: 20px -10px 33px #99b1d26b;
            color: #333333;
            pointer-events: none;
            text-transform: uppercase;
        }

.p0uM84TNwzeQ1UeJwhbF {
            display: flex;
            align-items: center;
            padding: 8px;
            height: 56px;
            border-radius: 3px;
            background: #0d0d0d;
        }

.Tm2aStgsRMtkljqoFAjv {
                flex: 1;
                display: flex;
                align-items: center;
            }

.ifV2SgCXmZrJIL5DgHNq {
            display: block;
            word-wrap: break-word;
            font-size: 11px;
            font-weight: 500;
            max-width: 160px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

.rfCn5mlSCA0a73BR1zKz {
            display: inline-flex;
            width: 16px;
            margin-right: 6px;
            align-items: center;
        }


.CriJNQmNIXKDflXqkI3u {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: invert(.3) brightness(0.3);
    opacity: 1;
    transition: opacity 1s ease;
}


.U2oIQx6TjfiOE4l20X3a {
        position: relative;
    }


.CriJNQmNIXKDflXqkI3u[data-loaded="true"] {
        opacity: 0;
        pointer-events: none;
    }

/* dialog wrap*/
.l5eonF5uyGNXFawMA9IK {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(37, 37, 37, 0.3);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.zjVt9OnJ4ueCHKft1x20 {
    position: relative;
    width: 600px;
    height: 80vh;
    background: #111;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    gap: 26px;
    position: relative;
    padding: 6px;
}

.gdbOVZjNNXqnGvGUhI8B {
    height: 40px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    border-radius: 3px;
    letter-spacing: -.2px;
}

.fwZ_9OmthV4BI1_zXW0l {
    flex: 1;
    display: flex;
    position: relative;
    overflow: hidden;
}

.paLqYsMIgpun0AvRZUtV {
    font-size: 13px;
    font-weight: 500;
    border-bottom: 1px solid var(--mantine-color-dark-5);
    padding: 6px 0;
    margin: 0 0 24px;
}

.CJs4rFn0dAHTUs4fazfD {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 200px;
}

.vsGLuFQtDAC5Fw4sGEnT {
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0 12px;
    height: 32px;
    border-radius: 3px;
    transition: all ease .4s;
    margin-bottom: 4px;
    cursor: pointer;

}

.vsGLuFQtDAC5Fw4sGEnT:hover,
    .vsGLuFQtDAC5Fw4sGEnT[data-active="true"] {
        color: #fff;
        background: rgb(153 177 210);
    }

.M1tApgUHENfLj8GC22kd {}

.ph88dUMGTIzdI02khJJC {
    flex: 1;
    padding: 0 8px;
}`, "",{"version":3,"sources":["webpack://./src/Home/Home.module.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,eAAe;IACf,YAAY;IACZ,WAAW;IACX,MAAM;IACN,mBAAmB;IACnB,yBAAyB;AAC7B;;AAEA;IACI,YAAY;IACZ,cAAc;IACd,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,aAAa;IACb,YAAY;AAChB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,kBAAkB;IAClB,uCAAuC;AAC3C;;AAEA;IACI,OAAO;IACP,kBAAkB;IAClB,aAAa;IACb,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,YAAY;AA2ChB;;AAzCI;QACI,aAAa;QACb,QAAQ;QACR,kBAAkB;QAClB,wCAAwC;IAC5C;;AAEA;QACI,aAAa;QACb,QAAQ;QACR,sBAAsB;QACtB,WAAW;IACf;;AAEA,uBAAS;;AAET;QACI,aAAa;QACb,qBAAqB;QACrB,WAAW;QACX,eAAe;QACf,kBAAkB;IAMtB;;AAJI;YACI,eAAe;YACf,WAAW;QACf;;AAGJ;QACI,OAAO;QACP,aAAa;QACb,qBAAqB;QACrB,2BAA2B;QAC3B,YAAY;QACZ,eAAe;QACf,qBAAqB;QACrB,cAAc;QACd,cAAc;QACd,kBAAkB;IACtB;;;;AAOA;QACI,OAAO;QACP,aAAa;QACb,sBAAsB;QACtB,oBAAoB;QACpB,QAAQ;IACZ;;;;AAEA;QACI,YAAY;QACZ,WAAW;QACX,kBAAkB;QAClB,eAAe;QACf,aAAa;QACb,mBAAmB;QACnB,QAAQ;QACR,eAAe;QACf,wBAAwB;IAW5B;;;;AATI;YACI,WAAW;YACX,YAAY;YACZ,aAAa;YACb,mBAAmB;YACnB,uBAAuB;QAC3B;;;;AAEA,6BAAS;;;;AAMjB;IACI,aAAa;IACb,8BAA8B;IAC9B,YAAY;IACZ,mBAAmB;IACnB,wCAAwC;IACxC,eAAe;AAsFnB;;;;AApFI;QACI,aAAa;QACb,QAAQ;QACR,eAAe;IA2BnB;;;;AAzBI;YACI,WAAW;YACX,YAAY;YACZ,iBAAiB;YACjB,yBAAyB;YACzB,kBAAkB;YAClB,aAAa;YACb,mBAAmB;YACnB,QAAQ;YACR,cAAc;YACd,eAAe;YACf,0BAA0B;QAa9B;;;;AAXI;gBACI,WAAW;gBACX,4BAA4B;gBAC5B,SAAS;YACb;;;;AAEA;;gBAEI,WAAW;gBACX,YAAY;YAChB;;;;AAIR;QACI,aAAa;QACb,QAAQ;QACR,gBAAgB;QAChB,YAAY;QACZ,WAAW;QACX,kBAAkB;IACtB;;;;AAEA;;QAEI,eAAe;QACf,gBAAgB;QAChB,WAAW;QACX,kBAAkB;QAClB,aAAa;QACb,mBAAmB;QACnB,eAAe;QACf,WAAW;QACX,mBAAmB;QACnB,gBAAgB;QAChB,uBAAuB;QACvB,sBAAsB;IAC1B;;;;AAEA;QACI,WAAW;QACX,kBAAkB;QAClB,mBAAmB;QACnB,iBAAiB;QACjB,gBAAgB;IACpB;;;;AAEA;QACI,WAAW;QACX,YAAY;QACZ,eAAe;QACf,kBAAkB;QAClB,yCAAyC;IAC7C;;;;AAEA;QACI,WAAW;QACX,aAAa;QACb,mBAAmB;QACnB,uBAAuB;QACvB,WAAW;QACX,YAAY;QACZ,kBAAkB;QAClB,4BAA4B;QAC5B,yCAAyC;IAC7C;;AAGJ;IACI,OAAO;IACP,aAAa;IACb,wBAAwB;IACxB,iBAAiB;IACjB,oBAAoB;IACpB,2BAA2B;IAC3B,gBAAgB;AA+DpB;;AA7DI;QACI,aAAa;QACb,eAAe;QACf,gBAAgB;QAChB,aAAa;IACjB;;AAEA;QACI,YAAY;QACZ,kBAAkB;IAmDtB;;AAjDI;YACI,aAAa;YACb,WAAW;YACX,gBAAgB;YAChB,kBAAkB;YAClB,sBAAsB;YACtB,aAAa;YACb,mBAAmB;YACnB,uBAAuB;YACvB,gBAAgB;YAChB,sCAAsC;YACtC,cAAc;YACd,oBAAoB;YACpB,yBAAyB;QAC7B;;AAEA;YACI,aAAa;YACb,mBAAmB;YACnB,YAAY;YACZ,YAAY;YACZ,kBAAkB;YAClB,mBAAmB;QAOvB;;AALI;gBACI,OAAO;gBACP,aAAa;gBACb,mBAAmB;YACvB;;AAIJ;YACI,cAAc;YACd,qBAAqB;YACrB,eAAe;YACf,gBAAgB;YAChB,gBAAgB;YAChB,mBAAmB;YACnB,gBAAgB;YAChB,uBAAuB;QAC3B;;AAEA;YACI,oBAAoB;YACpB,WAAW;YACX,iBAAiB;YACjB,mBAAmB;QACvB;;;AAKR;IACI,eAAe;IACf,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;IACZ,kCAAkC;IAClC,UAAU;IACV,2BAA2B;AAU/B;;;AARI;QACI,kBAAkB;IACtB;;;AAEA;QACI,UAAU;QACV,oBAAoB;IACxB;;AAGJ,eAAe;AACf;IACI,eAAe;IACf,MAAM;IACN,QAAQ;IACR,SAAS;IACT,OAAO;IACP,iCAAiC;IACjC,YAAY;IACZ,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,YAAY;IACZ,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;IAClB,aAAa;IACb,sBAAsB;IACtB,SAAS;IACT,kBAAkB;IAClB,YAAY;AAChB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,eAAe;IACf,kBAAkB;IAClB,qBAAqB;AACzB;;AAEA;IACI,OAAO;IACP,aAAa;IACb,kBAAkB;IAClB,gBAAgB;AACpB;;AAEA;IACI,eAAe;IACf,gBAAgB;IAChB,oDAAoD;IACpD,cAAc;IACd,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,8BAA8B;IAC9B,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,eAAe;IACf,eAAe;IACf,YAAY;IACZ,kBAAkB;IAClB,wBAAwB;IACxB,kBAAkB;IAClB,eAAe;;AAQnB;;AANI;;QAEI,WAAW;QACX,4BAA4B;IAChC;;AAIJ,uBAAoB;;AAEpB;IACI,OAAO;IACP,cAAc;AAClB","sourcesContent":[":root {\r\n    --bg: #242424;\r\n    --border-c: #3B3B3B;\r\n    --in-c: #383838;\r\n}\r\n\r\n.mainWrap {\r\n    position: fixed;\r\n    height: 100%;\r\n    width: 100%;\r\n    top: 0;\r\n    /* display: flex; */\r\n    /* align-items: center; */\r\n}\r\n\r\n.main {\r\n    height: 100%;\r\n    margin: 0 auto;\r\n    position: relative;\r\n}\r\n\r\n.content {\r\n    position: relative;\r\n    z-index: 1;\r\n    display: flex;\r\n    height: 100%;\r\n}\r\n\r\n.left {\r\n    width: 280px;\r\n    height: 100%;\r\n    position: relative;\r\n    border-right: 1px solid var(--border-c);\r\n}\r\n\r\n.right {\r\n    flex: 1;\r\n    padding-right: 1px;\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.brand {\r\n    display: flex;\r\n    height: 100%;\r\n\r\n    &_wrap {\r\n        display: flex;\r\n        gap: 2px;\r\n        padding: 0 8px 8px;\r\n        border-bottom: 1px solid var(--border-c);\r\n    }\r\n\r\n    &_left {\r\n        display: flex;\r\n        gap: 2px;\r\n        flex-direction: column;\r\n        width: 100%;\r\n    }\r\n\r\n    &_right {}\r\n\r\n    &_logo {\r\n        display: flex;\r\n        align-items: flex-end;\r\n        width: 18px;\r\n        flex-wrap: wrap;\r\n        position: relative;\r\n\r\n        svg {\r\n            max-width: 18px;\r\n            color: #fff;\r\n        }\r\n    }\r\n\r\n    &_card {\r\n        flex: 1;\r\n        display: flex;\r\n        align-items: flex-end;\r\n        justify-content: flex-start;\r\n        height: 28px;\r\n        font-size: 13px;\r\n        letter-spacing: -.1px;\r\n        padding: 0 6px;\r\n        line-height: 1;\r\n        position: relative;\r\n    }\r\n}\r\n\r\n\r\n\r\n.nav {\r\n\r\n    &_panel {\r\n        flex: 1;\r\n        display: flex;\r\n        flex-direction: column;\r\n        justify-content: end;\r\n        gap: 2px;\r\n    }\r\n\r\n    &_item {\r\n        height: 26px;\r\n        width: 100%;\r\n        border-radius: 2px;\r\n        font-size: 11px;\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 2px;\r\n        cursor: pointer;\r\n        transition: all ease .4s;\r\n\r\n        &_icon {\r\n            width: 26px;\r\n            height: 26px;\r\n            display: flex;\r\n            align-items: center;\r\n            justify-content: center;\r\n        }\r\n\r\n        &:hover {}\r\n    }\r\n}\r\n\r\n\r\n\r\n.top_bar {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    height: 37px;\r\n    align-items: center;\r\n    border-bottom: 1px solid var(--border-c);\r\n    padding: 0 12px;\r\n\r\n    &_filter {\r\n        display: flex;\r\n        gap: 2px;\r\n        cursor: pointer;\r\n\r\n        &_btn {\r\n            width: auto;\r\n            height: 26px;\r\n            /* color: #fff; */\r\n            border: 1px solid #2c2c2c;\r\n            border-radius: 3px;\r\n            display: flex;\r\n            align-items: center;\r\n            gap: 4px;\r\n            padding: 0 8px;\r\n            font-size: 10px;\r\n            backdrop-filter: blur(1px);\r\n\r\n            &[data-active=\"true\"] {\r\n                color: #fff;\r\n                background: rgb(153 177 210);\r\n                border: 0;\r\n            }\r\n\r\n            span,\r\n            svg {\r\n                width: 15px;\r\n                height: 15px;\r\n            }\r\n        }\r\n    }\r\n\r\n    &_author_card {\r\n        display: flex;\r\n        gap: 2px;\r\n        background: #fff;\r\n        padding: 2px;\r\n        color: #333;\r\n        border-radius: 3px;\r\n    }\r\n\r\n    &_mode,\r\n    &_author_name {\r\n        font-size: 11px;\r\n        font-weight: 500;\r\n        color: #333;\r\n        border-radius: 3px;\r\n        display: flex;\r\n        align-items: center;\r\n        padding: 0 12px;\r\n        width: auto;\r\n        white-space: nowrap;\r\n        overflow: hidden;\r\n        text-overflow: ellipsis;\r\n        letter-spacing: -0.2px;\r\n    }\r\n\r\n    &_mode {\r\n        color: #fff;\r\n        font-style: italic;\r\n        background: #2f2e2e;\r\n        user-select: none;\r\n        font-weight: 400;\r\n    }\r\n\r\n    &_author_img {\r\n        width: 26px;\r\n        height: 26px;\r\n        min-width: 26px;\r\n        border-radius: 3px;\r\n        box-shadow: 0px 0px 11px rgb(153 177 210);\r\n    }\r\n\r\n    &_author_placeholder {\r\n        color: #fff;\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n        width: 26px;\r\n        height: 26px;\r\n        border-radius: 3px;\r\n        background: rgb(153 177 210);\r\n        box-shadow: 0px 0px 11px rgb(153 177 210);\r\n    }\r\n}\r\n\r\n.content_cards {\r\n    flex: 1;\r\n    display: flex;\r\n    margin: 30px 28px 0 30px;\r\n    padding-left: 1px;\r\n    padding-bottom: 30px;\r\n    /* background: #cd19196f; */\r\n    overflow: hidden;\r\n\r\n    &_wrap {\r\n        display: flex;\r\n        flex-wrap: wrap;\r\n        column-gap: 14px;\r\n        row-gap: 30px;\r\n    }\r\n\r\n    &_item {\r\n        width: 252px;\r\n        position: relative;\r\n\r\n        &_image {\r\n            height: 166px;\r\n            width: 100%;\r\n            background: #333;\r\n            border-radius: 3px;\r\n            background-size: cover;\r\n            display: flex;\r\n            align-items: center;\r\n            justify-content: center;\r\n            font-size: 160px;\r\n            text-shadow: 20px -10px 33px #99b1d26b;\r\n            color: #333333;\r\n            pointer-events: none;\r\n            text-transform: uppercase;\r\n        }\r\n\r\n        &_detail {\r\n            display: flex;\r\n            align-items: center;\r\n            padding: 8px;\r\n            height: 56px;\r\n            border-radius: 3px;\r\n            background: #0d0d0d;\r\n\r\n            &_left {\r\n                flex: 1;\r\n                display: flex;\r\n                align-items: center;\r\n            }\r\n        }\r\n\r\n\r\n        &_label {\r\n            display: block;\r\n            word-wrap: break-word;\r\n            font-size: 11px;\r\n            font-weight: 500;\r\n            max-width: 160px;\r\n            white-space: nowrap;\r\n            overflow: hidden;\r\n            text-overflow: ellipsis;\r\n        }\r\n\r\n        &_icon {\r\n            display: inline-flex;\r\n            width: 16px;\r\n            margin-right: 6px;\r\n            align-items: center;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n.loader {\r\n    position: fixed;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    filter: invert(.3) brightness(0.3);\r\n    opacity: 1;\r\n    transition: opacity 1s ease;\r\n\r\n    &_logoWrap {\r\n        position: relative;\r\n    }\r\n\r\n    &[data-loaded=\"true\"] {\r\n        opacity: 0;\r\n        pointer-events: none;\r\n    }\r\n}\r\n\r\n/* dialog wrap*/\r\n.dw_outer_wrap {\r\n    position: fixed;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    background: rgba(37, 37, 37, 0.3);\r\n    z-index: 999;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.dw_wrap {\r\n    position: relative;\r\n    width: 600px;\r\n    height: 80vh;\r\n    background: #111;\r\n    border-radius: 3px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 26px;\r\n    position: relative;\r\n    padding: 6px;\r\n}\r\n\r\n.dw_topbar {\r\n    height: 40px;\r\n    padding: 20px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    font-size: 11px;\r\n    border-radius: 3px;\r\n    letter-spacing: -.2px;\r\n}\r\n\r\n.dw_container {\r\n    flex: 1;\r\n    display: flex;\r\n    position: relative;\r\n    overflow: hidden;\r\n}\r\n\r\n.dw_subtitle {\r\n    font-size: 13px;\r\n    font-weight: 500;\r\n    border-bottom: 1px solid var(--mantine-color-dark-5);\r\n    padding: 6px 0;\r\n    margin: 0 0 24px;\r\n}\r\n\r\n.dw_sidebar {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: space-between;\r\n    width: 200px;\r\n}\r\n\r\n.dw_sidebar_pill {\r\n    display: flex;\r\n    align-items: center;\r\n    font-size: 12px;\r\n    padding: 0 12px;\r\n    height: 32px;\r\n    border-radius: 3px;\r\n    transition: all ease .4s;\r\n    margin-bottom: 4px;\r\n    cursor: pointer;\r\n\r\n    &:hover,\r\n    &[data-active=\"true\"] {\r\n        color: #fff;\r\n        background: rgb(153 177 210);\r\n    }\r\n\r\n}\r\n\r\n.dw_sidebar_footer {}\r\n\r\n.dw_content {\r\n    flex: 1;\r\n    padding: 0 8px;\r\n}"],"sourceRoot":""}]);
// Exports
var mainWrap = `JVpkFQklWeT2odhgfImq`;
var main = `kpe9p4xMsVPkfHHOxBMR`;
var content = `nBTZnjum_cykK5DRRlJK`;
var left = `d4UgtWHrkzOHoNmU68OB`;
var right = `l_F7aiQXaULazeTwvrET`;
var brand = `A4evTXrDFnIu5EnYQRK4`;
var brand_wrap = `bvvipjNGV6T5zsTTN8JU`;
var brand_left = `I5eAao0Zmn1ysLQZq7Bs`;
var brand_right = `CRlD5YnSvidiKC38MZZN`;
var brand_logo = `x416pUMzr8myJMAujhym`;
var brand_card = `l6Ssl26V5Kcljul5rUCC`;
var nav_panel = `j4aYhmO_w5Cw0gVBoDmu`;
var nav_item = `l4oPnrx_uvoZQvTATjjH`;
var nav_item_icon = `zLcMtSWCGEikytRfg3Fi`;
var top_bar = `pYnkvAEvkeHuwlejYeVM`;
var top_bar_filter = `GOX7p0A0NsReEXje5Pgc`;
var top_bar_filter_btn = `BrYqmIPvVapT6wAPhtUy`;
var top_bar_author_card = `D6N1sgOp2FoVsEJXBe1c`;
var top_bar_mode = `zgl6oWJHmWUcGceF0DqQ`;
var top_bar_author_name = `IdUNq8Yt4CdrYF92PWlV`;
var top_bar_author_img = `SJXFdLHBazHbaKnnXxra`;
var top_bar_author_placeholder = `QjoUGaU0RnA11N0geFBa`;
var content_cards = `YAsTjl1IV99T9RnmthH1`;
var content_cards_wrap = `UStLhlPLGFicpxAAbdPS`;
var content_cards_item = `dVeelphonj7uHzfMU_bz`;
var content_cards_item_image = `YQQVVYO7_85lFxRYuhNQ`;
var content_cards_item_detail = `p0uM84TNwzeQ1UeJwhbF`;
var content_cards_item_detail_left = `Tm2aStgsRMtkljqoFAjv`;
var content_cards_item_label = `ifV2SgCXmZrJIL5DgHNq`;
var content_cards_item_icon = `rfCn5mlSCA0a73BR1zKz`;
var loader = `CriJNQmNIXKDflXqkI3u`;
var loader_logoWrap = `U2oIQx6TjfiOE4l20X3a`;
var dw_outer_wrap = `l5eonF5uyGNXFawMA9IK`;
var dw_wrap = `zjVt9OnJ4ueCHKft1x20`;
var dw_topbar = `gdbOVZjNNXqnGvGUhI8B`;
var dw_container = `fwZ_9OmthV4BI1_zXW0l`;
var dw_subtitle = (/* unused pure expression or super */ null && (`paLqYsMIgpun0AvRZUtV`));
var dw_sidebar = `CJs4rFn0dAHTUs4fazfD`;
var dw_sidebar_pill = `vsGLuFQtDAC5Fw4sGEnT`;
var dw_sidebar_footer = `M1tApgUHENfLj8GC22kd`;
var dw_content = `ph88dUMGTIzdI02khJJC`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ })

}]);