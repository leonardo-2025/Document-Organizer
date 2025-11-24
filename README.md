# Doc Organizer

**Doc Organizer** is a modern, privacy-focused web application designed to declutter your digital workspace. It allows users to upload large batches of files (documents, videos, etc.) and automatically organizes them into structured folders based on their file extensions.

## 🚀 Features

*   **Smart Organization**: Automatically groups files into folders by type (e.g., `/pdf`, `/mp4`, `/docx`).
*   **Flexible Grouping**: Choose to group *all* files or only *specific* extensions while leaving others untouched.
*   **Large File Support**: Handles uploads up to **10GB** efficiently using stream processing.
*   **Privacy First**: All processing happens locally on the server during the session. Files are **permanently deleted** immediately after you download your organized zip.
*   **Modern UI**: A clean, minimalist interface featuring a responsive design and a built-in **Dark Mode**.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Styling**: Vanilla CSS with CSS Variables for theming.
*   **Font**: Inter (via `next/font`).
*   **File Handling**: Native Node.js Streams & `archiver` for zip generation.

## 📦 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/doc-organizer.git
    cd doc-organizer
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the app**:
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🛡️ Privacy & Security

This application is designed with privacy in mind. Uploaded files are stored in a temporary session directory and are strictly isolated. Once the user clicks "Finish & Cleanup" or the session ends, all data is wiped from the server.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
