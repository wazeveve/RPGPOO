class Personagem{ //Declaração de Classe
    constructor(nome, classe){ //Construtor

         this.nome = nome;
         this.classe = classe;
         this.hp = 100;

    }

    exibirInfo(){
        const infoTela = document.getElementById("idInfo");
        infoTela.innerHTML = `Nome: ${this.nome} | Classe: ${this.classe} | HP: ${this.hp}`;
    }

    atacar(){
        const ataqueTela = document.getElementById("idAtaque");
        ataqueTela.innerHTML = `O ${this.classe} ${this.nome} está realizando um ataque!`;  
        let dano = Math.floor(Math.random() * 100);
        document.getElementById("idDano").innerHTML = "Dano causado: " + dano;
    }

    morrer(){
        if(this.hp <=0 ){
            document.getElementById(`img${this.classe}`).style.filter = "saturate(0%)"
            document.getElementById(`ataque${this.classe}`).style.display = "none"
        }
    }

    recebeDano(){
        const imgElement = document.getElementById(`img${this.classe}`);
        imgElement.classList.add("blink");

        setTimeout(()=>{
            imgElement.classList.remove("blink")
        },1500)
        
    }
}

class Guerreiro extends Personagem{ //Declaração de classe com extensão para herança
    constructor(nome){ //Construtor
        super(nome, "Guerreiro") //Acesso especial
    }
}

class Mago extends Personagem{ ////Declaração de classe com extensão para herança
    constructor(nome){ //Construtor
        super(nome, "Mago") //Acesso Especial
        this.mp = 100; //Uso de propiedades
    }
    exibirInfo(){ //Uso de métodos
        const infoTela = document.getElementById("idInfo");
        infoTela.innerHTML = `Nome: ${this.nome} | Classe: ${this.classe} | HP: ${this.hp} | MP: ${this.mp}`;
    }
    atacar(){ //Uso de métodos
        if(this.mp == 100){
            const infoTela = document.getElementById("idInfo");
            infoTela.innerHTML = `${this.nome} utilizou um ataque especial`
            this.mp-=50
        } else {
            const ataqueTela = document.getElementById("idAtaque");
            ataqueTela.innerHTML = `O ${this.classe} ${this.nome} está realizando um ataque!`;  
            super.atacar
            this.mp+=5
            let dano = Math.floor(Math.random() * 100);
        document.getElementById("idDano").innerHTML = "Dano causado: " + dano;
        }
    }
}

class Arqueira extends Personagem{ //Declaração de classe com extensão para herança
    constructor(nome){ //Construtor
        super(nome, "Arqueira") //Acesso especial
        this.arrowNumbers = 20 //Uso de propiedades
    }
    exibirInfo(){ //Uso de métodos
        const infoTela = document.getElementById("idInfo");
        infoTela.innerHTML = `Nome: ${this.nome} | Classe: ${this.classe} | HP: ${this.hp} | Flechas: ${this.arrowNumbers}`;
    }

    atacar(){ //Uso de métodos
        if(this.arrowNumbers > 0){
            super.atacar()
            this.arrowNumbers-= 1
        } else {
            const ataqueTela = document.getElementById("idAtaque");
            ataqueTela.innerHTML = `O ${this.classe} ${this.nome} está sem flechas para o ataque!`; 
        }
    }
}


//Instanciamento de Objetos
const guerreiro = new Guerreiro("Djavani");
const archer = new Arqueira("Lindsey");
const mago = new Mago("Merlou");



//Infos
const btnInfoGuerreiro = document.getElementById("infoGuerreiro")
btnInfoGuerreiro.addEventListener('click', function(){

    guerreiro.exibirInfo() //Uso de métodos
})


const btnInfoMago = document.getElementById("infoMago")
btnInfoMago.addEventListener('click', function(){

    mago.exibirInfo() //Uso de métodos
})

const btnInfoArcher = document.getElementById("infoArqueira")
btnInfoArcher.addEventListener('click', function(){

    archer.exibirInfo() //Uso de métodos
})


// Ataques

const btnAtkWarrior = document.getElementById("ataqueGuerreiro")
btnAtkWarrior.addEventListener('click', ()=>{
    guerreiro.atacar() //Uso de métodos
})

const btnAtkWizard = document.getElementById("ataqueMago")
btnAtkWizard.addEventListener('click', ()=>{
    mago.atacar() //Uso de métodos
}) 

const btnAtkArcher = document.getElementById("ataqueArqueira")
btnAtkArcher.addEventListener('click', ()=>{
    archer.atacar(); //Uso de métodos
})



//INIMIGO!

class Inimigo extends Personagem{ //Declaração de Classe com Extensão para herança
    constructor(nome,classe){ //Construtor
        super(nome,classe) //Acesso especial
        this.hp = 1000 //Uso de propiedade


    }

    atacar(personagem){ //Uso de método
        const ataqueTela = document.getElementById("idAtaque");
        let chanceAcerto = Math.floor(Math.random() * 21)
        let dano = Math.floor(Math.random() * 12)+10
        if(chanceAcerto > 19){
            ataqueTela.innerHTML = `${this.nome} Rodou ${chanceAcerto} e Atacou ${personagem.nome} com um acerto CRÍTICO!! DANO: ${dano}`
            dano *= 2
            personagem.hp -= dano //acesso especial
            console.log(chanceAcerto)  
            personagem.recebeDano() //uso de métodos
        } else if(chanceAcerto >= 13){
            ataqueTela.innerHTML = `${this.nome} Rodou ${chanceAcerto} e Atacou ${personagem.nome}! DANO: ${dano}`
            console.log(chanceAcerto)
            personagem.hp -= dano //acesso especial
            personagem.recebeDano()//uso de métodos
        }else{
            ataqueTela.innerHTML = `${this.nome} Rodou ${chanceAcerto} e Errou o ataque!`
            console.log(chanceAcerto)
        }
    
    }
}


const inimigo = new Inimigo("Phelippes IV","King") //Instanciamento de Objeto
console.log(inimigo)

document.getElementById("enemyInfoBt").addEventListener('click',()=>{
    inimigo.exibirInfo() //Uso de métodos
})

const personagens = [guerreiro,mago,archer] 
console.log(personagens)



function verificaHp(){
    return personagens.filter(p => p.hp > 0)
}

//console.log(verificaHp())

document.getElementById("enemyAtkBt").addEventListener('click',()=>{

    const personagensVivos = verificaHp()
    if(!personagensVivos.length){
        alert(`O INIMIGO VENCEU! você perdeu!`)
    }

    let randomTarget = Math.floor(Math.random() * personagensVivos.length)
    inimigo.atacar(personagensVivos[randomTarget]) //Uso de métodos
    personagensVivos[randomTarget].morrer() //Uso de métodos
})

