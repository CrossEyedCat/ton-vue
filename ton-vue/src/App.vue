<template>
  <div>

    <DataTable :value="users" lazy :first="first" paginator :rows="pageSize" :totalRecords="totalUsers"
               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
               :rowsPerPageOptions="[5,10,20, 50, 100]" @page="loadUsers($event)" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users" class="mt-4">
      <template #header>
        <div class="flex justify-content-between">
          <IconField iconPosition="left">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="search" @input="handleSearchChange" placeholder="Keyword Search" />
          </IconField>
        </div>
      </template>
      <template #empty> No customers found. </template>
      <Column field="profile_picture"  header="Profile Picture" class="min-width-150">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100px" height="100px" />
          <img v-else :src="slotProps.data.profile_picture" alt="Profile Picture" style="max-width: 100px;" />
        </template>
      </Column>
      <Column header="First Name" class="min-width-200">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100%" height="1rem" />
          <span v-else>{{ slotProps.data.first_name }}</span>
        </template>
      </Column>
      <Column header="Last Name" class="min-width-200">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100%" height="1rem" />
          <span v-else>{{ slotProps.data.last_name}}</span>
        </template>
      </Column>
      <Column header="Email" class="min-width-200">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100%" height="1rem" />
          <span v-else>{{ slotProps.data.email }}</span>
        </template>
      </Column>
      <Column field="country" header="Country" class="min-width-200">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100%" height="1rem" />
          <span v-else>{{ slotProps.data.country }}</span>
        </template>
      </Column>
      <Column field="phone" header="Phone" class="min-width-200">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100%" height="1rem" />
          <span v-else>{{ slotProps.data.phone }}</span>
        </template>
      </Column>
      <Column field="street" header="Street" class="min-width-400">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100%" height="1rem" />
          <span v-else>{{ slotProps.data.street }}</span>
        </template>
      </Column>
      <Column field="state" header="State" class="min-width-200">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100%" height="1rem" />
          <span v-else>{{ slotProps.data.state }}</span>
        </template>
      </Column>
      <Column field="longitude" header="Longitude" class="min-width-200">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100%" height="1rem" />
          <span v-else>{{ slotProps.data.longitude }}</span>
        </template>
      </Column>
      <Column field="gender" header="Gender" class="min-width-200">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100%" height="1rem" />
          <span v-else>{{ slotProps.data.gender }}</span>
        </template>
      </Column>
      <Column field="date_of_birth" header="Date of Birth" class="min-width-200">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100%" height="1rem" />
          <span v-else>{{ slotProps.data.date_of_birth }}</span>
        </template>
      </Column>
      <Column field="job" header="Job" class="min-width-200">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100%" height="1rem" />
          <span v-else>{{ slotProps.data.job }}</span>
        </template>
      </Column>
      <Column field="city" header="City" class="min-width-200">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100%" height="1rem" />
          <span v-else>{{ slotProps.data.city }}</span>
        </template>
      </Column>
      <Column field="zipcode" header="Zipcode" class="min-width-200">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100%" height="1rem" />
          <span v-else>{{ slotProps.data.zipcode }}</span>
        </template>
      </Column>
      <Column field="latitude" header="Latitude" class="min-width-200">
        <template #body="slotProps">
          <Skeleton v-if="loading" width="100%" height="1rem" />
          <span v-else>{{ slotProps.data.latitude }}</span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import axios from 'axios';
import Skeleton from 'primevue/skeleton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
export default {
  components: {
    DataTable,
    Column,
    Skeleton,
    IconField,
    InputIcon,
    InputText
  },
  data() {
    return {
      loading:false,
      first:0,
      users: [],
      currentPage: 1,
      pageSize: 10,
      totalUsers: 0,
      search:"",
      apiUrl: 'https://api.slingacademy.com/v1/sample-data/users',
    };
  },
  methods: {
    handleSearchChange() {
      // Используем задержку выполнения запроса после завершения ввода
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.loadUsers();
      }, 500); // Задержка в миллисекундах (0.5 секунды), можно настроить под свои потребности
    },
    loadUsers(event=null) {
      this.loading = true
      console.log(event)
      if (event){
        this.first = event.first;
        this.pageSize = event.rows
      }
      else{
        this.first = 0;
        this.pageSize = 5;
      }
      console.log("1", this.first, this.pageSize, this.search)
      axios.get(this.apiUrl, {
        params: {
          offset: this.first,
          limit: this.pageSize,
          search: this.search
        },
      })
          .then(response => {
            this.users = response.data.users.map(user => ({
              ...user,
            }));
            console.log(response.data)
            this.totalUsers = response.data.total_users;
            console.log("2",this.users)
          })
          .catch(error => {
            console.error('Ошибка при загрузке пользователей:', error);
          }).finally(() => {
            this.loading = false; // Установка после завершения запроса
          });
    },
  },
  created() {
    this.loadUsers();
  },
  mounted() {
    this.loadUsers();
  }
};
</script>
<style scoped>
:global(span.p-column-title) {
  font-weight: bold;
}
.min-width-150 {
  min-width: 150px;
}
.min-width-200 {
  min-width: 200px;
}
.min-width-400 {
  min-width: 400px;
}
</style>