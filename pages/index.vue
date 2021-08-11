<template>
  <div>
    <button @click="writeToRealtimeDb()">Write Firebase</button>
    <button @click="filter_status = ''; readFromRealtimeDb()">Read All Data Firebase</button>
    <select v-model="filter_status">
      <option value="">Filter By Status</option>
      <option>Pending</option>
      <option>Paid</option>
      <!-- <option>Dr</option> -->
    </select>
    <ul v-if="invoices">
      <li v-for="(invoice, index) in invoices" :key="index">
        {{invoice.invoice_id}} {{due_date(invoice.invoice_date, invoice.payment_term)}} {{invoice.amount_invoice}} {{invoice.status}} <a @click="removeData(index)">[remove]</a> <a @click="updateData(index)">[test update]</a>
      </li>
    </ul>
  </div>
</template>

<script>
import date from '~/mixins/date'
export default {
  mixins: [date],
  data() {
    return {
      invoices: null,
      filter_status: ""
    }
  },
  watch: {
    filter_status(newval) {
      this.readFromRealtimeDb(newval)
    }
  },
  methods: {
    makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    async removeData(key) {
      if(!confirm('are you sure delete this invoices')) {
        return
      }
      try {
         let invoices = this.$fire.database.ref('invoices/' + key);
        invoices.remove()
      } catch (error) {
        alert(e)
        return
      }
      alert('Success, Remove Data')
      this.readFromRealtimeDb()
    },
    async updateData(key) {
      try {
         let invoices = this.$fire.database.ref('invoices/' + key);
        invoices.update({amount_invoice: 5000})
      } catch (error) {
        alert(e)
        return
      }
      alert('Success, Update Data')
      this.readFromRealtimeDb()
    },
    async readFromRealtimeDb(status="") {
      const dbref = this.$fire.database.ref('invoices')
      try {
        let snapshot
        if(this.filter_status !== "") {
        snapshot = await dbref.orderByChild("status").equalTo(this.filter_status).once('value')
        } else {
        snapshot = await dbref.once('value')
        }
        this.invoices = snapshot.val()
        console.log(snapshot.val(), 'list invoice')
      } catch (e) {
        alert(e)
        return
      }
    },
    async writeToRealtimeDb() {
      const messageRef = this.$fire.database.ref('invoices')
      try {
        await messageRef.push().set({
          invoice_id: this.makeid(5),
          status: 'Paid',
          bill_from: {
            street: 'Pondok Ungu Permai',
            city: 'bekasi',
            postcode: '17125',
            country: 'Indonesia' 
          },
          bill_to: {
            name: 'Eka Syafitry Dewi',
            email: 'eka@gmail.com',
            street: 'Pondok Ungu Permai',
            city: 'bekasi',
            postcode: '17125',
            country: 'Indonesia' 
          },
          invoice_date: new Date('2021-08-10').getTime(),
          payment_term: 60,
          project_description: 'Graphic Design',
          item_list: [
            {item_name: 'Banner Design', qty: 2, price: 10000, total:20000},
            {item_name: 'Email Design', qty: 4, price: 15000, total:60000},
          ],
          amount_invoice: 100000, // total of item
        })
      } catch (e) {
        alert(e)
        return
      }
      alert('Success. Create Invoice')
    }
  }
}
</script>
