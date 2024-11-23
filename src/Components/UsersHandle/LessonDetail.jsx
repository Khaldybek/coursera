import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    AppBar,
    Tabs,
    Tab,
    Card,
    CardContent,
    CircularProgress,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    LinearProgress,
} from "@mui/material";
import { CheckCircleOutline, ErrorOutline, Assessment } from "@mui/icons-material";
import AuthService from "../../services/auth.service.js";
import {blue} from "@mui/material/colors";

const LessonDetail = () => {

    const { lessonId } = useParams();
    const user = AuthService.getCurrentUser();

    const [lesson, setLesson] = useState(null);
    const [topics, setTopics] = useState([]);
    const [tests, setTests] = useState([]);
    const [testSummary, setTestSummary] = useState(null);

    const [selectedTab, setSelectedTab] = useState(0);
    const [currentTestIndex, setCurrentTestIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const testLocked = testSummary?.totalQuestions > 0 &&
        (testSummary.correctAnswers + testSummary.incorrectAnswers >= testSummary.totalQuestions);

    useEffect(() => {
        const fetchLessonData = async () => {
            try {
                const [lessonResponse, topicsResponse, testsResponse, testSummaryResponse] = await Promise.all([
                    fetch(`http://localhost:8000/api/v1/lessons/${lessonId}`).then((res) => res.json()),
                    fetch(`http://localhost:8000/api/topics/by-lesson/${lessonId}`).then((res) => res.json()),
                    fetch(`http://localhost:8000/api/v1/lessons/${lessonId}/tests`).then((res) => res.json()),
                    fetch(`http://localhost:8000/api/tests/${lessonId}/test-results-summary/${user.id}`).then((res) =>
                        res.json()
                    ),
                ]);

                setLesson(lessonResponse);
                setTopics(topicsResponse);
                setTests(testsResponse);
                setTestSummary(testSummaryResponse);
            } catch (err) {
                setError("Ошибка при загрузке данных урока.");
            } finally {
                setLoading(false);
            }
        };

        fetchLessonData();
    }, [lessonId, user.id]);

    const handleTabChange = (event, newValue) => setSelectedTab(newValue);

    const handleOptionChange = (event) => setSelectedOption(event.target.value);

    const handleNextQuestion = () => {
        if (!selectedOption) return; // Если ответ не выбран, не продолжать

        // Добавляем ответ в результаты
        const currentResult = { testId: tests[currentTestIndex].id, selectedOption };

        setResults((prev) => [...prev, currentResult]); // Добавляем ответ в массив

        setSelectedOption(null); // Очищаем выбранный вариант

        // Если это последний вопрос, сразу отправляем результаты
        if (currentTestIndex === tests.length - 1) {
            submitResults();
        } else {
            setCurrentTestIndex((prev) => prev + 1); // Переходим к следующему вопросу
        }
    };

    const submitResults = async () => {

        console.log("Отправка результатов. Массив результатов:", results);
        results.push({ testId: tests[currentTestIndex].id, selectedOption })

        console.log("Отправка результатов. Массив результатов:", results);

        try {
            const response = await fetch(`http://localhost:8000/api/tests/take?userId=${user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(results),
            });

            const updatedSummary = await response.json();
            setTestSummary(updatedSummary); // Обновляем результаты
            alert("Тест успешно завершен!"); // Уведомляем пользователя
        } catch (err) {
            console.error("Ошибка при отправке результатов:", err);
            alert("Ошибка при отправке результатов. Попробуйте позже.");
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
            <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
                {lesson.name}
            </Typography>

            <AppBar position="static" color="default" sx={{ boxShadow: "none", backgroundColor: "#f4f5f7" }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    centered
                    TabIndicatorProps={{ style: { backgroundColor: "transparent" } }}
                >
                    <Tab label="Темы" sx={{ color: selectedTab === 0 ? "black" : "grey", fontWeight: selectedTab === 0 ? "bold" : "normal" }} />
                    <Tab label="Тесты" sx={{ color: selectedTab === 1 ? "red" : "grey", fontWeight: selectedTab === 1 ? "bold" : "normal" }} />
                </Tabs>
            </AppBar>

            {selectedTab === 0 && (
                <Box sx={{ mt: 3, padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "text.primary" }}>
                        Topics Overview
                    </Typography>
                    {topics.map((topic, index) => (
                        <Box key={topic.id} sx={{ mb: 3 }}>
                            {/* Заголовок темы */}
                            <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>
                                {index + 1}. {topic.name}
                            </Typography>

                            {/* Описание темы */}
                            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.6, mb: 1 }}>
                                {topic.description}
                            </Typography>

                            {/* Детальный текст */}
                            <Typography variant="h6" sx={{ color: "text.secondary", fontStyle: "italic", lineHeight: 1.6 }}>
                                {topic.title}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}

            {selectedTab === 1 &&
                (testLocked ? (
                    <Card sx={{ maxWidth: 600, margin: "0 auto", p: 4, textAlign: "center", boxShadow: 3, borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h4" color="error" sx={{ mb: 3, fontWeight: "bold" }}>
                                Вы уже прошли все тесты по этой теме!
                            </Typography>

                            {/* Общее количество вопросов */}
                            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                                <Assessment sx={{ fontSize: 30, color: "blue" }} />
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    Всего вопросов:
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    {testSummary.totalQuestions}
                                </Typography>
                            </Box>

                            {/* Правильные ответы */}
                            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                                <CheckCircleOutline sx={{ fontSize: 30, color: "green" }} />
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    Правильных ответов:
                                </Typography>
                                <Typography variant="h6" color="green">
                                    {testSummary.correctAnswers}
                                </Typography>
                            </Box>

                            {/* Неправильные ответы */}
                            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                                <ErrorOutline sx={{ fontSize: 30, color: "red" }} />
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    Неправильных ответов:
                                </Typography>
                                <Typography variant="h6" color="red">
                                    {testSummary.incorrectAnswers}
                                </Typography>
                            </Box>

                            {/* Процент успешности */}
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    <strong>Процент успешности:</strong> {testSummary.overallPercentage}%
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={testSummary.overallPercentage}
                                    sx={{
                                        height: 12,
                                        borderRadius: 6,
                                        backgroundColor: "#f0f0f0",
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor:blue,
                                        },
                                    }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <Typography variant="h5" sx={{ mb: 2, color: "#007BFF", fontWeight: "bold" }}>
                            Вопрос {currentTestIndex + 1} из {tests.length}
                        </Typography>
                        <Card sx={{ mb: 4, padding: 2, backgroundColor: "#fff", borderRadius: 2, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "medium", color: "#333", mb: 2 }}>
                                    {tests[currentTestIndex].question}
                                </Typography>
                                <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                                    {tests[currentTestIndex].options.map((option, index) => (
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
                            disabled={!selectedOption}
                            sx={{ mt: 2 }}
                        >
                            {currentTestIndex < tests.length - 1 ? "Следующий вопрос" : "Завершить тест"}
                        </Button>
                    </>
                ))}
        </Box>
    );
};

export default LessonDetail;
