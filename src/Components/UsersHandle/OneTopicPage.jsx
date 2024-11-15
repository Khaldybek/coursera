import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, AppBar, Tabs, Tab, Card, CardContent, CircularProgress, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import AuthService from "../../services/auth.service.js";

const OneTopicPage = () => {
    const { topicId } = useParams();
    const [topic, setTopic] = useState(null);
    const [currentTestIndex, setCurrentTestIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [results, setResults] = useState([]);
    const [completedTestIds, setCompletedTestIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = AuthService.getCurrentUser();
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/topics/${topicId}`);
                const data = await response.json();
                setTopic(data);
            } catch (err) {
                setError("Ошибка при загрузке данных темы.");
            }
        };

        const fetchUserResults = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/tests/topic/${topicId}/user/${user.id}/results`);
                const data = await response.json();
                setCompletedTestIds(data.map((result) => result.testId));
            } catch (err) {
                setError("Ошибка при загрузке результатов тестов.");
            }
        };

        const loadData = async () => {
            setLoading(true);
            await fetchTopic();
            await fetchUserResults();
            setLoading(false);
        };

        loadData();
    }, [topicId, user.id]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleNextQuestion = () => {
        if (selectedOption === null) return;

        const currentTest = topic.tests[currentTestIndex];
        setResults((prev) => [...prev, { testId: currentTest.id, selectedOption }]);
        setSelectedOption(null);

        let nextIndex = currentTestIndex + 1;
        while (nextIndex < topic.tests.length && completedTestIds.includes(topic.tests[nextIndex].id)) {
            nextIndex++;
        }

        if (nextIndex < topic.tests.length) {
            setCurrentTestIndex(nextIndex);
        } else {
            alert("Вы завершили все доступные тесты!");
            submitResults();
        }
    };

    const submitResults = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/tests/take?userId=${user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(results),
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }

            const resultData = await response.json();
            alert("Тест успешно завершен!");
        } catch (err) {
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

    const remainingTests = topic.tests.filter((test) => !completedTestIds.includes(test.id));
    const testLocked = remainingTests.length === 0;

    return (
        <Box sx={{ width: "100%", padding: 3, backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
                {topic.name}
            </Typography>

            <AppBar position="static" color="default" sx={{ boxShadow: "none", backgroundColor: "#f4f5f7" }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    centered
                    TabIndicatorProps={{ style: { backgroundColor: "transparent" } }}
                >
                    <Tab label="Topic" sx={{ color: selectedTab === 0 ? "black" : "grey", fontWeight: selectedTab === 0 ? "bold" : "normal" }} />
                    <Tab label="test" sx={{ color: selectedTab === 1 ? "red" : "grey", fontWeight: selectedTab === 1 ? "bold" : "normal" }} />
                </Tabs>
            </AppBar>

            {selectedTab === 0 && (
                <Card sx={{ mt: 3, padding: 2 }}>
                    <CardContent>
                        <Typography variant="body1">
                            {topic.description || "Описание темы отсутствует."}
                        </Typography>
                    </CardContent>
                </Card>
            )}

            {selectedTab === 1 && (
                <Card sx={{ mt: 3, padding: 2, border: "1px solid #1976d2" }}>
                    <CardContent>
                        {testLocked ? (
                            <Box sx={{ textAlign: "center", padding: 4 }}>
                                <Typography variant="h5" color="error">
                                    Вы уже прошли все тесты по этой теме.
                                </Typography>
                            </Box>
                        ) : (
                            <>
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
                            </>
                        )}
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default OneTopicPage;
