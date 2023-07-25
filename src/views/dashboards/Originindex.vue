<script setup>
import TableLite from "vue3-table-lite";
import { reactive } from "@vue/reactivity";

const fnd_code = reactive({
  isLoading: false,
  columns: [
    {
      label: "code_id",
      field: "code_id",
      width: "20%",
      sortable: true,
    },
    {
      label: "code_field(구분코드)",
      field: "code_field",
      width: "30%",
      sortable: true,
    },
    {
      label: "code_name(구분코드명)",
      field: "code_name",
      width: "40%",
      sortable: true,
    },
    {
      label: "code_type(sys코드여부)",
      field: "code_type",
      width: "20%",
      sortable: true,
    },
  ],
  rows: [
    {
      code_id: "121",
      code_field: "CA_CP00220",
      code_name: "전표처리메뉴종류",
      code_type: "N",
    },
    {
      code_id: "122",
      code_field: "CA_CP00300",
      code_name: "시스템코드",
      code_type: "N",
    },
    {
      code_id: "123",
      code_field: "CA_CP00400",
      code_name: "연결처리자료종류",
      code_type: "N",
    },
    {
      code_id: "124",
      code_field: "CA_CP00500",
      code_name: "추출자료종류",
      code_type: "N",
    },
  ],
  totalRecordCount: 0,
  sortable: {
    order: "id",
    sort: "asc",
  },
});

//defined_type = SYS 인 rows
const fnd_code_detail_sys = reactive({
  isLoading: false,
  columns: [
    {
      label: "code_detail_id",
      field: "code_detail_id",
      width: "10%",
      sortable: true,
    },
    {
      label: "defined_cd(구분코드)",
      field: "defined_cd",
      width: "10%",
      sortable: true,
    },
    {
      label: "defined_name(구분코드명)",
      field: "defined_name",
      width: "20%",
      sortable: true,
    },
    {
      label: "defined_eng_name(구분코드명(EN))",
      field: "defined_eng_name",
      width: "30%",
      sortable: true,
    },
    {
      label: "use_yn(사용여부)",
      field: "use_yn",
      width: "10%",
      sortable: true,
      display: function(row){
        if(row.data = 'y')
          return row.data = '사용'
        else if(row.data = 'n')
          return row.data = '미사용'
      }
    },
    {
      label: "value01(관련1)",
      field: "value01",
      width: "10%",
      sortable: true,
      display: function(row){
        return(
          '<input type="text" v-model="'+row+'">'
        );
      }
    },
    {
      label: "value02(관련2)",
      field: "value02",
      width: "10%",
      sortable: true,
    },
    {
      label: "value03(관련3)",
      defined_cd: "value03",
      width: "10%",
      sortable: true,
    },
  ],
  rows: [
    {
      code_detail_id: "1",
      defined_cd: "001",
      defined_name: "신규취득",
      defined_eng_name: "new acquisition",
      use_yn: "Y",
      value01: "1",
      value02: "1",
      value03: "1",
    },
  ],
  totalRecordCount: 0,
});
</script>

<template>

  <v-container>
    <div class="d-flex align-center mb-7">
      <div class="bg-primary-lighten-5 px-3 py-2 rounded me-3 d-inline-block">
        <i class="tio- text-primary text-18">shopping</i>
      </div>
      <div class="text-subtitle-2 f-600">코드 관리</div>
    </div>
    <v-row>
      <v-col cols="12">
        <v-row class="align-center mb-2">
          <v-text-field
            class="mw-200 px-3"
            label="Search"
            variant="outlined"
            hide-details=""
          ></v-text-field>
        <v-select
          class="mw-200 px-3"
          label="Company"
          variant="outlined"
          hide-details="">
        </v-select>
        <v-btn color="primary" flat class="px-3">
          조회
        </v-btn>
        </v-row>
      </v-col>
      <v-col cols="12">
        <table-lite
          :is-slot-mode="true"
          :has-checkbox="true"
          :is-loading="fnd_code.isLoading"
          :columns="fnd_code.columns"
          :rows="fnd_code.rows"
          :total="fnd_code.totalRecordCount"
          :is-hide-paging="true"
        >
        </table-lite>
      </v-col>
    </v-row>

    <!-- 구분선 --><hr class="my-5">

    <div class="d-flex align-center mb-7">
      <div class="bg-primary-lighten-5 px-3 py-2 rounded me-3 d-inline-block">
        <i class="tio- text-primary text-18">money</i>
      </div>
      <div class="text-subtitle-2 f-600">급여 관리</div>
    </div>
    <v-row>
      <v-col cols="12">
        <v-row class="align-center mb-2">
          <v-text-field
            class="mw-200 px-3"
            label="Search"
            variant="outlined"
            hide-details=""
          ></v-text-field>
          <v-select
            class="mw-200 px-3"
            label="Company"
            variant="outlined"
            hide-details="">
          </v-select>
          <v-select
            class="mw-200 px-3"
            label="Business"
            variant="outlined"
            hide-details="">
          </v-select>
          <v-btn color="primary" flat class="px-3">
          조회
        </v-btn>
        </v-row>
      </v-col>
      <v-col cols="12">
        <table-lite
          :is-slot-mode="true"
          is-re-search="true"
          :is-loading="fnd_code_detail_sys.isLoading"
          :columns="fnd_code_detail_sys.columns"
          :rows="fnd_code_detail_sys.rows"
          :total="fnd_code_detail_sys.totalRecordCount"
          :is-hide-paging="true"
        >
        </table-lite>
      </v-col>
    </v-row>
  </v-container>
  <router-view />
</template>

<style lang="scss" scoped>
.mw-200 {
  max-width: 200px;
}
::v-deep(.vtl-thead-tr) {
  background-color: #e5f3ff;
}
::v-deep(.vtl-tbody-tr) {
  background-color: #fff;
}
::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
  background-color: transparent;
  border-color: transparent;
  color: #32425e;
  font-weight: 600;

  border-bottom: 1px solid #cee8ff;
}
::v-deep(.vtl-tbody-tr) {
  border-bottom: 1px solid #cee8ff !important;
}
::v-deep(.vtl-tbody-tr:last-child) {
  border-bottom: 1px solid transparent !important;
}
::v-deep(.vtl-table td),
::v-deep(.vtl-table tr) {
  border: none;
  vertical-align: middle;
  font-weight: 500;
}
::v-deep(.vtl-paging-pagination-page-link) {
  border: none;
  text-decoration: none;
}
::v-deep(.vtl-paging-pagination-page-li-number.page-item.disabled .page-link) {
  background-color: #0a68ff;
  color: #fff;
  border-radius: 8px;
  padding: 6px 15px;
  font-weight: 600;
}
::v-deep(.vtl-paging-pagination-page-li-first) {
  display: none;
}
::v-deep(.vtl-paging-pagination-page-li-last) {
  display: none;
}

::v-deep(.vtl-paging-change-div) {
  visibility: hidden;
}
::v-deep(.vtl-thead-column) {
  font-size: 12px;
  font-weight: 600;
  color: #88a6c9;
}

::v-deep(.vtl-tbody-td span) {
  font-size: 12px;
  font-weight: 500;
  color: #011e3d;
}
::v-deep(.vtl-paging-info) {
  font-size: 13px;
}
::v-deep(.user-name) {
  font-weight: 600 !important;
}
</style>
