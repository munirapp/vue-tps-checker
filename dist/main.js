import Vue from 'vue';
import axios from 'axios';
import DSource from './core/DSource';

window.axios = axios;
window.vue = Vue;
window.dataResource = DSource;

Vue.component('faq',{
    props: {
        question:{required:true},
    },
    template:`
        <div class="dropdown" :class="{ 'is-active' : tab.isActive }">
            <div class="dropdown-trigger">
                <button class="button is-fullwidth" @click="toggleTab()">
                <span v-text="tab.name"></span>
                <span class="icon is-small">
                    <i class="fa" :class="tab.arrow" aria-hidden="true"></i>
                </span>
                </button>
            </div>
            <div class="dropdown-menu" role="menu">
                <div class="dropdown-content">
                <li class="dropdown-item is-active">
                    <slot></slot>
                </li>
                </div>
            </div>
        </div>
    `,
    data(){
        return {
            tab: false
        };
    },
    created(){
        this.tab = {
            name: this.question,
            isActive: false,
            arrow: 'fa-angle-down'
        }
    },
    methods:{
        toggleTab() {
            if(this.tab.isActive){
                this.tab.isActive = false;
                this.tab.arrow = 'fa-angle-down';
                return;
            }
            this.tab.arrow = 'fa-angle-up';
            this.tab.isActive = true;
        }
    }
});


new Vue({
    el:"#app",
    data:{
        dataResource: new DSource({
            dataNama:'',
            dataNIK:''
        }),
        formShow:true,
        resultShow:false,
        errorInput:false,
    },
    methods:{
        cekTPS(){
            let validate = this.dataResource.validate(this.dataResource.dataInput);
            if(!validate){
                this.dataResource.post('http://localhost/testing/cektps/api.php')
                .then(data => this.dataResource.loading = false)
                .catch(error => console.log(error));
                this.toggleForm();
            }
            this.errorInput = validate;
        },
        toggleForm(){
            if(this.formShow){
                this.formShow = false;
                this.resultShow = true;
                return; 
            }
            this.resultShow = false;
            this.formShow = true;
        }
    }
});