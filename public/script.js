let alimentos = [];
let lancheira = [];

// Busca alimentos do servidor
fetch('/api/alimentos')
  .then(res => res.json())
  .then(data => {
    alimentos = data;
    preencherSelect();
  });

function preencherSelect() {
  const select = document.getElementById("alimento");
  alimentos.forEach((item, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${item.nome} - ${item.kcal} kcal`;
    select.appendChild(option);
  });
}

function adicionarAlimento() {
  const index = document.getElementById("alimento").value;
  if (index === "") return;
  lancheira.push(alimentos[index]);
  atualizarLancheira();
}

function limparLancheira() {
  lancheira = [];
  atualizarLancheira();
}

function atualizarLancheira() {
  const lista = document.getElementById("lancheira");
  lista.innerHTML = "";
  let totalKcal = 0;

  lancheira.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - ${item.kcal} kcal`;
    lista.appendChild(li);
    totalKcal += item.kcal;
  });

  document.getElementById("total").textContent = `Total de Calorias: ${totalKcal} kcal`;

  const msg = document.getElementById("mensagem");

  if (totalKcal === 0) {
    msg.textContent = "";
    // 🔴 Esconde a lancheira quando estiver vazia
    document.getElementById("lancheira-container").style.display = "none";
  } else {
    document.getElementById("lancheira-container").style.display = "block";

    if (totalKcal <= 400) {
      msg.textContent = "✅ Parabéns, você fez ótimas escolhas!";
      msg.className = "sucesso";
    } else {
      msg.textContent = "⚠️ Atenção: ultrapassou o limite de 400 kcal!";
      msg.className = "alerta";
    }
  }
}