import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent, Divider, Radio, RadioGroup, FormControlLabel, CircularProgress } from "@mui/material";
import AuthService from "../../services/auth.service.js";

const OneTopicPage = () => {
    const { topicId } = useParams();
    const [topic, setTopic] = useState(null);
    const [currentTestIndex, setCurrentTestIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = AuthService.getCurrentUser();

    useEffect(() => {
        const fetchTopic = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/api/topics/${topicId}`);
                const data = await response.json();
                setTopic(data);
            } catch (err) {
                setError("Ошибка при загрузке данных темы.");
            } finally {
                setLoading(false);
            }
        };
        fetchTopic();
    }, [topicId]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleNextQuestion = () => {
        if (selectedOption === null) return;

        const newResult = {
            testId: topic.tests[currentTestIndex].id,
            selectedOption,
        };

        if (currentTestIndex < topic.tests.length - 1) {
            // Добавляем текущий результат и переходим к следующему вопросу
            setResults((prev) => [...prev, newResult]);
            setSelectedOption(null);
            setCurrentTestIndex((prev) => prev + 1);
        } else {
            // Завершаем тест, добавляя последний результат
            const updatedResults = [...results, newResult]; // Локальное обновление
            setResults(updatedResults); // Обновляем состояние для визуализации, если нужно
            submitResults(updatedResults); // Передаем все результаты в функцию
        }
    };


    const submitResults = async (finalResults) => {
        try {
            const response = await fetch(`http://localhost:8000/api/tests/take?userId=${user.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalResults), // Используем переданный массив результатов
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }

            const resultData = await response.json();
            console.log("Результаты теста:", resultData);
            alert("Тест успешно завершен!");
        } catch (err) {
            console.error("Ошибка отправки результатов теста:", err);
            alert("Произошла ошибка при отправке результатов. Пожалуйста, попробуйте позже.");
        }
    };


    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" sx={{ textAlign: "center", marginTop: 4 }}>
                {error}
            </Typography>
        );
    }

    return (
        <Box sx={{ width: "100%", padding: 3, backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
            {/* Информация о теме */}
            <Card sx={{ mb: 4, padding: 2, backgroundColor: "#fff", borderRadius: 2, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                <CardContent>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 2 }}>
                        {topic.name || "Название темы"}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#666", mb: 2 }}>
                        {topic.title || "Заголовок темы отсутствует"}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ color: "#555" }}>
                        {topic.description || "Описание темы отсутствует."}
                    </Typography>
                </CardContent>
            </Card>

            {/* Тесты */}
            {topic.tests.length > 0 ? (
                <Box>
                    <Typography variant="h5" sx={{ mb: 2, color: "#007BFF", fontWeight: "bold" }}>
                        Вопрос {currentTestIndex + 1} из {topic.tests.length}
                    </Typography>
                    <Card sx={{ mb: 4, padding: 2, backgroundColor: "#fff", borderRadius: 2, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: "medium", color: "#333", mb: 2 }}>
                                {topic.tests[currentTestIndex].question}
                            </Typography>
                            <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                                {topic.tests[currentTestIndex].options.map((option, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={String(index + 1)}
                                        control={<Radio />}
                                        label={option}
                                    />
                                ))}
                            </RadioGroup>
                        </CardContent>
                    </Card>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNextQuestion}
                        disabled={selectedOption === null}
                    >
                        {currentTestIndex < topic.tests.length - 1 ? "Следующий вопрос" : "Завершить тест"}
                    </Button>
                </Box>
            ) : (
                <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4 }}>
                    Тесты для этой темы отсутствуют.
                </Typography>
            )}
        </Box>
    );
};

export default OneTopicPage;
