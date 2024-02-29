const containerVideos = document.querySelector(".videos__container");

async function buscarEMostrarVideos() {
    try {
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();
        videos.forEach((video) => {
            containerVideos.innerHTML += `
      <li class="videos__item">
          <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
          <div class="descricao-video">
              <img class="img-canal" src="${video.imagem}" alt="Logo do Canal" />
              <h3 class="titulo-video">${video.titulo}</h3>
              <p class="titulo-canal">${video.descricao}</p>
              <p class="categoria hidden">${video.categoria}</p>
          </div>
      </li>
      `;
        });
    } catch (error) {
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error} </p>`;
    }
}

buscarEMostrarVideos();

const barraDePesquisa = document.querySelector('.pesquisar__input');
barraDePesquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa(){
    const videos = document.querySelectorAll('.videos__item');

    videos.forEach(video => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();

        if(titulo.includes(barraDePesquisa.value.toLowerCase())){
            video.style.display = 'block';
            return;
        }
        video.style.display = 'none'
    });
}

const botaoCategoria = document.querySelectorAll('.superior__item');
botaoCategoria.forEach((botao) => {
    botao.addEventListener('click', () => filtrarPorCategoria(botao));
})

function filtrarPorCategoria(botao){
    document.querySelectorAll('.superior__item')
        .forEach(btn => btn.classList.remove('superior__selecionado'));
    botao.classList.add('superior__selecionado');

    const filtro = botao.getAttribute('name');
    const videos = document.querySelectorAll('.videos__item');

    for(let video of videos){
        const categoria = video.querySelector('.categoria').textContent.toLowerCase();
        const valorFiltro = filtro.toLowerCase();
        if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
            video.style.display = 'none';
        }else{
            video.style.display = 'block';
        }
    }
}