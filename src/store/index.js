import Vue from 'vue'
import Vuex from 'vuex'
import {Virus, viruses} from "../model"
import router from '../router/index'

let store =  new Vuex.Store({
    state: {
        viruses,
        samples: [],
        parts: [],
        basket: [],
    },

    mutations: {
        clone_to_basket(state, virus) {
            state.basket.push(new Virus(0, virus.name, virus.code))
        },
        move_basket_to_lab(state) {
            state.basket.forEach(v => state.samples.push(v));
            state.basket = []
        }
    },

    getters: {},

    actions: {
        clone_to_basket({commit}, {virus}) {
            commit('clone_to_basket', virus);
        },
        move_basket_to_lab({commit}) {
            commit('move_basket_to_lab');
            router.push("/labo/slice")
        },
    },


})

global.store = store

export default store