<template>
  <div class="main">
    <div class="columns is-gapless">
      <div id="column1" class="column is-one-fifth">
        <div class="titlelogo">
          <h2 class="title">User manager</h2>
        </div>
        <div class="newuser">
          <router-link to="/register"> <button class="button is-success is-fullwidth">+ New</button></router-link>
        </div>
        <div class="githubbutton">
          <a href="https://github.com/Dioneprey" target="_blank" class="button is-fullwidth">
              <span class="icon is-fullwidth-">
                <i class="fab fa-github"></i>
              </span>
            <span>GitHub</span>
          </a>
        </div>
       
      </div>
      <div style="padding-left: 0px" class="column">
        <div>
          <div>
            <nav
              id="navid" class="navbar" role="navigation" aria-label="main navigation">
              <div class="containerr">
                <div class="navbar-brand">
                  <a class="navbar-item" href="https://bulma.io">
                    <img
                      src="https://freesvg.org/img/abstract-user-flat-4.png" alt="AdminIcon"/>
                  </a>
                  <div class="navbarUser"><b>Admin</b></div>
                </div>
              </div>
            </nav>
          </div>
          <div class="navbot">
            <div class="containerr">Users</div>
          </div>
          <div class="containerr">
            <div class="table-div">
              <table id="table" class="table is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody v-for="user in user" :key="user.id">
                  <tr>
                    <th>{{ user.id }}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ ProcessedRole(user.role) }}</td>
                    <td>
                      <router-link :to="{name: 'userEdit', params: {id: user.id}}"><button class="button is-success">Edit</button></router-link> |
                      <button class="button is-danger" @click="ShowModal(user.id)">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div :class="{modal: true, 'is-active': showModal}">
          <div class="modal-background">

          </div>
          <div class="modal-content">
            
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                You really want to remove this user?
              </p>
              
            </header>
            <div class="card-content">
            <div class="content">
              Please, confirm your decision!
            </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item" @click="HideModal()">Cancel</a>             
              <a href="#" class="card-footer-item" @click="DeleteUser()">Confirm</a>
            </footer>
          </div>

          </div>
          <button class="modal-close is-large" aria-label="close" @click="HideModal()"></button>
        </div>



      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .get("http://localhost:8686/user", req)
      .then((res) => {
        console.log(res);
        this.user = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      user: [],
      showModal: false,
      deleteUserId: -1

    }
  },
  methods: {
    ProcessedRole: function (value) {
      if (value == 0) {
        return "Common user";
      } else if (value == 1) {
        return "Admin";
      }
    },
    HideModal(){
      this.showModal = false
    },
    ShowModal(id){
      this.deleteUserId = id
      this.showModal = true
    },
    DeleteUser(){

      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          },
      }


      axios.delete("http://localhost:8686/user/"+this.deleteUserId, req).then(res =>{
        console.log(res)
        this.showModal = false
        window.location.reload()
      }).catch(err => {
        console.log(err)
        this.showModal = false
      })
    }
  },
};
</script>

<style>
.main {
  background-color: #f5f3f3;
}
.containerr {
  padding: 0 40px;
}
#table {
  box-shadow: 1px 1px 10px #c7c7c7;
}
#table thead tr th,
#table tbody tr th,
#table thead tr td,
#table tbody tr td {
  text-align: center;
}
.table-div {
  margin-top: 40px;
  width: 100%;
}
#navid {
  border-bottom: 1px solid #e6e2e2;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0;
  height: 80px;
}
#navid .navbar-brand .navbar-item img {
  max-height: 2.75rem;
}
.navbarUser {
  display: flex;
  align-items: center;
  cursor: pointer;
}
#column1 {
  background-color: #1f2029;
  width: 300px;
  height: 100vh;
}
.navbot {
  border-bottom: 1px solid #e6e2e2;
  font-weight: bold;
  font-size: 25px;
  text-align: left;
  padding: 20px;
  background-color: #fafafa;
}
button {
  width: 5vw;
}
.titlelogo {
  background-color: #0e0e13;
  display: flex;
  align-items: center;
  height: 80px;
  padding-left: 20px;
}
.titlelogo h2 {
  color: #fff;
  font-size: 24px;
}
.newuser{
  padding: 10px 30px;
}
.githubbutton{
  padding: 10px 30px;
}
</style>