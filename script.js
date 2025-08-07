// Полные данные о раскидках
const granadesDatabase = {
    'mirage': {
        't': {
            'smoke': [
                {
                    id: 'window',
                    name: 'Window',
                    description: 'Встаньте у ящиков возле T-спавна и кидайте в верхний угол окна. Прицел должен быть направлен на верхнюю часть оконной рамы.',
                    difficulty: 'easy',
                    video: 'videos/mirage/t/smoke/window.mp4',
                    preview: 'images/spots/mirage/t/smoke/window.jpg'
                },
                {
                    id: 'connector',
                    name: 'Connector',
                    description: 'Из под ящиков на миде, прицел на верх арки. Нужно встать вплотную к ящику и сделать бросок с прыжка.',
                    difficulty: 'medium',
                    video: 'videos/mirage/t/smoke/connector.mp4',
                    preview: 'images/spots/mirage/t/smoke/connector.jpg'
                },
                {
                    id: 'jungle',
                    name: 'Jungle',
                    description: 'С балкона T-спавна, прицел на верхушку дерева. Важно правильно рассчитать силу броска.',
                    difficulty: 'hard',
                    video: 'videos/mirage/t/smoke/jungle.mp4',
                    preview: 'images/spots/mirage/t/smoke/jungle.jpg'
                }
            ],
            'flash': [
                {
                    id: 'mid',
                    name: 'Mid Flash',
                    description: 'С балкона T-спавна через крышу. Кидать нужно с небольшой задержкой после броска.',
                    difficulty: 'easy',
                    video: 'videos/mirage/t/flash/mid.mp4',
                    preview: 'images/spots/mirage/t/flash/mid.jpg'
                },
                {
                    id: 'a-site',
                    name: 'A Site Flash',
                    description: 'Из-за ящиков на миде, прицел на антенну. Важно не перекинуть флешку за сайт.',
                    difficulty: 'medium',
                    video: 'videos/mirage/t/flash/a_site.mp4',
                    preview: 'images/spots/mirage/t/flash/a_site.jpg'
                }
            ],
            'molotov': [
                {
                    id: 'ct-spawn',
                    name: 'CT Spawn',
                    description: 'Из T-спавна через крышу. Нужно встать в определенную точку и кидать с прыжка.',
                    difficulty: 'hard',
                    video: 'videos/mirage/t/molotov/ct_spawn.mp4',
                    preview: 'images/spots/mirage/t/molotov/ct_spawn.jpg'
                }
            ]
        },
        'ct': {
            'smoke': [
                {
                    id: 't-spawn',
                    name: 'T Spawn',
                    description: 'Из-за ящиков на миде, прицел на антенну. Важно не перекинуть дым за спавн.',
                    difficulty: 'medium',
                    video: 'videos/mirage/ct/smoke/t_spawn.mp4',
                    preview: 'images/spots/mirage/ct/smoke/t_spawn.jpg'
                },
                {
                    id: 'mid',
                    name: 'Mid Smoke',
                    description: 'Из CT-спавна через окно. Точный бросок с прицелом на верх окна.',
                    difficulty: 'easy',
                    video: 'videos/mirage/ct/smoke/mid.mp4',
                    preview: 'images/spots/mirage/ct/smoke/mid.jpg'
                }
            ],
            'flash': [
                {
                    id: 'a-ramp',
                    name: 'A Ramp Flash',
                    description: 'Из-за ящиков на A-сайте. Кидать в верхний угол дверного проема.',
                    difficulty: 'easy',
                    video: 'videos/mirage/ct/flash/a_ramp.mp4',
                    preview: 'images/spots/mirage/ct/flash/a_ramp.jpg'
                }
            ]
        }
    },
    'inferno': {
        // Аналогичная структура для Inferno
    },
    'dust2': {
        // Аналогичная структура для Dust 2
    }
    // Добавьте данные для других карт по аналогии
};

// Текущие выбранные параметры
let currentMap = null;
let currentSide = null;
let currentGranadeType = null;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    toggleBackButton(false);
});

