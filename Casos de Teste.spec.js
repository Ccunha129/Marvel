/// <reference types="cypress" />

const apikey = ""
const hash = '';

describe('Casos de teste', () => {
    it('Sucesso: request retorna 5 stories', () => {
        cy.request({
            method: 'GET', 
            url: 'https://gateway.marvel.com/v1/public/stories?ts=1&apikey=' + apikey + '&hash=' + hash + '&limit=5'
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.data.results.length).to.eq(5);
            for(let i = 0; i < 5; i++){
                cy.log(response.body.data.results[i].title);
            }
        });
    });

    it('Sucesso: characterIds existentes retornam agentes esperados', () => {
        cy.request({
            method: 'GET',
            url: 'https://gateway.marvel.com/v1/public/characters/1011198?ts=1&apikey=' + apikey + '&hash=' + hash
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.data.results[0].name).to.eq("Agents of Atlas");
        });

        cy.request({
            method: 'GET',
            url: 'https://gateway.marvel.com/v1/public/characters/1011297?ts=1&apikey=' + apikey + '&hash=' + hash
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.data.results[0].name).to.eq("Agent Brand");
        });

        cy.request({
            method: 'GET',
            url: 'https://gateway.marvel.com/v1/public/characters/1011456?ts=1&apikey=' + apikey + '&hash=' + hash
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.data.results[0].name).to.eq("Balder");
        });
    });

    it('Exceção: characterId inexistente retorna mensagem de erro', () => {
        cy.request({
            method: 'GET',
            url: 'https://gateway.marvel.com/v1/public/characters/-1?ts=1&apikey=' + apikey + '&hash=' + hash,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(404);
            expect(response.body.status).to.eq("We couldn't find that character");
        });
    });
});