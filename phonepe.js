const balanceElement = document.getElementById('wallet-balance');
const transferForm = document.getElementById('transfer-form');
const transferMessage = document.getElementById('transfer-message');
const transactionList = document.getElementById('transaction-list');
const quickAdd = document.getElementById('quick-add');
const quickSend = document.getElementById('quick-send');

let balance = 5000;

function updateBalance() {
  balanceElement.textContent = `₹ ${balance.toLocaleString('en-IN')}`;
}

function addTransaction(text) {
  const item = document.createElement('li');
  item.innerHTML = text;
  transactionList.prepend(item);
}

transferForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const upiId = document.getElementById('upi-id').value.trim();
  const amount = Number(document.getElementById('amount').value);
  const note = document.getElementById('note').value.trim();

  if (!upiId || amount <= 0) {
    transferMessage.textContent = 'कृपया सही UPI और राशि दर्ज करें।';
    transferMessage.classList.add('error');
    return;
  }

  if (amount > balance) {
    transferMessage.textContent = 'बैलेंस पर्याप्त नहीं है।';
    transferMessage.classList.add('error');
    return;
  }

  balance -= amount;
  updateBalance();
  transferMessage.textContent = `₹ ${amount} भेज दिया गया ${upiId} को।`;
  transferMessage.classList.remove('error');
  transferMessage.classList.add('success');
  addTransaction(`<strong>Sent</strong> - ₹ ${amount} to ${upiId} (${note || 'No note'})`);
  transferForm.reset();
});

quickAdd.addEventListener('click', () => {
  balance += 500;
  updateBalance();
  addTransaction('<strong>Added</strong> - ₹ 500 to wallet');
});

quickSend.addEventListener('click', () => {
  if (balance < 500) {
    transferMessage.textContent = 'बैलेंस कम है।';
    transferMessage.classList.add('error');
    return;
  }
  balance -= 500;
  updateBalance();
  addTransaction('<strong>Sent</strong> - ₹ 500 quick transfer');
  transferMessage.textContent = '₹ 500 सफलतापूर्वक भेज दिया गया।';
  transferMessage.classList.remove('error');
  transferMessage.classList.add('success');
});

updateBalance();
