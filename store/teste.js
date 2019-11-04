export const state = () => ({
    teste: 'teste com sucesso!!'
    })
  
    export const mutations = {
      increment(state) {
        console.log("chamou o Mutations Teste")
      }
    }
    
    export const actions = {
      testeAction(context) {
        context.commit('increment');
      }
    }

    export const getters = {
      
    }