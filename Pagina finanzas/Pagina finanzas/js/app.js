//Variables iniciables en 0
let income = 0;
let fixedExpenses = 0;
let occasionalExpenses = 0;
let savings = 0;

/**
 * Creando funciones para actualizar valores, cada funcion recogera el valor ingresado 
 * por el usuario en cada campo correspondiente 
 */

function updateIncome() {
    //convierte el valor ingresado en numero decimal
    const input = parseFloat(document.getElementById('income').value);
    if (!isNaN(input) && input >= 0) {
        income += input;
        updateResults();
    }
    document.getElementById('income').value = '';
}

function updateFixedExpenses() {
    //Convierte el valor ingresado en numero decimal
    const input = parseFloat(document.getElementById('fixed-expenses').value);
    if (!isNaN(input) && input >= 0) {
        fixedExpenses += input;
        updateResults();
    }
    document.getElementById('fixed-expenses').value = '';
}

function updateOccasionalExpenses() {
    //convierte el valor ingresado en numero decimal
    const input = parseFloat(document.getElementById('occasional-expenses').value);
    if (!isNaN(input) && input >= 0) {
        occasionalExpenses += input;
        updateResults();
    }
    document.getElementById('occasional-expenses').value = '';
}

function updateSavings() {
    //convierte el valor ingresado en numero decimal
    const input = parseFloat(document.getElementById('savings').value);
    if (!isNaN(input) && input >= 0) {
        savings += input;
        updateResults();
    }
    document.getElementById('savings').value = '';
}


/**
 * Funcion que nos estara creando el grafico de pastel utilizando Chart.js
 * Estableceremos que inicie con datos iniciales (0.01 para que no sea invisible).
*/
function initializeChart() {
    //Declaramos las categorias
    const labels = ['Ingresos', 'Gastos Fijos', 'Gastos Ocasionales', 'Ahorros'];
    const graph = document.querySelector("#grafica");

    const data = {
        //Etiquetas para cada categoria
        labels: labels,
        //Los datos del grafico clasificados con colores especificos
        datasets: [{
            label: "Resumen de tus finanzas mensuales",
            data: [0.01, 0.01, 0.01, 0.01], // Establecer valores iniciales para que el gráfico se muestre
            backgroundColor: [
                'rgb(209, 196, 233)',
                'rgb(252, 228, 236)',
                'rgb(207, 216, 220)',
                'rgb(243, 229, 245)'
            ],
            borderColor: [
                'rgb(209, 196, 233)',
                'rgb(252, 228, 236)',
                'rgb(207, 216, 220)',
                'rgb(243, 229, 245)'
            ],
            borderWidth: 1
            
        }]
    };

    const config = {
        type: 'pie',
        data: data,
    };

    financeChart = new Chart(graph, config); // Crear el gráfico una vez
}

//Funcion donde estaremos mostrando los resultados de los calculos con el grafico
function updateResults() {
    const balance = income - fixedExpenses - occasionalExpenses;
    const excess = balance - savings;

    document.getElementById('total-income').innerText = `Ingresos Totales: ${income}`;
    document.getElementById('total-fixed-expenses').innerText = `Gastos Fijos Totales: ${fixedExpenses}`;
    document.getElementById('total-occasional-expenses').innerText = `Gastos Ocasionales Totales: ${occasionalExpenses}`;
    document.getElementById('total-savings').innerText = `Ahorros Totales: ${savings}`;
    document.getElementById('balance').innerText = `Saldo: ${balance}`;
    document.getElementById('excess').innerText = `Excedente Disponible: ${excess}`;
    
    // Aseguramos de que nunca se le pase un arreglo vacío al gráfico
    if (financeChart) {
        financeChart.data.datasets[0].data = [
            income || 0.01,
            fixedExpenses || 0.01,
            occasionalExpenses || 0.01,
            savings || 0.01
        ]; // Aseguramos de que no se pase cero
        financeChart.update();  // Solo actualizamos el gráfico existente
    }
}

// Cargar el gráfico inicialmente con ceros
window.onload = function(){
    initializeChart(); // Llamar a la función para inicializar el gráfico
};
