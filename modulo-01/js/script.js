/**
 * 
 * Desafio do Módulo 1
 * Bootcamp IGTI Fullstack Developer 2020
 * Autor: Robson Mamede - 23/05/2020
 * 
 * Descrição do Problema:
 * 
 * Criar uma aplicação para filtrar usuários e mostrar estatísticas a partir do filtro definido.
 * Atividades
 * 
 * Os alunos deverão desempenhar as seguintes atividades:
 *  1. Na carga inicial da aplicação, obter os dados de: https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo (Links para um site externo.)
 *  2. Carregar os dados dos usuários em um array.
 *  3. Permitir a filtragem de usuários através de um input com interação do usuário.
 *  4. O usuário poderá filtrar dados quando digitar pelo menos um caractere no input.
 *  5. O usuário poderá filtrar os dados tanto digitando "Enter" quanto clicando no botão correspondente, conforme imagens mais abaixo.
 *  6. Montar dois painéis.
 *  7. No painel da esquerda, listar os usuários filtrados.
 *  8. No painel da direita, calcular e mostrar algumas estatísticas sobre esses usuários, conforme imagens abaixo.
 * 
*/

let inputName=null;
let button=null;
let arrPeople=null;
let arrFilteredPeople=null;

let numFilteredMale;
let numFilteredFemale;
let ageSum;
let ageAvg

window.addEventListener("load", () => {
   
   inputName = document.querySelector("#personName");   
   button = document.querySelector("#button");

   preventFormSubmit();
   doLoadDataFromApi();
   setButton();      
   
});

function setButton() {
   
   button.addEventListener("click", filterPeople);

   
}

function preventFormSubmit() {
   let form = document.querySelector("form");
   form.addEventListener("submit", handleFormSubmit);

   function handleFormSubmit(event) {
      event.preventDefault();
   }
}


/**
 * 
 * fetch() retorna uma Promise, que é uma promessa à aplicação de que a requisição será "resolvida" em algum momento.
 * É dessa forma que o JS trabalha assincronamente.
 * O conceito de promessa surge por conta de o fetch não garantir que o que se quer é o que se obterá, pois o servidor pode estar fora,
 * a api pode estar quebrada etc.
 * 
 * Assim, para o JS não parar a execução, ele lança mão da Promise.
 * 
 * O parâmetro resource é retornado por fetch e pode ser repassado à arrow function para processamento. 
 * Seu conteúdo está na propriedade body e é um binário do tipo ReadableStream.
 */

function doLoadDataFromApi() {

   fetch("https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo").then((resource) => {      
      return resource.json().then((data) => {
         loadToArray(data.results);
         /*return  data.results.map( pearson => {
            return {
               name : pearson.name.first + " " + pearson.name.last,
               email : pearson.email
            };
         }); */        
      });
   });
}

function loadToArray(data) {
   arrPeople = data.map( pearson => {
      return {
         name : pearson.name.first + " " + pearson.name.last,
         gender : pearson.gender,
         age : pearson.dob.age,
         picture : pearson.picture.thumbnail
      };
   });

   console.log(arrPeople);
}

function filterPeople() {
   criteriaValue = inputName.value;

   console.log(criteriaValue);

   arrFilteredPeople = arrPeople.filter(person => {
      return (person.name.toLowerCase().search(criteriaValue.toLowerCase()) >= 0);
   });

   //console.log(arrFilteredPeople);

   numFilteredFemale=0;
   numFilteredMale=0;
   ageSum=0;
   ageAvg=0;

   displayFilteredPeople();
   displayStatistcs();

}

function displayFilteredPeople() {

   let divNames = document.querySelector("#names");
   divNames.innerHTML = "";

   let usersFound = arrFilteredPeople.length;
   let title = usersFound + " usuário(s) encontrato(s)";
   let spanTitle = createSpan(title);
   divNames.appendChild(spanTitle);

   let ul = document.createElement("ul");

   let counter = 0;

   arrFilteredPeople.forEach( pearson => {      
      let li = document.createElement("li");
      let imgPeople = document.createElement("img");
      imgPeople.src = pearson.picture;
      let spanName = createSpan(pearson.name);
      li.appendChild(imgPeople);
      li.appendChild(spanName);
      ul.appendChild(li);

      numFilteredMale += (pearson.gender === "male") ? 1 : 0;
      numFilteredFemale += (pearson.gender === "female") ? 1 : 0;
      ageSum += pearson.age;
      counter++;
   });

   ageAvg = (ageSum / counter);

   divNames.appendChild(ul);

}

function displayStatistcs() {
   
   let divStats = document.querySelector("#statistics");
   divStats.innerHTML = "";

   let title = "Estatísticas";
   let spanTitle = createSpan(title);
   divStats.appendChild(spanTitle);

   let ul = document.createElement("ul");

   let liMale = document.createElement("li");
   let liFemale = document.createElement("li");
   let liAgeSum = document.createElement("li");
   let liAgeAvg = document.createElement("li");

   let varSpanMale = createSpan("Sexo masculino: " + numFilteredMale);
   let varSpanFemale = createSpan("Sexo feminino: " + numFilteredFemale);
   let varSpanAgeSum = createSpan("Soma das idades: " + ageSum);
   let varSpanAgeAvg = createSpan("Média das idades: " + ageAvg);
   
   liMale.appendChild(varSpanMale);
   liFemale.appendChild(varSpanFemale);
   liAgeSum.appendChild(varSpanAgeSum);
   liAgeAvg.appendChild(varSpanAgeAvg);

   ul.appendChild(liMale);
   ul.appendChild(liFemale);
   ul.appendChild(liAgeSum);
   ul.appendChild(liAgeAvg);

   divStats.appendChild(ul);
}

function createSpan(name) {
   var span = document.createElement("span");
   span.textContent = name;
   return span;
}