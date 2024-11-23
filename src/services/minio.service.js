/**
 * Uploads a file to the server, which saves it to MinIO.
 * @param {File} file - The file to upload.
 * @param {string} directory - The directory where the file will be stored.
 * @returns {Promise<string>} - The URL of the uploaded file.
 */
export const uploadFile = async (file, directory = 'uploads') => {
    const formData = new FormData();
    formData.append('file', file); // Добавляем файл
    formData.append('directory', directory); // Добавляем директорию

    try {
        // Отправляем файл на сервер через API
        const response = await fetch('http://localhost:8000/api/v1/files/upload', {
            method: 'POST',
            body: formData,
        });

        // Проверяем успешность ответа
        if (!response.ok) {
            throw new Error(`File upload failed with status ${response.status}`);
        }

        // Возвращаем URL загруженного файла
        const fileUrl = await response.text();
        console.log('Uploaded file URL:', fileUrl);
        return fileUrl;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

/**
 * Fetches a presigned URL for downloading a file from MinIO.
 * @param {string} filePath - The path of the file in MinIO.
 * @returns {Promise<string>} - The presigned download URL.
 */
export const getPresignedDownloadUrl = async (filePath) => {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/files/presigned-download?filePath=${filePath}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to get presigned URL with status ${response.status}`);
        }

        const url = await response.text();
        console.log('Presigned download URL:', url);
        return url;
    } catch (error) {
        console.error('Error generating presigned download URL:', error);
        throw error;
    }
};


/**
 * Downloads a file using its presigned URL.
 * @param {string} url - The presigned URL of the file.
 */
export const downloadFile = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to download file with status ${response.status}`);
        }

        // Возвращаем поток данных
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = url.split('/').pop(); // Извлекаем имя файла из URL
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
        console.log('File downloaded successfully');
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
};
