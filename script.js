// Variables globales
let examMode = null; // 'immediate' o 'final'
let currentIndex = 0;
let userAnswers = {};
let questionResults = {};
let timerInterval = null;
let timeLeft = 3600; // 60 minutos en segundos
let totalQuestions = 0;

// NUEVO: Mostrar advertencia si intentan salir o recargar mientras el timer está activo
window.addEventListener('beforeunload', function (e) {
    if (timerInterval !== null) {
        e.preventDefault();
        e.returnValue = ''; // Requerido por Chrome y otros navegadores para mostrar el diálogo
    }
});

// Función para mezclar aleatoriamente un arreglo (Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Inicialización
function init() {
    // Revisar si hay un examen en curso guardado
    const savedAnswers = localStorage.getItem('immediateAnswers');
    
    if (savedAnswers) {
        // Si hay respuestas guardadas, las cargamos (y NO barajamos para mantener el orden de la sesión recuperada)
        userAnswers = JSON.parse(savedAnswers);
    } else {
        // Si NO hay respuestas guardadas (examen nuevo), barajamos todo:
        
        // 1. Barajamos el orden de las preguntas
        shuffleArray(QUESTIONS_DB);
        
        // 2. Barajamos las opciones de cada pregunta
        QUESTIONS_DB.forEach(q => {
            if(q.options) shuffleArray(q.options);
        });
    }

    totalQuestions = QUESTIONS_DB.length;
    
    const totalQElement = document.getElementById('total-q');
    if(totalQElement) totalQElement.textContent = totalQuestions;
    
    // Si tu HTML arranca directamente aquí (basado en tu primer código)
    // startTimer();
    // renderCurrentQuestion();
}

