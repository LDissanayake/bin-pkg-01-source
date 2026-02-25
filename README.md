# Addifect Studio & Render Engine - Source Code

This repository contains the human-readable source code (React/JS) for the Addifect WordPress plugin, as required by the WordPress.org Plugin Guidelines (Guideline #4).

---

## 🚀 Development Setup

To modify the studio or the render engine, follow these steps:

### Clone the repository

```bash
git clone https://github.com/LDissanayake/bin-pkg-01-source.git
cd bin-pkg-01-source
```

### Install dependencies

```bash
npm install
```

### Start development mode

```bash
npm run start
```

### Build for production

```bash
npm run build
```

---

## 📦 Deployment to WordPress Plugin

After running the build script, the compiled assets will be located in the `/dist` folder.

Follow these steps to update your WordPress plugin:

---

### 1. Update Render Engine

1. Navigate to:
   `dist/render`
2. Copy all files.
3. Go to your WordPress plugin:
   `addifect/assets/render/js/`
4. Delete existing files and paste the new files here.

---

### 2. Update Studio (Editor)

1. Navigate to:
   `dist/editor`
2. Copy all files **except** `index.html`.
3. Go to your WordPress plugin:
   `addifect/assets/studio/js/`
4. Delete existing files and paste the new files here.

---

## 🛠 Live Development (Hot Reloading)

To test changes live within a WordPress environment without constant rebuilding:

1. Download and install the `addifect-dev.zip` helper plugin.
2. Activate the helper plugin on your local WordPress install.
3. Access your site with the dev flag:
   `yoursite.com/wp-admin/?dev=true`

### Dev Flags

* `dev=true` → Points the plugin to your local build server
* `dev=false` → Uses production assets from the `/assets` folder

---

## 📌 Note

This repository is specifically for source code review and development.
For the official WordPress plugin, please visit [Addifect on WordPress.org](https://wordpress.org/plugins/addifect/).
