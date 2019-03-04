import { resolve } from "path";
import { reject } from "q";

class DSource{
    constructor(dataInput){
        this.dataInput = dataInput;
        this.failData = false;
        this.successData = false;
        this.loading = false;
        this.errors = {};
    }

    post(url){
        this.failData = false;
        this.successData = false;
        this.loading = true;
        return new Promise((resolve, reject) => {
            axios.post(url,this.data())
            .then(response=>{
                this.sendSuccess(response.data);
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response.data);
            });
        }); 
    }

    data(){
        let data = Object.assign({},this.dataInput);
        return data;
    }

    reset(){
        this.dataInput.dataNama = '';
        this.dataInput.dataNIK = '';
    }

    sendSuccess(data){
        this.reset();
        if(data.message == 'failed'){
            if(this.successData){  this.successData = false;   }
            this.failData = data.data.pesan; 
        }

        if(data.message == 'success'){
            if(this.failData) { this.failData = false; }
            this.successData = data.data;
        }
    }

    validate(data){
        this.resetError();
        for(let item in data){
            if(data[item] == ''){
                this.errors[item] = 'Kolom ini mesti diisi';
            }
        }

        if(Object.keys(this.errors).length == 0){
            return false;
        }

        return this.errors;
    }

    resetError(){
        this.errors = {};
    }
    
    clearError(nameInput){
        if(nameInput){
            delete this.errors[nameInput];
            return; 
        }
    }

    getErrorName(nameInput){
        return this.errors.hasOwnProperty(nameInput);
    }

    getErrorValue(nameInput){
        return this.errors[nameInput];
    }

}

export default DSource;