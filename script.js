let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

document.getElementById('transactionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const description = document.getElementById('description').value;
    let amount = document.getElementById('amount').value;
    
    // Substituir vírgulas por pontos e converter para número
    amount = parseFloat(amount.replace(',', '.'));
    
    if (isNaN(amount)) {
        alert("Por favor, insira um valor numérico válido.");
        return;
    }
    
    const transaction = {
        id: generateID(),
        description,
        amount
    };
    
    transactions.push(transaction);
    updateUI();
    updateLocalStorage();
    
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
});

function generateID() {
    return Math.floor(Math.random() * 1000000);
}

function updateUI() {
    const income = transactions
        .filter(item => item.amount > 0)
        .reduce((acc, item) => acc + item.amount, 0);

    const expense = transactions
        .filter(item => item.amount < 0)
        .reduce((acc, item) => acc + item.amount, 0);
    
    const balance = income + expense;
    
    document.getElementById('income').innerText = `R$ ${income.toFixed(2)}`;
    document.getElementById('expense').innerText = `R$ ${expense.toFixed(2)}`;
    document.getElementById('balance').innerText = `R$ ${balance.toFixed(2)}`;
    
    const transactionsList = document.getElementById('transactions');
    transactionsList.innerHTML = '';
    
    transactions.forEach(item => {
        const sign = item.amount < 0 ? '-' : '+';
        const li = document.createElement('li');
        li.classList.add(item.amount < 0 ? 'expense' : 'income');
        li.innerHTML = `
            ${item.description} <span>${sign} R$ ${Math.abs(item.amount).toFixed(2)}</span>
            <button onclick="removeTransaction(${item.id})">x</button>
        `;
        transactionsList.appendChild(li);
    });
}

function removeTransaction(id) {
    transactions = transactions.filter(item => item.id !== id);
    updateUI();
    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

updateUI();
