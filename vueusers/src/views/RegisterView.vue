<template>
  <div class="main">    
      <div class="form">
        <h2>Sign up</h2>
        <div v-if="error != undefined">
          <div class="notification is-danger">
            <button class="delete"></button>
            <p>{{error}}</p>
          </div>
          
        </div>
          <div class="form-group">
          <i class="fa-solid fa-user"></i>
           <input  type="text" placeholder="User" v-model="name"> 
          </div>
          <div class="form-group">
          <i class="fa-solid fa-envelope"></i>
           <input  type="text" placeholder="Email" v-model="email"> 
          </div>
          <div class="form-group">
          <i class="fa-solid fa-lock"></i>
           <input  type="text" placeholder="Password" v-model="password"> 
          </div>           
      <button class="btn" @click="Register">SIGN UP</button>  
      </div>
      
      
            
    </div>
 
</template>

<script>
import axios from 'axios'
export default {
 
  data(){
    return {
      name: '',
      password: '',
      email: '',
      error: undefined,
    }
  },
  methods: {
    Register: function(){
      axios.post("http://localhost:8686/user",{
          name: this.name,
          password: this.password,
          email: this.email
      }).then(res => {
        console.log(res)
      }).catch(err => {
        var msgErro = err.response.data.err
        this.error = msgErro
      })
    }
  }  
}

</script>

<style scoped>
 
  h2 {    
    font-size: 80px;
    color: #fff;
    font-family: 'Quicksand', sans-serif;
  }
  input{
    font-family: 'Quicksand', sans-serif;
    background-color: transparent;    
    width: 500px;   
    border: none;
    border-bottom: #63636a 1px solid;
    font-size: 25px;
    padding: 15px 0 15px 30px;
    color: #fff;
  }
  input:focus{
  outline: 0;
  border-bottom: #ffffff 1px solid;
  transition: ease-in 0.3s;  
  }
  i {
    position: absolute;
        z-index: 3;  
    
    color: #fff;
    font-size: 20px;
  }
  input::placeholder {
    position: relative;
    left: 10px;
    font-size: 26px;
    color: #fff;
  }
  input:focus::placeholder {  
    font-size: 24px;
    transition: 1s ease all;
    
  }
  .main {
    display: flex;
    background: rgb(31,32,41);
    background: linear-gradient(28deg, rgba(31,32,41,1) 14%, rgb(51, 54, 68) 62%);

    align-items: center;
    height: 945px;
    justify-content: center
  }  
  .form-group {
    display: flex;
    margin-top: 45px;
    align-items: center;
  }
  .btn {
     background-color: transparent;
    font-size: 20px;
    width: 500px; 
    padding: 20px 0;
    border: 1px solid #fff;
    color: #fff;
    margin-top: 30px;;
  }

  .btn:hover {
    background-color: #fff;
    color: black;
    transition: 1s ease all;
    cursor: pointer;
  }
</style>