function startExam(mode) {
    examMode = mode;
    currentIndex = 0;
    userAnswers = {};
    questionResults = {};
    timeLeft = 3600;
    
    // Resetear timer display
    document.getElementById("timer").textContent = "60:00";
    
    // Ocultar pantalla de configuración
    document.getElementById('config-screen').style.display = 'none';
    
    if (mode === 'immediate') {
        // Modo pregunta por pregunta con feedback inmediato
        document.getElementById('single-question-mode').style.display = 'block';
        document.getElementById('full-exam-mode').style.display = 'none';
        startTimer();
        renderCurrentQuestion();
    } else {
        // Modo examen completo al final
        document.getElementById('single-question-mode').style.display = 'none';
        document.getElementById('full-exam-mode').style.display = 'block';
        startTimer();
        renderFullExam();
    }
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (examMode === 'immediate') {
                finishImmediateMode();
            } else {
                submitFullExam();
            }
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById("timer").textContent = 
                `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        }
    }, 1000);
}

// ==================== MODO INMEDIATO (Pregunta por pregunta) ====================
function renderCurrentQuestion() {
    const question = QUESTIONS_DB[currentIndex];
    const container = document.getElementById('current-question') || document.getElementById('question-container');
    
    // Verificar si esta pregunta ya fue respondida y evaluada
    const hasResult = questionResults[question.id] !== undefined;
    
    let html = `
        <div class="question">
            <div class="question-header">
                <div class="question-number">${question.id}</div>
                <div class="question-text">${escapeHtml(question.text)}</div>
                ${question.type === "multi" ? `<div class="multi-label">Elige ${question.correct.length} respuesta(s)</div>` : ""}
            </div>
            <div class="options" id="options-container">
    `;
    
    question.options.forEach(opt => {
        const isChecked = userAnswers[question.id] && userAnswers[question.id].includes(opt.value);
        const inputType = question.type === "multi" ? "checkbox" : "radio";
        const name = question.type === "single" ? `name="q${question.id}"` : "";
        
        // Agregamos el atributo 'disabled' y cambiamos la opacidad si ya hay un resultado
        html += `
            <label class="option" ${hasResult ? 'style="opacity: 0.7; cursor: not-allowed;"' : ''}>
                <input type="${inputType}" ${name} value="${opt.value}" ${isChecked ? 'checked' : ''} ${hasResult ? 'disabled' : ''} 
                        onchange="saveAnswer(${question.id}, '${opt.value}', '${question.type}')">
                <span class="option-label">${escapeHtml(opt.label)}</span>
            </label>
        `;
    });
    
    html += `</div></div>`;
    container.innerHTML = html;
    
    // Actualizar progreso
    updateImmediateProgress();
    
    // Gestionar botones de navegación
    document.getElementById('prev-btn').disabled = (currentIndex === 0);
    document.getElementById('next-btn').disabled = false;
    document.getElementById('current-q-num').textContent = currentIndex + 1;
    
    const feedbackDiv = document.getElementById('feedback') || document.getElementById('feedback-container');
    
    // Lógica para mostrar/ocultar el botón y el feedback si ya se respondió previamente
    if (hasResult) {
        const result = questionResults[question.id];
        
        const correctText = Array.isArray(question.correct) ? 
            question.correct.map(c => {
                const opt = question.options.find(o => o.value === c);
                return opt ? opt.label : c;
            }).join(" • ") : 
            question.options.find(o => o.value === question.correct).label;
        
        const userText = result.userAnswer.length ? 
            result.userAnswer.map(a => {
                const opt = question.options.find(o => o.value === a);
                return opt ? opt.label : a;
            }).join(" • ") : "No respondida";

        feedbackDiv.style.display = 'block';
        feedbackDiv.innerHTML = `
            <div class="${result.isCorrect ? 'feedback-correct' : 'feedback-incorrect'}" style="padding: 1rem; border-radius: 12px;">
                <strong>${result.isCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong><br>
                <strong>Tu respuesta:</strong> ${userText}<br>
                <strong>Respuesta correcta:</strong> ${correctText}<br>
                ${question.explanation ? `<strong>Explicación:</strong> ${question.explanation}<br>` : ''}
            </div>
        `;

        if (currentIndex === totalQuestions - 1) {
            document.getElementById('check-btn').style.display = 'block';
            document.getElementById('check-btn').textContent = '🏁 Finalizar Examen';
            document.getElementById('check-btn').onclick = finishImmediateMode;
        } else {
            document.getElementById('check-btn').style.display = 'none';
        }

    } else {
        feedbackDiv.style.display = 'none';
        feedbackDiv.innerHTML = '';
        
        document.getElementById('check-btn').style.display = 'block';
        document.getElementById('check-btn').textContent = '✓ Verificar Respuesta';
        document.getElementById('check-btn').onclick = checkAnswer;
    }
}

function saveAnswer(qId, value, type) {
    if (!userAnswers[qId]) userAnswers[qId] = [];
    
    if (type === "single") {
        userAnswers[qId] = [value];
    } else {
        // multi
        if (userAnswers[qId].includes(value)) {
            userAnswers[qId] = userAnswers[qId].filter(v => v !== value);
        } else {
            userAnswers[qId].push(value);
        }
    }
    
    updateImmediateProgress();
}

function checkAnswer() {
    const question = QUESTIONS_DB[currentIndex];
    const userAnswer = userAnswers[question.id] || [];
    let isCorrect = false;
    
    if (question.type === "single") {
        isCorrect = userAnswer[0] === question.correct;
    } else {
        isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(question.correct.sort());
    }
    
    // Guardar resultado
    questionResults[question.id] = {
        isCorrect: isCorrect,
        userAnswer: userAnswer,
        correctAnswer: question.correct
    };
    
    // Mostrar feedback
    const feedbackDiv = document.getElementById('feedback') || document.getElementById('feedback-container');
    const correctText = Array.isArray(question.correct) ? 
        question.correct.map(c => {
            const opt = question.options.find(o => o.value === c);
            return opt ? opt.label : c;
        }).join(" • ") : 
        question.options.find(o => o.value === question.correct).label;
    
    const userText = userAnswer.length ? 
        userAnswer.map(a => {
            const opt = question.options.find(o => o.value === a);
            return opt ? opt.label : a;
        }).join(" • ") : "No respondida";
    
    feedbackDiv.style.display = 'block';
    feedbackDiv.innerHTML = `
        <div class="${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}" style="padding: 1rem; border-radius: 12px;">
            <strong>${isCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong><br>
            <strong>Tu respuesta:</strong> ${userText}<br>
            <strong>Respuesta correcta:</strong> ${correctText}<br>
            ${question.explanation ? `<strong>Explicación:</strong> ${question.explanation}<br>` : ''}
        </div>
    `;
    
    // Deshabilitar los inputs para que no se pueda cambiar la respuesta
    const inputs = document.querySelectorAll('#options-container input');
    inputs.forEach(input => input.disabled = true);
    
    // Si es la última pregunta, cambiar botón a finalizar
    if (currentIndex === totalQuestions - 1) {
        document.getElementById('check-btn').textContent = '🏁 Finalizar Examen';
        document.getElementById('check-btn').onclick = finishImmediateMode;
    } else {
        document.getElementById('check-btn').style.display = 'none';
    }
}

function nextQuestion() {
    if (currentIndex < totalQuestions - 1) {
        currentIndex++;
        renderCurrentQuestion();
    }
}

function previousQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderCurrentQuestion();
    }
}

function finishImmediateMode() {
    clearInterval(timerInterval);
    timerInterval = null; // Evita que salte la alerta de recarga de página al terminar
    
    // Asegurar que todas las preguntas tengan resultado
    QUESTIONS_DB.forEach(q => {
        if (!questionResults[q.id]) {
            const userAnswer = userAnswers[q.id] || [];
            let isCorrect = false;
            if (q.type === "single") {
                isCorrect = userAnswer[0] === q.correct;
            } else {
                isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(q.correct.sort());
            }
            questionResults[q.id] = {
                isCorrect: isCorrect,
                userAnswer: userAnswer,
                correctAnswer: q.correct
            };
        }
    });
    
    showResults();
}

function updateImmediateProgress() {
    const answeredCount = Object.keys(userAnswers).filter(id => userAnswers[id] && userAnswers[id].length > 0).length;
    const percentage = (answeredCount / totalQuestions) * 100;
    
    const progressFill = document.getElementById('single-progress-fill') || document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        scoreDisplay.textContent = `${Math.round(percentage)}%`;
    }
}

// ==================== MODO EXAMEN COMPLETO ====================
function renderFullExam() {
    const container = document.getElementById("full-exam-questions");
    if (!container) return;
    container.innerHTML = "";
    
    QUESTIONS_DB.forEach((q, index) => {
        let html = `
            <div class="question" id="q-${q.id}" style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0;">
                <div class="question-header">
                    <div class="question-number">${q.id}</div>
                    <div class="question-text">${escapeHtml(q.text)}</div>
                    ${q.type === "multi" ? `<div class="multi-label">Elige ${q.correct.length} respuesta(s)</div>` : ""}
                </div>
                <div class="options">
        `;
        
        q.options.forEach(opt => {
            const checked = userAnswers[q.id] && userAnswers[q.id].includes(opt.value) ? "checked" : "";
            const inputType = q.type === "multi" ? "checkbox" : "radio";
            const name = q.type === "single" ? `name="q${q.id}"` : "";
            
            html += `
                <label class="option">
                    <input type="${inputType}" ${name} value="${opt.value}" ${checked} 
                            onchange="saveFullAnswer(${q.id}, '${opt.value}', '${q.type}')">
                    <span class="option-label">${escapeHtml(opt.label)}</span>
                </label>
            `;
        });
        
        html += `</div></div>`;
        container.innerHTML += html;
    });
    
    updateFullExamProgress();
}

function saveFullAnswer(qId, value, type) {
    if (!userAnswers[qId]) userAnswers[qId] = [];
    
    if (type === "single") {
        userAnswers[qId] = [value];
    } else {
        if (userAnswers[qId].includes(value)) {
            userAnswers[qId] = userAnswers[qId].filter(v => v !== value);
        } else {
            userAnswers[qId].push(value);
        }
    }
    
    updateFullExamProgress();
}

function updateFullExamProgress() {
    const answeredCount = Object.keys(userAnswers).filter(id => userAnswers[id] && userAnswers[id].length > 0).length;
    const percentage = (answeredCount / totalQuestions) * 100;
    
    const progressFill = document.getElementById('full-exam-progress');
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    const percentSpan = document.getElementById('full-exam-percent');
    if (percentSpan) {
        percentSpan.textContent = `${Math.round(percentage)}%`;
    }
    
    const answeredSpan = document.getElementById('answered-count');
    if (answeredSpan) {
        answeredSpan.textContent = answeredCount;
    }
}

function submitFullExam() {
    clearInterval(timerInterval);
    timerInterval = null; // Evita que salte la alerta de recarga de página al terminar
    
    let correctCount = 0;
    
    QUESTIONS_DB.forEach(q => {
        const userAnswer = userAnswers[q.id] || [];
        let isCorrect = false;
        
        if (q.type === "single") {
            isCorrect = userAnswer[0] === q.correct;
        } else {
            isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(q.correct.sort());
        }
        
        if (isCorrect) correctCount++;
        
        questionResults[q.id] = {
            isCorrect: isCorrect,
            userAnswer: userAnswer,
            correctAnswer: q.correct
        };
    });
    
    showResults();
}

// ==================== RESULTADOS ====================
function showResults() {
    // Ocultar todas las pantallas de examen
    const singleMode = document.getElementById('single-question-mode');
    const fullMode = document.getElementById('full-exam-mode');
    if(singleMode) singleMode.style.display = 'none';
    if(fullMode) fullMode.style.display = 'none';
    
    const correctCount = Object.values(questionResults).filter(r => r.isCorrect).length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    
    // Actualizar score circle
    const scoreCircle = document.getElementById('score-circle');
    if(scoreCircle) {
        const degrees = (percentage / 100) * 360;
        scoreCircle.style.background = `conic-gradient(var(--netsuite-blue) 0deg ${degrees}deg, #e2e8f0 ${degrees}deg 360deg)`;
        document.getElementById('score-text').innerHTML = `${percentage}<span style="font-size:1rem;">%</span>`;
    }
    
    // Texto de resultado
    const resultText = document.getElementById('result-text');
    const resultSubtitle = document.getElementById('result-subtitle');
    
    if(resultText && resultSubtitle) {
        if (percentage >= 80) {
            resultText.innerHTML = "¡Excelente! Estás listo para el examen oficial";
            resultSubtitle.innerHTML = `Obtuviste ${correctCount} de ${totalQuestions} respuestas correctas (${percentage}%)`;
        } else if (percentage >= 70) {
            resultText.innerHTML = "¡Muy bien! Solo un poco más de repaso";
            resultSubtitle.innerHTML = `Obtuviste ${correctCount} de ${totalQuestions} respuestas correctas (${percentage}%)`;
        } else if (percentage >= 60) {
            resultText.innerHTML = "Buen intento. Sigue practicando";
            resultSubtitle.innerHTML = `Obtuviste ${correctCount} de ${totalQuestions} respuestas correctas (${percentage}%)`;
        } else {
            resultText.innerHTML = "Sigue practicando. ¡Puedes mejorar!";
            resultSubtitle.innerHTML = `Obtuviste ${correctCount} de ${totalQuestions} respuestas correctas (${percentage}%). Revisa las respuestas incorrectas.`;
        }
    }
    
    // Mostrar resultados
    const resultsContainer = document.getElementById('results');
    if(resultsContainer) {
        resultsContainer.style.display = 'block';
        loadResultsDetail();
    } else {
        // En caso de que se use el esquema de la primera página (con redirección a results.html)
        localStorage.setItem('finalResults', JSON.stringify(questionResults));
        localStorage.setItem('totalQuestions', totalQuestions);
        window.location.href = 'results.html';
    }
}

function loadResultsDetail() {
    const detailContainer = document.getElementById('results-detail');
    if(!detailContainer) return;
    let html = '';
    
    QUESTIONS_DB.forEach(q => {
        const result = questionResults[q.id];
        if (!result) return;
        
        const userText = result.userAnswer.length ? 
            result.userAnswer.map(a => {
                const opt = q.options.find(o => o.value === a);
                return opt ? opt.label : a;
            }).join(" • ") : "Sin responder";
        
        const correctText = Array.isArray(result.correctAnswer) ? 
            result.correctAnswer.map(c => {
                const opt = q.options.find(o => o.value === c);
                return opt ? opt.label : c;
            }).join(" • ") : 
            q.options.find(o => o.value === result.correctAnswer).label;
        
        html += `
            <div class="result-item ${result.isCorrect ? 'correct' : 'incorrect'}" onclick="toggleAnswerDetail(${q.id})" style="cursor: pointer;">
                <div class="result-badge">${result.isCorrect ? "✅" : "❌"}</div>
                <div style="flex:1">
                    <strong>Pregunta ${q.id}</strong>
                    <div style="font-size: 0.9rem;">${escapeHtml(q.text.substring(0, 100))}${q.text.length > 100 ? '...' : ''}</div>
                    <div style="font-size: 0.85rem; margin-top: 4px;">
                        <span style="color: ${result.isCorrect ? '#10b981' : '#ef4444'}">
                            Tu respuesta: ${userText}
                        </span>
                    </div>
                </div>
            </div>
            <div id="detail-${q.id}" style="display:none; padding: 1rem; margin: 0 0 1rem 3rem; background: #f8fafc; border-radius: 8px;">
                <strong>Respuesta correcta:</strong> ${correctText}<br>
                ${q.explanation ? `<strong>Explicación:</strong> ${q.explanation}` : ''}
            </div>
        `;
    });
    
    detailContainer.innerHTML = html;
}

function toggleAnswerDetail(questionId) {
    const detailDiv = document.getElementById(`detail-${questionId}`);
    if (detailDiv) {
        if (detailDiv.style.display === 'none') {
            detailDiv.style.display = 'block';
        } else {
            detailDiv.style.display = 'none';
        }
    }
}

function toggleDetail() {
    const details = document.querySelectorAll('[id^="detail-"]');
    const anyVisible = Array.from(details).some(d => d.style.display === 'block');
    
    details.forEach(detail => {
        detail.style.display = anyVisible ? 'none' : 'block';
    });
}

function reviewWrongAnswers() {
    const wrongQuestions = QUESTIONS_DB.filter(q => {
        const result = questionResults[q.id];
        return result && !result.isCorrect;
    });
    
    if (wrongQuestions.length === 0) {
        alert("🎉 ¡No tienes respuestas incorrectas! ¡Excelente trabajo!");
        return;
    }
    
    // Reiniciar para repasar solo las incorrectas
    currentIndex = 0;
    userAnswers = {};
    questionResults = {};
    
    // Filtrar solo preguntas incorrectas para repaso
    window.reviewQuestions = wrongQuestions;
    window.isReviewMode = true;
    
    alert(`Repasarás ${wrongQuestions.length} preguntas incorrectas.`);
    
    // Cambiar al modo inmediato con las preguntas incorrectas
    examMode = 'immediate';
    document.getElementById('results').style.display = 'none';
    document.getElementById('single-question-mode').style.display = 'block';
    document.getElementById('full-exam-mode').style.display = 'none';
    document.getElementById('total-q').textContent = wrongQuestions.length;
    startTimer();
    renderReviewQuestion();
}

function renderReviewQuestion() {
    const question = window.reviewQuestions[currentIndex];
    const container = document.getElementById('current-question');
    
    let html = `
        <div class="question">
            <div class="question-header">
                <div class="question-number">${question.id}</div>
                <div class="question-text">${escapeHtml(question.text)}</div>
                ${question.type === "multi" ? `<div class="multi-label">Elige ${question.correct.length} respuesta(s)</div>` : ""}
            </div>
            <div class="options" id="options-container">
    `;
    
    question.options.forEach(opt => {
        const isChecked = userAnswers[question.id] && userAnswers[question.id].includes(opt.value);
        const inputType = question.type === "multi" ? "checkbox" : "radio";
        const name = question.type === "single" ? `name="q${question.id}"` : "";
        
        html += `
            <label class="option">
                <input type="${inputType}" ${name} value="${opt.value}" ${isChecked ? 'checked' : ''} 
                    onchange="saveReviewAnswer(${question.id}, '${opt.value}', '${question.type}')">
                <span class="option-label">${escapeHtml(opt.label)}</span>
            </label>
        `;
    });
    
    html += `</div></div>`;
    container.innerHTML = html;
    
    document.getElementById('prev-btn').disabled = (currentIndex === 0);
    document.getElementById('next-btn').disabled = false;
    document.getElementById('check-btn').style.display = 'block';
    document.getElementById('check-btn').textContent = '✓ Verificar Respuesta';
    document.getElementById('check-btn').onclick = checkReviewAnswer;
    document.getElementById('current-q-num').textContent = currentIndex + 1;
    document.getElementById('total-q').textContent = window.reviewQuestions.length;
    
    const feedbackDiv = document.getElementById('feedback') || document.getElementById('feedback-container');
    feedbackDiv.style.display = 'none';
    feedbackDiv.innerHTML = '';
}

function saveReviewAnswer(qId, value, type) {
    if (!userAnswers[qId]) userAnswers[qId] = [];
    
    if (type === "single") {
        userAnswers[qId] = [value];
    } else {
        if (userAnswers[qId].includes(value)) {
            userAnswers[qId] = userAnswers[qId].filter(v => v !== value);
        } else {
            userAnswers[qId].push(value);
        }
    }
    
    const answeredCount = Object.keys(userAnswers).filter(id => userAnswers[id] && userAnswers[id].length > 0).length;
    const percentage = (answeredCount / window.reviewQuestions.length) * 100;
    
    const progressFill = document.getElementById('single-progress-fill') || document.getElementById('progress-fill');
    if (progressFill) progressFill.style.width = `${percentage}%`;
    
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) scoreDisplay.textContent = `${Math.round(percentage)}%`;
}

function checkReviewAnswer() {
    const question = window.reviewQuestions[currentIndex];
    const userAnswer = userAnswers[question.id] || [];
    let isCorrect = false;
    
    if (question.type === "single") {
        isCorrect = userAnswer[0] === question.correct;
    } else {
        isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(question.correct.sort());
    }
    
    const feedbackDiv = document.getElementById('feedback') || document.getElementById('feedback-container');
    const correctText = Array.isArray(question.correct) ? 
        question.correct.map(c => {
            const opt = question.options.find(o => o.value === c);
            return opt ? opt.label : c;
        }).join(" • ") : 
        question.options.find(o => o.value === question.correct).label;
    
    const userText = userAnswer.length ? 
        userAnswer.map(a => {
            const opt = question.options.find(o => o.value === a);
            return opt ? opt.label : a;
        }).join(" • ") : "No respondida";
    
    feedbackDiv.style.display = 'block';
    feedbackDiv.innerHTML = `
        <div class="${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}" style="padding: 1rem; border-radius: 12px;">
            <strong>${isCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto'}</strong><br>
            <strong>Tu respuesta:</strong> ${userText}<br>
            <strong>Respuesta correcta:</strong> ${correctText}<br>
            ${question.explanation ? `<strong>Explicación:</strong> ${question.explanation}<br>` : ''}
        </div>
    `;
    
    // Deshabilitar los inputs
    const inputs = document.querySelectorAll('#options-container input');
    inputs.forEach(input => input.disabled = true);
    
    if (currentIndex === window.reviewQuestions.length - 1) {
        document.getElementById('check-btn').textContent = '🏁 Finalizar Repaso';
        document.getElementById('check-btn').onclick = finishReview;
    } else {
        document.getElementById('check-btn').style.display = 'none';
    }
}

function finishReview() {
    clearInterval(timerInterval);
    timerInterval = null;
    alert("¡Repaso completado! Vuelve a intentar el examen completo.");
    resetToConfig();
}

function resetToConfig() {
    // Detener timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Resetear variables
    examMode = null;
    currentIndex = 0;
    userAnswers = {};
    questionResults = {};
    timeLeft = 3600;
    window.reviewQuestions = null;
    window.isReviewMode = false;
    
    // Resetear display
    document.getElementById('timer').textContent = '60:00';
    document.getElementById('config-screen').style.display = 'block';
    document.getElementById('single-question-mode').style.display = 'none';
    document.getElementById('full-exam-mode').style.display = 'none';
    document.getElementById('results').style.display = 'none';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    init();
});