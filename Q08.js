// Função para cadastrar um novo filme
function cadastrarFilme() {
    const titleInput = document.getElementById("title");
    const genreInput = document.getElementById("genre");
    const categoryInput = document.getElementById("category");
  
    const title = titleInput.value.trim();
    const genre = genreInput.value.trim();
    const category = categoryInput.value.trim();
  
    if (!title || !genre || !category) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    const filme = {
      title: title,
      genre: genre,
      category: category,
    };
  
    let filmesCadastrados = JSON.parse(localStorage.getItem("filmes")) || [];
    filmesCadastrados.push(filme);
  
    localStorage.setItem("filmes", JSON.stringify(filmesCadastrados));
  
    titleInput.value = "";
    genreInput.value = "";
    categoryInput.value = "";
  
    exibirFilmes();
  }
  
  // Função para excluir um filme da lista
  function excluirFilme(index) {
    let filmesCadastrados = JSON.parse(localStorage.getItem("filmes")) || [];
    filmesCadastrados.splice(index, 1);
    localStorage.setItem("filmes", JSON.stringify(filmesCadastrados));
    exibirFilmes();
  }
  
  // Função para exibir os filmes na tabela, separados por gênero e categoria
  function exibirFilmes() {
    const filmesContainer = document.getElementById("filmesContainer");
    filmesContainer.innerHTML = "";
  
    let filmesCadastrados = JSON.parse(localStorage.getItem("filmes")) || [];
  
    // Organiza os filmes em um objeto de categorias e gêneros
    const filmesPorGeneroECategoria = {};
    filmesCadastrados.forEach(filme => {
      if (!filmesPorGeneroECategoria[filme.genre]) {
        filmesPorGeneroECategoria[filme.genre] = {};
      }
      if (!filmesPorGeneroECategoria[filme.genre][filme.category]) {
        filmesPorGeneroECategoria[filme.genre][filme.category] = [];
      }
      filmesPorGeneroECategoria[filme.genre][filme.category].push(filme);
    });
  
    // Cria as seções e tabelas para cada gênero e categoria
    for (const genre in filmesPorGeneroECategoria) {
      const genreSection = document.createElement("section");
      genreSection.innerHTML = `<h3>${genre}</h3>`;
      for (const category in filmesPorGeneroECategoria[genre]) {
        const filmesTable = document.createElement("table");
        filmesTable.innerHTML = `
          <thead>
            <tr>
              <th>Título</th>
              <th>Gênero</th>
              <th>Categoria</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <!-- Os filmes serão adicionados dinamicamente com JavaScript -->
          </tbody>
        `;
        const filmesTableBody = filmesTable.querySelector("tbody");
        filmesPorGeneroECategoria[genre][category].forEach((filme, index) => {
          const row = document.createElement("tr");
  
          const titleCell = document.createElement("td");
          titleCell.textContent = filme.title;
  
          const genreCell = document.createElement("td");
          genreCell.textContent = filme.genre;
  
          const categoryCell = document.createElement("td");
          categoryCell.textContent = filme.category;
  
          const actionCell = document.createElement("td");
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Excluir";
          deleteButton.onclick = function () {
            excluirFilme(index);
          };
          actionCell.appendChild(deleteButton);
  
          row.appendChild(titleCell);
          row.appendChild(genreCell);
          row.appendChild(categoryCell);
          row.appendChild(actionCell);
  
          filmesTableBody.appendChild(row);
        });
        genreSection.appendChild(filmesTable);
      }
      filmesContainer.appendChild(genreSection);
    }
  }
  
  // Chama a função para exibir os filmes ao carregar a página
  exibirFilmes();  