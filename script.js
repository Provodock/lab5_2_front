document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('myTable');
    const colorPicker = document.getElementById('colorPicker');
    const targetCell = 5; // Клітинка, яка буде інтерактивною
    let cells = [];

    // Функція для генерації випадкового кольору
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Створення таблиці
    function createTable() {
        // Створюємо 6 рядків
        for (let i = 0; i < 6; i++) {
            const row = table.insertRow();
            // Створюємо 6 клітинок в кожному рядку
            for (let j = 0; j < 6; j++) {
                const cell = row.insertCell();
                const number = i * 6 + j + 1;
                cell.textContent = number;
                cells.push(cell);

                // Якщо це цільова клітинка (номер 5)
                if (number === targetCell) {
                    // При наведенні - випадковий колір
                    cell.addEventListener('mouseover', () => {
                        cell.style.backgroundColor = getRandomColor();
                    });

                    // При кліку - відкриття колір-пікера
                    cell.addEventListener('click', (e) => {
                        e.stopPropagation();
                        colorPicker.click();
                    });

                    // При подвійному кліку - зміна кольору всіх інших клітинок
                    cell.addEventListener('dblclick', () => {
                        const randomColor = getRandomColor();
                        cells.forEach(tableCell => {
                            if (tableCell !== cell) {
                                tableCell.style.backgroundColor = randomColor;
                            }
                        });
                    });
                }
            }
        }
    }

    // Обробник події зміни кольору в колір-пікері
    colorPicker.addEventListener('input', (e) => {
        cells[targetCell - 1].style.backgroundColor = e.target.value;
    });

    // Ініціалізація таблиці
    createTable();
});