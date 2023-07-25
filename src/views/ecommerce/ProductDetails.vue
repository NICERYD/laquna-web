<script>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-balham.css";

export default {
  components: {
      AgGridVue,
  },

  data(){
    return{
      pay_calculate: {
        gridOptions: null,
        gridApi: null,
        columnApi: null,
        defaultColDef: {
            resizable: true,
            editable: true,
            headerClass: "centered",
        },
        columnDefs: [
            { headerName: "", headerCheckboxSelection: true, checkboxSelection: true, maxWidth: 40, minWidth:40, },
            { headerName: "사원코드", field: "pay_calculate_number", editable: false, },
            { headerName: "사원명", field: "korean_name", editable: false, },
            { headerName: "부서", field: "pay_calculate_type", editable: false, },
            { headerName: "직급", field: "position_code", editable: false, },
            {
              headerName: '수당',
              children: [
                { headerName: "기본급", field: "position_code", editable: false, },
                { headerName: "연차수당", field: "pay" },
                { headerName: "연장수당1", field: "pay" },
                { headerName: "연장수당2", field: "pay" },
                { headerName: "야간수당1", field: "pay" },
                { headerName: "야간수당2", field: "pay" },
                { headerName: "휴일수당1", field: "pay" },
                { headerName: "휴일수당2", field: "pay" },
                { headerName: "직책수당", field: "pay" },
                { headerName: "기타수당", field: "pay" },
                { headerName: "보조금", field: "pay" },
                { headerName: "교통비", field: "pay" },
                { headerName: "식대", field: "pay" },
                { headerName: "지급액계", field: "sum" },
              ],
            },
        ],
        rowData: [
            { pay_calculate_number: "D00010", korean_name: "김시드", pay_calculate_type: '연봉제', position_code: '소속1', department_id:'영업1팀', rank_code:'대리' },
            { pay_calculate_number: "D00020", korean_name: "이시드", pay_calculate_type: '연봉제', position_code: '소속1', department_id:'영업1팀', rank_code:'대리' },
            { pay_calculate_number: "D00030", korean_name: "박시드", pay_calculate_type: '연봉제', position_code: '소속1', department_id:'영업1팀', rank_code:'대리' },
            { pay_calculate_number: "D00040", korean_name: "최시드", pay_calculate_type: '시급제', position_code: '소속1', department_id:'영업1팀', rank_code:'대리' },
            { pay_calculate_number: "D00050", korean_name: "안시드", pay_calculate_type: '시급제', position_code: '소속1', department_id:'영업1팀', rank_code:'대리' },
        ],
      },
    }
  },

  methods: {
    onGridReady(params){
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridApi.sizeColumnsToFit();
    }
  },
}
</script>

<template>
  <v-container>
    <div class="d-flex align-center mb-7">
        <div class="bg-primary-lighten-5 px-3 py-2 rounded me-3">
          <i class="tio- text-primary text-18">money</i>
        </div>
        <div class="text-subtitle-2 f-600">급여 계산</div>
    </div>
    <v-row>
      <v-col cols="12">
        <v-row class="align-center mb-2">
          <v-select
            class="mw-200 px-3"
            label="회사"
            variant="outlined"
            hide-details="">
          </v-select>
          <v-select
            class="mw-200 px-3"
            label="사업장"
            variant="outlined"
            hide-details="">
          </v-select>
          <v-btn color="primary" flat class="px-3 ma-3">
            조회
          </v-btn>
          <v-btn color="primary" flat class="px-3">
            급여항목가져오기
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <!-- 구분선 --><hr class="my-5">
    <v-row>
      <v-col cols="4" class="mx-7"></v-col>
      <v-col cols="1">
          <v-btn color="primary" flat>급여 계산</v-btn>         
      </v-col>
      <v-col cols="2">
          <v-btn color="primary" flat>엑셀다운로드<br>(ERP IU 업로드)</v-btn>
      </v-col>
      <v-col cols="2">
          <v-btn color="primary" flat>세금계산 내역 가져오기</v-btn>
      </v-col>
      <v-col cols="2">
          <v-btn color="primary" flat>급여명세서 E-mail 전송</v-btn>
      </v-col>
    </v-row>
    <v-row class="grid-wrap">
      <v-col cols="12">
        <!--pay_calculate table-->
        <ag-grid-vue
        style="height: 300px"
        class="ag-theme-balham"
        :columnDefs="pay_calculate.columnDefs"
        :defaultColDef="pay_calculate.defaultColDef" 
        :rowData="pay_calculate.rowData"
        @grid-ready="onGridReady"
        >
        </ag-grid-vue>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.centered {
  .ag-header-cell-label {
    justify-content: center !important;
  }
}
.ag-row {
  .centered {
    justify-content: center !important;
    text-align: center;
  }
}

</style>

