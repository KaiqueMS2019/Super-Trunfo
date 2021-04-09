let cards = [
    {
        name: "Capitão America",
        imagem: "https://1.bp.blogspot.com/-QVqzJVM88uA/Xd1Nd-5X6oI/AAAAAAAAgYo/w5TIl-ZviUMkTPfrnblY8DYGXifjfDrKwCLcBGAsYHQ/s2560/captain-america-angry-xj-2560x1440.jpg",
        atributos: {
            ataque: 85,
            defesa: 90,
            poder: 85
        }
    },
    {
        name: "Thor",
        imagem: "https://cdn.statically.io/img/wallpaperaccess.com/full/367850.jpg",
        atributos: {
            ataque: 90,
            defesa: 70,
            poder: 90
        }
    },
    {
        name: "Homem-Aranha",
        imagem: "https://a-static.besthdwallpaper.com/ferro-homem-aranha-papel-de-parede-3554x1999-14531_53.jpg",
        atributos: {
            ataque: 80,
            defesa: 75,
            poder: 80
        }
    },
    {
        name: "Capitâ Marvel",
        imagem: "https://claudia.abril.com.br/wp-content/uploads/2020/01/poster-capita-marvel-oficial-1.jpg",
        atributos: {
            ataque: 85,
            defesa: 80,
            poder: 90
        }
    },
    {
        name: "Wanda",
        imagem: "https://disneyplusbrasil.com.br/wp-content/uploads/2021/03/Feiticeira-Escarlate.jpg",
        atributos: {
            ataque: 90,
            defesa: 85,
            poder: 95
        }
    },
    {
        name: "Homem de Ferro",
        imagem: "https://i.ytimg.com/vi/Og57eFopFXY/maxresdefault.jpg",
        atributos: {
            ataque: 90,
            defesa: 85,
            poder: 87
        }
    }
]
let cardMachine
let cardJogador

let pontosJogador = 0
let pontosMaquina = 0

atualizarPlacar()
atualizaQuantidadeDeCarta()

function atualizaQuantidadeDeCarta() {
    let divQuantidadeCartas = document.getElementById('quantidade-cartas')
    let html = "Quantidade de cartas no jogo: " + cards.length

    divQuantidadeCartas.innerHTML = html
}

function atualizarPlacar() {
    let divPlacar = document.getElementById('placar')
    let html = "Jogador " + pontosJogador + " / " + pontosMaquina + " Maquina"
    divPlacar.innerHTML = html


}

function sortearCarta() {
    let numberCardMachine = parseInt(Math.random() * cards.length)
    cardMachine = cards[numberCardMachine]
    cards.splice(numberCardMachine, 1)


    let numeroCartaJogador = parseInt(Math.random() * cards.length)
    cardJogador = cards[numeroCartaJogador]
    cards.splice(numeroCartaJogador, 1)

    document.getElementById('btnSortear').disabled = true
    document.getElementById('btnJogar').disabled = false

    exibeCartaJogador()
}

function exibeCartaJogador() {
    let divCartaJogador = document.getElementById("carta-jogador")
    let moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png"style=" width: inherit; height: inherit; position: absolute;">';
    divCartaJogador.style.backgroundImage = `url(${cardJogador.imagem})`
    let nome = `<p class="carta-subtitle">${cardJogador.name}</p>`
    let opcoesTexto = ""
    for (let atributo in cardJogador.atributos) {
        opcoesTexto += "<input type='radio' name='atributo' value='" + atributo + "'>" + atributo + " " + cardJogador.atributos[atributo] + "<br>"
    }

    let html = "<div id='opcoes' class='carta-status'>"

    divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function obtemAtributoSelecionado() {
    let radioAtributo = document.getElementsByName('atributo')
    for (let i = 0; i < radioAtributo.length; i++) {
        if (radioAtributo[i].checked) {
            return radioAtributo[i].value
        }
    }
}

function jogar() {
    let atributoSelecionado = obtemAtributoSelecionado()
    let divResultado = document.getElementById("resultado")

    if (cardJogador.atributos[atributoSelecionado] > cardMachine.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Venceu</p>'
        pontosJogador++
    } else if (cardJogador.atributos[atributoSelecionado] < cardMachine.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Perdeu</p>'
        pontosMaquina++
    } else {
        htmlResultado = '<p class="resultado-final">Empate</p>'
    }

    if (cards.length === 0) {
        alert("Fim de jogo")
        if (pontosJogador > pontosMaquina) {
            htmlResultado = '<p class="resultado-final">Venceu o Jogo</p>'
        } else if (pontosMaquina > pontosJogador) {
            htmlResultado = '<p class="resultado-final">Perdeu o Jogo</p>'
        } else {
            htmlResultado = '<p class="resultado-final">Empatou o Jogo</p>'
        }
    } else {
        document.getElementById('btnProximaRodada').disabled = false
    }


    divResultado.innerHTML = htmlResultado
    document.getElementById('btnJogar').disabled = true

    atualizarPlacar()
    exibeCartaMaquina()
    atualizaQuantidadeDeCarta()

}

function exibeCartaMaquina() {
    let divCartaMaquina = document.getElementById("carta-maquina")
    let moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png"style=" width: inherit; height: inherit; position: absolute;">';
    divCartaMaquina.style.backgroundImage = `url(${cardMachine.imagem})`
    let nome = `<p class="carta-subtitle">${cardMachine.name}</p>`
    let opcoesTexto = ""
    for (let atributo in cardMachine.atributos) {
        opcoesTexto += "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + " " + cardMachine.atributos[atributo] + "<br>"
    }

    let html = "<div id='opcoes' class='carta-status'>"

    divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function proximaRodada() {
    let divCartas = document.getElementById('cartas')

    divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" class="carta"></div>`
    document.getElementById('btnSortear').disabled = false
    document.getElementById('btnJogar').disabled = true
    document.getElementById('btnProximaRodada').disabled = true

    let divResultado = document.getElementById('resultado')

    divResultado.innerHTML = ""
}