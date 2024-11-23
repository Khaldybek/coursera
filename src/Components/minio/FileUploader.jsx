import React, { useState } from 'react';
import { uploadFile, getPresignedDownloadUrl, downloadFile } from '../../services/minio.service.js';

const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    // Обработчик выбора файла
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Обработчик загрузки файла
    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file before uploading.');
            return;
        }

        setLoading(true);
        try {
            const fileUrl = await uploadFile(file, 'my-directory');
            setUploadedFileUrl(fileUrl);
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('File upload failed.');
        } finally {
            setLoading(false);
        }
    };

    // Обработчик скачивания файла
    const handleDownload = async () => {
        if (!uploadedFileUrl) {
            alert('No uploaded file to download.');
            return;
        }

        setLoading(true);
        try {
            const filePath = uploadedFileUrl.replace(`http://localhost:9000/cousera/`, ''); // Удаляем хост и порт
            const presignedUrl = await getPresignedDownloadUrl(filePath);
            await downloadFile(presignedUrl);
        } catch (error) {
            console.error('Download failed:', error);
            alert('File download failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
            <h2>File Uploader</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading} style={{ margin: '10px' }}>
                {loading ? 'Uploading...' : 'Upload File'}
            </button>

            {uploadedFileUrl && (
                <div>
                    <p>
                        Uploaded File URL:{' '}
                        <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">
                            {uploadedFileUrl}
                        </a>
                    </p>
                    <button onClick={handleDownload} disabled={loading} style={{ marginTop: '10px' }}>
                        {loading ? 'Downloading...' : 'Download File'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
