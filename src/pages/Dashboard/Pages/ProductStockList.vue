<template>
  <div class="md-layout">
     <item-dialog 
      :showDialog=showDialog
      :newItem=newItem
      :item=selectedItem
      :desiredTab=desiredTab[0]
      v-on:close-item-dialog="closeDialog"  
      v-on:item-deleted="itemDeleted"
      v-on:item-updated="itemUpdated"
      v-on:item-created="itemCreated"
    >
    <template slot="activity">
        <md-tab id="activity" md-label="Activity">
          <h1>Activity</h1>
        </md-tab>
    </template>
    </item-dialog>

    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Product Stock</h4>
        </md-card-header>
        <md-card-content>
          <!-- <div class="text-right">
            <md-button class="md-primary md-dense" @click="createNewItem">
              Create {{tableType}}
            </md-button>
          </div> -->
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
              :md-label="`No '${tableType}' found`"
              :md-description="`No '${tableType.toLowerCase()}' found for this '${search}' query. Try a different search term or create a new '${tableType}'.`">
              <md-button class="md-primary md-raised" @click="toggleCreateDialog">Create New {{tableType}}</md-button>
            </md-table-empty-state>

            <md-table-row 
              slot="md-table-row" 
              slot-scope="{ item, index }" 
              class='md-primary' 
              md-selectable="single"
            >
              <span v-show=false>{{ (item.index = index) }}</span>
              <md-table-cell 
                v-for="row in tableData" 
                :class="getDangerClass(row,item)"
                :key="row.label"
                :md-label="row.label" 
                :md-sort-by="row.sortBy"
              >
                <span v-if="row.child && row.key">
                  {{item[row.child][row.key][row.item]}}
                </span>
                <span v-else-if="row.child">
                  {{item[row.child][row.item]}}
                </span>
                <span v-else>
                  {{item[row.item]}}
                </span>
              </md-table-cell>
              

              <md-table-cell md-label="Actions">
                <md-button class="md-icon-button md-raised md-round" @click="desiredTab.push('activity')" style="margin: .2rem;">
                  <md-icon>remove_red_eye</md-icon>
                </md-button>
                <md-button class="md-icon-button md-raised md-round" @click="desiredTab.push('add')" style="margin: .2rem;">
                  <md-icon>add</md-icon>
                </md-button>
                <md-button class="md-icon-button md-raised md-round md-danger" @click="desiredTab.push('remove')" style="margin: .2rem;">
                  <md-icon>remove</md-icon>
                </md-button>
                <md-button class="md-icon-button md-raised md-round md-primary" @click="desiredTab.push('edit')" style="margin: .2rem;">
                  <md-icon>edit</md-icon>
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
  import ItemDialog from "@/components/ItemDialog.vue";

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
    name: 'product-stock-list',

    components: {
      "pagination": Pagination,
      "item-dialog": ItemDialog,
    },
    props:{
      tableType: {default:'Product'},
      passed_independent_id:{default:null},
      tableData: {
        type: [Array, Object], 
        default:()=>
        [
          // {
          //   label: "ID",
          //   sortBy: "id",
          //   item: "id",
          //   editable: false
          // },
          {
            label: "Name",
            sortBy: "name",
            item: "name",
            child: "product",
            editable: true
          },
          {
            label: "Price",
            sortBy: "price",
            item: "price",
            editable: true
          },
          // {
          //   label: "VAT",
          //   sortBy: "vat",
          //   item: "vat",
          //   editable: true
          // },
          // {
          //   label: "Deposit",
          //   sortBy: "deposit",
          //   item: "deposit",
          //   editable: true
          // },
          {
            label: "Expired Stock",
            sortBy: "expired_stock",
            item: "expired_stock",
            editable: true
          },
          {
            label: "Expires Today",
            sortBy: "expires_today",
            item: "expires_today",
            editable: true
          },
          {
            label: "Current Stock",
            sortBy: "in_stock_total",
            item: "in_stock_total",
            editable: true
          },
          {
            label: "Stock on Order",
            sortBy: "on_order_stock",
            item: "on_order_stock",
            editable: true
          },
          // {
          //   label: "Date In Stock",
          //   sortBy: "date_in_stock",
          //   item: "date_in_stock",
          //   child: "stock",
          //   key: "0",
          //   editable: true
          // },
          // {
          //   label: "Best Before",
          //   sortBy: "expriy_date",
          //   item: "expriy_date",
          //   child: "stock",
          //   key: "0",
          //   editable: true
          // },

        ]
      }
    },

    data: () => ({
      search: '',
      searched: [],

      query: null,

      sortation: {
        field: "id",
        order: "asc"
      },
      
      pagination: {},
      currentSelectedPage:1,
      perPageSelected: 25,
      perPageoptions: [5, 10, 25, 50, 100],
      
      showDialog: false,
      selectedItem: {},
      desiredTab: [],

      // showCreateDialog: false,
      newItem: false,

      independent_id:null,
    }),

    computed: {
      requestString(){
        // return "?perPagePaginate=" + this.perPageSelected + '&page=' + this.currentSelectedPage + '&nameQuery=' + this.search
        return {
          // let independent_id = this.$store.getters["profile/currentPermissions"].independent_id;
          independent_id: this.independent_id, 
          query:
            "?perPagePaginate=" + this.perPageSelected 
            + '&page=' + this.currentSelectedPage 
            + '&nameQuery=' + this.search
        }
      },

      sort() {
        if (this.sortation.order === "asc") {
          return `-${this.sortation.field}`
        }
        return this.sortation.field;
      },

      vueStoreModule(){
        return this.tableType.toLowerCase() + "s"
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

    async created() {
      if(this.passed_independent_id==null){
        this.independent_id = await this.$store.getters["profile/currentPermissions"].independent_id;
      }else{
        this.independent_id = this.passed_independent_id;
      }
      await this.getItemList();
    },

    watch:{
      perPageSelected(){
        this.search=''
        this.getItemList()
      },
      search(){    
        this.getItemList()
      },
      '$store.state.profile.currentPermissions.independent_id': function (){
        // console.log('In store watcher') 
        this.independent_id = this.$store.getters["profile/currentPermissions"].independent_id;
        this.getItemList();
      }
    },

    methods: {
      async getItemList(params = this.requestString) {
        await this.$store.dispatch(this.vueStoreModule + "/independent_stock_list", params)
        this.searched = await this.$store.getters[this.vueStoreModule + "/independent_stock_list"]
        this.pagination = await this.$store.getters[this.vueStoreModule + "/pagination"]
      },

      createNewItem(){
        this.selectedItem = new Object()
        this.newItem = true
        this.toggleDialog()
      },

      itemDeleted(){
        let data = this.searched.slice(0, this.selectedItem.index).concat(this.searched.slice(this.selectedItem.index + 1, this.searched.length))
        this.searched = data
        this.selectedItem = new Object()
        this.showDialog=false;
        this.pagination.total --;
        this.pagination.to --;
      },
      itemUpdated(item){
        console.log("Updating item in list after update");
        this.searched[this.selectedUser.index] = item;
      },
      itemCreated(item){
        console.log("Adding new item to list after creation");
        this.selectedUser = item;
        this.searched.push(item);
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
            this.getItemList();
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
        this.showDialog =! this.showDialog;
        this.$emit('side_bar_mini')
      },

      toggleCreateDialog(){
        this.showCreateDialog =! this.showCreateDialog;
      },

      selecteItem(){
        this.selectedItem = this.$store.getters[this.vueStoreModule + '/' +this.tableType]
        this.toggleDialog()
      },

      onSelect (item) {
        if(item){
          // console.log(item);
          // console.log("index: "+item.index);
          this.newItem = false
          this.selectedItem = item
        }
        this.toggleDialog()
      },
      
      closeDialog(item){
        this.selectedItem=item;
        this.toggleDialog()
        this.desiredTab.pop()
      },

      customSort() {
        return false
      },

      getDangerClass(row,item){
        // console.log(row);
        // console.log(item);
        if(row.item=="expires_today"||row.item=="expired_stock"){
          if(item.expires_today!==0){
            return 'red';
          }
        }
        return;
      }

    }

  }

</script>

<style scoped>
.red{
    /* bottom: -8px; */
    color: white;
    background-color:red;
    font-weight: bold;
  }
</style>