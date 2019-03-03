class DSource{
    constructor(dataInput){
        this.dataInput = dataInput;
        this.failData = false;
        this.successData = false;
        this.errors = {};
    }

    post(url){
        axios.post(url,this.data())
        .then(this.sendSuccess.bind(this))
        .catch(this.sendFail.bind(this)); 
    }

    data(){
        let data = Object.assign({},this.dataInput);
        return data;
    }

    reset(){
        this.dataInput.dataNama = '';
        this.dataInput.dataNIK = '';
    }

    sendSuccess(response){
        this.reset();
        if(response.data.message == 'failed'){
            if(this.successData){  this.successData = false;   }
            this.failData = response.data.data.pesan; 
        }

        if(response.data.message == 'success'){
            if(this.failData) { this.failData = false; }
            this.successData = response.data.data;
        }
    }

    sendFail(error){
        alert('Ups, sepertinya server mengalami gangguan');
        console.log(error);
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