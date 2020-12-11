<template>
  <div>
    <md-dialog 
      :md-click-outside-to-close="false"
      :md-active.sync="showDialog"
      @md-clicked-outside="$emit('close-item-dialog',item)"
    > 
      <md-dialog-title v-if="!newItem"  v-text="item.name"></md-dialog-title>
      <md-dialog-content>
      <!-- class="md-scrollbar"> -->
      <md-tabs 
        v-if="!newItem"
        md-dynamic-height md-primary 
        md-alignment="centered"
        :md-active-tab="desiredTab"
        >

        <slot name="activity">

        </slot>
        <md-tab id="edit" md-label="info"> 
          <edit-item-card :item=item :newItem=newItem></edit-item-card>
        </md-tab>
        <md-tab id="delete" md-label="Delete" class="md-layout md-alignment-center-center">
          <h3 class="md-layout-item">Are you sure you delete this {{itemType}}?</h3>
          <md-button 
            class="md-layout-item"
            v-on:click="deleteItem()"
          >
            DELETE
          </md-button>
        </md-tab>
      </md-tabs>

      <edit-item-card v-else :newItem=newItem></edit-item-card>

    </md-dialog-content>
    </md-dialog>
  </div>
  
</template>

<script>
import EditItemCard from "../components/EditItemCard.vue"

  export default {
    name: 'ItemDialog',
    components: {EditItemCard},
    props: {
      showDialog: {default:false},
      newItem: {type:Boolean, reuired: true},
      item: {type: Object, default: null, required: false},
      desiredTab: {default:"edit"},
      itemType: {default:'Product'},
      itemData: {
        type: [Array, Object], 
        default:()=>
        [
          {
            label: "ID",
            sortBy: "id",
            item: "id",
            editable: false,
            display: false,
          },
          {
            label: "Name",
            sortBy: "name",
            item: "name",
            editable: true,
            default: true
          },
          {
            label: "Price",
            sortBy: "price",
            item: "price",
            editable: true
          },
          {
            label: "VAT",
            sortBy: "vat",
            item: "vat",
            editable: true
          },
          {
            label: "Deposit",
            sortBy: "deposit",
            item: "deposit",
            editable: true
          }
        ]
      }
    },
    data: () => ({
      
    }),
    methods:{
      deleteItem(){
        this.$store.dispatch(this.vueStoreModule + "/destroy", this.item.id)
        .then(response=>{
          this.$store.dispatch("alerts/success", "Profile successfully deleted.")
          this.$emit('close-item-dialog');
          this.$emit('item-deleted');
        })
        .catch(error=>{
          this.$store.dispatch("alerts/error", "Oops, something went wrong! " + error.error);
        });
      }
    },
    computed:{
      // newItem(){
      //  if(typeof this.item.id == undefined){
      //     return false;
      //   }
      //   return true;
      // },
      vueStoreModule(){
        return this.itemType.toLowerCase() + "s"
      },
    },
  }
</script>

<style lang="scss" >
.md-dialog-content{
  padding-top:50px;
}
.md-tabs-navigation{
  // display: none;
  background-color:#c8c8c8 !important ;
}


@media (max-width: 768px){
  .md-tabs-content   {
    height: 100% !important;
    overflow: hidden;
    }  
}
</style>