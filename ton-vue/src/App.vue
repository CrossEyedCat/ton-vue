<template>
  <div>
    <DataTable :value="users" paginator :rows="pageSize" :totalRecords="totalUsers"
               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
               :rowsPerPageOptions="[5,10,20]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users">
      <Column field="first_name" header="First Name"></Column>
      <Column field="last_name" header="Last Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="country" header="Country"></Column>
    </DataTable>
  </div>
</template>

<script>
import axios from 'axios';
import  DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  components: {
    DataTable,
    Column,
  },
  data() {
    return {
      users: [],
      currentPage: 1,
      pageSize: 10,
      totalUsers: 0,
      apiUrl: 'https://api.slingacademy.com/v1/sample-data/users',
    };
  },
  methods: {
    loadUsers() {
      axios.get(this.apiUrl, {
        params: {
          offset: (this.currentPage - 1) * this.pageSize,
          limit: this.pageSize,
        },
      })
          .then(response => {
            // Обработка данных для соответствия ожидаемой структуре DataTable
            this.users = response.data.users.map(user => ({
              ...user,
              name: `${user.first_name} ${user.last_name}`,
              country: user.country,
            }));
            this.totalUsers = response.data.total_users;
          })
          .catch(error => {
            console.error('Ошибка при загрузке пользователей:', error);
          });
    },
  },
  watch: {
    // Просмотр изменений для currentPage и pageSize, чтобы перезагружать данные
    currentPage: 'loadUsers',
    pageSize: 'loadUsers',
  },
  mounted() {
    this.loadUsers();
  },
};
</script>
