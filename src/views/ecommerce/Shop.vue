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
      employee: {
        gridOptions: null,
        gridApi: null,
        columnApi: null,
        defaultColDef: {
            resizable: true,
            editable: false,
        },
        columnDefs: [
            { headerName: "No.", field: "No.", valueGetter: 'node.rowIndex + 1', maxWidth: 50, },
            { headerName: "사원번호", field: "employee_number" },
            { headerName: "성명", field: "korean_name" },
            { headerName: "급여구분", field: "employee_type" },
            { headerName: "소속", field: "position_code" },
            { headerName: "부서명", field: "department_id" },
            { headerName: "직급", field: "rank_code" },
        ],
        rowData: [
            { employee_number: "D00010", korean_name: "김시드", employee_type: '연봉제', position_code: '소속1', department_id:'영업1팀', rank_code:'대리' },
            { employee_number: "D00020", korean_name: "이시드", employee_type: '연봉제', position_code: '소속1', department_id:'영업1팀', rank_code:'대리' },
            { employee_number: "D00030", korean_name: "박시드", employee_type: '연봉제', position_code: '소속1', department_id:'영업1팀', rank_code:'대리' },
            { employee_number: "D00040", korean_name: "최시드", employee_type: '시급제', position_code: '소속1', department_id:'영업1팀', rank_code:'대리' },
            { employee_number: "D00050", korean_name: "안시드", employee_type: '시급제', position_code: '소속1', department_id:'영업1팀', rank_code:'대리' },
        ],
      },

      employee_schedule: {
        gridOptions: null,
        defaultColDef: {
            resizable: true,
            maxWidth: 140,
            editable: true,
        },
        columnDefs: [
            { headerName: "No.", field: "No.", valueGetter: 'node.rowIndex + 1', maxWidth: 50, editable: false, },
            { headerName: "근무일자", field: "employee_number", editable: false, },
            { headerName: "근무스케줄", field: "korean_name", editable: false, },
            { headerName: "주간/야간", field: "employee_type" },
            { headerName: "출근시간", field: "position_code" },
            { headerName: "퇴근시간", field: "department_id" },
            { headerName: "외출", field: "rank_code" },
            { headerName: "외출 복귀", field: "rank_code" },
            { headerName: "출근판정", field: "rank_code", editable: false, },
            { headerName: "퇴근판정", field: "rank_code", editable: false, },
            { headerName: "지각", field: "rank_code" },
            { headerName: "연장", field: "rank_code" },
            { headerName: "야간", field: "rank_code" },
            { headerName: "휴일", field: "rank_code" },
            { headerName: "정상", field: "rank_code" },
            { headerName: "실 근무", field: "rank_code" },
        ],
        rowData: [
            { employee_number: "D00010", korean_name: "김시드", employee_type: '연봉제', position_code: '소속1', department_id:'영업1팀', rank_code:'0:00' },
            { employee_number: "D00020", korean_name: "이시드", employee_type: '연봉제', position_code: '소속1', department_id:'영업1팀', rank_code:'0:00' },
            { employee_number: "D00030", korean_name: "박시드", employee_type: '연봉제', position_code: '소속1', department_id:'영업1팀', rank_code:'0:00' },
            { employee_number: "D00040", korean_name: "최시드", employee_type: '시급제', position_code: '소속1', department_id:'영업1팀', rank_code:'0:00' },
            { employee_number: "D00050", korean_name: "안시드", employee_type: '시급제', position_code: '소속1', department_id:'영업1팀', rank_code:'0:00' },
        ],
      }
    }
  },

  methods: {
    onGridReady(params){
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      // debugger;
      this.gridApi.sizeColumnsToFit();
    }
  }
}

</script>


<template>
  <v-container>
      <div class="d-flex align-center mb-7">
        <div class="bg-primary-lighten-5 px-3 py-2 rounded me-3">
          <i class="tio- text-primary text-18">shopping</i>
        </div>
        <div class="text-subtitle-2 f-600">ADT 근태 관리</div>
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
                <v-select
                  class="mw-200 px-3"
                  label="년월"
                  variant="outlined"
                  hide-details="">
                </v-select>
                <v-btn color="primary" flat class="px-3">
                  조회
                </v-btn>
            </v-row>
        </v-col>
      </v-row>
      <!-- 구분선 --><hr class="my-5">
      <v-row>
        <v-col cols="7" class="mx-7"></v-col>
        <v-col cols="2">
            <v-btn color="primary" flat>
                <i class="tio- text-18 me-2">save</i>사원정보 가져오기 <br> (ERP IU)
            </v-btn>         
        </v-col>
        <v-col cols="1">
            <v-btn color="primary" flat>출퇴근</v-btn>
        </v-col>
        <v-col cols="1">
            <v-btn color="primary" flat>외출</v-btn>
        </v-col>
      </v-row>
      <v-row class="grid-wrap">
        <v-col cols="12">
            <!--employee table-->
            <ag-grid-vue
            style="height: 300px"
            class="ag-theme-balham"
            :columnDefs="employee.columnDefs"
            :defaultColDef="employee.defaultColDef" 
            :rowData="employee.rowData"
            @grid-ready="onGridReady"
            >
            </ag-grid-vue>
        </v-col>
      </v-row>
      <v-row class="grid-wrap">
        <v-col cols="12">
            <!--employee_schedule table-->
            <ag-grid-vue
            style="height: 300px;"
            class="ag-theme-balham"
            :columnDefs="employee_schedule.columnDefs"
            :defaultColDef="employee_schedule.defaultColDef" 
            :rowData="employee_schedule.rowData"
            >
            </ag-grid-vue>
        </v-col>
      </v-row>
  </v-container>
</template>