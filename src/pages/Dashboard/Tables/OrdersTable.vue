<template>
  <div>
    <md-table v-model="searched" md-sort="orderDate" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Orders</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
        <md-datepicker  md-immediately>
            <label>Orders placed from</label>
        </md-datepicker>
        <md-datepicker  md-immediately>
            <label>Orders placed Until</label>
        </md-datepicker>
          <md-input placeholder="Search by Customer Name..." v-model="search" @input="searchOnTable" />
        </md-field>
</md-table-toolbar>
      

      <md-table-empty-state
        md-icon="search"
        md-label="No orders found"
        :md-description="`No order found for this '${search}' query. Try a different search term or create a new order.`">
        <md-button class="md-primary md-raised" @click="newOrder">Create New Order</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Customer Name" md-sort-by="customerName">{{ item.customerName }}</md-table-cell>
        <md-table-cell md-label="Order Total" md-sort-by="orderTotal">{{ item.orderTotal }}</md-table-cell>
        <md-table-cell md-label="Order Date" md-sort-by="orderDate">{{ item.orderDate }}</md-table-cell>
        <md-table-cell md-label="Collection Date" md-sort-by="collectionDate">{{ item.collectionDate }}</md-table-cell>
        <md-table-row></md-table-row>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByCustomerName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.customerName).includes(toLower(term)))
    }

    return items
  }

  export default {
    customerName: 'OrdersTable',
    data: () => ({
      search: null,
      searched: [],
      orders: [{
        id: 1,
        customerName: 'Jane',
        orderTotal: 13.00,
        orderDate: '05/03/2020',
        collectionDate: '08/10/2020',
        paid: false,
        orderItems: [
          {customerName: 'Coffee',
          brand: 'Sundays Coffee',
          independent: 'Herbies Health',
          quantity: 2,
          price: 5,
          totalPrice: 10},
          {customerName: 'Artichoke',
          brand: 'IOW farmers',
          independent: 'Mediteranean Supermarket',
          quantity: 1,
          price: 3,
          totalPrice: 3},
        ]
      }]
    }),
    methods: {
      newOrder () {
        window.alert('Noop')
      },
      searchOnTable () {
        this.searched = searchByCustomerName(this.orders, this.search)
      }
    },
    created () {
      this.searched = this.orders
    }
  }
</script>

<style lang="scss" scoped>
  .md-field {
    max-width: 300px;
  }
</style>