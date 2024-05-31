# next-clean

next-clean is a command-line tool designed to clean and reset the boilerplate code in a Next.js project. It aims to provide a fresh starting point for developers who want to work on a clean Next.js codebase without any unnecessary files or configurations.

## Installation

To use next-clean, you first need to install it globally using npm or yarn:

```bash
npm install -g next-clean
```

or

```bash
yarn global add next-clean
```

## Usage

Navigate to your Next.js project directory and run the following command:

```bash
next-clean
```

This command will perform the following actions:

1. **Clean the `public` folder**: If the `public` folder exists, all files within it will be deleted.
2. **Empty the `README.md` file**: If the `README.md` file exists, its content will be cleared.
3. **Handle the `app` folder**:
   - If the `src/app` folder exists, the following actions will be performed:
     - Delete the `favicon.ico` file (if it exists).
     - Update the content of the `layout.tsx` file with a default layout.
     - Update the content of the `page.tsx` file with a default page.
     - Update the content of the `globals.css` file with default global styles.
   - If the `src/app` folder does not exist, but the `app` folder exists in the root directory, the same actions will be performed in the root `app` folder.

After running the `next-clean` command, your Next.js project will be cleaned, and the boilerplate code will be reset to a fresh state.

## Your files will look like this after running next-clean

1. **public folder**: All files will be deleted.
2. **README.md**: The content will be cleared.
3. **layout.tsx**:

   ```tsx
   import type { Metadata } from "next";
   import { Inter } from "next/font/google";
   import "./globals.css";

   const inter = Inter({ subsets: ["latin"] });

   export const metadata: Metadata = {
     title: "",
     description: "",
   };

   export default function RootLayout({
     children,
   }: Readonly<{
     children: React.ReactNode;
   }>) {
     return (
       <html lang="en">
         <body className={inter.className}>{children}</body>
       </html>
     );
   }
   ```

4. **page.tsx**:

   ```tsx
   import React from "react";

   const page = () => {
     return <div>hello world</div>;
   };

   export default page;
   ```

5. **globals.css**:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

6. **favicon.ico**: Deleted (if it exists).

## Contributing

If you find any issues or would like to contribute to the development of next-clean, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/amaan8429/next-clean).

## License

next-clean is released under the [MIT License](LICENSE).
