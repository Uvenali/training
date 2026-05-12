/* ==========================================================
   БЛОК 1: ЛОГИКА ШАПКИ (ПЕРЕКЛЮЧЕНИЕ РЕЖИМОВ И УСТРОЙСТВ)
   ========================================================== */

/**
 * Переключает визуальный режим (Тренировка/Практика)
 * @param {string} mode - Название режима
 */
function setMode(mode) {
    // Находим все кнопки в блоке выбора режима
    const buttons = document.querySelectorAll('#mode-selector button');
    
    // Удаляем у всех кнопок класс 'active'
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Добавляем класс 'active' той кнопке, на которую нажали
    event.target.classList.add('active');
    
    console.log("Текущий режим работы:", mode);
    // Здесь позже добавим логику включения/выключения подсказок
}

/**
 * Переключает активное устройство (Роутер/ПК/Приставка)
 * @param {string} deviceCode - Код устройства (например, ширина или ID)
 */
function setDeviceWidth(deviceCode) {
    // Находим все кнопки в блоке выбора устройства
    const buttons = document.querySelectorAll('#device-width-selector button');
    
    // Очищаем активный статус у всех кнопок группы
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Делаем нажатую кнопку активной
    event.target.classList.add('active');
    
    console.log("Выбрано устройство для настройки:", deviceCode);
    
    // Вызов функции смены экрана (напишем её при верстке монитора)
    // switchDeviceScreen(deviceCode); 
}
/* ==========================================================
   БЛОК 2: ЛОГИКА ЭКРАНА ПК (CMD И СЕТЕВЫЕ НАСТРОЙКИ)
   ========================================================== */

/**
 * Управляет доступностью полей ввода IP-адреса.
 * Вызывается при переключении Radio-кнопок (Авто/Вручную).
 * @param {boolean} isManual - Если true, поля становятся активными.
 */
function toggleIpFields(isManual) {
    // Находим все текстовые поля ввода внутри блока IP
    const fields = document.querySelectorAll('#ip-fields .ip-input');
    
    fields.forEach(input => {
        // Меняем состояние доступности (disabled)
        input.disabled = !isManual;
        
        // Если переключились на "Автоматически", очищаем введенные значения
        if (!isManual) {
            input.value = '';
        }
    });
}

/**
 * Обрабатывает ввод команд в виртуальную командную строку (CMD).
 * @param {KeyboardEvent} event - Событие нажатия клавиши.
 */
function handleCmd(event) {
    // Реагируем только на нажатие клавиши Enter
    if (event.key === 'Enter') {
        const input = document.getElementById('cmd-input');      // Поле ввода
        const output = document.getElementById('cmd-output');    // Область вывода текста
        const command = input.value.toLowerCase().trim();        // Текст команды в нижнем регистре

        // 1. Отображаем введенную команду в окне консоли
        output.innerHTML += `<div class="cmd-line">C:\\Users\\Admin>${input.value}</div>`;

        // 2. Выполняем логику в зависимости от команды
        switch (command) {
            case 'ipconfig':
                // Имитация вывода сетевых настроек
                output.innerHTML += `<div class="cmd-line">Настройка протокола IP для Windows:<br><br>
                Адаптер Ethernet:<br>
                Состояние среды . . . . . . . . : Подключен<br>
                IPv4-адрес . . . . . . . . . . : 192.168.1.15<br>
                Маска подсети . . . . . . . . : 255.255.255.0<br>
                Основной шлюз . . . . . . . . : 192.168.1.1</div>`;
                break;

            case 'getmac':
                // Имитация вывода MAC-адреса
                output.innerHTML += `<div class="cmd-line">Физический адрес: 00-15-5D-01-CA-C2</div>`;
                break;

            case 'cls':
                // Очистка экрана консоли
                output.innerHTML = '';
                break;

            case '':
                // Если нажат Enter на пустой строке — ничего не делаем
                break;

            default:
                // Если команда не распознана
                output.innerHTML += `<div class="cmd-line">"${command}" не является внутренней или внешней командой, исполняемой программой или пакетным файлом.</div>`;
        }

        // 3. Подготовка к следующему вводу
        input.value = ''; // Очищаем поле ввода
        output.scrollTop = output.scrollHeight; // Прокручиваем консоль вниз до конца
    }
}