// Показываем/скрываем кнопку "Назад"
function toggleBackButton(show) {
    const backButton = document.getElementById('back-button');
    if (show) {
        backButton.classList.remove('hidden');
    } else {
        backButton.classList.add('hidden');
    }
}

// Функция "Назад"
function goBack() {
    const currentStep = document.querySelector('.step.active').id;
    
    if (currentStep === 'step5') {
        showStep('step4');
    } else if (currentStep === 'step4') {
        showStep('step3');
    } else if (currentStep === 'step3') {
        showStep('step2');
    } else if (currentStep === 'step2') {
        showStep('step1');
        toggleBackButton(false);
    }
}

// Показать конкретный шаг
function showStep(stepId) {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(stepId).classList.add('active');
}

// Выбор карты
function selectMap(map) {
    currentMap = map;
    showStep('step2');
    toggleBackButton(true);
}

// Выбор стороны
function selectSide(side) {
    currentSide = side;
    showStep('step3');
}

// Выбор гранаты
function selectGranade(type) {
    currentGranadeType = type;
    showStep('step4');
    updateSpotsList();
}

// Обновление списка раскидок
function updateSpotsList() {
    const spotsContainer = document.getElementById('spots-container');
    spotsContainer.innerHTML = '';
    
    // Обновляем заголовок
    document.getElementById('selected-map-name').textContent = getMapName(currentMap);
    document.getElementById('selected-side-name').textContent = currentSide.toUpperCase();
    document.getElementById('selected-granade-type').textContent = getGranadeName(currentGranadeType);
    
    // Получаем раскидки для выбранных параметров
    const spots = granadesDatabase[currentMap]?.[currentSide]?.[currentGranadeType] || [];
    
    if (spots.length === 0) {
        spotsContainer.innerHTML = '<p class="no-spots">Раскидки для выбранных параметров не найдены</p>';
        return;
    }
    
    // Добавляем карточки раскидок
    spots.forEach(spot => {
        const spotCard = document.createElement('div');
        spotCard.className = 'spot-card';
        spotCard.onclick = () => showGranadeSpot(spot);
        
        spotCard.innerHTML = `
            <div class="spot-preview">
                <img src="${spot.preview}" alt="${spot.name}" loading="lazy">
            </div>
            <div class="spot-info">
                <h3>${spot.name}</h3>
                <p>${spot.description}</p>
                <div class="spot-difficulty ${spot.difficulty}">${getDifficultyName(spot.difficulty)}</div>
            </div>
        `;
        
        spotsContainer.appendChild(spotCard);
    });
}

// Показать конкретную раскидку
function showGranadeSpot(spot) {
    showStep('step5');
    
    // Заполняем информацию о раскидке
    document.getElementById('granade-spot-name').textContent = 
        `${spot.name} (${getMapName(currentMap)} ${currentSide.toUpperCase()})`;
    
    const videoElement = document.getElementById('granade-video');
    videoElement.src = spot.video;
    videoElement.load();
    
    document.getElementById('granade-description').textContent = spot.description;
    document.getElementById('granade-difficulty').textContent = getDifficultyName(spot.difficulty);
    document.getElementById('granade-difficulty').className = `spot-difficulty ${spot.difficulty}`;
}

// Вспомогательные функции для получения названий
function getMapName(map) {
    const names = {
        'mirage': 'Mirage',
        'inferno': 'Inferno',
        'nuke': 'Nuke',
        'overpass': 'Overpass',
        'dust2': 'Dust 2',
        'train': 'Train',
        'ancient': 'Ancient'
    };
    return names[map] || map;
}

function getGranadeName(type) {
    const names = {
        'smoke': 'Дыма',
        'flash': 'Флешки',
        'molotov': 'Молотова',
        'he': 'Осколочной'
    };
    return names[type] || type;
}

function getDifficultyName(difficulty) {
    const names = {
        'easy': 'Легко',
        'medium': 'Средне',
        'hard': 'Сложно'
    };
    return names[difficulty] || difficulty;
}