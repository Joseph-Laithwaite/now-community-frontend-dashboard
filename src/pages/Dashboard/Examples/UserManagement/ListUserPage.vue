<template>
  <div class="md-layout">
    <user-dialog 
      :showDialog=showUserDialog
      :user=selectedUser
      :desiredTab=desiredTab[0]
      v-on:close-user-dialog="closeDialog"  
      v-on:user-deleted="userDeleted"
      v-on:user-updated="userUpdated"
      v-on:user-created="userCreated"
    ></user-dialog>
    <create-user-dialog
      :showDialog=showCreateUserDialog
      v-on:close-user-dialog="toggleCreateUserDialog" 
      v-on:user-created="userCreated"
    ></create-user-dialog>
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Users List</h4>
        </md-card-header>
        <md-card-content>
          <div class="text-right">
            <md-button class="md-primary md-dense" @click="toggleCreateUserDialog">
              Create User
            </md-button>
          </div>
          <md-table
            :value="searched"
            
            md-sort="name" 
            md-sort-order="asc" 

            md-card
            @md-selected="onSelect"
            
            class="paginated-table table-striped table-hover"
          >
            <md-table-toolbar>
              <md-field class="md-toolbar-section-end">
                <label for="perPageSelected">Per Page</label>
                <md-select v-model="perPageSelected" name="perPageSelected" id="perPageSelected">
                  <md-option v-for="option in perPageoptions" :key="option" :value="option">{{option}}</md-option>
                </md-select>
              </md-field>

              <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
              </md-field>
            </md-table-toolbar>

            <md-table-empty-state
              md-icon="search"
              md-label="No users found"
              :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
              <md-button class="md-primary md-raised" @click="toggleCreateUserDialog">Create New User</md-button>
            </md-table-empty-state>

            <md-table-row 
              slot="md-table-row" 
              slot-scope="{ item, index }" 
              class='md-primary' 
              md-selectable="single"
            >
              <span v-show=false>{{ (item.index = index) }}</span>
              <md-table-cell md-label="Name" md-sort-by="first_name">{{item.first_name + ' ' + item.last_name}}</md-table-cell>
              <md-table-cell md-label="Email" md-sort-by="email">{{item.email}}</md-table-cell>
              <md-table-cell md-label="Created At" md-sort-by="created_at">{{item.created_at}}</md-table-cell>
              <md-table-cell md-label="Actions">
                <md-button class="md-icon-button md-raised md-round" @click="desiredTab.push('edit')" style="margin: .2rem;">
                  <md-icon>edit</md-icon>
                </md-button>
                <md-button class="md-icon-button md-raised md-round md-danger" @click="desiredTab.push('delete')" style="margin: .2rem;">
                  <md-icon>delete</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>

        <md-card-actions md-alignment="space-between">
          <div class="">
            <p class="card-category">
              Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} entries
            </p>
          </div>
          
          <pagination
            class="pagination-no-border pagination-success"
            v-model="currentSelectedPage"
            :per-page="pagination.per_page"
            :total="pagination.total"
            :page-count="pagination.last_page"
            :value="pagination.value"
            @input="paginationPageChange"
          />
        </md-card-actions>

      </md-card>
    </div>
  </div>
</template>

<script>

  import Pagination from "@/components/Pagination";
  import UserDialog from "@/components/UserDialog.vue";
  import CreateUserDialog from "@/components/CreateUserDialog.vue";


  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }

    return items
  }

  export default {
    name: 'UserList',

    components: {
      "pagination": Pagination,
      "user-dialog": UserDialog,
      "create-user-dialog": CreateUserDialog

    },

    data: () => ({
      search: '',
      searched: [],

      data: [],

      query: null,

      sortation: {
        field: "first_name",
        order: "asc"
      },
      
      pagination: {},
      currentSelectedPage:1,
      perPageSelected: 25,
      perPageoptions: [5, 10, 25, 50, 100],
      
      showUserDialog: false,
      selectedUser: {},
      desiredTab: [],

      showCreateUserDialog: false,
    }),

    computed: {
      requestString(){
        return "?perPagePaginate=" + this.perPageSelected + '&page=' + this.currentSelectedPage + '&nameQuery=' + this.search
      },

      sort() {
        if (this.sortation.order === "asc") {
          return `-${this.sortation.field}`
        }
        return this.sortation.field;
      },

/*
      from() {
        return this.pagination.perPage * (this.pagination.currentPage - 1);
      },

      to() {
        let highBound = this.from + this.pagination.perPage;
        if (this.pagination.total < highBound) {
          highBound = this.pagination.total;
        }
        return highBound;
      },
*/
    },

    created() {
      this.getUserList();
    },

    watch:{
      perPageSelected(){
        this.search=''
        this.getUserList()
      },
      search(){    
        this.getUserList()
      }
    },

    methods: {
      async getUserList(params = this.requestString) {
        await this.$store.dispatch("users/list", params)
        this.searched = this.data = await this.$store.getters["users/list"]
        this.pagination = await this.$store.getters["users/pagination"]
      },

      userDeleted(){
        console.log("removing user from list after deletion");
        this.data = this.searched.slice(0, this.selectedUser.index).concat(this.searched.slice(this.selectedUser.index + 1, this.searched.length))
        this.selectedUser = new Object()
        this.showUserDialog=false;
        this.searched = this.data;
        this.pagination.total --;
        this.pagination.to --;
      },
      userUpdated(user){
        console.log("Updating user in list after update");
        this.searched[this.selectedUser.index] = user;
      },
      userCreated(user){
        console.log("Adding new user to list after creation");
        this.selectedUser = user;
        this.searched.push(user);
        this.pagination.total ++;
        this.pagination.to ++;
      },

      paginationPageChange(page){
        if (this.pagination.current_page){
          if (parseInt(page) === this.pagination.current_page){
            console.log('Current page is ' + this.pagination.current_page + ' No page change required to: ' + page);
          }else{
            console.log('CHANGE PAGE TO: ' + page);
            this.currentSelectedPage = page;
            this.getUserList();
          }
        }
      },
      
      searchOnTable () {
        //this.searched = searchByName(this.data, this.search)
      },

      functionNotYetAdded() {
        this.$store.dispatch("alerts/error", "This function hasd not yet been added")
      },

      toggleDialog(){
        this.showUserDialog =! this.showUserDialog;
      },

      toggleCreateUserDialog(){
        this.showCreateUserDialog =! this.showCreateUserDialog;
      },

      selectUser(){
        this.selectedUser = this.$store.getters['users/user']
        this.toggleDialog()
      },

      onSelect (item) {
        if(item){
          console.log(item);
          console.log("index: "+item.index);
          this.selectedUser = item
        }
        this.toggleDialog()
      },
      
      closeDialog(){
        this.toggleDialog()
        this.desiredTab.pop()
      },

      customSort() {
        return false
      }

    }

  }

</script>