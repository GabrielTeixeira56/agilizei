//O comando abaixo traz a documentação do cypress ao passar o mouse por cima
/// <reference types="cypress"/>

//Pode ser tanto "describe" como "context"
context('Dev Finances agilizei', () => {
 
  //hooks
  //Trechos de códigos que executam antes e depois do teste
  //before -> executa antes de TODOS os testes
  //beforeEach -> executa antes de CADA teste
  //after -> executa depois de TODOS os testes
  //afterEach -> executa depois de CADA teste
  beforeEach(() => {
    cy.visit('https://devfinance-agilizei.netlify.app');
    cy.get('#data-table tbody tr').should('have.length', 0);
  });
 
  //Aqui ficam os cenários(it)
  //Cadastrar entradas
  it('Cadastrar entradas', () => {
    /*
    - entender o fluxo manualmente
    - mapear os elementos que vamos interagir
    - descrever as interações com o cypress
    - adicionar as asserções que precisamos
    */
    
    //para tipo id usar # e tipo class usar .
    cy.get('#transaction .button').click();
    cy.get('#description').type('Mesada');

    //para localizar por atributos usar [atributos=valor]
    cy.get('[name=amount]').type(12);
    cy.get('[type=date]').type('2023-05-24');

    //Utilizando o contains para localizar um texto neste tipo
    cy.get('button').contains('Salvar').click();

    //Asserção para validar o tamanho da tabela
    cy.get('#data-table tbody tr').should('have.length', 1);
  })

  //Cadastrar saídas
  it('Cadastrar saídas', () => {
    cy.get('#transaction .button').click();
    cy.get('#description').type('Presente');
    cy.get('[name=amount]').type(-12);
    cy.get('[type=date]').type('2023-05-24');
    cy.get('button').contains('Salvar').click();

  })

  //Remover estradas e saídas
  it('Remover entradas e saídas', () => {
    const entrada = 'Mesada';
    const saida =  'KinderOvo';

    cy.get('#transaction .button').click();
    cy.get('#description').type(entrada);
    cy.get('[name=amount]').type(100);
    cy.get('[type=date]').type('2023-05-24');
    cy.get('button').contains('Salvar').click();

    cy.get('#transaction .button').click();
    cy.get('#description').type(saida);
    cy.get('[name=amount]').type(-12);
    cy.get('[type=date]').type('2023-05-24');
    cy.get('button').contains('Salvar').click();

    cy.get('#data-table tbody tr').should('have.length', 2);

    //Estratégia 1: voltar para o elemento pai, e avançar para um td img attr
    //Comando "parent" serve para encontrar o elemento pai do elemento.
    //comando "find" para realizar uma busca a partir do elemento pai.
    cy.get('td.description')
      .contains(entrada)
      .parent()
      .find('img[onclick*=remove]')
      .click();

      cy.get('#data-table tbody tr').should('have.length', 1);
    
    //Estatégia 2: buscar todos os irmãos e buscar o que tem img + attr
    cy.get('td.description')
      .contains(saida)
      .siblings()
      .children('img[onclick*=remove]')
      .click();

      cy.get('#data-table tbody tr').should('have.length', 0);
  })

  //trabalhando com outras resoluções
    //cy.viewport
    //arquivos de config
    //passar as configs por linha de comando.
      //npx cypress open --config viewportWidth= 411,viewportHeight=823
   
  //Execução em modo headless
    //npx cypress run
})