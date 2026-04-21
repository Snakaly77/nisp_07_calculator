// Pobieramy ekran kalkulatora i wszystkie przyciski
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Zmienne do przechowywania stanu kalkulatora
let currentInput = '';
let previousInput = '';
let currentOperator = null;

// Główna pętla nasłuchująca kliknięć na każdy przycisk
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        // Logika czyszczenia ekranu (przycisk "C")
        if (button.classList.contains('clear')) {
            currentInput = '';
            previousInput = '';
            currentOperator = null;
            display.innerText = '0';
        } 
        // Logika operatorów matematycznych (+, -, *, /)
        else if (button.classList.contains('operator')) {
            if (currentInput === '' && previousInput === '') return;
            
            // Jeśli wpisaliśmy już dwie liczby i klikamy kolejny operator, najpierw policz wynik
            if (currentInput !== '' && previousInput !== '') {
                calculate(); 
            }
            
            currentOperator = value;
            if (currentInput !== '') {
                previousInput = currentInput;
                currentInput = '';
            }
        } 
        // Logika znaku równości "="
        else if (button.classList.contains('equals')) {
            if (currentInput !== '' && previousInput !== '') {
                calculate();
                currentOperator = null; // Resetujemy operator po obliczeniu
            }
        } 
        // Logika wpisywania cyfr
        else {
            // Zapobiegamy wpisywaniu wielu zer na początku
            if (currentInput === '0' && value === '0') return; 
            if (currentInput === '0') currentInput = ''; // Nadpisz początkowe zero
            
            currentInput += value;
            display.innerText = currentInput;
        }
    });
});

// Funkcja odpowiedzialna za matematykę
function calculate() {
    let result;
    // Zamieniamy stringi na liczby zmiennoprzecinkowe
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    // Zabezpieczenie przed błędami
    if (isNaN(prev) || isNaN(current)) return;

    // Wykonanie działania w zależności od wybranego operatora
    switch (currentOperator) {
        case '+': // <-- Twoje dodawanie
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            // Zabezpieczenie przed dzieleniem przez zero
            if (current === 0) {
                result = "Błąd";
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }

    // Aktualizacja zmiennych i wyświetlenie wyniku na ekranie
    currentInput = result.toString();
    previousInput = '';
    display.innerText = currentInput;
}