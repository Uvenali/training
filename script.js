// 1. Состояние системы
const state = {
    mode: 'training',
    data: {
        pppoeLogin: `user${Math.floor(Math.random() * 9000)}`,
        pppoePass: Math.random().toString(36).slice(-6),
        routerIP: `192.168.${Math.floor(Math.random() * 254)}.1`,
        adminPass: 'admin' + Math.floor(Math.random() * 99)
    },
    isLoggedIn: false
};

// 2. Инициализация при загрузке
window.onload = () => {
    document.getElementById('target-login').innerText = state.data.pppoeLogin;
    document.getElementById('target-pass').innerText = state.data.pppoePass;
    document.getElementById('router-ip').innerText = state.data.routerIP;
    document.getElementById('admin-pass').innerText = state.data.adminPass;

    // Имитация линка в WAN порту
    setTimeout(() => document.getElementById('led-wan').classList.add('active'), 1500);
};

// 3. Логика "Браузера"
function browserGo() {
    const addr = document.getElementById('browser-address').value;
    const screen = document.getElementById('screen-content');

    if (addr === state.data.routerIP) {
        showRouterLogin();
    } else {
        screen.innerHTML = `<div style="color:red; text-align:center; margin-top:50px;">
            <h2>404 Not Found</h2>
            <p>Не удается получить доступ к сайту. Проверьте правильность IP адреса.</p>
        </div>`;
    }
}

// Показать окно входа в роутер
function showRouterLogin() {
    const screen = document.getElementById('screen-content');
    screen.innerHTML = `
        <div class="router-login-form">
            <h3>Вход в роутер</h3>
            <input type="text" id="adm-user" placeholder="Username" value="admin"><br><br>
            <input type="password" id="adm-pass" placeholder="Password"><br><br>
            <button onclick="tryLogin()">Войти</button>
        </div>
    `;
}

function tryLogin() {
    const pass = document.getElementById('adm-pass').value;
    if (pass === state.data.adminPass) {
        state.isLoggedIn = true;
        showRouterSettings();
    } else {
        alert("Неверный пароль администратора!");
    }
}

function showRouterSettings() {
    const screen = document.getElementById('screen-content');
    screen.innerHTML = `
        <div class="router-admin">
            <h2 style="background:#2980b9; color:white; padding:10px;">Настройки WAN</h2>
            <div style="padding:20px;">
                <p>Тип подключения: <strong>PPPoE</strong></p>
                <input type="text" id="ppp-login" placeholder="PPPoE Login"><br><br>
                <input type="password" id="ppp-pass" placeholder="PPPoE Password"><br><br>
                <button onclick="applyWAN()">Сохранить и подключить</button>
            </div>
        </div>
    `;
}

function applyWAN() {
    const l = document.getElementById('ppp-login').value;
    const p = document.getElementById('ppp-pass').value;

    if (l === state.data.pppoeLogin && p === state.data.pppoePass) {
        document.getElementById('led-inet').classList.add('active');
        alert("Интернет успешно подключен!");
    } else {
        alert("Ошибка: Неверный логин или пароль PPPoE");
    }
}
