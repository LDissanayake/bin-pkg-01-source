# addifect-app
addifect react app

# Guide to Publish Site Render Engine

To update the Site Render Engine in the **Addifect** plugin, follow these steps:

## 1. Run the Build

In the project root directory, run the following command to build the render engine:

`npm run build`

This will generate the necessary files for deployment.

## 2. Copy the Render Folder

After the build completes, follow these steps:

- Navigate to the `dist/` folder in your project.
- Copy the `render/` folder generated in the `dist/` directory.

## 3. Update the Addifect Plugin

Next, update the plugin with the new render engine:

- Navigate to the **Addifect** plugin folder: `wp-content/plugins/addifect/`.
- Go to the `lib/` directory.
- Delete the old `render/` folder inside `lib/`.
- Paste the new `render/` folder that you copied from `dist/`.

## 4. Update `ADDIFECT_VERSION`

After updating the render folder, make sure to update the `ADDIFECT_VERSION` in the plugin to reflect the latest changes. You can find this in the plugin's main file (usually `addifect.php`) where the version is defined.

For example, update:

```php
define( 'ADDIFECT_VERSION', '1.x.x' );
```

Increment the version number as necessary (e.g., `1.5.0` -> `1.6.0`).

----